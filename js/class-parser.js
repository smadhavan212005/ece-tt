/**
 * Department Timetable Generator - Class Parser
 * Validates and parses 4-digit class codes:
 * Digit 1: Year (1 -> 1st Year, 2 -> 2nd Year, 3 -> 3rd Year, 4 -> 4th Year)
 * Digit 2: Branch (1 -> ECE, 2 -> VLSI, configurable)
 * Digit 3: Division (1 -> A, 2 -> B, 3 -> C, etc.)
 * Digit 4: Semester (1 -> Semester 1, ..., 8 -> Semester 8)
 */

(function (window) {
  'use strict';

  const ClassParser = {
    // Default branch mapping if not overridden
    defaultBranches: {
      1: { name: 'ECE', fullName: 'Electronics and Communication Engineering' },
      2: { name: 'VLSI', fullName: 'VLSI Design & Technology' },
      3: { name: 'CSE', fullName: 'Computer Science and Engineering' },
      4: { name: 'EEE', fullName: 'Electrical and Electronics Engineering' },
      5: { name: 'AI & DS', fullName: 'Artificial Intelligence and Data Science' }
    },

    yearLabels: {
      1: '1st Year',
      2: '2nd Year',
      3: '3rd Year',
      4: '4th Year'
    },

    getDivisionLetter: function (num) {
      const n = parseInt(num, 10);
      if (isNaN(n) || n < 1) return '?';
      return String.fromCharCode(64 + n); // 1 -> A, 2 -> B, etc.
    },

    getDivisionNumber: function (letter) {
      if (!letter || typeof letter !== 'string') return 1;
      const code = letter.trim().toUpperCase().charCodeAt(0);
      return code >= 65 && code <= 90 ? code - 64 : 1;
    },

    parse: function (codeStr, customBranches) {
      const branches = customBranches || this.defaultBranches;
      const clean = String(codeStr || '').trim();

      if (!clean) {
        return {
          isValid: false,
          error: 'Class code is required.',
          raw: clean
        };
      }

      if (!/^\d{4}$/.test(clean)) {
        return {
          isValid: false,
          error: 'Class code must contain exactly four digits.',
          raw: clean
        };
      }

      const yDigit = parseInt(clean[0], 10);
      const bDigit = parseInt(clean[1], 10);
      const dDigit = parseInt(clean[2], 10);
      const sDigit = parseInt(clean[3], 10);

      // Validate Year (1 - 4)
      if (yDigit < 1 || yDigit > 4) {
        return {
          isValid: false,
          error: `Invalid Year digit '${yDigit}'. Must be between 1 and 4.`,
          raw: clean
        };
      }

      // Validate Branch
      const branchInfo = branches[bDigit];
      if (!branchInfo) {
        return {
          isValid: false,
          error: `Unknown branch code '${bDigit}'. Configured codes: ${Object.keys(branches).join(', ')}.`,
          raw: clean
        };
      }

      // Validate Division (1 - 26)
      if (dDigit < 1 || dDigit > 26) {
        return {
          isValid: false,
          error: `Invalid Division digit '${dDigit}'. Must be >= 1.`,
          raw: clean
        };
      }

      // Validate Semester (1 - 8)
      if (sDigit < 1 || sDigit > 8) {
        return {
          isValid: false,
          error: `Invalid Semester digit '${sDigit}'. Must be between 1 and 8.`,
          raw: clean
        };
      }

      const yearName = this.yearLabels[yDigit];
      const branchName = branchInfo.name || `Branch ${bDigit}`;
      const divName = this.getDivisionLetter(dDigit);
      const semNumber = sDigit;

      const fullLabel = `${clean} — ${yearName} ${branchName} ${divName} (Sem ${semNumber})`;
      const shortLabel = `${yearName} ${branchName}-${divName}`;

      return {
        isValid: true,
        code: clean,
        year: yDigit,
        yearLabel: yearName,
        branchCode: bDigit,
        branch: branchName,
        branchFullName: branchInfo.fullName || branchName,
        divisionCode: dDigit,
        division: divName,
        semester: semNumber,
        label: fullLabel,
        shortLabel: shortLabel
      };
    }
  };

  window.ClassParser = ClassParser;
})(typeof window !== 'undefined' ? window : this);
