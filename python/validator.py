"""
Department Timetable Generator - Python Validator
Verifies all Hard constraints on a generated timetable schedule.
"""

def validate_all(generated_result, project_data):
    errors = []
    class_scheds = generated_result.get('classSchedules', {})
    classes = project_data.get('classes', [])
    class_configs = project_data.get('classConfigurations', {})
    days = project_data.get('metadata', {}).get('workingDays', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    periods_per_day = project_data.get('metadata', {}).get('periodsPerDay', 8)
    fac_avail = project_data.get('facultyAvailability', {})

    # 1. Faculty collisions
    fac_map = {}
    for cls in classes:
        sched = class_scheds.get(cls['code'], {})
        for d in days:
            for p in range(1, periods_per_day + 1):
                slot = sched.get(d, {}).get(p)
                if slot and slot.get('faculty'):
                    for f in slot['faculty']:
                        key = (f, d, p)
                        fac_map.setdefault(key, []).append(cls['code'])

    for (f, d, p), assigned_classes in fac_map.items():
        if len(set(assigned_classes)) > 1:
            errors.append(f"Faculty collision: {f} teaches classes {assigned_classes} on {d} P{p}.")

    # 2. Classroom collisions
    room_map = {}
    for cls in classes:
        sched = class_scheds.get(cls['code'], {})
        for d in days:
            for p in range(1, periods_per_day + 1):
                slot = sched.get(d, {}).get(p)
                if slot and slot.get('room') and slot.get('room') != '-' and not slot.get('isLab'):
                    key = (slot['room'], d, p)
                    room_map.setdefault(key, []).append(cls['code'])

    for (r, d, p), assigned_classes in room_map.items():
        if len(set(assigned_classes)) > 1:
            errors.append(f"Classroom collision: Room {r} hosts classes {assigned_classes} on {d} P{p}.")

    # 3. Lab collisions
    lab_map = {}
    for cls in classes:
        sched = class_scheds.get(cls['code'], {})
        for d in days:
            for p in range(1, periods_per_day + 1):
                slot = sched.get(d, {}).get(p)
                if slot and slot.get('isLab') and slot.get('labName'):
                    key = (slot['labName'], d, p)
                    lab_map.setdefault(key, []).append(cls['code'])

    for (l, d, p), assigned_classes in lab_map.items():
        if len(set(assigned_classes)) > 1:
            errors.append(f"Lab collision: Lab {l} used simultaneously by classes {assigned_classes} on {d} P{p}.")

    # 4. Other-dept faculty availability
    for (f, d, p), assigned_classes in fac_map.items():
        avail = fac_avail.get(f)
        if avail and avail.get('isOtherDept'):
            allowed = avail.get('availableSlots', {}).get(d, [])
            if p not in allowed:
                errors.append(f"Availability violation: {f} on {d} P{p} (allowed: {allowed}).")

    # 5. Lab lunch rule
    for cls in classes:
        sched = class_scheds.get(cls['code'], {})
        for d in days:
            p4 = sched.get(d, {}).get(4)
            p5 = sched.get(d, {}).get(5)
            if p4 and p5 and p4.get('isLab') and p5.get('isLab') and p4.get('subjectCode') == p5.get('subjectCode'):
                errors.append(f"Lab lunch violation: Class {cls['code']} lab spans P4 to P5 across lunch on {d}.")

    # 6. Main course P1 rule
    for cls in classes:
        cfg = class_configs.get(cls['code'], {})
        mains = [s['code'] for s in cfg.get('subjects', []) if s.get('type') == 'Main Course']
        if len(mains) == len(days):
            sched = class_scheds.get(cls['code'], {})
            p1_subjs = [sched[d][1].get('subjectCode') for d in days if sched.get(d, {}).get(1)]
            for m in mains:
                if m not in p1_subjs:
                    errors.append(f"Main course P1 rule violation: Class {cls['code']} subject {m} not in P1.")

    # 7. 1st/2nd year fixed classrooms
    for cls in classes:
        if cls.get('year', 1) <= 2:
            sched = class_scheds.get(cls['code'], {})
            used_rooms = {
                sched[d][p].get('room') for d in days for p in range(1, periods_per_day + 1)
                if sched.get(d, {}).get(p) and not sched[d][p].get('isLab') and sched[d][p].get('room') != '-'
            }
            if len(used_rooms) > 1:
                errors.append(f"Junior fixed room violation: Class {cls['code']} used multiple rooms {used_rooms}.")

    # 8. Peer Learning Hall restriction
    for cls in classes:
        if cls.get('year', 1) <= 2:
            sched = class_scheds.get(cls['code'], {})
            for d in days:
                for p in range(1, periods_per_day + 1):
                    slot = sched.get(d, {}).get(p)
                    if slot and slot.get('room') == 'Peer Learning Hall':
                        errors.append(f"Peer Learning Hall violation: Junior class {cls['code']} assigned PLH on {d} P{p}.")

    return {
        'is_valid': len(errors) == 0,
        'errors': errors
    }
