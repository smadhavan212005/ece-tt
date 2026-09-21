"""
Department Timetable Generator - Python Engine
CSP Scheduling Engine mirror for offline testing and verification.
"""
import copy
from itertools import permutations

# Lunch falls after this period for each break system a class can choose:
#   '2-2': P1-P2 | Break | P3-P4 | Lunch | P5-P6 | Break | P7-P8
#   '3-2': P1-P3 | Break | P4-P5 | Lunch | P6-P7 | Break | P8
LUNCH_AFTER_PERIOD = {'2-2': 4, '3-2': 5}
DEFAULT_BREAK_SYSTEM = '2-2'


def lunch_boundary(break_system):
    return LUNCH_AFTER_PERIOD.get(break_system, LUNCH_AFTER_PERIOD[DEFAULT_BREAK_SYSTEM])


# Labs of this many continuous periods or more may cross lunch and breaks; shorter ones never cross lunch.
LUNCH_EXEMPT_MIN_PERIODS = 4


def can_cross_lunch(cont):
    return cont >= LUNCH_EXEMPT_MIN_PERIODS


def scheduler_lab_starts(cont, break_system, total_periods=8):
    """Start periods tried for a lab; P1 is left to Main Courses."""
    lb = lunch_boundary(break_system)
    if not can_cross_lunch(cont):
        if break_system != '3-2':
            return [2, 5, 6] if cont == 3 else [2, 3, 5, 6, 7]
        return [sp for sp in range(2, total_periods - cont + 2) if sp + cont - 1 <= lb or sp > lb]
    # Lunch-exempt: try blocks that avoid lunch first, then ones that cross it
    starts = list(range(2, total_periods - cont + 2))
    avoids = lambda sp: sp + cont - 1 <= lb or sp > lb
    return [sp for sp in starts if avoids(sp)] + [sp for sp in starts if not avoids(sp)]


