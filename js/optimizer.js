/**
 * Department Timetable Generator - Quality Optimizer
 * Evaluates soft constraints and calculates a comprehensive quality score (0 - 100).
 */

(function (window) {
  'use strict';

  const Optimizer = {
    calculateScore(context) {
      const { classSchedules, facultySchedules, roomSchedules, project, workingDays, periodsPerDay } = context;

      let score = 100;
      const metrics = {
        subjectDistributionScore: 100,
        facultyConsecutiveScore: 100,
        peerLearningHallUsage: 0,
        classroomSwitchingScore: 100,
        workloadBalanceScore: 100
      };

      const classes = project.classes || [];

      // 1. Evaluate Subject Distribution:
      // Penalize if a theory subject has 3+ periods on the same day
      let heavyDayCount = 0;
      for (const cls of classes) {
        const sched = classSchedules[cls.code];
        if (!sched) continue;
        for (const day of workingDays) {
          const counts = {};
          for (let p = 1; p <= periodsPerDay; p++) {
            const slot = sched[day][p];
            if (slot && !slot.isLab && slot.subjectCode !== 'FREE') {
              counts[slot.subjectCode] = (counts[slot.subjectCode] || 0) + 1;
            }
          }
          for (const code in counts) {
            if (counts[code] > 2) {
              heavyDayCount++;
            }
          }
        }
      }
      const distPenalty = Math.min(25, heavyDayCount * 4);
      metrics.subjectDistributionScore = Math.max(0, 100 - distPenalty * 4);
      score -= distPenalty;

      // 2. Evaluate Faculty Continuous Teaching:
      // Penalize faculty teaching > 3 consecutive periods without a break
      let facultyOverstretchCount = 0;
      for (const fac in facultySchedules) {
        const facDays = facultySchedules[fac];
        for (const day of workingDays) {
          let consecutive = 0;
          for (let p = 1; p <= periodsPerDay; p++) {
            if (facDays[day] && facDays[day][p]) {
              consecutive++;
              if (consecutive > 3) {
                facultyOverstretchCount++;
              }
            } else {
              consecutive = 0;
            }
          }
        }
      }
      const facPenalty = Math.min(20, facultyOverstretchCount * 3);
      metrics.facultyConsecutiveScore = Math.max(0, 100 - facPenalty * 5);
      score -= facPenalty;

      // 3. Peer Learning Hall Utilization:
      // PLH is an overflow room; keeping its usage minimal is better
      let plhSlots = 0;
      for (const cls of classes) {
        const sched = classSchedules[cls.code];
        if (!sched) continue;
        for (const day of workingDays) {
          for (let p = 1; p <= periodsPerDay; p++) {
            const slot = sched[day][p];
            if (slot && slot.room === 'Peer Learning Hall') {
              plhSlots++;
            }
          }
        }
      }
      metrics.peerLearningHallUsage = plhSlots;
      // Slight penalty for excessive overflow
      const plhPenalty = Math.min(10, Math.floor(plhSlots / 3));
      score -= plhPenalty;

      // 4. Daily Workload Balance for Classes
      let unbalancedDays = 0;
      for (const cls of classes) {
        const sched = classSchedules[cls.code];
        if (!sched) continue;
        const loads = workingDays.map(day => {
          let count = 0;
          for (let p = 1; p <= periodsPerDay; p++) {
            const slot = sched[day][p];
            if (slot && slot.subjectCode !== 'FREE') count++;
          }
          return count;
        });
        const maxL = Math.max(...loads);
        const minL = Math.min(...loads);
        if (maxL - minL > 3) {
          unbalancedDays++;
        }
      }
      const workPenalty = Math.min(15, unbalancedDays * 3);
      metrics.workloadBalanceScore = Math.max(0, 100 - workPenalty * 6);
      score -= workPenalty;

      const finalScore = Math.max(0, Math.min(100, Math.round(score)));

      return {
        score: finalScore,
        metrics: metrics
      };
    }
  };

  window.Optimizer = Optimizer;
})(typeof window !== 'undefined' ? window : this);
