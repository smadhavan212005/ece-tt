/**
 * Department Timetable Generator - Faculty Manager
 * Handles Faculty master catalog, department groupings, search, and availability matrices.
 */

(function (window) {
  'use strict';

  class FacultyManager {
    constructor(initialData) {
      // initialData has { departments: { 'ECE': [...] }, list: [...] }
      this.data = initialData ? JSON.parse(JSON.stringify(initialData)) : { departments: {}, list: [] };
      if (!this.data.departments) this.data.departments = {};
      if (!this.data.list) this.data.list = [];

      // Availability storage: { [facultyName]: { department, isOtherDept, availableSlots: { [day]: [periodNumbers] } } }
      this.availability = {};
    }

    getAll() {
      return this.data.list;
    }

    getDepartments() {
      return Object.keys(this.data.departments);
    }

    getByDepartment(dept) {
      return this.data.departments[dept] || [];
    }

    getByName(name) {
      if (!name) return null;
      return this.data.list.find(f => f.name.toLowerCase() === name.trim().toLowerCase()) || null;
    }

    search(query, deptFilter) {
      const q = (query || '').trim().toLowerCase();
      return this.data.list.filter(f => {
        const matchesQuery = !q ||
          f.name.toLowerCase().includes(q) ||
          (f.specialization && f.specialization.toLowerCase().includes(q)) ||
          (f.designation && f.designation.toLowerCase().includes(q)) ||
          f.department.toLowerCase().includes(q);

        const matchesDept = !deptFilter || deptFilter === 'ALL' ||
          f.department.toLowerCase() === deptFilter.toLowerCase();

        return matchesQuery && matchesDept;
      });
    }

    addFaculty(facultyObj) {
      const name = (facultyObj.name || '').trim();
      const dept = (facultyObj.department || '').trim();
      if (!name) throw new Error('Faculty name is required.');
      if (!dept) throw new Error('Department is required.');

      if (this.getByName(name)) {
        throw new Error(`Faculty "${name}" already exists.`);
      }

      const id = `FAC_${dept.slice(0, 3).toUpperCase()}_${Date.now()}`;
      const newFac = {
        id: id,
        name: name,
        department: dept,
        designation: facultyObj.designation || 'Faculty',
        specialization: facultyObj.specialization || '',
        email: facultyObj.email || ''
      };

      this.data.list.push(newFac);
      if (!this.data.departments[dept]) {
        this.data.departments[dept] = [];
      }
      this.data.departments[dept].push(newFac);
      return newFac;
    }

    updateFaculty(oldName, updatedObj) {
      const existing = this.getByName(oldName);
      if (!existing) throw new Error(`Faculty "${oldName}" not found.`);

      const newName = (updatedObj.name || oldName).trim();
      if (newName.toLowerCase() !== oldName.toLowerCase() && this.getByName(newName)) {
        throw new Error(`Faculty name "${newName}" already in use.`);
      }

      const oldDept = existing.department;
      const newDept = (updatedObj.department || oldDept).trim();

      existing.name = newName;
      existing.department = newDept;
      existing.designation = updatedObj.designation || existing.designation;
      existing.specialization = updatedObj.specialization || existing.specialization;
      existing.email = updatedObj.email || existing.email;

      if (oldDept !== newDept) {
        // move between department buckets
        if (this.data.departments[oldDept]) {
          this.data.departments[oldDept] = this.data.departments[oldDept].filter(f => f.name !== oldName);
        }
        if (!this.data.departments[newDept]) {
          this.data.departments[newDept] = [];
        }
        this.data.departments[newDept].push(existing);
      }

      // update availability key if renamed
      if (oldName !== newName && this.availability[oldName]) {
        this.availability[newName] = this.availability[oldName];
        delete this.availability[oldName];
      }

      return existing;
    }

    deleteFaculty(name, classConfigurations) {
      const idx = this.data.list.findIndex(f => f.name.toLowerCase() === name.trim().toLowerCase());
      if (idx === -1) throw new Error(`Faculty "${name}" not found.`);

      const targetFac = this.data.list[idx];
      const dept = targetFac.department;

      // Check if in use
      let inUseClasses = [];
      if (classConfigurations) {
        for (const classCode in classConfigurations) {
          const cfg = classConfigurations[classCode];
          if (cfg.subjects) {
            for (const s of cfg.subjects) {
              if (s.faculty && s.faculty.includes(targetFac.name)) {
                inUseClasses.push(classCode);
                break;
              }
            }
          }
        }
      }

      if (inUseClasses.length > 0) {
        return {
          deleted: false,
          warning: `Faculty member "${name}" is assigned in class(es): ${inUseClasses.join(', ')}. Please reassign them first.`
        };
      }

      this.data.list.splice(idx, 1);
      if (this.data.departments[dept]) {
        this.data.departments[dept] = this.data.departments[dept].filter(f => f.name !== targetFac.name);
      }
      delete this.availability[targetFac.name];
      return { deleted: true };
    }

    setAvailability(name, config) {
      // config: { department, isOtherDept, availableSlots: { Monday: [1,2,3,4], ... } }
      this.availability[name] = config;
    }

    getAvailability(name) {
      return this.availability[name] || null;
    }

    isFacultyAvailable(name, day, period) {
      const record = this.availability[name];
      if (!record || !record.isOtherDept || !record.availableSlots) {
        // Same department faculty defaults to available unless explicitly constrained
        if (record && record.availableSlots && record.availableSlots[day]) {
          return record.availableSlots[day].includes(period);
        }
        return true;
      }
      const daySlots = record.availableSlots[day];
      if (!daySlots || !Array.isArray(daySlots)) return false;
      return daySlots.includes(period);
    }
  }

  window.FacultyManager = FacultyManager;
})(typeof window !== 'undefined' ? window : this);
