/**
 * Department Timetable Generator - Constraint-Satisfaction Scheduling Engine
 * Executes deterministic, conflict-free timetable generation in the browser.
 * Honors all hard constraints (Main Course P1, Lab continuity/lunch, faculty collision,
 * shared lab collision, other-dept faculty availability, fixed & variable classrooms,
 * lab-released classroom reuse, and Peer Learning Hall overflow).
 */

(function (window) {
  'use strict';

  class TimetableEngine {
    constructor(projectData, subjectManager, facultyManager) {
      this.project = JSON.parse(JSON.stringify(projectData));
      this.subjectManager = subjectManager;
      this.facultyManager = facultyManager;

      this.workingDays = (this.project.metadata && this.project.metadata.workingDays) ||
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      this.periodsPerDay = (this.project.metadata && this.project.metadata.periodsPerDay) || 8;

      // Global resource occupancy state
      this.classSchedules = {};     // { [classCode]: { [day]: { [period]: slotObj } } }
      this.facultySchedules = {};   // { [facultyName]: { [day]: { [period]: { classCode, subjectCode, ... } } } }
      this.roomSchedules = {};      // { [roomName]: { [day]: { [period]: { classCode, subjectCode, ... } } } }
      this.labSchedules = {};       // { [labName]: { [day]: { [period]: { classCode, subjectCode, ... } } } }
      this.labReleasedRooms = {};   // { [day]: { [period]: [roomNames] } }

      this.classroomManager = null;
      this.conflictLogs = [];
    }

    initEmptyGrid() {
      const grid = {};
      for (const day of this.workingDays) {
        grid[day] = {};
        for (let p = 1; p <= this.periodsPerDay; p++) {
          grid[day][p] = null;
        }
      }
      return grid;
    }

    /**
     * Main entry point to generate timetables for all classes.
     */
    generate() {
      this.conflictLogs = [];
      const classes = this.project.classes || [];
      const classrooms = (this.project.departmentConfig && this.project.departmentConfig.classrooms) || [];
      const classConfigs = this.project.classConfigurations || {};

      if (classes.length === 0) {
        return {
          success: false,
          errors: ['No classes defined in the department project.']
        };
      }

      if (classrooms.length === 0) {
        return {
          success: false,
          errors: ['No classrooms configured in the department setup.']
        };
      }

      // Check junior class fixed room requirement
      const juniorCount = classes.filter(c => c.year <= 2).length;
      if (juniorCount > classrooms.length) {
        return {
          success: false,
          errors: [`Classroom shortage: ${juniorCount} junior classes require fixed classrooms, but only ${classrooms.length} physical classrooms exist.`]
        };
      }

      // Initialize Classroom Manager
      this.classroomManager = new window.ClassroomManager(classrooms, classes);

      // Initialize structures
      this.classSchedules = {};
      this.facultySchedules = {};
      this.roomSchedules = {};
      this.labSchedules = {};
      this.labReleasedRooms = {};

      for (const day of this.workingDays) {
        this.labReleasedRooms[day] = {};
        for (let p = 1; p <= this.periodsPerDay; p++) {
          this.labReleasedRooms[day][p] = [];
        }
      }

      for (const cls of classes) {
        this.classSchedules[cls.code] = this.initEmptyGrid();
      }

      // Pre-validation: Check Main Courses vs Working Days
      for (const cls of classes) {
        const cfg = classConfigs[cls.code];
        if (!cfg || !cfg.subjects || cfg.subjects.length === 0) {
          return {
            success: false,
            errors: [`Class ${cls.code} (${cls.label || cls.code}) has no configured subjects. Complete its subject selection first.`]
          };
        }

        const mainCourses = cfg.subjects.filter(s => s.type === 'Main Course');
        const p1Check = window.Constraints.validateMainCourseP1Requirements(mainCourses, this.workingDays);
        if (!p1Check.valid) {
          return {
            success: false,
            errors: [`Class ${cls.code}: ${p1Check.message}`]
          };
        }
      }

      // Preserve locked slots if regenerating
      this.preserveLockedSlots();

      try {
        // Step 1: Schedule Main Course Period 1 Rule globally via CSP
        this.scheduleMainCourseP1Globally(classes, classConfigs);

        // Step 2: Schedule all Laboratories across classes
        this.scheduleAllLaboratories(classes, classConfigs);

        // Step 3: Schedule Simultaneous Course Groups
        this.scheduleSimultaneousGroups(classes, classConfigs);

        // Step 4: Schedule Remaining Theory Subjects
        this.scheduleRemainingTheorySubjects(classes, classConfigs);

        // Step 5: Fill Free Periods
        this.fillFreePeriods(classes);

        // Final Independent Validation
        const validation = window.Validator.validateAll({
          classSchedules: this.classSchedules,
          facultySchedules: this.facultySchedules,
          roomSchedules: this.roomSchedules,
          labSchedules: this.labSchedules,
          project: this.project,
          workingDays: this.workingDays,
          periodsPerDay: this.periodsPerDay,
          classroomManager: this.classroomManager,
          facultyManager: this.facultyManager
        });

        if (!validation.isValid) {
          return {
            success: false,
            errors: validation.errors,
            warnings: validation.warnings,
            classSchedules: this.classSchedules,
            conflictReport: validation.report
          };
        }

        // Calculate Quality Score
        const quality = window.Optimizer.calculateScore({
          classSchedules: this.classSchedules,
          facultySchedules: this.facultySchedules,
          roomSchedules: this.roomSchedules,
          project: this.project,
          workingDays: this.workingDays,
          periodsPerDay: this.periodsPerDay
        });

        return {
          success: true,
          classSchedules: this.classSchedules,
          facultySchedules: this.facultySchedules,
          roomSchedules: this.roomSchedules,
          labSchedules: this.labSchedules,
          validation: validation,
          qualityScore: quality.score,
          qualityMetrics: quality.metrics,
          statusText: 'VALID TIMETABLE'
        };

      } catch (err) {
        return {
          success: false,
          errors: [err.message || String(err)],
          conflictLogs: this.conflictLogs
        };
      }
    }

    preserveLockedSlots() {
      if (!this.project.existingSchedules) return;
      const existing = this.project.existingSchedules;
      for (const classCode in existing) {
        if (!this.classSchedules[classCode]) continue;
        for (const day of this.workingDays) {
          for (let p = 1; p <= this.periodsPerDay; p++) {
            const slot = existing[classCode] && existing[classCode][day] && existing[classCode][day][p];
            if (slot && slot.isLocked) {
              this.assignSlot(classCode, day, p, slot, false);
            }
          }
        }
      }
    }

    assignSlot(classCode, day, period, slotData, updateReleasedRooms = true) {
      this.classSchedules[classCode][day][period] = { ...slotData };

      // Record Faculty
      if (slotData.faculty && Array.isArray(slotData.faculty)) {
        for (const fac of slotData.faculty) {
          if (!this.facultySchedules[fac]) this.facultySchedules[fac] = {};
          if (!this.facultySchedules[fac][day]) this.facultySchedules[fac][day] = {};
          this.facultySchedules[fac][day][period] = {
            classCode: classCode,
            subjectCode: slotData.subjectCode,
            subjectName: slotData.subjectName,
            room: slotData.room || (slotData.isLab ? slotData.labName : null),
            isLab: slotData.isLab || false
          };
        }
      }

      // Record Lab
      if (slotData.isLab && slotData.labName) {
        const labName = slotData.labName;
        if (!this.labSchedules[labName]) this.labSchedules[labName] = {};
        if (!this.labSchedules[labName][day]) this.labSchedules[labName][day] = {};
        this.labSchedules[labName][day][period] = {
          classCode: classCode,
          subjectCode: slotData.subjectCode,
          subjectName: slotData.subjectName,
          faculty: slotData.faculty || []
        };

        // Note: Lab releases fixed room if junior
        if (updateReleasedRooms && this.classroomManager) {
          const fixedRoom = this.classroomManager.getFixedRoom(classCode);
          if (fixedRoom) {
            if (!this.labReleasedRooms[day][period].includes(fixedRoom)) {
              this.labReleasedRooms[day][period].push(fixedRoom);
            }
          }
        }
      }

      // Record Room
      if (slotData.room && !slotData.isLab && slotData.room !== '-') {
        const rName = slotData.room;
        if (!this.roomSchedules[rName]) this.roomSchedules[rName] = {};
        if (!this.roomSchedules[rName][day]) this.roomSchedules[rName][day] = {};
        this.roomSchedules[rName][day][period] = {
          classCode: classCode,
          subjectCode: slotData.subjectCode,
          subjectName: slotData.subjectName,
          faculty: slotData.faculty || []
        };
      }
    }

    isFacultyFree(facultyName, day, period, classCode) {
      const res = window.Constraints.canFacultyTeach(
        facultyName,
        day,
        period,
        this.facultyManager,
        this.facultySchedules,
        classCode
      );
      return res.ok;
    }

    areAllFacultyFree(facultyList, day, period, classCode) {
      if (!facultyList || !Array.isArray(facultyList)) return true;
      for (const fac of facultyList) {
        if (!this.isFacultyFree(fac, day, period, classCode)) return false;
      }
      return true;
    }

    isLabFree(labName, day, period) {
      if (!this.labSchedules[labName]) return true;
      if (!this.labSchedules[labName][day]) return true;
      return !this.labSchedules[labName][day][period];
    }

    /**
     * Helper to generate all permutations of an array.
     */
    permute(arr) {
      const results = [];
      const backtrack = (curr, remaining) => {
        if (remaining.length === 0) {
          results.push(curr);
          return;
        }
        for (let i = 0; i < remaining.length; i++) {
          const nextCurr = curr.concat([remaining[i]]);
          const nextRem = remaining.slice(0, i).concat(remaining.slice(i + 1));
          backtrack(nextCurr, nextRem);
        }
      };
      backtrack([], arr);
      return results;
    }

    /**
     * Schedule Period 1 for classes with 5 Main courses globally via CSP.
     */
    scheduleMainCourseP1Globally(classes, classConfigs) {
      const classesWith5Mains = [];
      for (const c of classes) {
        const cfg = classConfigs[c.code] || {};
        const mains = (cfg.subjects || []).filter(s => s.type === 'Main Course');
        if (mains.length === this.workingDays.length) {
          classesWith5Mains.push({ class: c, mains: mains });
        }
      }

      const assignment = {}; // key: `${classCode}__${day}` -> subj
      const dayFacultyUsed = {};
      for (const d of this.workingDays) {
        dayFacultyUsed[d] = new Set();
      }

      // Check existing locked P1 slots
      const existing = this.project.existingSchedules || {};
      for (const cCode in existing) {
        for (const day of this.workingDays) {
          const slot = existing[cCode] && existing[cCode][day] && existing[cCode][day][1];
          if (slot && slot.isLocked) {
            assignment[`${cCode}__${day}`] = slot;
            (slot.faculty || []).forEach(f => dayFacultyUsed[day].add(f));
          }
        }
      }

      const solveP1 = (idx) => {
        if (idx === classesWith5Mains.length) return true;
        const { class: clsItem, mains } = classesWith5Mains[idx];
        const cCode = clsItem.code;

        const perms = this.permute(mains);
        for (const perm of perms) {
          let valid = true;
          for (let dI = 0; dI < perm.length; dI++) {
            const day = this.workingDays[dI];
            if (assignment[`${cCode}__${day}`]) continue;

            const subj = perm[dI];
            for (const fac of (subj.faculty || [])) {
              if (!this.facultyManager.isFacultyAvailable(fac, day, 1) || dayFacultyUsed[day].has(fac)) {
                valid = false;
                break;
              }
            }
            if (!valid) break;
          }

          if (valid) {
            const addedFac = [];
            for (let dI = 0; dI < perm.length; dI++) {
              const day = this.workingDays[dI];
              if (!assignment[`${cCode}__${day}`]) {
                const subj = perm[dI];
                assignment[`${cCode}__${day}`] = subj;
                (subj.faculty || []).forEach(fac => {
                  dayFacultyUsed[day].add(fac);
                  addedFac.push({ day, fac });
                });
              }
            }

            if (solveP1(idx + 1)) return true;

            // Backtrack
            addedFac.forEach(({ day, fac }) => dayFacultyUsed[day].delete(fac));
            for (let dI = 0; dI < perm.length; dI++) {
              const day = this.workingDays[dI];
              if (assignment[`${cCode}__${day}`] === perm[dI]) {
                delete assignment[`${cCode}__${day}`];
              }
            }
          }
        }
        return false;
      };

      if (!solveP1(0)) {
        throw new Error('Unable to schedule conflict-free Main Course Period 1 assignment across classes.');
      }

      // Commit P1 assignment and immediately allocate rooms for P1
      for (const key in assignment) {
        const [cCode, day] = key.split('__');
        const subj = assignment[key];
        const clsObj = classes.find(c => c.code === cCode);

        const room = this.classroomManager.allocateRoomForSlot(
          cCode,
          clsObj.year,
          clsObj.strength || null,
          day,
          1,
          this.roomSchedules,
          this.labReleasedRooms[day][1]
        );

        if (!room) {
          throw new Error(`Classroom shortage on ${day} Period 1 for Class ${cCode}.`);
        }

        this.assignSlot(cCode, day, 1, {
          subjectCode: subj.code,
          subjectName: subj.name,
          subjectType: 'Main Course',
          faculty: subj.faculty || [],
          room: room,
          isLab: false
        });
      }
    }

    /**
     * Schedule Laboratories across classes.
     * Valid starts avoiding P1 when a class has 5 Main courses.
     */
    scheduleAllLaboratories(classes, classConfigs) {
      for (const cls of classes) {
        const cfg = classConfigs[cls.code] || {};
        for (const subj of (cfg.subjects || [])) {
          if (subj.type === 'Lab') {
            const continuous = subj.continuous || 3;
            const labName = subj.labName || subj.defaultLab || `${subj.name} Lab`;
            const faculty = subj.faculty || [];
            let placed = false;

            // Lunch position depends on the class's break system (default: two-period system)
            const lunchBoundary = window.Constraints.getLunchBoundary(cfg.breakSystem);

            // Valid starts avoiding P1 when class has 5 main courses
            const validStarts = window.Constraints.getSchedulerLabStartPeriods(continuous, cfg.breakSystem);

            for (const day of this.workingDays) {
              if (placed) break;

              for (const startP of validStarts) {
                let canFit = true;

                for (let offset = 0; offset < continuous; offset++) {
                  const p = startP + offset;
                  if (p > this.periodsPerDay) { canFit = false; break; }
                  // No lunch cross
                  if (!window.Constraints.canCrossLunch(continuous) && ((startP <= lunchBoundary && p > lunchBoundary) || (startP > lunchBoundary && p <= lunchBoundary))) { canFit = false; break; }
                  if (this.classSchedules[cls.code][day][p] !== null) { canFit = false; break; }
                  if (!this.isLabFree(labName, day, p)) { canFit = false; break; }
                  if (!this.areAllFacultyFree(faculty, day, p, cls.code)) { canFit = false; break; }
                }

                if (canFit) {
                  for (let offset = 0; offset < continuous; offset++) {
                    const p = startP + offset;
                    this.assignSlot(cls.code, day, p, {
                      subjectCode: subj.code,
                      subjectName: subj.name,
                      subjectType: 'Lab',
                      faculty: faculty,
                      room: labName,
                      labName: labName,
                      isLab: true,
                      periodIndexInBlock: offset + 1,
                      continuousTotal: continuous
                    });
                  }
                  placed = true;
                  break;
                }
              }
            }

            if (!placed) {
              throw new Error(`Unable to schedule continuous ${continuous}-period laboratory "${subj.name}" (${labName}) for Class ${cls.code} without resource conflicts.`);
            }
          }
        }
      }
    }

    /**
     * Schedule Simultaneous Groups.
     */
    scheduleSimultaneousGroups(classes, classConfigs) {
      for (const cls of classes) {
        const cfg = classConfigs[cls.code] || {};
        for (const group of (cfg.simultaneousGroups || [])) {
          const gCodes = group.subjects || [];
          const gSubjs = (cfg.subjects || []).filter(s => gCodes.includes(s.code));
          if (gSubjs.length < 2) continue;

          const targetH = Math.min(...gSubjs.map(s => s.hours || 4));
          for (let h = 0; h < targetH; h++) {
            let placed = false;
            for (const day of this.workingDays) {
              if (placed) break;
              for (let p = 1; p <= this.periodsPerDay; p++) {
                if (this.classSchedules[cls.code][day][p] === null) {
                  const room = this.classroomManager.allocateRoomForSlot(
                    cls.code,
                    cls.year,
                    cls.strength || null,
                    day,
                    p,
                    this.roomSchedules,
                    this.labReleasedRooms[day][p]
                  );

                  if (room && gSubjs.every(s => this.areAllFacultyFree(s.faculty, day, p, cls.code))) {
                    const combFac = [];
                    gSubjs.forEach(s => {
                      if (s.faculty) combFac.push(...s.faculty);
                    });

                    this.assignSlot(cls.code, day, p, {
                      subjectCode: gCodes.join('/'),
                      subjectName: gSubjs.map(s => s.name).join(' / '),
                      subjectType: 'Elective Course',
                      faculty: combFac,
                      room: room,
                      isSimultaneous: true,
                      isLab: false
                    });
                    placed = true;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    /**
     * Schedule Remaining Theory Subjects (Main, Elective, Honours).
     */
    scheduleRemainingTheorySubjects(classes, classConfigs) {
      for (const cls of classes) {
        const cfg = classConfigs[cls.code] || {};
        const theory = (cfg.subjects || []).filter(s => s.type !== 'Lab' && s.type !== 'Free Period');
        theory.sort((a, b) => (b.hours || 4) - (a.hours || 4));

        for (const subj of theory) {
          // Count already placed
          let placedCount = 0;
          for (const day of this.workingDays) {
            for (let p = 1; p <= this.periodsPerDay; p++) {
              const slot = this.classSchedules[cls.code][day][p];
              if (slot && (slot.subjectCode === subj.code || (slot.isSimultaneous && slot.subjectCode.includes(subj.code)))) {
                placedCount++;
              }
            }
          }

          const needed = Math.max(0, (subj.hours || 4) - placedCount);
          for (let h = 0; h < needed; h++) {
            let placed = false;
            for (const day of this.workingDays) {
              if (placed) break;
              for (let p = 1; p <= this.periodsPerDay; p++) {
                if (this.classSchedules[cls.code][day][p] === null) {
                  const room = this.classroomManager.allocateRoomForSlot(
                    cls.code,
                    cls.year,
                    cls.strength || null,
                    day,
                    p,
                    this.roomSchedules,
                    this.labReleasedRooms[day][p]
                  );

                  if (room && this.areAllFacultyFree(subj.faculty, day, p, cls.code)) {
                    this.assignSlot(cls.code, day, p, {
                      subjectCode: subj.code,
                      subjectName: subj.name,
                      subjectType: subj.type || 'Main Course',
                      faculty: subj.faculty || [],
                      room: room,
                      isLab: false
                    });
                    placed = true;
                    break;
                  }
                }
              }
            }

            if (!placed) {
              throw new Error(`Conflict: Could not schedule all required weekly hours for "${subj.name}" in Class ${cls.code}. Faculty may be overbooked or unavailable.`);
            }
          }
        }
      }
    }

    /**
     * Fill Free Periods.
     */
    fillFreePeriods(classes) {
      for (const cls of classes) {
        for (const day of this.workingDays) {
          for (let p = 1; p <= this.periodsPerDay; p++) {
            if (this.classSchedules[cls.code][day][p] === null) {
              this.classSchedules[cls.code][day][p] = {
                subjectCode: 'FREE',
                subjectName: 'Free Period',
                subjectType: 'Free Period',
                faculty: [],
                room: '-',
                isLab: false
              };
            }
          }
        }
      }
    }
  }

  window.TimetableEngine = TimetableEngine;
})(typeof window !== 'undefined' ? window : this);
