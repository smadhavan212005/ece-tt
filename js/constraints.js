/**
 * Department Timetable Generator - Constraints & Rules Engine
 * Defines and validates Hard Constraints and Soft Optimization Constraints.
 */

(function (window) {
  'use strict';

  const Constraints = {
    DEFAULT_DAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    TOTAL_PERIODS: 8,
    LUNCH_BOUNDARY_PERIOD: 4, // Default (two-period system): lunch between P4 & P5

    /**
     * Break systems. A class picks one during class configuration; it decides where the
     * short breaks and lunch fall, and therefore where labs may not continue.
     *   '2-2': P1-P2 | Break | P3-P4 | Lunch | P5-P6 | Break | P7-P8   (lunch after P4)
     *   '3-2': P1-P3 | Break | P4-P5 | Lunch | P6-P8                   (lunch after P5)
     * `layout` drives the timetable grid; a null time is simply not printed.
     */
    DEFAULT_BREAK_SYSTEM: '2-2',
    BREAK_SYSTEMS: {
      '2-2': {
        id: '2-2',
        label: 'Two-period system',
        description: 'P1-P2, Break, P3-P4, Lunch, P5-P6, Break, P7-P8',
        lunchAfterPeriod: 4,
        layout: [
          { type: 'period', period: 1, time: '8:30-9:20' },
          { type: 'period', period: 2, time: '9:20-10:10' },
          { type: 'break', time: '10:10-10:25' },
          { type: 'period', period: 3, time: '10:25-11:15' },
          { type: 'period', period: 4, time: '11:15-12:05' },
          { type: 'lunch', time: '12:05-1:10' },
          { type: 'period', period: 5, time: '1:10-2:00' },
          { type: 'period', period: 6, time: '2:00-2:50' },
          { type: 'break', time: '2:50-3:05' },
          { type: 'period', period: 7, time: '3:05-3:55' },
          { type: 'period', period: 8, time: '3:55-4:45' }
        ]
      },
      '3-2': {
        id: '3-2',
        label: '3-2 period system',
        description: 'P1-P3, Break, P4-P5, Lunch, P6-P7, Break, P8',
        lunchAfterPeriod: 5,
        layout: [
          { type: 'period', period: 1, time: '8:30-9:20' },
          { type: 'period', period: 2, time: '9:20-10:10' },
          { type: 'period', period: 3, time: '10:10-11:00' },
          { type: 'break', time: '11:00-11:15' },
          { type: 'period', period: 4, time: '11:15-12:05' },
          { type: 'period', period: 5, time: '12:05-12:55' },
          { type: 'lunch', time: '12:55-2:00' },
          { type: 'period', period: 6, time: '2:00-2:50' },
          { type: 'period', period: 7, time: '2:50-3:40' },
          { type: 'break', time: '3:40-3:55' },
          { type: 'period', period: 8, time: '3:55-4:45' }
        ]
      }
    },

    // Labs of this many continuous periods or more are exempt from the lunch rule
    // (they may run across both breaks and lunch). Shorter labs may never cross lunch.
    LUNCH_EXEMPT_MIN_PERIODS: 4,

    canCrossLunch(duration) {
      return duration >= this.LUNCH_EXEMPT_MIN_PERIODS;
    },

    getBreakSystem(id) {
      return this.BREAK_SYSTEMS[id] || this.BREAK_SYSTEMS[this.DEFAULT_BREAK_SYSTEM];
    },

    /** Period after which lunch falls for the given break system (default: two-period system). */
    getLunchBoundary(breakSystemId) {
      return this.getBreakSystem(breakSystemId).lunchAfterPeriod;
    },

    /**
     * Check if a set of continuous periods is valid for a lab.
     * Labs must NOT cross lunch (cannot contain periods on both sides of the lunch boundary),
     * except labs of 4 or more continuous periods, which may cross lunch and breaks.
     */
    isValidLabBlock(startPeriod, duration, breakSystemId) {
      if (startPeriod < 1 || startPeriod + duration - 1 > this.TOTAL_PERIODS) {
        return false;
      }
      if (this.canCrossLunch(duration)) return true;
      const lunchBoundary = this.getLunchBoundary(breakSystemId);
      const endPeriod = startPeriod + duration - 1;
      // Before lunch: both start and end on the morning side
      const entirelyBeforeLunch = endPeriod <= lunchBoundary;
      // After lunch: both start and end on the afternoon side
      const entirelyAfterLunch = startPeriod > lunchBoundary;

      return entirelyBeforeLunch || entirelyAfterLunch;
    },

    /**
     * Get all valid starting periods for a lab with given duration.
     * E.g. for duration 3 in the two-period system:
     * Before lunch: P1 (P1-P3), P2 (P2-P4).
     * After lunch: P5 (P5-P7), P6 (P6-P8).
     * In the 3-2 system: P1, P2, P3 (P3-P5) before lunch and P6 (P6-P8) after.
     * Only lunch is a hard boundary; a lab may run across a short break.
     */
    getValidLabStartPeriods(duration = 3, breakSystemId) {
      const validStarts = [];
      for (let p = 1; p <= this.TOTAL_PERIODS - duration + 1; p++) {
        if (this.isValidLabBlock(p, duration, breakSystemId)) {
          validStarts.push(p);
        }
      }
      return validStarts;
    },

    /**
     * Start periods the scheduler tries for a lab. Period 1 is left to Main Courses.
     * The two-period system keeps its original candidate lists for labs shorter than 4 periods.
     * For lunch-exempt labs (4+ periods), blocks that avoid lunch are tried before ones that cross it.
     */
    getSchedulerLabStartPeriods(duration, breakSystemId) {
      if (!this.canCrossLunch(duration)) {
        if (this.getBreakSystem(breakSystemId).id === '2-2') {
          return duration === 3 ? [2, 5, 6] : [2, 3, 5, 6, 7];
        }
        return this.getValidLabStartPeriods(duration, breakSystemId).filter(p => p > 1);
      }
      const lunchBoundary = this.getLunchBoundary(breakSystemId);
      const starts = this.getValidLabStartPeriods(duration, breakSystemId).filter(p => p > 1);
      const avoidsLunch = p => p + duration - 1 <= lunchBoundary || p > lunchBoundary;
      return starts.filter(avoidsLunch).concat(starts.filter(p => !avoidsLunch(p)));
    },

    /**
     * Validates if a faculty member can be scheduled at (day, period).
     * Checks availability matrix and global conflict in facultySchedules.
     * @param {string} facultyName
     * @param {string} day
     * @param {number} period
     * @param {Object} facultyManager
     * @param {Object} globalFacultyOccupancy - { [facultyName]: { [day]: { [period]: { classCode, subjectCode } } } }
     * @param {string} currentClassCode
     */
    canFacultyTeach(facultyName, day, period, facultyManager, globalFacultyOccupancy, currentClassCode) {
      if (!facultyName) return { ok: true };

      // 1. Availability check
      if (facultyManager && !facultyManager.isFacultyAvailable(facultyName, day, period)) {
        const avail = facultyManager.getAvailability(facultyName);
        const dept = avail ? avail.department : 'Other';
        return {
          ok: false,
          reason: `Faculty member "${facultyName}" (${dept} Dept) is not available on ${day} Period ${period}.`
        };
      }

      // 2. Conflict check (cannot be in two places at once)
      if (globalFacultyOccupancy && globalFacultyOccupancy[facultyName]) {
        const occupiedSlot = globalFacultyOccupancy[facultyName][day] && globalFacultyOccupancy[facultyName][day][period];
        if (occupiedSlot) {
          // If already assigned to another class during this slot
          if (occupiedSlot.classCode !== currentClassCode) {
            return {
              ok: false,
              reason: `Faculty conflict: "${facultyName}" is already teaching Class ${occupiedSlot.classCode} (${occupiedSlot.subjectName || occupiedSlot.subjectCode}) on ${day} Period ${period}.`
            };
          }
        }
      }

      return { ok: true };
    },

    /**
     * Check if multiple faculty members for a subject are all free.
     */
    canAllFacultyTeach(facultyList, day, period, facultyManager, globalFacultyOccupancy, currentClassCode) {
      if (!facultyList || !Array.isArray(facultyList)) return { ok: true };
      for (const fac of facultyList) {
        const res = this.canFacultyTeach(fac, day, period, facultyManager, globalFacultyOccupancy, currentClassCode);
        if (!res.ok) return res;
      }
      return { ok: true };
    },

    /**
     * Validates Main Course Period 1 Rule:
     * If a class has N Main Courses (N <= workingDays.length), each Main Course MUST occupy
     * Period 1 on a distinct working day.
     */
    validateMainCourseP1Requirements(mainCourses, workingDays) {
      const daysCount = workingDays ? workingDays.length : 5;
      const mainCount = mainCourses ? mainCourses.length : 0;

      if (mainCount > daysCount) {
        return {
          valid: false,
          conflictType: 'MATHEMATICAL_IMPOSSIBILITY',
          message: `Class has ${mainCount} Main Courses, but only ${daysCount} working days are configured. It is impossible to assign each Main Course to Period 1 without collisions.`
        };
      }

      return { valid: true };
    }
  };

  window.Constraints = Constraints;
})(typeof window !== 'undefined' ? window : this);
