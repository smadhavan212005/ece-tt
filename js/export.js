/**
 * Department Timetable Generator - Export & Import System
 * Handles JSON save/load, CSV exports, and A4 print formatting.
 */

(function (window) {
  'use strict';

  const ExportManager = {
    saveProjectAsJson(projectData, filename = 'department-timetable-project.json') {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projectData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', filename);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    },

    loadProjectFromJsonFile(file, callback) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const parsed = JSON.parse(e.target.result);
          if (!parsed.classes || !parsed.departmentConfig) {
            throw new Error('Invalid project file: missing classes or departmentConfig.');
          }
          callback(null, parsed);
        } catch (err) {
          callback(err, null);
        }
      };
      reader.onerror = function () {
        callback(new Error('Failed to read file.'), null);
      };
      reader.readAsText(file);
    },

    downloadCsv(csvContent, filename) {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },

    exportClassTimetableCsv(classCode, classSchedule, workingDays, periodsPerDay, classObj) {
      const days = workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const periods = periodsPerDay || 8;
      const header = ['Day', ...Array.from({ length: periods }, (_, i) => `Period ${i + 1}`)].join(',');
      const rows = [
        `"CLASS TIMETABLE: ${classCode} - ${(classObj && classObj.label) || ''}"`,
        header
      ];

      for (const day of days) {
        const row = [`"${day}"`];
        for (let p = 1; p <= periods; p++) {
          const slot = classSchedule && classSchedule[day] && classSchedule[day][p];
          if (slot && slot.subjectCode !== 'FREE') {
            const fac = (slot.faculty || []).join(' & ');
            const text = `${slot.subjectName} [${fac}] (${slot.room || '-'})`;
            row.push(`"${text.replace(/"/g, '""')}"`);
          } else {
            row.push('"Free"');
          }
        }
        rows.push(row.join(','));
      }

      this.downloadCsv(rows.join('\n'), `Timetable_Class_${classCode}.csv`);
    },

    exportFacultyTimetableCsv(facultyName, facultySchedule, workingDays, periodsPerDay, dept) {
      const days = workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const periods = periodsPerDay || 8;
      const header = ['Day', ...Array.from({ length: periods }, (_, i) => `Period ${i + 1}`)].join(',');
      const rows = [
        `"FACULTY TIMETABLE: ${facultyName} (${dept || ''})"`,
        header
      ];

      for (const day of days) {
        const row = [`"${day}"`];
        for (let p = 1; p <= periods; p++) {
          const slot = facultySchedule && facultySchedule[day] && facultySchedule[day][p];
          if (slot) {
            const text = `Class ${slot.classCode}: ${slot.subjectName} -> ${slot.room || '-'}`;
            row.push(`"${text.replace(/"/g, '""')}"`);
          } else {
            row.push('"Free"');
          }
        }
        rows.push(row.join(','));
      }

      this.downloadCsv(rows.join('\n'), `Timetable_Faculty_${facultyName.replace(/[^a-zA-Z0-9]/g, '_')}.csv`);
    },

    exportRoomTimetableCsv(roomName, roomSchedule, workingDays, periodsPerDay) {
      const days = workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const periods = periodsPerDay || 8;
      const header = ['Day', ...Array.from({ length: periods }, (_, i) => `Period ${i + 1}`)].join(',');
      const rows = [
        `"CLASSROOM TIMETABLE: Room ${roomName}"`,
        header
      ];

      for (const day of days) {
        const row = [`"${day}"`];
        for (let p = 1; p <= periods; p++) {
          const slot = roomSchedule && roomSchedule[day] && roomSchedule[day][p];
          if (slot) {
            const fac = (slot.faculty || []).join(' & ');
            const text = `Class ${slot.classCode} (${slot.subjectName}) [${fac}]`;
            row.push(`"${text.replace(/"/g, '""')}"`);
          } else {
            row.push('"Free"');
          }
        }
        rows.push(row.join(','));
      }

      this.downloadCsv(rows.join('\n'), `Timetable_Room_${roomName.replace(/[^a-zA-Z0-9]/g, '_')}.csv`);
    },

    exportLabTimetableCsv(labName, labSchedule, workingDays, periodsPerDay) {
      const days = workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const periods = periodsPerDay || 8;
      const header = ['Day', ...Array.from({ length: periods }, (_, i) => `Period ${i + 1}`)].join(',');
      const rows = [
        `"LABORATORY TIMETABLE: ${labName}"`,
        header
      ];

      for (const day of days) {
        const row = [`"${day}"`];
        for (let p = 1; p <= periods; p++) {
          const slot = labSchedule && labSchedule[day] && labSchedule[day][p];
          if (slot) {
            const fac = (slot.faculty || []).join(' & ');
            const text = `Class ${slot.classCode}: ${slot.subjectName} [${fac}]`;
            row.push(`"${text.replace(/"/g, '""')}"`);
          } else {
            row.push('"Free"');
          }
        }
        rows.push(row.join(','));
      }

      this.downloadCsv(rows.join('\n'), `Timetable_Lab_${labName.replace(/[^a-zA-Z0-9]/g, '_')}.csv`);
    },

    printCurrentTimetable() {
      window.print();
    }
  };

  window.ExportManager = ExportManager;
})(typeof window !== 'undefined' ? window : this);
