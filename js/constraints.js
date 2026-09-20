/**
 * Department Timetable Generator - Constraints & Rules Engine
 * Defines and validates Hard Constraints and Soft Optimization Constraints.
 */

(function (window) {
  'use strict';

  const Constraints = {
    DEFAULT_DAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    TOTAL_PERIODS: 8,
    LUNCH_BOUNDARY_PERIOD: 4, // P1-P4 Morning, Lunch between P4 & P5, P5-P8 Afternoon

    /**
     * Check if a set of continuous periods is valid for a lab.
     * Labs must NOT cross lunch (cannot contain both period <= 4 and period >= 5).
     */
    isValidLabBlock(startPeriod, duration) {
      if (startPeriod < 1 || startPeriod + duration - 1 > this.TOTAL_PERIODS) {
        return false;
      }
      const endPeriod = startPeriod + duration - 1;
      // Before lunch: both start and end <= 4
      const entirelyBeforeLunch = endPeriod <= this.LUNCH_BOUNDARY_PERIOD;
      // After lunch: both start and end >= 5
      const entirelyAfterLunch = startPeriod > this.LUNCH_BOUNDARY_PERIOD;

      return entirelyBeforeLunch || entirelyAfterLunch;
    },

    /**
     * Get all valid starting periods for a lab with given duration.
     * E.g. for duration 3:
     * Before lunch: P1 (P1-P3), P2 (P2-P4).
     * After lunch: P5 (P5-P7), P6 (P6-P8).
     */
    getValidLabStartPeriods(duration = 3) {
      const validStarts = [];
      for (let p = 1; p <= this.TOTAL_PERIODS - duration + 1; p++) {
        if (this.isValidLabBlock(p, duration)) {
          validStarts.push(p);
        }
      }
      return validStarts;
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
