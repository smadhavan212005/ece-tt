/**
 * Department Timetable Generator - UI Renderer & Interaction Controller
 * Handles wizard step navigation, dynamic inputs, live interpretation,
 * interactive timetable rendering, slot locking, drag/click-to-swap with
 * collision prevention, modals, and filters.
 */

(function (window) {
  'use strict';

  class UIController {
    constructor() {
      this.currentStep = 1;
      this.selectedClassCode = null;
      this.selectedViewType = 'class'; // 'class', 'faculty', 'room', 'lab', 'conflicts'
      this.selectedViewEntity = null;  // current classCode, facultyName, roomName, or labName
      this.swapSourceSlot = null;      // { classCode, day, period } for manual editing
      this.lastGeneratedResult = null;
    }

    init() {
      this.setupNavigation();
      this.renderCurrentStep();
      this.updateStatusSummary();
    }

    setupNavigation() {
      const stepTabs = document.querySelectorAll('.step-tab');
      stepTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          const step = parseInt(tab.dataset.step, 10);
          this.goToStep(step);
        });
      });
    }

    goToStep(step) {
      this.currentStep = step;
      document.querySelectorAll('.step-tab').forEach(tab => {
        const s = parseInt(tab.dataset.step, 10);
        tab.classList.toggle('active', s === step);
      });
      this.renderCurrentStep();
    }

    renderCurrentStep() {
      const mainContent = document.getElementById('step-content-area');
      if (!mainContent) return;

      switch (this.currentStep) {
        case 1:
          this.renderStep1DepartmentSetup(mainContent);
          break;
        case 2:
          this.renderStep2ClassSummary(mainContent);
          break;
        case 3:
          this.renderStep3ClassSelection(mainContent);
          break;
        case 4:
          this.renderStep4ClassConfig(mainContent);
          break;
        case 5:
          this.renderStep5GenerationDashboard(mainContent);
          break;
        default:
          this.renderStep1DepartmentSetup(mainContent);
      }
    }

    /* =========================================================================
       STEP 1: DEPARTMENT SETUP (No Semester asked here!)
       ========================================================================= */
    renderStep1DepartmentSetup(container) {
      const project = window.App.project;
      const dept = project.departmentConfig || { totalClasses: 8, availableClassrooms: 6, classrooms: [] };

      container.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Step 1: Department Setup</h2>
              <p>Configure total classes and available physical classrooms for the department.</p>
            </div>
            <div style="display:flex; gap:10px;">
              <button class="btn btn-secondary btn-sm" id="btn-load-sample">
                <span>⚡</span> Load Sample Realistic Dataset (ECE + VLSI)
              </button>
            </div>
          </div>

          <!-- Prominent Section 3 & 32 Callout -->
          <div class="callout callout-info">
            <span class="callout-icon">ℹ️</span>
            <div>
              <strong>Important Classroom Rule:</strong>
              Do not include <em>Peer Learning Hall</em> in the classroom count. Peer Learning Hall is automatically considered as a variable/overflow classroom for eligible 3rd and 4th year classes.
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="input-total-classes">Total Number of Classes</label>
              <input type="number" id="input-total-classes" min="1" max="30" value="${dept.totalClasses || 8}">
              <div class="hint">E.g., 8 classes across ECE & VLSI branches</div>
            </div>
            <div class="form-group">
              <label for="input-available-rooms">Total Number of Available Classrooms</label>
              <input type="number" id="input-available-rooms" min="1" max="30" value="${dept.availableClassrooms || 6}">
              <div class="hint">Physical theory lecture halls available in department (excluding Peer Learning Hall)</div>
            </div>
          </div>

          <div style="margin-top:20px;">
            <h3 style="font-size:15px; margin-bottom:12px; color:var(--secondary);">Physical Classroom Identifiers</h3>
            <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
              Enter room numbers/names and optional seating capacity. Duplicate room identifiers are automatically prevented.
            </p>
            <div id="classroom-inputs-container" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:12px;">
              <!-- Dynamic inputs generated below -->
            </div>
          </div>

          <div style="margin-top:24px; display:flex; justify-content:flex-end; gap:12px; border-top:1px solid var(--border); padding-top:16px;">
            <button class="btn btn-primary btn-lg" id="btn-save-step1">
              Proceed to Classes (Step 2) ➔
            </button>
          </div>
        </div>
      `;

      this.renderClassroomInputs();

      // Event listeners
      document.getElementById('input-available-rooms').addEventListener('input', () => {
        this.renderClassroomInputs();
      });

      document.getElementById('btn-load-sample').addEventListener('click', () => {
        window.App.loadSampleProject();
      });

      document.getElementById('btn-save-step1').addEventListener('click', () => {
        this.saveStep1();
      });
    }

    renderClassroomInputs() {
      const container = document.getElementById('classroom-inputs-container');
      const countInput = document.getElementById('input-available-rooms');
      if (!container || !countInput) return;

      const count = parseInt(countInput.value, 10) || 1;
      const existingRooms = (window.App.project.departmentConfig && window.App.project.departmentConfig.classrooms) || [];

      container.innerHTML = '';
      for (let i = 1; i <= count; i++) {
        const existing = existingRooms[i - 1] || {};
        const val = existing.room || '';
        const cap = existing.capacity || 60;
        const div = document.createElement('div');
        div.className = 'form-group';
        div.style.marginBottom = '0';
        div.innerHTML = `
          <label style="font-size:12px;">Classroom ${i}</label>
          <div style="display:flex; gap:6px;">
            <input type="text" class="room-id-input" placeholder="e.g. 10${i}" value="${val}" required style="font-weight:600;">
            <input type="number" class="room-cap-input" placeholder="Cap" title="Seating Capacity" value="${cap}" style="width:75px;">
          </div>
        `;
        container.appendChild(div);
      }
    }

    saveStep1() {
      const totalClasses = parseInt(document.getElementById('input-total-classes').value, 10) || 1;
      const totalRooms = parseInt(document.getElementById('input-available-rooms').value, 10) || 1;

      const roomInputs = document.querySelectorAll('.room-id-input');
      const capInputs = document.querySelectorAll('.room-cap-input');
      const rooms = [];
      const seen = new Set();

      for (let i = 0; i < roomInputs.length; i++) {
        const rName = roomInputs[i].value.trim();
        const cap = parseInt(capInputs[i].value, 10) || null;
        if (!rName) {
          alert(`Please provide a room number for Classroom ${i + 1}.`);
          roomInputs[i].focus();
          return;
        }
        if (rName.toLowerCase() === 'peer learning hall' || rName.toLowerCase() === 'plh') {
          alert(`"Peer Learning Hall" is automatically reserved as overflow and must not be entered as a standard classroom.`);
          roomInputs[i].focus();
          return;
        }
        if (seen.has(rName.toLowerCase())) {
          alert(`Duplicate classroom number "${rName}". Classroom numbers must be unique.`);
          roomInputs[i].focus();
          return;
        }
        seen.add(rName.toLowerCase());
        rooms.push({ room: rName, capacity: cap });
      }

      window.App.project.departmentConfig = {
        totalClasses: totalClasses,
        availableClassrooms: totalRooms,
        classrooms: rooms
      };

      this.updateStatusSummary();
      this.goToStep(2);
    }

    /* =========================================================================
       STEP 2: ENTER CLASSES & SUMMARY (4-digit format & validator)
       ========================================================================= */
    renderStep2ClassSummary(container) {
      const classes = window.App.project.classes || [];
      const branchMap = window.AppData.getBranchMap();

      container.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Step 2: Classes & Class Code Interpretation</h2>
              <p>Every class must be identified using a unique 4-digit code (Digit 1: Year, Digit 2: Branch, Digit 3: Division, Digit 4: Semester).</p>
            </div>
            <div>
              <button class="btn btn-secondary btn-sm" id="btn-add-class-toggle">+ Add New Class</button>
            </div>
          </div>

          <!-- Add Class Form -->
          <div id="add-class-box" style="background:#f8fafc; border:1px solid var(--border); border-radius:var(--radius-md); padding:16px; margin-bottom:20px; display:none;">
            <h3 style="font-size:14px; margin-bottom:12px;">Add Class Code</h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:14px; align-items:flex-end;">
              <div class="form-group" style="margin-bottom:0;">
                <label>4-Digit Class Code</label>
                <input type="text" id="new-class-code" maxlength="4" placeholder="e.g. 3125" style="font-weight:700; letter-spacing:2px; font-size:16px;">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label>Student Strength (Optional)</label>
                <input type="number" id="new-class-strength" placeholder="e.g. 60" value="60">
              </div>
              <div>
                <button class="btn btn-primary" id="btn-confirm-add-class">Save Class</button>
                <button class="btn btn-secondary" id="btn-cancel-add-class">Cancel</button>
              </div>
            </div>
            <!-- Live Interpretation Box -->
            <div id="live-code-interpretation" class="interpretation-card" style="display:none; margin-top:12px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="badge badge-primary">Live Interpretation</span>
                <span id="interp-text" style="font-weight:600;"></span>
              </div>
            </div>
          </div>

          <!-- Classes Summary Table -->
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Class Code</th>
                  <th>Year</th>
                  <th>Branch</th>
                  <th>Division</th>
                  <th>Semester</th>
                  <th>Strength</th>
                  <th>Config Status</th>
                  <th style="text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody id="classes-table-body">
                ${classes.length === 0 ? `<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--text-muted);">No classes entered yet. Click "+ Add New Class" or load the sample dataset.</td></tr>` : ''}
              </tbody>
            </table>
          </div>

          <div style="margin-top:24px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:16px;">
            <button class="btn btn-secondary" onclick="window.App.ui.goToStep(1)">
              ◀ Back to Step 1
            </button>
            <button class="btn btn-primary btn-lg" id="btn-proceed-step3">
              Proceed to Class Selection (Step 3) ➔
            </button>
          </div>
        </div>
      `;

      this.populateClassesTable(classes, branchMap);

      // Event listeners
      const addBox = document.getElementById('add-class-box');
      const addToggleBtn = document.getElementById('btn-add-class-toggle');
      addToggleBtn.addEventListener('click', () => {
        addBox.style.display = addBox.style.display === 'none' ? 'block' : 'none';
        if (addBox.style.display === 'block') {
          document.getElementById('new-class-code').focus();
        }
      });

      document.getElementById('btn-cancel-add-class').addEventListener('click', () => {
        addBox.style.display = 'none';
      });

      // Live 4-digit code validator
      const codeInput = document.getElementById('new-class-code');
      const interpBox = document.getElementById('live-code-interpretation');
      const interpText = document.getElementById('interp-text');

      codeInput.addEventListener('input', () => {
        const val = codeInput.value.trim();
        if (val.length === 4) {
          const res = window.ClassParser.parse(val, branchMap);
          interpBox.style.display = 'block';
          if (res.isValid) {
            interpBox.style.borderColor = 'var(--success)';
            interpText.innerHTML = `✅ ${res.yearLabel} &bull; ${res.branch} (${res.branchFullName}) &bull; Division ${res.division} &bull; Semester ${res.semester}`;
          } else {
            interpBox.style.borderColor = 'var(--danger)';
            interpText.innerHTML = `⚠️ <span style="color:var(--danger);">${res.error}</span>`;
          }
        } else if (val.length > 0) {
          interpBox.style.display = 'block';
          interpBox.style.borderColor = 'var(--warning)';
          interpText.innerHTML = `Enter ${4 - val.length} more digit(s)...`;
        } else {
          interpBox.style.display = 'none';
        }
      });

      document.getElementById('btn-confirm-add-class').addEventListener('click', () => {
        this.handleAddClass(branchMap);
      });

      document.getElementById('btn-proceed-step3').addEventListener('click', () => {
        if (window.App.project.classes.length === 0) {
          alert('Please enter at least one class before proceeding.');
          return;
        }
        this.goToStep(3);
      });
    }

    populateClassesTable(classes, branchMap) {
      const tbody = document.getElementById('classes-table-body');
      if (!tbody || classes.length === 0) return;

      tbody.innerHTML = '';
      classes.forEach((c, idx) => {
        const cfg = (window.App.project.classConfigurations && window.App.project.classConfigurations[c.code]) || null;
        const isComplete = cfg && cfg.subjects && cfg.subjects.length > 0;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong style="font-size:15px; color:var(--primary);">${c.code}</strong></td>
          <td>${c.yearLabel || (c.year + 'th Year')}</td>
          <td><span class="badge badge-primary">${c.branch}</span></td>
          <td>Division ${c.division}</td>
          <td>Semester ${c.semester}</td>
          <td>${c.strength || '-'}</td>
          <td>
            ${isComplete
              ? `<span class="badge badge-success">✓ Configured (${cfg.subjects.length} subjects)</span>`
              : `<span class="badge badge-warning">○ Pending</span>`
            }
          </td>
          <td style="text-align:right;">
            <button class="btn btn-secondary btn-sm" onclick="window.App.ui.selectClassToConfigure('${c.code}')">Configure</button>
            <button class="btn btn-danger btn-sm" onclick="window.App.ui.deleteClass('${c.code}')">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    handleAddClass(branchMap) {
      const codeInput = document.getElementById('new-class-code');
      const strengthInput = document.getElementById('new-class-strength');
      const code = codeInput.value.trim();
      const strength = parseInt(strengthInput.value, 10) || null;

      const parsed = window.ClassParser.parse(code, branchMap);
      if (!parsed.isValid) {
        alert(parsed.error);
        codeInput.focus();
        return;
      }

      // Check duplicates
      const exists = window.App.project.classes.some(c => c.code === code);
      if (exists) {
        alert(`Class code ${code} is already added.`);
        codeInput.focus();
        return;
      }

      const classObj = {
        code: parsed.code,
        year: parsed.year,
        yearLabel: parsed.yearLabel,
        branchCode: parsed.branchCode,
        branch: parsed.branch,
        divisionCode: parsed.divisionCode,
        division: parsed.division,
        semester: parsed.semester,
        strength: strength,
        label: parsed.label,
        shortLabel: parsed.shortLabel
      };

      window.App.project.classes.push(classObj);
      codeInput.value = '';
      document.getElementById('add-class-box').style.display = 'none';
      this.updateStatusSummary();
      this.renderStep2ClassSummary(document.getElementById('step-content-area'));
    }

    deleteClass(classCode) {
      if (!confirm(`Are you sure you want to delete class ${classCode}? All its timetable configuration will be removed.`)) {
        return;
      }
      window.App.project.classes = window.App.project.classes.filter(c => c.code !== classCode);
      if (window.App.project.classConfigurations) {
        delete window.App.project.classConfigurations[classCode];
      }
      this.updateStatusSummary();
      this.renderStep2ClassSummary(document.getElementById('step-content-area'));
    }

    /* =========================================================================
       STEP 3: SELECT CLASS & MULTI-CLASS PROGRESS
       ========================================================================= */
    renderStep3ClassSelection(container) {
      const classes = window.App.project.classes || [];
      const classConfigs = window.App.project.classConfigurations || {};

      const totalClasses = classes.length;
      let completedCount = 0;
      classes.forEach(c => {
        const cfg = classConfigs[c.code];
        if (cfg && cfg.subjects && cfg.subjects.length > 0) completedCount++;
      });

      container.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Step 3: Select Class for Timetable Preparation</h2>
              <p>The application configures the timetable class by class. Complete all classes to generate the department schedule.</p>
            </div>
            <div>
              <span class="badge ${completedCount === totalClasses && totalClasses > 0 ? 'badge-success' : 'badge-warning'}" style="font-size:13px; padding:6px 12px;">
                Progress: ${completedCount} / ${totalClasses} Classes Configured
              </span>
            </div>
          </div>

          <div class="class-grid" id="class-cards-container">
            <!-- Cards rendered below -->
          </div>

          <div style="margin-top:24px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:16px;">
            <button class="btn btn-secondary" onclick="window.App.ui.goToStep(2)">
              ◀ Back to Classes (Step 2)
            </button>
            <button class="btn btn-primary btn-lg" id="btn-proceed-step5" ${completedCount < totalClasses ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
              Proceed to Generation Dashboard (Step 5) ➔
            </button>
          </div>
        </div>
      `;

      const grid = document.getElementById('class-cards-container');
      classes.forEach(c => {
        const cfg = classConfigs[c.code];
        const isComplete = cfg && cfg.subjects && cfg.subjects.length > 0;
        const subCount = isComplete ? cfg.subjects.length : 0;
        const totalHours = isComplete ? cfg.subjects.reduce((sum, s) => sum + (s.hours || 0), 0) : 0;

        const card = document.createElement('div');
        card.className = `class-card ${isComplete ? 'complete' : ''}`;
        card.innerHTML = `
          <div>
            <div class="class-card-header">
              <span class="class-card-code">${c.code}</span>
              <span class="badge ${isComplete ? 'badge-success' : 'badge-warning'}">
                ${isComplete ? '✓ Complete' : '○ Pending'}
              </span>
            </div>
            <div style="font-weight:600; font-size:14px; margin-bottom:4px;">
              ${c.yearLabel} &bull; ${c.branch}
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">
              Division ${c.division} &bull; Semester ${c.semester}
            </div>
            ${isComplete ? `
              <div style="font-size:12px; color:#15803d; background:#f0fdf4; padding:6px 8px; border-radius:4px;">
                ${subCount} subjects &bull; ${totalHours} hrs/week
              </div>
            ` : `
              <div style="font-size:12px; color:#b45309; background:#fffbeb; padding:6px 8px; border-radius:4px;">
                Requires subject & faculty setup
              </div>
            `}
          </div>
          <div style="margin-top:14px;">
            <button class="btn btn-primary btn-sm" style="width:100%;" onclick="window.App.ui.selectClassToConfigure('${c.code}')">
              ${isComplete ? 'Edit Configuration ⚙️' : 'Configure Class ➔'}
            </button>
          </div>
        `;
        grid.appendChild(card);
      });

      const proceedBtn = document.getElementById('btn-proceed-step5');
      if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
          if (completedCount < totalClasses) {
            alert(`Please configure all ${totalClasses} classes before generating the final department timetable.`);
            return;
          }
          this.goToStep(5);
        });
      }
    }

    selectClassToConfigure(classCode) {
      this.selectedClassCode = classCode;
      this.goToStep(4);
    }

    /* =========================================================================
       STEP 4: CLASS CONFIGURATION WIZARD
       - Subject selection with search & hours/type overrides
       - Laboratory continuous periods & lab name
       - Multi-faculty selection with search
       - Faculty department & availability matrix
       - Simultaneous courses
       - Free periods
       ========================================================================= */
    renderStep4ClassConfig(container) {
      const classCode = this.selectedClassCode;
      const classObj = window.App.project.classes.find(c => c.code === classCode);

      if (!classObj) {
        alert('Class not found. Returning to class selection.');
        this.goToStep(3);
        return;
      }

      const existingConfig = (window.App.project.classConfigurations && window.App.project.classConfigurations[classCode]) || {
        subjects: [],
        simultaneousGroups: []
      };

      container.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Step 4: Configure Class ${classObj.code} (${classObj.label})</h2>
              <p>Select subjects, assign hours, specify lab details, assign multiple faculty, and set other-department availability.</p>
            </div>
            <div>
              <button class="btn btn-secondary btn-sm" onclick="window.App.ui.goToStep(3)">
                ◀ Back to Class List
              </button>
            </div>
          </div>

          <!-- Quick Navigation Bar -->
          <div style="background:#f8fafc; border:1px solid var(--border); border-radius:var(--radius-md); padding:12px 16px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>Class:</strong> ${classObj.yearLabel} &bull; ${classObj.branch} &bull; Div ${classObj.division} &bull; Sem ${classObj.semester}
            </div>
            <div id="class-hour-counter" style="font-weight:700; color:var(--primary);">
              Total Hours: 0 / 40
            </div>
          </div>

          <!-- Section 1: Subject Master Picker with Search -->
          <div style="margin-bottom:24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3 style="font-size:15px; color:var(--secondary);">Select Subjects for Class ${classObj.code}</h3>
              <div style="display:flex; gap:10px; width:60%;">
                <input type="text" id="subj-search-input" placeholder="🔍 Search subjects by code, title, or category..." style="padding:8px 12px; font-size:13px;">
                <select id="subj-cat-filter" style="width:180px; padding:8px; font-size:13px;">
                  <option value="ALL">All Categories</option>
                  <option value="Main Course">Main Courses</option>
                  <option value="Lab">Laboratories</option>
                  <option value="Elective Course">Electives</option>
                  <option value="Honours Course">Honours</option>
                </select>
              </div>
            </div>

            <!-- Selected Subjects Configuration Container -->
            <div id="selected-subjects-container">
              <!-- Rendered items -->
            </div>

            <!-- Add Subject from Master Button -->
            <button class="btn btn-secondary btn-sm" id="btn-open-subject-picker-modal" style="margin-top:10px;">
              + Add / Browse Subjects from Master Catalog
            </button>
          </div>

          <!-- Section 2: Simultaneous Courses -->
          <div style="border-top:1px solid var(--border); padding-top:20px; margin-bottom:24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div>
                <h3 style="font-size:15px; color:var(--secondary);">Simultaneous Courses</h3>
                <p style="font-size:12px; color:var(--text-muted);">Can any elective courses or tracks occur simultaneously during the same period?</p>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-add-sim-group">+ Add Simultaneous Group</button>
            </div>
            <div id="sim-groups-container">
              <!-- Rendered simultaneous groups -->
            </div>
          </div>

          <!-- Section 3: Free Periods Entry -->
          <div style="border-top:1px solid var(--border); padding-top:20px; margin-bottom:24px;">
            <h3 style="font-size:15px; color:var(--secondary); margin-bottom:8px;">Free Periods</h3>
            <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">
              1st and 2nd year classes occupy all periods unless Free Periods are specified. 3rd and 4th years permit free periods automatically.
            </p>
            <div style="display:flex; align-items:center; gap:12px;">
              <label style="font-weight:600; font-size:13px;">Free Periods required per week:</label>
              <input type="number" id="input-free-periods" min="0" max="20" style="width:90px;" value="${this.getFreePeriodHours(existingConfig)}">
            </div>
          </div>

          <!-- Action Footer -->
          <div style="border-top:1px solid var(--border); padding-top:20px; display:flex; justify-content:space-between; align-items:center;">
            <button class="btn btn-secondary" onclick="window.App.ui.goToStep(3)">
              Cancel
            </button>
            <button class="btn btn-success btn-lg" id="btn-save-class-config">
              ✓ Save Class Timetable Configuration
            </button>
          </div>
        </div>

        <!-- Master Subject Picker Modal -->
        <div id="subject-picker-modal" class="modal-backdrop" style="display:none;">
          <div class="modal">
            <div class="modal-header">
              <h3>Browse & Select Subjects</h3>
              <button class="btn btn-secondary btn-sm" id="btn-close-subj-modal">✕</button>
            </div>
            <div class="modal-body">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                <label for="modal-subj-regulation" style="font-weight:600; font-size:13px; white-space:nowrap;">Regulation:</label>
                <select id="modal-subj-regulation" style="width:auto;">
                  <option value="2021">2021 Regulation</option>
                  <option value="2025">2025 Regulation</option>
                </select>
              </div>
              <input type="text" id="modal-subj-search" placeholder="Type to filter subjects..." style="margin-bottom:12px;">
              <div id="modal-subject-list" style="max-height:400px; overflow-y:auto;">
                <!-- List -->
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" id="btn-done-subj-modal">Done</button>
            </div>
          </div>
        </div>
      `;

      this.currentConfigState = JSON.parse(JSON.stringify(existingConfig));
      if (!this.currentConfigState.subjects) this.currentConfigState.subjects = [];
      if (!this.currentConfigState.simultaneousGroups) this.currentConfigState.simultaneousGroups = [];

      this.renderSelectedSubjectsList();
      this.renderSimultaneousGroupsList();

      // Setup Search in Master Picker Modal
      document.getElementById('btn-open-subject-picker-modal').addEventListener('click', () => {
        this.openSubjectPickerModal();
      });
      document.getElementById('btn-close-subj-modal').addEventListener('click', () => {
        document.getElementById('subject-picker-modal').style.display = 'none';
      });
      document.getElementById('btn-done-subj-modal').addEventListener('click', () => {
        document.getElementById('subject-picker-modal').style.display = 'none';
        this.renderSelectedSubjectsList();
      });

      // Quick filter
      document.getElementById('subj-search-input').addEventListener('input', (e) => {
        this.filterSelectedSubjects(e.target.value, document.getElementById('subj-cat-filter').value);
      });
      document.getElementById('subj-cat-filter').addEventListener('change', (e) => {
        this.filterSelectedSubjects(document.getElementById('subj-search-input').value, e.target.value);
      });

      document.getElementById('btn-add-sim-group').addEventListener('click', () => {
        this.addSimultaneousGroup();
      });

      document.getElementById('btn-save-class-config').addEventListener('click', () => {
        this.saveClassConfig(classCode);
      });

      document.getElementById('input-free-periods').addEventListener('input', () => {
        this.updateTotalHoursDisplay();
      });
    }

    getFreePeriodHours(cfg) {
      if (!cfg || !cfg.subjects) return 0;
      const free = cfg.subjects.find(s => s.code === 'FREE' || s.type === 'Free Period');
      return free ? (free.hours || 0) : 0;
    }

    renderSelectedSubjectsList() {
      const container = document.getElementById('selected-subjects-container');
      if (!container) return;

      const subjects = this.currentConfigState.subjects.filter(s => s.code !== 'FREE');
      if (subjects.length === 0) {
        container.innerHTML = `
          <div style="padding:24px; text-align:center; border:2px dashed var(--border); border-radius:var(--radius-md); color:var(--text-muted);">
            No subjects added yet. Click "+ Add / Browse Subjects from Master Catalog" above to select subjects for this class.
          </div>
        `;
        this.updateTotalHoursDisplay();
        return;
      }

      container.innerHTML = '';
      subjects.forEach((subj, idx) => {
        const row = document.createElement('div');
        row.className = 'subject-item-row';
        row.dataset.code = subj.code;

        const isLab = subj.type === 'Lab';

        row.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div>
              <strong style="font-size:14px; color:var(--primary);">${subj.code}</strong> &mdash;
              <span style="font-weight:600; font-size:14px;">${subj.name}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="window.App.ui.removeSubjectFromClass('${subj.code}')">✕ Remove</button>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; align-items:flex-end;">
            <!-- Weekly Hours -->
            <div class="form-group" style="margin-bottom:0;">
              <label style="font-size:12px;">Hours / Week</label>
              <input type="number" min="1" max="10" value="${subj.hours || 4}" class="subj-hours-input" data-code="${subj.code}" style="font-weight:700;">
            </div>

            <!-- Subject Type with class-level override -->
            <div class="form-group" style="margin-bottom:0;">
              <label style="font-size:12px;">Subject Type</label>
              <select class="subj-type-select" data-code="${subj.code}">
                <option value="Main Course" ${subj.type === 'Main Course' ? 'selected' : ''}>Main Course</option>
                <option value="Lab" ${subj.type === 'Lab' ? 'selected' : ''}>Lab</option>
                <option value="Elective Course" ${subj.type === 'Elective Course' ? 'selected' : ''}>Elective Course</option>
                <option value="Honours Course" ${subj.type === 'Honours Course' ? 'selected' : ''}>Honours Course</option>
              </select>
            </div>

            <!-- Lab Name (if Lab) -->
            <div class="form-group lab-field" style="margin-bottom:0; display:${isLab ? 'block' : 'none'};">
              <label style="font-size:12px;">Physical Lab Name</label>
              <input type="text" value="${subj.labName || subj.defaultLab || 'VLSI Lab'}" class="subj-labname-input" data-code="${subj.code}" placeholder="e.g. VLSI Lab">
            </div>

            <!-- Continuous Periods (if Lab) -->
            <div class="form-group lab-field" style="margin-bottom:0; display:${isLab ? 'block' : 'none'};">
              <label style="font-size:12px;">Continuous Periods</label>
              <input type="number" min="2" max="4" value="${subj.continuous || 3}" class="subj-continuous-input" data-code="${subj.code}">
            </div>
          </div>

          <!-- Multi-faculty selection -->
          <div style="margin-top:12px; border-top:1px dashed var(--border); padding-top:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label style="font-size:12px; font-weight:600;">Assigned Faculty (Multiple allowed):</label>
              <button class="btn btn-secondary btn-sm" onclick="window.App.ui.openFacultyAssignModal('${subj.code}')">+ Assign / Edit Faculty</button>
            </div>
            <div id="faculty-tags-${subj.code}" style="display:flex; flex-wrap:wrap; gap:6px;">
              ${(subj.faculty && subj.faculty.length > 0)
                ? subj.faculty.map(f => `<span class="badge badge-primary" style="font-size:12px; padding:4px 8px;">👤 ${f}</span>`).join('')
                : `<span style="font-size:12px; color:var(--danger);">⚠️ No faculty assigned yet</span>`
              }
            </div>
          </div>
        `;
        container.appendChild(row);
      });

      // Bind input events
      document.querySelectorAll('.subj-hours-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const code = e.target.dataset.code;
          const s = this.currentConfigState.subjects.find(sub => sub.code === code);
          if (s) s.hours = parseInt(e.target.value, 10) || 1;
          this.updateTotalHoursDisplay();
        });
      });

      document.querySelectorAll('.subj-type-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const code = e.target.dataset.code;
          const s = this.currentConfigState.subjects.find(sub => sub.code === code);
          if (s) {
            s.type = e.target.value;
            this.renderSelectedSubjectsList();
          }
        });
      });

      document.querySelectorAll('.subj-labname-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const code = e.target.dataset.code;
          const s = this.currentConfigState.subjects.find(sub => sub.code === code);
          if (s) s.labName = e.target.value.trim();
        });
      });

      document.querySelectorAll('.subj-continuous-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const code = e.target.dataset.code;
          const s = this.currentConfigState.subjects.find(sub => sub.code === code);
          if (s) s.continuous = parseInt(e.target.value, 10) || 3;
        });
      });

      this.updateTotalHoursDisplay();
    }

    openSubjectPickerModal() {
      const modal = document.getElementById('subject-picker-modal');
      const listContainer = document.getElementById('modal-subject-list');
      const searchInput = document.getElementById('modal-subj-search');
      if (!modal || !listContainer) return;

      modal.style.display = 'flex';
      searchInput.value = '';

      const allSubjects = window.App.subjectManager.getAll();
      const regulationSelect = document.getElementById('modal-subj-regulation');
      regulationSelect.value = this.subjectRegulation || '2021';

      const renderList = (filter) => {
        listContainer.innerHTML = '';
        const regulation = regulationSelect.value;
        const filtered = allSubjects.filter(s => {
          // Subjects added manually to the master list carry no regulation and show under both.
          if (s.regulation && s.regulation !== regulation) return false;
          if (!filter) return true;
          const f = filter.toLowerCase();
          return s.code.toLowerCase().includes(f) || s.name.toLowerCase().includes(f);
        });

        filtered.forEach(s => {
          const isSelected = this.currentConfigState.subjects.some(cs => cs.code === s.code);
          const div = document.createElement('div');
          div.style.padding = '8px 12px';
          div.style.borderBottom = '1px solid var(--border)';
          div.style.display = 'flex';
          div.style.justifyContent = 'space-between';
          div.style.alignItems = 'center';

          div.innerHTML = `
            <div>
              <strong style="color:var(--primary); font-size:13px;">${s.code}</strong> &mdash; ${s.name}
              <div style="font-size:11px; color:var(--text-muted);">${s.category || ''} &bull; Default: ${s.defaultType || 'Main Course'}</div>
            </div>
            <button class="btn btn-sm ${isSelected ? 'btn-danger' : 'btn-primary'}" data-code="${s.code}">
              ${isSelected ? 'Remove' : '+ Add'}
            </button>
          `;

          div.querySelector('button').addEventListener('click', (e) => {
            const code = e.target.dataset.code;
            if (isSelected) {
              this.currentConfigState.subjects = this.currentConfigState.subjects.filter(cs => cs.code !== code);
            } else {
              this.currentConfigState.subjects.push({
                code: s.code,
                name: s.name,
                type: s.defaultType || 'Main Course',
                hours: s.defaultType === 'Lab' ? 3 : 4,
                continuous: s.continuous || 3,
                labName: s.defaultLab || (s.defaultType === 'Lab' ? 'VLSI Lab' : null),
                faculty: []
              });
            }
            renderList(searchInput.value);
          });

          listContainer.appendChild(div);
        });
      };

      renderList('');
      searchInput.oninput = (e) => renderList(e.target.value);
      regulationSelect.onchange = () => {
        this.subjectRegulation = regulationSelect.value;
        renderList(searchInput.value);
      };
    }

    removeSubjectFromClass(code) {
      this.currentConfigState.subjects = this.currentConfigState.subjects.filter(s => s.code !== code);
      this.renderSelectedSubjectsList();
    }

    filterSelectedSubjects(query, cat) {
      const q = (query || '').toLowerCase().trim();
      document.querySelectorAll('.subject-item-row').forEach(row => {
        const text = row.innerText.toLowerCase();
        const matchesQ = !q || text.includes(q);
        const matchesCat = !cat || cat === 'ALL' || row.querySelector('.subj-type-select').value === cat;
        row.style.display = (matchesQ && matchesCat) ? 'block' : 'none';
      });
    }

    updateTotalHoursDisplay() {
      const counter = document.getElementById('class-hour-counter');
      if (!counter) return;

      const freeHours = parseInt(document.getElementById('input-free-periods') ? document.getElementById('input-free-periods').value : 0, 10) || 0;
      const subHours = this.currentConfigState.subjects
        .filter(s => s.code !== 'FREE')
        .reduce((sum, s) => sum + (s.hours || 0), 0);

      const total = subHours + freeHours;
      counter.innerText = `Total Hours: ${total} / 40`;
      if (total === 40) {
        counter.style.color = 'var(--success)';
      } else if (total > 40) {
        counter.style.color = 'var(--danger)';
      } else {
        counter.style.color = 'var(--primary)';
      }
    }

    /* Multi-faculty selection modal & availability matrix modal */
    openFacultyAssignModal(subjCode) {
      const subj = this.currentConfigState.subjects.find(s => s.code === subjCode);
      if (!subj) return;

      const allFaculty = window.App.facultyManager.getAll();
      const allDepts = window.App.facultyManager.getDepartments();

      let modal = document.getElementById('faculty-assign-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'faculty-assign-modal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
      }

      modal.style.display = 'flex';
      modal.innerHTML = `
        <div class="modal" style="max-width:800px;">
          <div class="modal-header">
            <h3>Assign Faculty: ${subj.name} (${subj.code})</h3>
            <button class="btn btn-secondary btn-sm" id="btn-close-fac-assign">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size:13px; color:var(--text-muted); margin-bottom:12px;">
              Select one or more faculty members. For each faculty member, specify whether they belong to the <strong>Same Department</strong> or <strong>Other Department</strong> (with restricted availability periods).
            </p>

            <div style="display:flex; gap:10px; margin-bottom:12px;">
              <input type="text" id="fac-modal-search" placeholder="🔍 Search faculty by name, specialization..." style="flex:1;">
              <select id="fac-modal-dept" style="width:160px;">
                <option value="ALL">All Departments</option>
                ${allDepts.map(d => `<option value="${d}">${d}</option>`).join('')}
              </select>
            </div>

            <div id="fac-modal-list" style="max-height:350px; overflow-y:auto; border:1px solid var(--border); border-radius:var(--radius-md); padding:10px;">
              <!-- Faculty checkboxes -->
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" id="btn-save-fac-assign">Done</button>
          </div>
        </div>
      `;

      let assignedFaculty = Array.isArray(subj.faculty) ? [...subj.faculty] : [];

      const renderFacList = (query, dept) => {
        const listDiv = document.getElementById('fac-modal-list');
        listDiv.innerHTML = '';
        const q = (query || '').toLowerCase().trim();

        const filtered = allFaculty.filter(f => {
          const mQ = !q || f.name.toLowerCase().includes(q) || (f.specialization && f.specialization.toLowerCase().includes(q));
          const mD = !dept || dept === 'ALL' || f.department === dept;
          return mQ && mD;
        });

        filtered.forEach(fac => {
          const isChecked = assignedFaculty.includes(fac.name);
          const avail = window.App.facultyManager.getAvailability(fac.name);
          const isOtherDept = avail ? avail.isOtherDept : (fac.department !== 'ECE' && fac.department !== 'VLSI');

          const div = document.createElement('div');
          div.style.padding = '8px 10px';
          div.style.borderBottom = '1px solid var(--border)';
          div.style.display = 'flex';
          div.style.justifyContent = 'space-between';
          div.style.alignItems = 'center';

          div.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
              <input type="checkbox" id="chk-fac-${fac.id}" class="fac-chk" value="${fac.name}" ${isChecked ? 'checked' : ''} style="width:18px; height:18px;">
              <div>
                <label for="chk-fac-${fac.id}" style="font-weight:600; cursor:pointer; font-size:13px;">${fac.name}</label>
                <div style="font-size:11px; color:var(--text-muted);">${fac.department} &bull; ${fac.designation || ''} ${fac.specialization ? '&bull; ' + fac.specialization : ''}</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="badge ${isOtherDept ? 'badge-warning' : 'badge-primary'}">${isOtherDept ? 'Other Dept' : 'Same Dept'}</span>
              <button class="btn btn-secondary btn-sm" onclick="window.App.ui.openAvailabilityMatrixModal('${fac.name}', '${fac.department}')">
                🗓️ Availability
              </button>
            </div>
          `;

          div.querySelector('.fac-chk').addEventListener('change', (e) => {
            if (e.target.checked) {
              if (!assignedFaculty.includes(fac.name)) assignedFaculty.push(fac.name);
            } else {
              assignedFaculty = assignedFaculty.filter(n => n !== fac.name);
            }
          });

          listDiv.appendChild(div);
        });
      };

      renderFacList('', 'ALL');

      document.getElementById('fac-modal-search').addEventListener('input', (e) => {
        renderFacList(e.target.value, document.getElementById('fac-modal-dept').value);
      });
      document.getElementById('fac-modal-dept').addEventListener('change', (e) => {
        renderFacList(document.getElementById('fac-modal-search').value, e.target.value);
      });

      document.getElementById('btn-close-fac-assign').addEventListener('click', () => {
        modal.style.display = 'none';
      });

      document.getElementById('btn-save-fac-assign').addEventListener('click', () => {
        subj.faculty = assignedFaculty;
        modal.style.display = 'none';
        this.renderSelectedSubjectsList();
      });
    }

    /**
     * Interactive Availability Matrix for Other-Department (and customizable same-dept) faculty.
     */
    openAvailabilityMatrixModal(facultyName, department) {
      let modal = document.getElementById('faculty-avail-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'faculty-avail-modal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
      }

      const existingAvail = window.App.facultyManager.getAvailability(facultyName) || {
        department: department,
        isOtherDept: department !== 'ECE' && department !== 'VLSI',
        availableSlots: {
          Monday: [1, 2, 3, 4, 5, 6, 7, 8],
          Tuesday: [1, 2, 3, 4, 5, 6, 7, 8],
          Wednesday: [1, 2, 3, 4, 5, 6, 7, 8],
          Thursday: [1, 2, 3, 4, 5, 6, 7, 8],
          Friday: [1, 2, 3, 4, 5, 6, 7, 8]
        }
      };

      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

      modal.style.display = 'flex';
      modal.innerHTML = `
        <div class="modal" style="max-width:700px;">
          <div class="modal-header">
            <h3>Faculty Availability Matrix: ${facultyName} (${department})</h3>
            <button class="btn btn-secondary btn-sm" id="btn-close-avail-modal">✕</button>
          </div>
          <div class="modal-body">
            <div style="margin-bottom:14px; display:flex; align-items:center; gap:16px;">
              <label style="font-weight:600; font-size:13px;">Faculty Classification:</label>
              <label style="cursor:pointer; display:flex; align-items:center; gap:6px;">
                <input type="radio" name="dept-class" id="rad-same-dept" ${!existingAvail.isOtherDept ? 'checked' : ''}>
                Same Department Faculty
              </label>
              <label style="cursor:pointer; display:flex; align-items:center; gap:6px;">
                <input type="radio" name="dept-class" id="rad-other-dept" ${existingAvail.isOtherDept ? 'checked' : ''}>
                Other Department Faculty
              </label>
            </div>

            <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">
              Check the periods during which this faculty member is <strong>AVAILABLE</strong> to teach in this department. The generator will NEVER schedule outside checked periods.
            </p>

            <table class="avail-table">
              <thead>
                <tr>
                  <th>Day</th>
                  ${Array.from({ length: 8 }, (_, i) => `<th>P${i + 1}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${days.map(d => `
                  <tr>
                    <td style="font-weight:600;">${d}</td>
                    ${Array.from({ length: 8 }, (_, i) => {
                      const p = i + 1;
                      const isAvail = existingAvail.availableSlots[d] && existingAvail.availableSlots[d].includes(p);
                      return `
                        <td>
                          <input type="checkbox" class="slot-avail-chk" data-day="${d}" data-period="${p}" ${isAvail ? 'checked' : ''}>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="btn-select-all-avail">Select All</button>
            <button class="btn btn-secondary" id="btn-clear-all-avail">Clear All</button>
            <button class="btn btn-primary" id="btn-save-avail">Save Availability</button>
          </div>
        </div>
      `;

      document.getElementById('btn-close-avail-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });

      document.getElementById('btn-select-all-avail').addEventListener('click', () => {
        document.querySelectorAll('.slot-avail-chk').forEach(c => c.checked = true);
      });

      document.getElementById('btn-clear-all-avail').addEventListener('click', () => {
        document.querySelectorAll('.slot-avail-chk').forEach(c => c.checked = false);
      });

      document.getElementById('btn-save-avail').addEventListener('click', () => {
        const isOther = document.getElementById('rad-other-dept').checked;
        const slots = {};
        days.forEach(d => slots[d] = []);

        document.querySelectorAll('.slot-avail-chk').forEach(chk => {
          if (chk.checked) {
            const day = chk.dataset.day;
            const p = parseInt(chk.dataset.period, 10);
            slots[day].push(p);
          }
        });

        window.App.facultyManager.setAvailability(facultyName, {
          department: department,
          isOtherDept: isOther,
          availableSlots: slots
        });

        modal.style.display = 'none';
      });
    }

    renderSimultaneousGroupsList() {
      const container = document.getElementById('sim-groups-container');
      if (!container) return;

      const groups = this.currentConfigState.simultaneousGroups || [];
      if (groups.length === 0) {
        container.innerHTML = `
          <div style="font-size:12px; color:var(--text-muted); font-style:italic;">
            No simultaneous course groups defined for this class. Click "+ Add Simultaneous Group" if certain courses share the same slot.
          </div>
        `;
        return;
      }

      container.innerHTML = '';
      groups.forEach((g, idx) => {
        const div = document.createElement('div');
        div.style.background = '#f8fafc';
        div.style.border = '1px solid var(--border)';
        div.style.borderRadius = 'var(--radius-sm)';
        div.style.padding = '10px 14px';
        div.style.marginBottom = '10px';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';

        div.innerHTML = `
          <div>
            <strong>${g.name || `Simultaneous Group ${idx + 1}`}:</strong>
            <span style="font-size:13px; color:var(--primary); margin-left:8px;">${(g.subjects || []).join(' &bull; ')}</span>
          </div>
          <button class="btn btn-danger btn-sm" onclick="window.App.ui.removeSimultaneousGroup(${idx})">✕ Delete</button>
        `;
        container.appendChild(div);
      });
    }

    addSimultaneousGroup() {
      const availableSubjs = this.currentConfigState.subjects.filter(s => s.code !== 'FREE');
      if (availableSubjs.length < 2) {
        alert('Please add at least 2 subjects to this class before creating a simultaneous group.');
        return;
      }

      const selectedCodes = prompt('Enter subject codes to group simultaneously (separated by comma):\nE.g.: ' + availableSubjs.slice(0, 2).map(s => s.code).join(', '));
      if (!selectedCodes) return;

      const codes = selectedCodes.split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
      if (codes.length < 2) {
        alert('A simultaneous group must contain at least 2 subjects.');
        return;
      }

      this.currentConfigState.simultaneousGroups.push({
        id: `SIM_${Date.now()}`,
        name: 'Elective Pool',
        subjects: codes
      });
      this.renderSimultaneousGroupsList();
    }

    removeSimultaneousGroup(idx) {
      this.currentConfigState.simultaneousGroups.splice(idx, 1);
      this.renderSimultaneousGroupsList();
    }

    saveClassConfig(classCode) {
      // Validate
      const freeHours = parseInt(document.getElementById('input-free-periods').value, 10) || 0;
      const subjects = [...this.currentConfigState.subjects.filter(s => s.code !== 'FREE')];

      // Verify each subject has faculty
      const missingFac = subjects.filter(s => !s.faculty || s.faculty.length === 0);
      if (missingFac.length > 0) {
        alert(`Missing faculty assignment for subject(s): ${missingFac.map(m => m.name).join(', ')}. Please assign at least one faculty per subject.`);
        return;
      }

      // Verify hours > 0
      const invalidHours = subjects.filter(s => !s.hours || s.hours <= 0);
      if (invalidHours.length > 0) {
        alert(`Subject weekly hours must be > 0.`);
        return;
      }

      // Add Free Period entry if configured
      if (freeHours > 0) {
        subjects.push({
          code: 'FREE',
          name: 'Free Period',
          type: 'Free Period',
          hours: freeHours,
          faculty: []
        });
      }

      const totalHours = subjects.reduce((sum, s) => sum + (s.hours || 0), 0);
      if (totalHours > 40) {
        alert(`Total hours configured (${totalHours}) exceeds weekly slots (40). Please adjust weekly hours.`);
        return;
      }

      if (!window.App.project.classConfigurations) {
        window.App.project.classConfigurations = {};
      }

      window.App.project.classConfigurations[classCode] = {
        subjects: subjects,
        simultaneousGroups: this.currentConfigState.simultaneousGroups || []
      };

      this.updateStatusSummary();
      alert(`Configuration saved successfully for Class ${classCode}! Returning to class selection.`);
      this.goToStep(3);
    }

    /* =========================================================================
       STEP 5: GENERATION DASHBOARD & RESULTS
       ========================================================================= */
    renderStep5GenerationDashboard(container) {
      const isGenerated = this.lastGeneratedResult && this.lastGeneratedResult.success;

      container.innerHTML = `
        <div class="card no-print">
          <div class="card-header">
            <div>
              <h2>Step 5: Timetable Generation & Results Dashboard</h2>
              <p>Run the constraint-based scheduling engine, review quality metrics, and inspect timetables by Class, Faculty, Classroom, and Laboratory.</p>
            </div>
            <div style="display:flex; gap:10px;">
              <button class="btn btn-primary btn-lg" id="btn-generate-timetable">
                🚀 Generate Department Timetable
              </button>
            </div>
          </div>

          <!-- Status Card -->
          <div id="gen-status-container">
            ${this.renderGenerationStatusCard()}
          </div>
        </div>

        <!-- Output Views Area (Visible when generated) -->
        <div id="timetable-views-container">
          ${isGenerated ? this.renderTimetableViewArea() : ''}
        </div>
      `;

      document.getElementById('btn-generate-timetable').addEventListener('click', () => {
        this.runGeneration();
      });
    }

    renderGenerationStatusCard() {
      const classes = window.App.project.classes || [];
      const classConfigs = window.App.project.classConfigurations || {};
      const totalClasses = classes.length;
      let completedCount = 0;
      classes.forEach(c => {
        if (classConfigs[c.code] && classConfigs[c.code].subjects && classConfigs[c.code].subjects.length > 0) {
          completedCount++;
        }
      });

      const isReady = completedCount === totalClasses && totalClasses > 0;

      if (!this.lastGeneratedResult) {
        return `
          <div class="callout ${isReady ? 'callout-info' : 'callout-warning'}">
            <span class="callout-icon">${isReady ? '✅' : '⚠️'}</span>
            <div>
              <strong>Department Configuration Status:</strong>
              Classes: ${completedCount} / ${totalClasses} configured &bull; Classrooms: ${(window.App.project.departmentConfig && window.App.project.departmentConfig.classrooms.length) || 0}
              <div style="margin-top:4px; font-size:12px;">
                ${isReady ? 'All classes are fully configured. Ready to run automatic timetable generator!' : `${totalClasses - completedCount} class(es) still require configuration.`}
              </div>
            </div>
          </div>
        `;
      }

      const res = this.lastGeneratedResult;
      if (res.success) {
        return `
          <div class="callout callout-success" style="background:#ecfdf5; border-color:#a7f3d0;">
            <span class="callout-icon">🎉</span>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="font-size:15px; color:#065f46;">TIMETABLE GENERATED SUCCESSFULLY &mdash; VALID TIMETABLE</strong>
                <span class="badge badge-success" style="font-size:13px;">Quality Score: ${res.qualityScore} / 100</span>
              </div>
              <div style="margin-top:8px; display:flex; flex-wrap:wrap; gap:16px; font-size:13px; color:#047857;">
                <span>✓ Classes: ${classes.length}</span>
                <span>✓ Classrooms: ${res.roomSchedules ? Object.keys(res.roomSchedules).length : 6}</span>
                <span>✓ Faculty: ${res.facultySchedules ? Object.keys(res.facultySchedules).length : 0}</span>
                <span>✓ Laboratories: ${res.labSchedules ? Object.keys(res.labSchedules).length : 0}</span>
                <span>✓ Faculty Conflicts: 0</span>
                <span>✓ Classroom Conflicts: 0</span>
                <span>✓ Lab Conflicts: 0</span>
                <span>✓ Availability Violations: 0</span>
              </div>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="callout callout-danger">
            <span class="callout-icon">❌</span>
            <div>
              <strong style="font-size:15px;">NO VALID TIMETABLE FOUND</strong>
              <p style="margin-top:4px;">The scheduler could not fulfill all hard constraints with the current settings.</p>
              <ul style="margin-top:6px; margin-left:20px; font-size:13px;">
                ${(res.errors || []).map(e => `<li>${e}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      }
    }

    runGeneration() {
      const statusDiv = document.getElementById('gen-status-container');
      if (statusDiv) {
        statusDiv.innerHTML = `
          <div class="callout callout-info">
            <span class="callout-icon">⏳</span>
            <div>Generating timetables and validating constraints...</div>
          </div>
        `;
      }

      setTimeout(() => {
        const engine = new window.TimetableEngine(
          window.App.project,
          window.App.subjectManager,
          window.App.facultyManager
        );

        const result = engine.generate();
        this.lastGeneratedResult = result;

        if (result.success) {
          window.App.project.existingSchedules = result.classSchedules;
        }

        this.renderStep5GenerationDashboard(document.getElementById('step-content-area'));
      }, 100);
    }

    renderTimetableViewArea() {
      const res = this.lastGeneratedResult;
      if (!res || !res.success) return '';

      const classes = window.App.project.classes || [];
      const faculties = Object.keys(res.facultySchedules).sort();
      const rooms = Object.keys(res.roomSchedules).sort();
      const labs = Object.keys(res.labSchedules).sort();

      if (!this.selectedViewEntity) {
        this.selectedViewEntity = classes[0] ? classes[0].code : null;
      }

      return `
        <div class="card" id="print-area">
          <!-- Print Only Header -->
          <div class="print-header">
            <h2>PSG INSTITUTE OF TECHNOLOGY AND APPLIED RESEARCH</h2>
            <h3>DEPARTMENT OF ELECTRONICS AND COMMUNICATION ENGINEERING</h3>
            <p id="print-header-sub">Academic Year: 2026-2027</p>
          </div>

          <!-- Tab Selector -->
          <div class="no-print" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:12px; margin-bottom:16px;">
            <div style="display:flex; gap:6px;">
              <button class="btn ${this.selectedViewType === 'class' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="window.App.ui.switchViewType('class')">
                📚 Class Timetables
              </button>
              <button class="btn ${this.selectedViewType === 'faculty' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="window.App.ui.switchViewType('faculty')">
                👨‍🏫 Faculty Timetables
              </button>
              <button class="btn ${this.selectedViewType === 'room' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="window.App.ui.switchViewType('room')">
                🏛️ Classroom Timetables
              </button>
              <button class="btn ${this.selectedViewType === 'lab' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="window.App.ui.switchViewType('lab')">
                🔬 Laboratory Timetables
              </button>
            </div>

            <!-- Export & Print Actions -->
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" id="btn-export-csv">
                📥 Export CSV
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-print-timetable">
                🖨️ Print (A4 Landscape)
              </button>
            </div>
          </div>

          <!-- Entity Sub-Selector (Dropdown + Prev/Next) -->
          <div class="no-print" style="display:flex; align-items:center; justify-content:space-between; background:#f8fafc; padding:10px 14px; border-radius:var(--radius-sm); margin-bottom:16px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <label style="font-weight:700; font-size:13px;" id="entity-selector-label">Select Entity:</label>
              <select id="entity-selector-dropdown" style="width:280px; font-weight:600;">
                ${this.renderEntityDropdownOptions(classes, faculties, rooms, labs)}
              </select>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-secondary btn-sm" id="btn-prev-entity">◀ Previous</button>
              <button class="btn btn-secondary btn-sm" id="btn-next-entity">Next ▶</button>
            </div>
          </div>

          <!-- Manual Edit Instruction Callout -->
          ${this.selectedViewType === 'class' ? `
            <div class="callout callout-info no-print" style="padding:10px 14px; margin-bottom:14px;">
              <span class="callout-icon">💡</span>
              <div style="font-size:12px;">
                <strong>Interactive Manual Editing:</strong> Click any cell to select it, then click another cell to move/swap. The system automatically validates faculty collisions, room conflicts, and lunch rules before moving! Click 🔒 to lock a slot.
              </div>
            </div>
          ` : ''}

          <!-- Grid Display -->
          <div class="table-responsive" id="matrix-display-container">
            ${this.renderActiveGridMatrix()}
          </div>
        </div>
      `;
    }

    renderEntityDropdownOptions(classes, faculties, rooms, labs) {
      if (this.selectedViewType === 'class') {
        return classes.map(c => `
          <option value="${c.code}" ${this.selectedViewEntity === c.code ? 'selected' : ''}>
            ${c.code} &mdash; ${c.label}
          </option>
        `).join('');
      } else if (this.selectedViewType === 'faculty') {
        return faculties.map(f => `
          <option value="${f}" ${this.selectedViewEntity === f ? 'selected' : ''}>
            ${f}
          </option>
        `).join('');
      } else if (this.selectedViewType === 'room') {
        return rooms.map(r => `
          <option value="${r}" ${this.selectedViewEntity === r ? 'selected' : ''}>
            Room ${r}
          </option>
        `).join('');
      } else if (this.selectedViewType === 'lab') {
        return labs.map(l => `
          <option value="${l}" ${this.selectedViewEntity === l ? 'selected' : ''}>
            ${l}
          </option>
        `).join('');
      }
      return '';
    }

    switchViewType(type) {
      this.selectedViewType = type;
      const res = this.lastGeneratedResult;
      if (type === 'class') {
        this.selectedViewEntity = window.App.project.classes[0] ? window.App.project.classes[0].code : null;
      } else if (type === 'faculty') {
        const facs = Object.keys(res.facultySchedules).sort();
        this.selectedViewEntity = facs[0] || null;
      } else if (type === 'room') {
        const rms = Object.keys(res.roomSchedules).sort();
        this.selectedViewEntity = rms[0] || null;
      } else if (type === 'lab') {
        const lbs = Object.keys(res.labSchedules).sort();
        this.selectedViewEntity = lbs[0] || null;
      }

      this.renderStep5GenerationDashboard(document.getElementById('step-content-area'));
      this.bindTimetableGridEvents();
    }

    renderActiveGridMatrix() {
      if (this.selectedViewType === 'class') {
        return this.renderClassGrid(this.selectedViewEntity);
      } else if (this.selectedViewType === 'faculty') {
        return this.renderFacultyGrid(this.selectedViewEntity);
      } else if (this.selectedViewType === 'room') {
        return this.renderRoomGrid(this.selectedViewEntity);
      } else if (this.selectedViewType === 'lab') {
        return this.renderLabGrid(this.selectedViewEntity);
      }
      return '';
    }

    renderClassGrid(classCode) {
      const res = this.lastGeneratedResult;
      const sched = res.classSchedules[classCode];
      if (!sched) return `<p>No schedule found for Class ${classCode}.</p>`;

      const days = window.App.project.metadata.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

      return `
        <table class="timetable-grid-table">
          <thead>
            <tr>
              <th class="col-day">DAY</th>
              <th>Period 1<br><small>8:45-9:45</small></th>
              <th>Period 2<br><small>9:45-10:45</small></th>
              <th class="col-break">BREAK<br><small>10:45-11:00</small></th>
              <th>Period 3<br><small>11:00-12:00</small></th>
              <th>Period 4<br><small>12:00-1:00</small></th>
              <th class="col-lunch">LUNCH<br><small>1:00-1:45</small></th>
              <th>Period 5<br><small>1:45-2:45</small></th>
              <th>Period 6<br><small>2:45-3:45</small></th>
              <th class="col-break">BREAK<br><small>3:45-4:00</small></th>
              <th>Period 7<br><small>4:00-4:45</small></th>
              <th>Period 8<br><small>4:45-5:30</small></th>
            </tr>
          </thead>
          <tbody>
            ${days.map(day => `
              <tr>
                <td class="day-cell">${day}</td>
                ${this.renderClassSlotCell(classCode, day, 1, sched[day][1])}
                ${this.renderClassSlotCell(classCode, day, 2, sched[day][2])}
                <td class="interval-cell">TEA</td>
                ${this.renderClassSlotCell(classCode, day, 3, sched[day][3])}
                ${this.renderClassSlotCell(classCode, day, 4, sched[day][4])}
                <td class="interval-cell">LUNCH</td>
                ${this.renderClassSlotCell(classCode, day, 5, sched[day][5])}
                ${this.renderClassSlotCell(classCode, day, 6, sched[day][6])}
                <td class="interval-cell">TEA</td>
                ${this.renderClassSlotCell(classCode, day, 7, sched[day][7])}
                ${this.renderClassSlotCell(classCode, day, 8, sched[day][8])}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    renderClassSlotCell(classCode, day, period, slot) {
      const isSelected = this.swapSourceSlot &&
        this.swapSourceSlot.classCode === classCode &&
        this.swapSourceSlot.day === day &&
        this.swapSourceSlot.period === period;

      if (!slot || slot.subjectCode === 'FREE') {
        return `
          <td data-class="${classCode}" data-day="${day}" data-period="${period}" class="slot-td" onclick="window.App.ui.handleSlotClick('${classCode}', '${day}', ${period})">
            <div class="slot-card is-free ${isSelected ? 'selected-for-swap' : ''}">
              <span style="font-size:11px;">Free Period</span>
            </div>
          </td>
        `;
      }

      let typeClass = 'is-main';
      if (slot.isLab) typeClass = 'is-lab';
      else if (slot.subjectType === 'Elective Course') typeClass = 'is-elective';
      else if (slot.subjectType === 'Honours Course') typeClass = 'is-honours';

      const facultyNames = (slot.faculty || []).join(', ');
      const roomClass = slot.room === 'Peer Learning Hall' ? 'plh-room' : '';

      return `
        <td data-class="${classCode}" data-day="${day}" data-period="${period}" class="slot-td" onclick="window.App.ui.handleSlotClick('${classCode}', '${day}', ${period})">
          <div class="slot-card ${typeClass} ${slot.isLocked ? 'is-locked' : ''} ${isSelected ? 'selected-for-swap' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div class="slot-subject">${slot.subjectName}</div>
              <button class="btn btn-sm no-print" style="padding:2px 4px; font-size:10px; background:none; border:none;" onclick="event.stopPropagation(); window.App.ui.toggleLockSlot('${classCode}', '${day}', ${period})">
                ${slot.isLocked ? '🔒' : '🔓'}
              </button>
            </div>
            <div class="slot-faculty">👤 ${facultyNames || 'Unassigned'}</div>
            <div class="slot-room ${roomClass}">
              <span>${slot.isLab ? '🔬 ' + (slot.labName || slot.room) : '🏛️ ' + (slot.room || '-')}</span>
              <span style="font-size:10px; opacity:0.8;">P${period}</span>
            </div>
          </div>
        </td>
      `;
    }

    renderFacultyGrid(facultyName) {
      const res = this.lastGeneratedResult;
      const sched = res.facultySchedules[facultyName] || {};
      const days = window.App.project.metadata.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

      return `
        <table class="timetable-grid-table">
          <thead>
            <tr>
              <th class="col-day">DAY</th>
              ${Array.from({ length: 8 }, (_, i) => `<th>Period ${i + 1}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${days.map(day => `
              <tr>
                <td class="day-cell">${day}</td>
                ${Array.from({ length: 8 }, (_, i) => {
                  const p = i + 1;
                  const slot = sched[day] && sched[day][p];
                  if (!slot) {
                    return `<td><div class="slot-card is-free"><span style="font-size:11px;">Free</span></div></td>`;
                  }
                  return `
                    <td>
                      <div class="slot-card ${slot.isLab ? 'is-lab' : 'is-main'}">
                        <div class="slot-subject" style="color:var(--primary); font-size:13px;">Class ${slot.classCode}</div>
                        <div style="font-weight:600; font-size:11px;">${slot.subjectName}</div>
                        <div class="slot-room" style="color:#b45309;">
                          <span>📍 ${slot.isLab ? 'Lab: ' + slot.room : 'Room: ' + (slot.room || '-')}</span>
                        </div>
                      </div>
                    </td>
                  `;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    renderRoomGrid(roomName) {
      const res = this.lastGeneratedResult;
      const sched = res.roomSchedules[roomName] || {};
      const days = window.App.project.metadata.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

      return `
        <table class="timetable-grid-table">
          <thead>
            <tr>
              <th class="col-day">DAY</th>
              ${Array.from({ length: 8 }, (_, i) => `<th>Period ${i + 1}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${days.map(day => `
              <tr>
                <td class="day-cell">${day}</td>
                ${Array.from({ length: 8 }, (_, i) => {
                  const p = i + 1;
                  const slot = sched[day] && sched[day][p];
                  if (!slot) {
                    return `<td><div class="slot-card is-free"><span style="font-size:11px;">Available</span></div></td>`;
                  }
                  return `
                    <td>
                      <div class="slot-card is-main">
                        <div class="slot-subject" style="color:var(--primary); font-size:13px;">Class ${slot.classCode}</div>
                        <div style="font-size:11px; font-weight:600;">${slot.subjectName}</div>
                        <div class="slot-faculty">👤 ${(slot.faculty || []).join(', ')}</div>
                      </div>
                    </td>
                  `;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    renderLabGrid(labName) {
      const res = this.lastGeneratedResult;
      const sched = res.labSchedules[labName] || {};
      const days = window.App.project.metadata.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

      return `
        <table class="timetable-grid-table">
          <thead>
            <tr>
              <th class="col-day">DAY</th>
              ${Array.from({ length: 8 }, (_, i) => `<th>Period ${i + 1}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${days.map(day => `
              <tr>
                <td class="day-cell">${day}</td>
                ${Array.from({ length: 8 }, (_, i) => {
                  const p = i + 1;
                  const slot = sched[day] && sched[day][p];
                  if (!slot) {
                    return `<td><div class="slot-card is-free"><span style="font-size:11px;">Available</span></div></td>`;
                  }
                  return `
                    <td>
                      <div class="slot-card is-lab">
                        <div class="slot-subject" style="color:#c026d3; font-size:13px;">Class ${slot.classCode}</div>
                        <div style="font-size:11px; font-weight:600;">${slot.subjectName}</div>
                        <div class="slot-faculty">👤 ${(slot.faculty || []).join(', ')}</div>
                      </div>
                    </td>
                  `;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    bindTimetableGridEvents() {
      const dropdown = document.getElementById('entity-selector-dropdown');
      if (dropdown) {
        dropdown.addEventListener('change', (e) => {
          this.selectedViewEntity = e.target.value;
          const container = document.getElementById('matrix-display-container');
          if (container) container.innerHTML = this.renderActiveGridMatrix();
        });
      }

      const prevBtn = document.getElementById('btn-prev-entity');
      const nextBtn = document.getElementById('btn-next-entity');
      if (dropdown && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          if (dropdown.selectedIndex > 0) {
            dropdown.selectedIndex--;
            dropdown.dispatchEvent(new Event('change'));
          }
        });
        nextBtn.addEventListener('click', () => {
          if (dropdown.selectedIndex < dropdown.options.length - 1) {
            dropdown.selectedIndex++;
            dropdown.dispatchEvent(new Event('change'));
          }
        });
      }

      const csvBtn = document.getElementById('btn-export-csv');
      if (csvBtn) {
        csvBtn.addEventListener('click', () => {
          this.handleCsvExport();
        });
      }

      const printBtn = document.getElementById('btn-print-timetable');
      if (printBtn) {
        printBtn.addEventListener('click', () => {
          window.ExportManager.printCurrentTimetable();
        });
      }
    }

    handleCsvExport() {
      const res = this.lastGeneratedResult;
      if (!res || !res.success) return;

      const workingDays = window.App.project.metadata.workingDays;
      const periodsPerDay = window.App.project.metadata.periodsPerDay;

      if (this.selectedViewType === 'class') {
        const cls = window.App.project.classes.find(c => c.code === this.selectedViewEntity);
        window.ExportManager.exportClassTimetableCsv(
          this.selectedViewEntity,
          res.classSchedules[this.selectedViewEntity],
          workingDays,
          periodsPerDay,
          cls
        );
      } else if (this.selectedViewType === 'faculty') {
        const fac = window.App.facultyManager.getByName(this.selectedViewEntity);
        window.ExportManager.exportFacultyTimetableCsv(
          this.selectedViewEntity,
          res.facultySchedules[this.selectedViewEntity],
          workingDays,
          periodsPerDay,
          fac ? fac.department : ''
        );
      } else if (this.selectedViewType === 'room') {
        window.ExportManager.exportRoomTimetableCsv(
          this.selectedViewEntity,
          res.roomSchedules[this.selectedViewEntity],
          workingDays,
          periodsPerDay
        );
      } else if (this.selectedViewType === 'lab') {
        window.ExportManager.exportLabTimetableCsv(
          this.selectedViewEntity,
          res.labSchedules[this.selectedViewEntity],
          workingDays,
          periodsPerDay
        );
      }
    }

    /**
     * Manual Interactive Drag/Click-to-Swap with real-time constraint validation.
     */
    handleSlotClick(classCode, day, period) {
      if (this.selectedViewType !== 'class') return;

      if (!this.swapSourceSlot) {
        // Select source slot
        this.swapSourceSlot = { classCode, day, period };
        const container = document.getElementById('matrix-display-container');
        if (container) container.innerHTML = this.renderActiveGridMatrix();
      } else {
        // Destination slot clicked
        const src = this.swapSourceSlot;
        this.swapSourceSlot = null;

        if (src.classCode === classCode && src.day === day && src.period === period) {
          // Deselected
          const container = document.getElementById('matrix-display-container');
          if (container) container.innerHTML = this.renderActiveGridMatrix();
          return;
        }

        // Attempt move/swap
        this.executeManualSlotSwap(src.classCode, src.day, src.period, day, period);
      }
    }

    executeManualSlotSwap(classCode, day1, period1, day2, period2) {
      const res = this.lastGeneratedResult;
      if (!res || !res.classSchedules[classCode]) return;

      const sched = res.classSchedules[classCode];
      const slot1 = sched[day1][period1];
      const slot2 = sched[day2][period2];

      if ((slot1 && slot1.isLocked) || (slot2 && slot2.isLocked)) {
        alert('Cannot move locked slots. Please unlock the slot first.');
        const container = document.getElementById('matrix-display-container');
        if (container) container.innerHTML = this.renderActiveGridMatrix();
        return;
      }

      // Test swap in clone and run validator
      const clonedResult = JSON.parse(JSON.stringify(res));
      clonedResult.classSchedules[classCode][day1][period1] = slot2 ? { ...slot2 } : null;
      clonedResult.classSchedules[classCode][day2][period2] = slot1 ? { ...slot1 } : null;

      // Re-validate
      const testValidation = window.Validator.validateAll({
        classSchedules: clonedResult.classSchedules,
        facultySchedules: clonedResult.facultySchedules,
        roomSchedules: clonedResult.roomSchedules,
        labSchedules: clonedResult.labSchedules,
        project: window.App.project,
        workingDays: window.App.project.metadata.workingDays,
        periodsPerDay: window.App.project.metadata.periodsPerDay,
        classroomManager: null,
        facultyManager: window.App.facultyManager
      });

      if (!testValidation.isValid) {
        alert(`Cannot move this class!\n\nReason:\n${testValidation.errors.join('\n')}`);
        const container = document.getElementById('matrix-display-container');
        if (container) container.innerHTML = this.renderActiveGridMatrix();
        return;
      }

      // Commit swap!
      sched[day1][period1] = slot2 ? { ...slot2 } : null;
      sched[day2][period2] = slot1 ? { ...slot1 } : null;

      // Update project existingSchedules
      window.App.project.existingSchedules = res.classSchedules;

      const container = document.getElementById('matrix-display-container');
      if (container) container.innerHTML = this.renderActiveGridMatrix();
    }

    toggleLockSlot(classCode, day, period) {
      const res = this.lastGeneratedResult;
      if (!res || !res.classSchedules[classCode]) return;
      const slot = res.classSchedules[classCode][day][period];
      if (!slot) return;
      slot.isLocked = !slot.isLocked;
      const container = document.getElementById('matrix-display-container');
      if (container) container.innerHTML = this.renderActiveGridMatrix();
    }

    updateStatusSummary() {
      // Updates step indicator badges if any
    }
  }

  window.UIController = UIController;
})(typeof window !== 'undefined' ? window : this);
