/**
 * Department Timetable Generator - Classroom Manager
 * Manages physical classrooms, 1st/2nd year fixed allocation,
 * 3rd/4th year variable room assignment, lab-released room reuse,
 * and Peer Learning Hall overflow handling.
 */

(function (window) {
  'use strict';

  class ClassroomManager {
    constructor(classrooms, classes) {
      // classrooms: [{ room: '101', capacity: 60 }, ...]
      this.classrooms = Array.isArray(classrooms) ? JSON.parse(JSON.stringify(classrooms)) : [];
      this.classes = Array.isArray(classes) ? JSON.parse(JSON.stringify(classes)) : [];
      
      // Fixed room mapping: { [classCode]: roomNumber }
      this.fixedAssignments = {};

      // Peer Learning Hall is a special variable room
      this.PEER_LEARNING_HALL = 'Peer Learning Hall';

      this.initFixedClassrooms();
    }

    initFixedClassrooms() {
      // Sort classes: 1st and 2nd years first
      const juniorClasses = this.classes.filter(c => c.year <= 2);
      const seniorClasses = this.classes.filter(c => c.year >= 3);

      const availableRoomList = [...this.classrooms];

      // Assign fixed rooms to 1st & 2nd years first
      for (const cls of juniorClasses) {
        if (availableRoomList.length > 0) {
          // If capacity is available, find best fit room
          let chosenIdx = 0;
          if (cls.strength) {
            const fitIdx = availableRoomList.findIndex(r => !r.capacity || r.capacity >= cls.strength);
            if (fitIdx !== -1) chosenIdx = fitIdx;
          }
          const roomObj = availableRoomList.splice(chosenIdx, 1)[0];
          this.fixedAssignments[cls.code] = roomObj.room;
        }
      }

      // If there are still regular classrooms left, assign fixed rooms to senior classes too
      for (const cls of seniorClasses) {
        if (availableRoomList.length > 0) {
          let chosenIdx = 0;
          if (cls.strength) {
            const fitIdx = availableRoomList.findIndex(r => !r.capacity || r.capacity >= cls.strength);
            if (fitIdx !== -1) chosenIdx = fitIdx;
          }
          const roomObj = availableRoomList.splice(chosenIdx, 1)[0];
          this.fixedAssignments[cls.code] = roomObj.room;
        }
      }
    }

    getFixedRoom(classCode) {
      return this.fixedAssignments[classCode] || null;
    }

    getAllClassroomNames() {
      return this.classrooms.map(r => r.room);
    }

    getRoomCapacity(roomNumber) {
      const found = this.classrooms.find(r => r.room === roomNumber);
      return found ? (found.capacity || null) : null;
    }

    /**
     * Find a suitable room for classCode at (day, period).
     * @param {string} classCode 
     * @param {number} classYear 
     * @param {number|null} classStrength 
     * @param {string} day 
     * @param {number} period 
     * @param {Object} roomOccupancy - { [roomName]: { [day]: { [period]: classCode } } }
     * @param {Array} labReleasedRoomsInSlot - list of room numbers temporarily released by classes in lab
     * @returns {string|null} Room assigned or null if none available
     */
    allocateRoomForSlot(classCode, classYear, classStrength, day, period, roomOccupancy, labReleasedRoomsInSlot = []) {
      // 1. If class has a fixed room (especially 1st & 2nd year):
      const fixed = this.getFixedRoom(classCode);
      if (fixed) {
        const isOccupied = roomOccupancy[fixed] && roomOccupancy[fixed][day] && roomOccupancy[fixed][day][period];
        if (!isOccupied) {
          // Check capacity
          if (!classStrength || !this.getRoomCapacity(fixed) || this.getRoomCapacity(fixed) >= classStrength) {
            return fixed;
          }
        }
      }

      // 2. If it is 1st or 2nd year, they MUST strictly use their fixed room!
      if (classYear <= 2) {
        if (fixed) {
          const isOccupied = roomOccupancy[fixed] && roomOccupancy[fixed][day] && roomOccupancy[fixed][day][period];
          if (!isOccupied) return fixed;
        }
        return null;
      }

      // 3. For 3rd and 4th years: Variable classrooms
      // Priority 1: Suitable normally available classroom
      for (const roomObj of this.classrooms) {
        const occ = roomOccupancy[roomObj.room] && roomOccupancy[roomObj.room][day] && roomOccupancy[roomObj.room][day][period];
        if (!occ) {
          if (!classStrength || !roomObj.capacity || roomObj.capacity >= classStrength) {
            return roomObj.room;
          }
        }
      }

      // Priority 2: Classroom released by a class attending a laboratory
      for (const releasedRoom of labReleasedRoomsInSlot) {
        const occ = roomOccupancy[releasedRoom] && roomOccupancy[releasedRoom][day] && roomOccupancy[releasedRoom][day][period];
        if (!occ) {
          const cap = this.getRoomCapacity(releasedRoom);
          if (!classStrength || !cap || cap >= classStrength) {
            return releasedRoom;
          }
        }
      }

      // Priority 3: Peer Learning Hall (as variable overflow for 3rd & 4th year)
      const plhOcc = roomOccupancy[this.PEER_LEARNING_HALL] &&
        roomOccupancy[this.PEER_LEARNING_HALL][day] &&
        roomOccupancy[this.PEER_LEARNING_HALL][day][period];
      
      // Note: Peer Learning Hall can host an overflow class
      if (!plhOcc) {
        return this.PEER_LEARNING_HALL;
      }

      return null; // All exhausted
    }
  }

  window.ClassroomManager = ClassroomManager;
})(typeof window !== 'undefined' ? window : this);
