/**
 * Department Timetable Generator - Main Application Coordinator
 */

(function (window) {
  'use strict';

  class Application {
    constructor() {
      this.subjectManager = null;
      this.facultyManager = null;
      this.ui = null;
      this.project = null;
    }

    init() {
      // 1. Initialize Subject and Faculty Managers from AppData
      this.subjectManager = new window.SubjectManager(window.AppData.subjects);
      this.facultyManager = new window.FacultyManager(window.AppData.facultyData);
      this.loadCustomFaculty();

      // 2. Initialize default empty or sample project structure
      this.project = {
        metadata: {
          collegeName: 'PSG Institute of Technology and Applied Research',
          departmentName: 'Department of Electronics and Communication Engineering',
          academicYear: '2026-2027',
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          periodsPerDay: 8
        },
        departmentConfig: {
          totalClasses: 8,
          availableClassrooms: 6,
          classrooms: [
            { room: '101', capacity: 60 },
            { room: '102', capacity: 60 },
            { room: '103', capacity: 60 },
            { room: '104', capacity: 60 },
            { room: '201', capacity: 60 },
            { room: '202', capacity: 60 }
          ]
        },
        classes: [],
        classConfigurations: {}
      };

      // 3. Initialize UI
      this.ui = new window.UIController();
      this.ui.init();

      // 4. Setup Global Header Event Listeners
      this.setupHeaderActions();
    }

    setupHeaderActions() {
      // Save Project
      const saveBtn = document.getElementById('header-btn-save-project');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          window.ExportManager.saveProjectAsJson(this.project);
        });
      }

      // Load Project
      const loadBtn = document.getElementById('header-btn-load-project');
      const fileInput = document.getElementById('header-project-file-input');
      if (loadBtn && fileInput) {
        loadBtn.addEventListener('click', () => {
          fileInput.click();
        });
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            window.ExportManager.loadProjectFromJsonFile(file, (err, loadedData) => {
              if (err) {
                alert(`Error loading project file: ${err.message}`);
                return;
              }
              this.project = loadedData;
              // Re-populate availability in facultyManager
              if (loadedData.facultyAvailability) {
                for (const fac in loadedData.facultyAvailability) {
                  this.facultyManager.setAvailability(fac, loadedData.facultyAvailability[fac]);
                }
              }
              alert('Project loaded successfully!');
              this.ui.currentStep = 1;
              this.ui.renderCurrentStep();
            });
          }
        });
      }

      // Subject Master Management Modal
      const subjBtn = document.getElementById('header-btn-manage-subjects');
      if (subjBtn) {
        subjBtn.addEventListener('click', () => {
          this.openSubjectMasterModal();
        });
      }

      // Faculty Master Management Modal
      const facBtn = document.getElementById('header-btn-manage-faculty');
      if (facBtn) {
        facBtn.addEventListener('click', () => {
          this.openFacultyMasterModal();
        });
      }
    }

    loadSampleProject() {
      if (confirm('Load sample realistic ECE + VLSI scenario with 8 classes, shared laboratories, variable classrooms, and other-department faculty?')) {
        this.project = JSON.parse(JSON.stringify(window.AppData.sampleProject));
        // Hydrate availability in facultyManager
        if (this.project.facultyAvailability) {
          for (const fac in this.project.facultyAvailability) {
            this.facultyManager.setAvailability(fac, this.project.facultyAvailability[fac]);
          }
        }
        alert('Sample realistic project loaded successfully! You can now navigate between steps or immediately generate the timetable in Step 5.');
        this.ui.goToStep(1);
      }
    }

    openSubjectMasterModal() {
      let modal = document.getElementById('subject-master-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'subject-master-modal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
      }

      modal.style.display = 'flex';
      modal.innerHTML = `
        <div class="modal" style="max-width:850px;">
          <div class="modal-header">
            <h3>Editable Subject Master List (${this.subjectManager.getAll().length} subjects)</h3>
            <button class="btn btn-secondary btn-sm" id="btn-close-subj-master">✕</button>
          </div>
          <div class="modal-body">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <input type="text" id="subj-master-search" placeholder="Search subjects..." style="width:300px;">
              <button class="btn btn-primary btn-sm" id="btn-add-master-subj">+ Add New Subject</button>
            </div>

            <div id="add-master-subj-form" style="display:none; background:#f8fafc; border:1px solid var(--border); border-radius:var(--radius-md); padding:14px; margin-bottom:14px;">
              <h4 style="font-size:13px; margin-bottom:10px;">Add New Subject to Master Catalog</h4>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px;">
                <input type="text" id="new-subj-code" placeholder="Code (e.g. EC3491)">
                <input type="text" id="new-subj-name" placeholder="Title (e.g. Communication Systems)">
                <select id="new-subj-type">
                  <option value="Main Course">Main Course</option>
                  <option value="Lab">Lab</option>
                  <option value="Elective Course">Elective Course</option>
                  <option value="Honours Course">Honours Course</option>
                </select>
                <input type="text" id="new-subj-lab" placeholder="Default Lab (if Lab)">
              </div>
              <div style="margin-top:10px; display:flex; gap:8px;">
                <button class="btn btn-primary btn-sm" id="btn-save-new-master-subj">Save Subject</button>
                <button class="btn btn-secondary btn-sm" id="btn-cancel-new-master-subj">Cancel</button>
              </div>
            </div>

            <div class="table-responsive" style="max-height:400px; overflow-y:auto;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Default Type</th>
                    <th>Category</th>
                    <th style="text-align:right;">Actions</th>
                  </tr>
                </thead>
                <tbody id="subj-master-tbody">
                  <!-- Rendered rows -->
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="btn-done-subj-master">Close</button>
          </div>
        </div>
      `;

      const renderMasterTable = (query) => {
        const tbody = document.getElementById('subj-master-tbody');
        tbody.innerHTML = '';
        const list = this.subjectManager.search(query);

        list.slice(0, 100).forEach(s => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong style="color:var(--primary);">${s.code}</strong></td>
            <td>${s.name}</td>
            <td><span class="badge badge-primary">${s.defaultType || 'Main Course'}</span></td>
            <td><small>${s.category || '-'}</small></td>
            <td style="text-align:right;">
              <button class="btn btn-danger btn-sm" data-code="${s.code}">Delete</button>
            </td>
          `;

          tr.querySelector('button').addEventListener('click', () => {
            const res = this.subjectManager.deleteSubject(s.code, this.project.classConfigurations);
            if (res.requiresConfirmation) {
              if (confirm(res.warning)) {
                this.subjectManager.deleteSubject(s.code, this.project.classConfigurations, true);
                renderMasterTable(document.getElementById('subj-master-search').value);
              }
            } else {
              renderMasterTable(document.getElementById('subj-master-search').value);
            }
          });

          tbody.appendChild(tr);
        });
      };

      renderMasterTable('');

      document.getElementById('subj-master-search').addEventListener('input', (e) => {
        renderMasterTable(e.target.value);
      });

      document.getElementById('btn-close-subj-master').onclick = () => modal.style.display = 'none';
      document.getElementById('btn-done-subj-master').onclick = () => modal.style.display = 'none';

      const addForm = document.getElementById('add-master-subj-form');
      document.getElementById('btn-add-master-subj').onclick = () => {
        addForm.style.display = addForm.style.display === 'none' ? 'block' : 'none';
      };
      document.getElementById('btn-cancel-new-master-subj').onclick = () => {
        addForm.style.display = 'none';
      };
      document.getElementById('btn-save-new-master-subj').onclick = () => {
        const code = document.getElementById('new-subj-code').value.trim();
        const name = document.getElementById('new-subj-name').value.trim();
        const type = document.getElementById('new-subj-type').value;
        const lab = document.getElementById('new-subj-lab').value.trim();

        if (!code || !name) {
          alert('Subject code and title are required.');
          return;
        }

        try {
          this.subjectManager.addSubject({
            code: code,
            name: name,
            defaultType: type,
            defaultLab: lab || `${name} Lab`
          });
          addForm.style.display = 'none';
          document.getElementById('new-subj-code').value = '';
          document.getElementById('new-subj-name').value = '';
          renderMasterTable(document.getElementById('subj-master-search').value);
        } catch (err) {
          alert(err.message);
        }
      };
    }

    /* Faculty added through the Master Faculty dialog are kept in localStorage
       so they survive a page reload. */
    loadCustomFaculty() {
      try {
        const saved = JSON.parse(localStorage.getItem('customFaculty') || '[]');
        saved.forEach(f => {
          try { this.facultyManager.addFaculty(f); } catch (e) { /* already present */ }
        });
      } catch (e) { /* storage unavailable or corrupt: ignore */ }
    }

    saveCustomFaculty(fac) {
      try {
        const saved = JSON.parse(localStorage.getItem('customFaculty') || '[]');
        saved.push({
          name: fac.name, department: fac.department, designation: fac.designation,
          specialization: fac.specialization, email: fac.email
        });
        localStorage.setItem('customFaculty', JSON.stringify(saved));
      } catch (e) { /* storage unavailable: faculty stays for this session only */ }
    }

    openFacultyMasterModal() {
      let modal = document.getElementById('faculty-master-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'faculty-master-modal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
      }

      const allDepts = this.facultyManager.getDepartments();
      const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g,
        ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

      modal.style.display = 'flex';
      modal.innerHTML = `
        <div class="modal" style="max-width:850px;">
          <div class="modal-header">
            <h3 id="fac-master-title">Faculty Master Database (${this.facultyManager.getAll().length} Faculty)</h3>
            <button class="btn btn-secondary btn-sm" id="btn-close-fac-master">✕</button>
          </div>
          <div class="modal-body">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; gap:10px;">
              <input type="text" id="fac-master-search" placeholder="Search faculty..." style="flex:1;">
              <select id="fac-master-dept-filter" style="width:160px;">
                <option value="ALL">All Departments</option>
                ${allDepts.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join('')}
              </select>
              <button class="btn btn-primary btn-sm" id="btn-add-master-fac">+ Add Faculty</button>
            </div>

            <div id="add-master-fac-form" style="display:none; background:#f8fafc; border:1px solid var(--border); border-radius:var(--radius-md); padding:14px; margin-bottom:14px;">
              <h4 style="font-size:13px; margin-bottom:10px;">Add New Faculty to Master Database</h4>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px;">
                <input type="text" id="new-fac-name" placeholder="Name * (e.g. Dr. A. Kumar)">
                <input type="text" id="new-fac-dept" list="new-fac-dept-list" placeholder="Department * (pick or type new)">
                <datalist id="new-fac-dept-list">
                  ${allDepts.map(d => `<option value="${esc(d)}"></option>`).join('')}
                </datalist>
                <input type="text" id="new-fac-desig" placeholder="Designation (e.g. Assistant Professor)">
                <input type="text" id="new-fac-spec" placeholder="Specialization">
                <input type="email" id="new-fac-email" placeholder="Email">
              </div>
              <div id="new-fac-error" style="color:var(--danger); font-size:12px; margin-top:8px; display:none;"></div>
              <div style="margin-top:10px; display:flex; gap:8px;">
                <button class="btn btn-primary btn-sm" id="btn-save-new-master-fac">Save Faculty</button>
                <button class="btn btn-secondary btn-sm" id="btn-cancel-new-master-fac">Cancel</button>
              </div>
            </div>

            <div class="table-responsive" style="max-height:400px; overflow-y:auto;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Specialization</th>
                  </tr>
                </thead>
                <tbody id="fac-master-tbody">
                  <!-- Rows -->
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="btn-done-fac-master">Close</button>
          </div>
        </div>
      `;

      const renderFacTable = (query, dept) => {
        const tbody = document.getElementById('fac-master-tbody');
        tbody.innerHTML = '';
        const list = this.facultyManager.search(query, dept);

        list.forEach(f => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong style="color:var(--primary);">${esc(f.name)}</strong></td>
            <td><span class="badge badge-primary">${esc(f.department)}</span></td>
            <td><small>${esc(f.designation) || '-'}</small></td>
            <td><small style="color:var(--text-muted);">${esc(f.specialization) || '-'}</small></td>
          `;
          tbody.appendChild(tr);
        });
      };

      renderFacTable('', 'ALL');

      document.getElementById('fac-master-search').addEventListener('input', (e) => {
        renderFacTable(e.target.value, document.getElementById('fac-master-dept-filter').value);
      });
      document.getElementById('fac-master-dept-filter').addEventListener('change', (e) => {
        renderFacTable(document.getElementById('fac-master-search').value, e.target.value);
      });

      const addForm = document.getElementById('add-master-fac-form');
      const errBox = document.getElementById('new-fac-error');
      const formFields = ['name', 'dept', 'desig', 'spec', 'email'].map(k => document.getElementById(`new-fac-${k}`));
      const closeForm = () => {
        addForm.style.display = 'none';
        errBox.style.display = 'none';
        formFields.forEach(el => el.value = '');
      };

      document.getElementById('btn-add-master-fac').onclick = () => {
        addForm.style.display = addForm.style.display === 'none' ? 'block' : 'none';
        if (addForm.style.display === 'block') formFields[0].focus();
      };
      document.getElementById('btn-cancel-new-master-fac').onclick = closeForm;
      document.getElementById('btn-save-new-master-fac').onclick = () => {
        const [name, dept, desig, spec, email] = formFields.map(el => el.value.trim());
        try {
          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email address.');
          const fac = this.facultyManager.addFaculty({ name, department: dept, designation: desig, specialization: spec, email });
          this.saveCustomFaculty(fac);
        } catch (e) {
          errBox.textContent = e.message;
          errBox.style.display = 'block';
          return;
        }
        // Refresh department filter, count and table so the new entry shows up immediately.
        this.openFacultyMasterModal();
        const search = document.getElementById('fac-master-search');
        search.value = name;
        search.dispatchEvent(new Event('input'));
      };

      document.getElementById('btn-close-fac-master').onclick = () => modal.style.display = 'none';
      document.getElementById('btn-done-fac-master').onclick = () => modal.style.display = 'none';
    }
  }

  window.Application = Application;

  // Boot on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.App = new Application();
    window.App.init();
  });
})(typeof window !== 'undefined' ? window : this);
