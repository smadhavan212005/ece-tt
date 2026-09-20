/**
 * Department Timetable Generator - Subject Manager
 * Handles Master Subject List CRUD, searching, filtering, and validation.
 */

(function (window) {
  'use strict';

  class SubjectManager {
    constructor(initialSubjects) {
      this.subjects = initialSubjects ? JSON.parse(JSON.stringify(initialSubjects)) : [];
    }

    getAll() {
      return this.subjects;
    }

    getByCode(code) {
      if (!code) return null;
      return this.subjects.find(s => s.code.toUpperCase() === code.trim().toUpperCase()) || null;
    }

    search(query, categoryFilter, semesterFilter) {
      const q = (query || '').trim().toLowerCase();
      return this.subjects.filter(s => {
        const matchesQuery = !q ||
          s.code.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          (s.category && s.category.toLowerCase().includes(q));

        const matchesCat = !categoryFilter || categoryFilter === 'ALL' ||
          (s.category && s.category.toLowerCase() === categoryFilter.toLowerCase()) ||
          (s.defaultType && s.defaultType.toLowerCase() === categoryFilter.toLowerCase());

        const matchesSem = !semesterFilter || semesterFilter === 'ALL' ||
          String(s.semester) === String(semesterFilter);

        return matchesQuery && matchesCat && matchesSem;
      });
    }

    addSubject(subjectData) {
      const code = (subjectData.code || '').trim().toUpperCase();
      const name = (subjectData.name || '').trim();
      const defaultType = subjectData.defaultType || 'Main Course';

      if (!code) throw new Error('Subject code is required.');
      if (!name) throw new Error('Subject title is required.');
      if (this.getByCode(code)) throw new Error(`Subject with code "${code}" already exists.`);

      const newSubj = {
        code: code,
        name: name,
        category: subjectData.category || 'Department Subject',
        defaultType: defaultType,
        semester: subjectData.semester ? parseInt(subjectData.semester, 10) : null
      };

      if (defaultType === 'Lab') {
        newSubj.defaultLab = subjectData.defaultLab || `${name} Lab`;
        newSubj.continuous = subjectData.continuous ? parseInt(subjectData.continuous, 10) : 3;
      }

      this.subjects.push(newSubj);
      return newSubj;
    }

    updateSubject(oldCode, updatedData) {
      const idx = this.subjects.findIndex(s => s.code.toUpperCase() === oldCode.trim().toUpperCase());
      if (idx === -1) throw new Error(`Subject "${oldCode}" not found.`);

      const newCode = (updatedData.code || oldCode).trim().toUpperCase();
      if (newCode !== oldCode && this.getByCode(newCode)) {
        throw new Error(`Subject code "${newCode}" is already in use.`);
      }

      const existing = this.subjects[idx];
      existing.code = newCode;
      existing.name = updatedData.name ? updatedData.name.trim() : existing.name;
      existing.defaultType = updatedData.defaultType || existing.defaultType;
      existing.category = updatedData.category || existing.category;
      if (updatedData.semester !== undefined) {
        existing.semester = updatedData.semester ? parseInt(updatedData.semester, 10) : null;
      }

      if (existing.defaultType === 'Lab') {
        existing.defaultLab = updatedData.defaultLab || existing.defaultLab || `${existing.name} Lab`;
        existing.continuous = updatedData.continuous ? parseInt(updatedData.continuous, 10) : (existing.continuous || 3);
      }

      return existing;
    }

    isSubjectInUse(code, classConfigurations) {
      if (!classConfigurations) return false;
      const target = code.trim().toUpperCase();
      for (const classCode in classConfigurations) {
        const config = classConfigurations[classCode];
        if (config.subjects && Array.isArray(config.subjects)) {
          if (config.subjects.some(s => s.code.toUpperCase() === target)) {
            return true;
          }
        }
      }
      return false;
    }

    deleteSubject(code, classConfigurations, force) {
      const idx = this.subjects.findIndex(s => s.code.toUpperCase() === code.trim().toUpperCase());
      if (idx === -1) throw new Error(`Subject "${code}" not found.`);

      const inUse = this.isSubjectInUse(code, classConfigurations);
      if (inUse && !force) {
        return {
          deleted: false,
          warning: `Subject "${code}" is currently used in one or more class timetable configurations. Are you sure you want to delete it?`,
          requiresConfirmation: true
        };
      }

      const deleted = this.subjects.splice(idx, 1)[0];
      return { deleted: true, subject: deleted };
    }
  }

  window.SubjectManager = SubjectManager;
})(typeof window !== 'undefined' ? window : this);