class PythonTimetableEngine:
    def __init__(self, project_data):
        self.project = copy.deepcopy(project_data)
        self.working_days = self.project.get('metadata', {}).get('workingDays', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
        self.periods_per_day = self.project.get('metadata', {}).get('periodsPerDay', 8)
        self.class_schedules = {}
        self.faculty_schedules = {}
        self.room_schedules = {}
        self.lab_schedules = {}
        self.lab_released_rooms = {}
        self.fixed_rooms = {}
        self.PEER_LEARNING_HALL = 'Peer Learning Hall'

    def init_empty_grid(self):
        grid = {}
        for d in self.working_days:
            grid[d] = {p: None for p in range(1, self.periods_per_day + 1)}
        return grid

    def is_faculty_available(self, fac_name, day, period):
        fac_avail = self.project.get('facultyAvailability', {}).get(fac_name)
        if not fac_avail or not fac_avail.get('isOtherDept'):
            return True
        slots = fac_avail.get('availableSlots', {}).get(day, [])
        return period in slots

    def can_faculty_teach(self, fac_name, day, period, class_code):
        if not self.is_faculty_available(fac_name, day, period):
            return False
        occ = self.faculty_schedules.get(fac_name, {}).get(day, {}).get(period)
        if occ and occ.get('classCode') != class_code:
            return False
        return True

    def are_all_faculty_free(self, faculty_list, day, period, class_code):
        for fac in faculty_list:
            if not self.can_faculty_teach(fac, day, period, class_code):
                return False
        return True

    def is_lab_free(self, lab_name, day, period):
        return period not in self.lab_schedules.get(lab_name, {}).get(day, {})

    def assign_slot(self, class_code, day, period, slot_data):
        self.class_schedules[class_code][day][period] = copy.deepcopy(slot_data)

        # Faculty
        for fac in slot_data.get('faculty', []):
            self.faculty_schedules.setdefault(fac, {}).setdefault(day, {})[period] = {
                'classCode': class_code,
                'subjectCode': slot_data.get('subjectCode'),
                'subjectName': slot_data.get('subjectName'),
                'room': slot_data.get('room'),
                'isLab': slot_data.get('isLab', False)
            }

        # Lab
        if slot_data.get('isLab') and slot_data.get('labName'):
            lab_name = slot_data['labName']
            self.lab_schedules.setdefault(lab_name, {}).setdefault(day, {})[period] = {
                'classCode': class_code,
                'subjectCode': slot_data.get('subjectCode'),
                'faculty': slot_data.get('faculty', [])
            }
            # Release classroom if fixed
            fixed = self.fixed_rooms.get(class_code)
            if fixed:
                self.lab_released_rooms.setdefault(day, {}).setdefault(period, [])
                if fixed not in self.lab_released_rooms[day][period]:
                    self.lab_released_rooms[day][period].append(fixed)

        # Room
        if slot_data.get('room') and not slot_data.get('isLab'):
            room = slot_data['room']
            self.room_schedules.setdefault(room, {}).setdefault(day, {})[period] = {
                'classCode': class_code,
                'subjectCode': slot_data.get('subjectCode'),
                'faculty': slot_data.get('faculty', [])
            }

    def allocate_room(self, class_code, year, strength, day, period):
        fixed = self.fixed_rooms.get(class_code)
        # 1. Fixed room for junior classes (Year <= 2)
        if year <= 2:
            if fixed:
                occ = self.room_schedules.get(fixed, {}).get(day, {}).get(period)
                if not occ:
                    return fixed
            return None

        # 2. Senior: regular available -> released room -> Peer Learning Hall
        for r in self.project.get('departmentConfig', {}).get('classrooms', []):
            r_name = r.get('room') if isinstance(r, dict) else r
            cap = r.get('capacity') if isinstance(r, dict) else None
            if not strength or not cap or cap >= strength:
                occ = self.room_schedules.get(r_name, {}).get(day, {}).get(period)
                if not occ:
                    return r_name

        released = self.lab_released_rooms.get(day, {}).get(period, [])
        for rel in released:
            occ = self.room_schedules.get(rel, {}).get(day, {}).get(period)
            if not occ:
                return rel

        # Peer Learning Hall (if available and not disallowed)
        if self.PEER_LEARNING_HALL:
            plh_occ = self.room_schedules.get(self.PEER_LEARNING_HALL, {}).get(day, {}).get(period)
            if not plh_occ:
                return self.PEER_LEARNING_HALL

        return None

    def schedule_p1_globally(self, classes, class_configs):
        # Schedule P1 for classes with 5 Main courses
        classes_with_5_mains = []
        for c in classes:
            cfg = class_configs.get(c['code'], {})
            mains = [s for s in cfg.get('subjects', []) if s.get('type') == 'Main Course']
            if len(mains) > len(self.working_days):
                raise ValueError(f"Mathematical conflict: Class {c['code']} has {len(mains)} Main Courses but only {len(self.working_days)} working days.")
            if len(mains) == len(self.working_days):
                classes_with_5_mains.append((c, mains))

        assignment = {}
        day_fac_used = {d: set() for d in self.working_days}

        # Check existing locked P1 slots
        existing = self.project.get('existingSchedules', {})
        for c_code, days_map in existing.items():
            for d, p_map in days_map.items():
                slot = p_map.get('1') or p_map.get(1)
                if slot and slot.get('isLocked'):
                    assignment[(c_code, d)] = slot
                    for fac in slot.get('faculty', []):
                        day_fac_used[d].add(fac)

        def solve_p1(idx):
            if idx == len(classes_with_5_mains):
                return True
            cls_item, mains = classes_with_5_mains[idx]
            c_code = cls_item['code']

            # Try permutations of the 5 mains across the 5 working days
            for perm in permutations(mains):
                valid = True
                for d_i, subj in enumerate(perm):
                    day = self.working_days[d_i]
                    if (c_code, day) in assignment:
                        continue
                    # Check faculty availability & conflict
                    for fac in subj.get('faculty', []):
                        if not self.is_faculty_available(fac, day, 1) or fac in day_fac_used[day]:
                            valid = False
                            break
                    if not valid:
                        break

                if valid:
                    added_fac = []
                    for d_i, subj in enumerate(perm):
                        day = self.working_days[d_i]
                        if (c_code, day) not in assignment:
                            assignment[(c_code, day)] = subj
                            for fac in subj.get('faculty', []):
                                day_fac_used[day].add(fac)
                                added_fac.append((day, fac))

                    if solve_p1(idx + 1):
                        return True

                    # Backtrack
                    for day, fac in added_fac:
                        day_fac_used[day].remove(fac)
                    for d_i, subj in enumerate(perm):
                        day = self.working_days[d_i]
                        if assignment.get((c_code, day)) == subj:
                            del assignment[(c_code, day)]

            return False

        if not solve_p1(0):
            raise ValueError("Unable to schedule conflict-free Main Course Period 1 assignment across classes.")

        # Commit P1 assignment and immediately assign rooms for P1
        for (c_code, day), subj in assignment.items():
            cls_obj = next(c for c in classes if c['code'] == c_code)
            room = self.allocate_room(c_code, cls_obj.get('year', 1), cls_obj.get('strength'), day, 1)
            if not room:
                raise ValueError(f"Classroom shortage on {day} Period 1 for Class {c_code}.")
            self.assign_slot(c_code, day, 1, {
                'subjectCode': subj['code'],
                'subjectName': subj['name'],
                'subjectType': 'Main Course',
                'faculty': subj.get('faculty', []),
                'room': room,
                'isLab': False
            })

    def generate(self):
        classes = self.project.get('classes', [])
        classrooms = self.project.get('departmentConfig', {}).get('classrooms', [])
        class_configs = self.project.get('classConfigurations', {})

        if len(classrooms) == 0:
            raise ValueError("No classrooms available.")

        for cls in classes:
            self.class_schedules[cls['code']] = self.init_empty_grid()

        # Fixed rooms assignment
        room_names = [r.get('room') if isinstance(r, dict) else r for r in classrooms]
        juniors = [c for c in classes if c.get('year', 1) <= 2]
        seniors = [c for c in classes if c.get('year', 1) >= 3]

        avail_rooms = list(room_names)
        for j in juniors:
            if avail_rooms:
                self.fixed_rooms[j['code']] = avail_rooms.pop(0)
        for s in seniors:
            if avail_rooms:
                self.fixed_rooms[s['code']] = avail_rooms.pop(0)

        # Check total juniors vs available classrooms
        if len(juniors) > len(classrooms):
            raise ValueError(f"Classroom shortage: {len(juniors)} junior classes require fixed classrooms, but only {len(classrooms)} classrooms exist.")

        # Locked slots preservation
        existing = self.project.get('existingSchedules', {})
        for c_code, days_map in existing.items():
            if c_code in self.class_schedules:
                for d, p_map in days_map.items():
                    for p, slot in p_map.items():
                        if slot and slot.get('isLocked'):
                            self.assign_slot(c_code, d, int(p), slot)

        # 1. Schedule Main Course P1 Rule globally
        self.schedule_p1_globally(classes, class_configs)

        # 2. Schedule Labs (Valid starts: P2 for morning, P5 or P6 for afternoon)
        for cls in classes:
            cfg = class_configs.get(cls['code'], {})
            for subj in cfg.get('subjects', []):
                if subj.get('type') == 'Lab':
                    cont = subj.get('continuous', 3)
                    lab_name = subj.get('labName', 'VLSI Lab')
                    fac = subj.get('faculty', [])
                    placed = False

                    # Lunch position depends on the class's break system (default: two-period system)
                    lb = lunch_boundary(cfg.get('breakSystem'))

                    # Valid starts avoiding P1 when class has 5 main courses
                    valid_starts = scheduler_lab_starts(cont, cfg.get('breakSystem'))
                    for d in self.working_days:
                        if placed: break
                        for sp in valid_starts:
                            can_fit = True
                            for offset in range(cont):
                                p = sp + offset
                                if p > self.periods_per_day: can_fit = False; break
                                if not can_cross_lunch(cont) and ((sp <= lb and p > lb) or (sp > lb and p <= lb)): can_fit = False; break # No lunch cross (4+ period labs exempt)
                                if self.class_schedules[cls['code']][d][p] is not None: can_fit = False; break
                                if not self.is_lab_free(lab_name, d, p): can_fit = False; break
                                if not self.are_all_faculty_free(fac, d, p, cls['code']): can_fit = False; break
                            
                            if can_fit:
                                for offset in range(cont):
                                    p = sp + offset
                                    self.assign_slot(cls['code'], d, p, {
                                        'subjectCode': subj['code'],
                                        'subjectName': subj['name'],
                                        'subjectType': 'Lab',
                                        'faculty': fac,
                                        'room': lab_name,
                                        'labName': lab_name,
                                        'isLab': True,
                                        'continuousTotal': cont
                                    })
                                placed = True
                                break
                    if not placed:
                        raise ValueError(f"Unable to schedule Lab {subj['name']} ({lab_name}) for Class {cls['code']}.")

        # 3. Schedule Simultaneous groups if any
        for cls in classes:
            cfg = class_configs.get(cls['code'], {})
            for group in cfg.get('simultaneousGroups', []):
                g_codes = group.get('subjects', [])
                g_subjs = [s for s in cfg.get('subjects', []) if s.get('code') in g_codes]
                if len(g_subjs) < 2: continue
                target_h = min(s.get('hours', 4) for s in g_subjs)
                for _ in range(target_h):
                    placed = False
                    for d in self.working_days:
                        if placed: break
                        for p in range(1, self.periods_per_day + 1):
                            if self.class_schedules[cls['code']][d][p] is None:
                                room = self.allocate_room(cls['code'], cls.get('year', 1), cls.get('strength'), d, p)
                                if room and all(self.are_all_faculty_free(s.get('faculty', []), d, p, cls['code']) for s in g_subjs):
                                    comb_fac = []
                                    for s in g_subjs:
                                        comb_fac.extend(s.get('faculty', []))
                                    self.assign_slot(cls['code'], d, p, {
                                        'subjectCode': '/'.join(g_codes),
                                        'subjectName': ' / '.join(s['name'] for s in g_subjs),
                                        'subjectType': 'Elective Course',
                                        'faculty': comb_fac,
                                        'room': room,
                                        'isSimultaneous': True,
                                        'isLab': False
                                    })
                                    placed = True
                                    break

        # 4. Schedule remaining theory (Main, Elective, Honours)
        for cls in classes:
            cfg = class_configs.get(cls['code'], {})
            theory = [s for s in cfg.get('subjects', []) if s.get('type') != 'Lab' and s.get('type') != 'Free Period']
            theory.sort(key=lambda s: s.get('hours', 4), reverse=True)
            for subj in theory:
                placed_count = sum(
                    1 for d in self.working_days for p in range(1, self.periods_per_day + 1)
                    if self.class_schedules[cls['code']][d][p] and (
                        self.class_schedules[cls['code']][d][p].get('subjectCode') == subj['code'] or
                        (self.class_schedules[cls['code']][d][p].get('isSimultaneous') and subj['code'] in self.class_schedules[cls['code']][d][p].get('subjectCode', ''))
                    )
                )
                needed = max(0, subj.get('hours', 4) - placed_count)
                for _ in range(needed):
                    placed = False
                    for d in self.working_days:
                        if placed: break
                        for p in range(1, self.periods_per_day + 1):
                            if self.class_schedules[cls['code']][d][p] is None:
                                room = self.allocate_room(cls['code'], cls.get('year', 1), cls.get('strength'), d, p)
                                if room and self.are_all_faculty_free(subj.get('faculty', []), d, p, cls['code']):
                                    self.assign_slot(cls['code'], d, p, {
                                        'subjectCode': subj['code'],
                                        'subjectName': subj['name'],
                                        'subjectType': subj.get('type', 'Main Course'),
                                        'faculty': subj.get('faculty', []),
                                        'room': room,
                                        'isLab': False
                                    })
                                    placed = True
                                    break
                    if not placed:
                        raise ValueError(f"Could not place all hours for {subj['name']} in Class {cls['code']}.")

        # 5. Fill Free Periods
        for cls in classes:
            for d in self.working_days:
                for p in range(1, self.periods_per_day + 1):
                    if self.class_schedules[cls['code']][d][p] is None:
                        self.class_schedules[cls['code']][d][p] = {
                            'subjectCode': 'FREE',
                            'subjectName': 'Free Period',
                            'subjectType': 'Free Period',
                            'faculty': [],
                            'room': '-',
                            'isLab': False
                        }

        return {
            'classSchedules': self.class_schedules,
            'facultySchedules': self.faculty_schedules,
            'roomSchedules': self.room_schedules,
            'labSchedules': self.lab_schedules
        }
