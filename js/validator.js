/**
 * Department Timetable Generator - Global Validator & Conflict Reporter
 * Independently validates every generated timetable against all HARD and SOFT constraints.
 */

(function (window) {
  'use strict';

  const Validator = {
    validateAll(context) {
      const {
        classSchedules,
        facultySchedules,
        roomSchedules,
        labSchedules,
        project,
        workingDays,
        periodsPerDay,
        classroomManager,
        facultyManager
      } = context;

      const errors = [];
      const warnings = [];
      const conflictReport = [];
      const classes = project.classes || [];
      const classConfigs = project.classConfigurations || {};

      // 1. Check Faculty Simultaneous Collisions (HARD)
      // Collect map: (faculty, day, period) -> list of classes
      const facultyMap = {};
      for (const cls of classes) {
        const sched = classSchedules[cls.code];
        if (!sched) continue;
        for (const day of workingDays) {
          for (let p = 1; p <= periodsPerDay; p++) {
            const slot = sched[day][p];
            if (slot && slot.faculty && Array.isArray(slot.faculty)) {
              for (const fac of slot.faculty) {
                const key = `${fac}__${day}__${p}`;
                if (!facultyMap[key]) facultyMap[key] = [];
                facultyMap[key].push({ classCode: cls.code, subject: slot.subjectName || slot.subjectCode, isLab: slot.isLab });
              }
            }
          }
        }
      }

      for (const key in facultyMap) {
        const assignments = facultyMap[key];
        if (assignments.length > 1) {
          const [fac, day, p] = key.split('__');
          // Allow if intentional simultaneous course for the SAME class
          const distinctClasses = new Set(assignments.map(a => a.classCode));
          if (distinctClasses.size > 1) {
            const desc = `Faculty member "${fac}" is assigned to multiple classes simultaneously on ${day} Period ${p}: ` +
              assignments.map(a => `Class ${a.classCode} (${a.subject})`).join(', ');
            errors.push(desc);
            conflictReport.push({
              type: 'FACULTY_COLLISION',
              severity: 'HARD',
              title: `Simultaneous Teaching Conflict: ${fac}`,
              description: desc,
              faculty: fac,
              day: day,
              period: p,
              suggestion: `Assign another faculty member or move one of the courses to a different day/period.`
            });
          }
        }
      }

      // 2. Check Classroom Collisions (HARD)
      // A physical classroom cannot host 2 classes at once
      const roomMap = {};
      for (const cls of classes) {
        const sched = classSchedules[cls.code];
        if (!sched) continue;
        for (const day of workingDays) {
          for (let p = 1; p <= periodsPerDay; p++) {
            const slot = sched[day][p];
            if (slot && slot.room && slot.room !== '-' && !slot.isLab) {
              const key = `${slot.room}__${day}__${p}`;
              if (!roomMap[key]) roomMap[key] = [];
              roomMap[key].push({ classCode: cls.code, subject: slot.subjectName });
            }
          }
        }
      }

      for (const key in roomMap) {
        const assignments = roomMap[key];
        if (assignments.length > 1) {
          const [room, day, p] = key.split('__');
          const distinctClasses = new Set(assignments.map(a => a.classCode));
          if (distinctClasses.size > 1) {
            const desc = `Classroom collision in Room "${room}" on ${day} Period ${p}: occupied by ` +
              assignments.map(a => `Class ${a.classCode}`).join(' and ');
            errors.push(desc);
            conflictReport.push({
              type: 'CLASSROOM_COLLISION',
              severity: 'HARD',
              title: `Classroom Collision in Room ${room}`,
              description: desc,
              room: room,
              day: day,
              period: p,
              suggestion: `Add more classrooms, adjust lab schedules to release rooms, or utilize Peer Learning Hall.`
            });
          }
        }
      }

      // 3. Check Shared Laboratory Collisions (HARD)
      const labMap = {};
      for (const cls of classes) {
        const sched = classSchedules[cls.code];
        if (!sched) continue;
        for (const day of workingDays) {
          for (let p = 1; p <= periodsPerDay; p++) {
            const slot = sched[day][p];
            if (slot && slot.isLab && slot.labName) {
              const key = `${slot.labName}__${day}__${p}`;
              if (!labMap[key]) labMap[key] = [];
              labMap[key].push({ classCode: cls.code, subject: slot.subjectName });
            }
          }
        }
      }

      for (const key in labMap) {
        const assignments = labMap[key];
        if (assignments.length > 1) {
          const [lab, day, p] = key.split('__');
          const distinctClasses = new Set(assignments.map(a => a.classCode));
          if (distinctClasses.size > 1) {
            const desc = `Shared Laboratory collision in "${lab}" on ${day} Period ${p}: scheduled for ` +
              assignments.map(a => `Class ${a.classCode} (${a.subject})`).join(' and ');
            errors.push(desc);
            conflictReport.push({
              type: 'LAB_COLLISION',
              severity: 'HARD',
              title: `Laboratory Conflict in ${lab}`,
              description: desc,
              lab: lab,
              day: day,
              period: p,
              suggestion: `Ensure different lab days or morning/afternoon session separation between classes.`
            });
          }
        }
      }

      // 4. Check Other-Department Faculty Availability (HARD)
      if (facultyManager) {
        for (const cls of classes) {
          const sched = classSchedules[cls.code];
          if (!sched) continue;
          for (const day of workingDays) {
            for (let p = 1; p <= periodsPerDay; p++) {
              const slot = sched[day][p];
              if (slot && slot.faculty && Array.isArray(slot.faculty)) {
                for (const fac of slot.faculty) {
                  const avail = facultyManager.getAvailability(fac);
                  if (avail && avail.isOtherDept) {
                    if (!facultyManager.isFacultyAvailable(fac, day, p)) {
                      const desc = `Availability Violation: "${fac}" (${avail.department}) is scheduled in Class ${cls.code} on ${day} Period ${p}, but is only available outside this slot.`;
                      errors.push(desc);
                      conflictReport.push({
                        type: 'FACULTY_AVAILABILITY_VIOLATION',
                        severity: 'HARD',
                        title: `Faculty Unavailable: ${fac}`,
                        description: desc,
                        faculty: fac,
                        day: day,
                        period: p,
                        suggestion: `Update ${fac}'s availability matrix or assign another faculty member.`
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }

      // 5. Check Lab Continuity & Lunch Rule (HARD)
      // Labs must be continuous and must NOT cross Lunch (P4 -> P5, or P5 -> P6 in the 3-2 break system).
      // Exception: labs of 4 or more continuous periods may cross lunch.
      for (const cls of classes) {
        const sched = classSchedules[cls.code];
        if (!sched) continue;
        const clsConfig = (project.classConfigurations && project.classConfigurations[cls.code]) || {};
        const lunchBoundary = window.Constraints.getLunchBoundary(clsConfig.breakSystem);
        const lunchBoundaryLabel = `Period ${lunchBoundary} and Period ${lunchBoundary + 1}`;
        for (const day of workingDays) {
          // Check if any lab crosses lunch (active on both sides of lunch for the same lab subject)
          const before = sched[day][lunchBoundary];
          const after = sched[day][lunchBoundary + 1];
          if (before && after && before.isLab && after.isLab && before.subjectCode === after.subjectCode &&
              !window.Constraints.canCrossLunch(before.continuousTotal || 0)) {
            const desc = `Lab Lunch Rule Violation: Class ${cls.code} has laboratory "${before.subjectName}" spanning across Lunch between ${lunchBoundaryLabel} on ${day}.`;
            errors.push(desc);
            conflictReport.push({
              type: 'LAB_LUNCH_VIOLATION',
              severity: 'HARD',
              title: `Lab Spans Across Lunch: Class ${cls.code}`,
              description: desc,
              classCode: cls.code,
              day: day,
              suggestion: lunchBoundary === 4
                ? `Schedule labs strictly before lunch (P1-P3, P2-P4) or strictly after lunch (P5-P7, P6-P8).`
                : `Schedule labs strictly before lunch (P1-P3, P2-P4, P3-P5) or strictly after lunch (P6-P8).`
            });
          }
        }
      }

      // 6. Check Main Course Period 1 Rule (HARD)
      // If a class has N Main Courses (N <= 5), each must be in P1 on different working days
      for (const cls of classes) {
        const cfg = classConfigs[cls.code];
        if (!cfg || !cfg.subjects) continue;

        const mainCourses = cfg.subjects.filter(s => s.type === 'Main Course');
        if (mainCourses.length === workingDays.length) {
          const sched = classSchedules[cls.code];
          if (sched) {
            const p1Subjects = [];
            for (const day of workingDays) {
              const slot = sched[day][1];
              if (slot && slot.subjectCode !== 'FREE') {
                p1Subjects.push(slot.subjectCode);
              }
            }

            // Check if all main courses are present in P1
            const missingFromP1 = mainCourses.filter(mc => !p1Subjects.includes(mc.code));
            if (missingFromP1.length > 0) {
              // Check if any P1 has a duplicate main course
              const seen = new Set();
              let hasDuplicates = false;
              for (const code of p1Subjects) {
                if (seen.has(code)) {
                  hasDuplicates = true;
                  break;
                }
                seen.add(code);
              }

              if (hasDuplicates || missingFromP1.length > 1) {
                const desc = `Main Course P1 Rule: Class ${cls.code} does not distribute its Main Courses across Period 1 on separate working days. Missing from P1: ${missingFromP1.map(m => m.name).join(', ')}.`;
                errors.push(desc);
                conflictReport.push({
                  type: 'MAIN_COURSE_P1_VIOLATION',
                  severity: 'HARD',
                  title: `Main Course P1 Rule Violation: Class ${cls.code}`,
                  description: desc,
                  classCode: cls.code,
                  suggestion: `Each of the ${mainCourses.length} Main Courses must be scheduled in Period 1 on distinct days.`
                });
              }
            }
          }
        }
      }

      // 7. Check 1st and 2nd Year Fixed Classrooms (HARD)
      for (const cls of classes) {
        if (cls.year <= 2) {
          const sched = classSchedules[cls.code];
          if (sched) {
            const usedRooms = new Set();
            for (const day of workingDays) {
              for (let p = 1; p <= periodsPerDay; p++) {
                const slot = sched[day][p];
                if (slot && !slot.isLab && slot.room && slot.room !== '-') {
                  usedRooms.add(slot.room);
                }
              }
            }
            if (usedRooms.size > 1) {
              const desc = `Fixed Classroom Violation: Junior class ${cls.code} (${cls.yearLabel || cls.year + 'th Year'}) was assigned multiple classrooms: ${Array.from(usedRooms).join(', ')}. 1st and 2nd year classes must have a fixed classroom.`;
              errors.push(desc);
              conflictReport.push({
                type: 'JUNIOR_CLASSROOM_FIXED_VIOLATION',
                severity: 'HARD',
                title: `Junior Class Non-Fixed Classroom: Class ${cls.code}`,
                description: desc,
                classCode: cls.code,
                suggestion: `Reserve fixed classrooms for all 1st and 2nd year classes.`
              });
            }
          }
        }
      }

      // 8. Peer Learning Hall restriction (Only for 3rd and 4th years)
      for (const cls of classes) {
        if (cls.year <= 2) {
          const sched = classSchedules[cls.code];
          if (sched) {
            for (const day of workingDays) {
              for (let p = 1; p <= periodsPerDay; p++) {
                const slot = sched[day][p];
                if (slot && slot.room === 'Peer Learning Hall') {
                  const desc = `Peer Learning Hall Violation: Junior class ${cls.code} (Year ${cls.year}) was assigned to Peer Learning Hall on ${day} Period ${p}. Only 3rd and 4th year classes may use Peer Learning Hall.`;
                  errors.push(desc);
                  conflictReport.push({
                    type: 'PEER_LEARNING_HALL_ELIGIBILITY',
                    severity: 'HARD',
                    title: `Invalid Peer Learning Hall Assignment: Class ${cls.code}`,
                    description: desc,
                    classCode: cls.code,
                    day: day,
                    period: p,
                    suggestion: `Assign a standard classroom to junior classes.`
                  });
                }
              }
            }
          }
        }
      }

      // 9. Check Weekly Hours Satisfaction
      for (const cls of classes) {
        const cfg = classConfigs[cls.code];
        if (!cfg || !cfg.subjects) continue;
        const sched = classSchedules[cls.code];
        if (!sched) continue;

        for (const subj of cfg.subjects) {
          if (subj.type === 'Free Period') continue;
          let actualHours = 0;
          for (const day of workingDays) {
            for (let p = 1; p <= periodsPerDay; p++) {
              const slot = sched[day][p];
              if (slot && (slot.subjectCode === subj.code || (slot.isSimultaneous && slot.subjectCode.includes(subj.code)))) {
                actualHours++;
              }
            }
          }
          if (actualHours < (subj.hours || 0)) {
            warnings.push(`Class ${cls.code}: Subject "${subj.name}" scheduled for ${actualHours} hrs/week (configured: ${subj.hours} hrs).`);
          }
        }
      }

      // 10. Check Room Capacity (if provided)
      for (const cls of classes) {
        if (!cls.strength) continue;
        const sched = classSchedules[cls.code];
        if (!sched) continue;
        for (const day of workingDays) {
          for (let p = 1; p <= periodsPerDay; p++) {
            const slot = sched[day][p];
            if (slot && slot.room && !slot.isLab && slot.room !== 'Peer Learning Hall' && slot.room !== '-') {
              const cap = classroomManager ? classroomManager.getRoomCapacity(slot.room) : null;
              if (cap && cap < cls.strength) {
                warnings.push(`Room Capacity Warning: Room ${slot.room} (Capacity: ${cap}) is smaller than Class ${cls.code} strength (${cls.strength}) on ${day} Period ${p}.`);
              }
            }
          }
        }
      }

      return {
        isValid: errors.length === 0,
        errors: errors,
        warnings: warnings,
        report: conflictReport
      };
    }
  };

  window.Validator = Validator;
})(typeof window !== 'undefined' ? window : this);
