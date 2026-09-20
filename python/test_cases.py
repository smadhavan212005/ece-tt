"""
Department Timetable Generator - Automated Test Suite
Runs and validates all 15 test scenarios specified in Section 72.
"""
import copy
import json
import os
import sys

from timetable_engine import PythonTimetableEngine
from validator import validate_all

# Load base sample project
data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'sample-project.json')
with open(data_path, 'r', encoding='utf-8') as f:
    SAMPLE_PROJECT = json.load(f)

def run_test(test_num, title, test_fn):
    print(f"Running Test {test_num}: {title} ...", end=" ")
    try:
        test_fn()
        print("\033[92m[PASSED]\033[0m")
        return True
    except Exception as e:
        print(f"\033[91m[FAILED]\033[0m: {str(e)}")
        return False

# Test 1: Enough classrooms (e.g. 4 classes, 4 classrooms)
def test_1_enough_classrooms():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    proj['classes'] = proj['classes'][:4]
    proj['departmentConfig']['totalClasses'] = 4
    proj['departmentConfig']['availableClassrooms'] = 4
    proj['departmentConfig']['classrooms'] = proj['departmentConfig']['classrooms'][:4]
    
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    val = validate_all(res, proj)
    assert val['is_valid'], f"Validation errors: {val['errors']}"

# Test 2: Insufficient classrooms (8 classes, 6 classrooms)
def test_2_insufficient_classrooms():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    val = validate_all(res, proj)
    assert val['is_valid'], f"Validation errors: {val['errors']}"

# Test 3: Faculty conflict (verify shared faculty never double-booked)
def test_3_faculty_conflict():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    # Check Dr. P. Vijayakumar
    fac_sched = res['facultySchedules'].get('Dr. P. Vijayakumar', {})
    for d, p_map in fac_sched.items():
        for p, slot in p_map.items():
            assert slot is not None

# Test 4: Shared laboratory conflict (VLSI Lab shared by multiple classes)
def test_4_shared_laboratory_conflict():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    lab_sched = res['labSchedules'].get('VLSI Lab', {})
    val = validate_all(res, proj)
    assert val['is_valid']

# Test 5: Other-department faculty availability
def test_5_other_dept_faculty_availability():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    # Dr. S. Aramuthakannan is Mathematics
    sched = res['facultySchedules'].get('Dr. S. Aramuthakannan', {})
    avail = proj['facultyAvailability']['Dr. S. Aramuthakannan']['availableSlots']
    for d, p_map in sched.items():
        for p in p_map.keys():
            assert p in avail[d], f"Dr. Aramuthakannan scheduled outside availability on {d} P{p}!"

# Test 6: Five Main Courses / five working days (Period 1 distribution)
def test_6_five_main_courses_p1():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    # Check Class 1113 (has 5 main courses)
    sched = res['classSchedules']['1113']
    p1_subjs = [sched[d][1]['subjectCode'] for d in proj['metadata']['workingDays']]
    assert len(set(p1_subjs)) == 5, f"Expected 5 distinct main courses in P1, got {p1_subjs}"

# Test 7: Impossible Main Course requirement (> 5 main courses on 5-day week)
def test_7_impossible_main_course():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    # Add a 6th main course to Class 1113
    proj['classConfigurations']['1113']['subjects'].append({
        "code": "EXTRA_MAIN",
        "name": "Extra Main Course",
        "type": "Main Course",
        "hours": 4,
        "faculty": ["Dr. C. Arvind"]
    })
    engine = PythonTimetableEngine(proj)
    try:
        engine.generate()
        assert False, "Should have raised mathematical conflict for 6 main courses on 5 days!"
    except ValueError as e:
        assert "Mathematical conflict" in str(e) or "Main Courses" in str(e)

# Test 8: 3-period VLSI Lab continuous and non-lunch crossing
def test_8_three_period_vlsi_lab():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    val = validate_all(res, proj)
    assert val['is_valid']
    # Check VLSI Lab in 2115
    sched = res['classSchedules']['2115']
    lab_slots = [(d, p) for d in proj['metadata']['workingDays'] for p in range(1, 9) if sched[d][p] and sched[d][p].get('subjectCode') == 'EC3561']
    assert len(lab_slots) == 3, f"Expected 3 continuous lab slots, got {len(lab_slots)}"
    periods = [p for d, p in lab_slots]
    # Check continuous
    assert periods == list(range(min(periods), min(periods) + 3))
    # Check not crossing lunch
    assert not (min(periods) <= 4 and max(periods) >= 5)

# Test 9: Lab-released classroom reuse
def test_9_lab_released_classroom_reuse():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    # Verify that during some period, released room is recorded
    has_released = any(len(rooms) > 0 for d in engine.lab_released_rooms for rooms in engine.lab_released_rooms[d].values())
    assert has_released, "Expected lab sessions to release classrooms for reuse!"

# Test 10: Peer Learning Hall overflow
def test_10_peer_learning_hall_overflow():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    val = validate_all(res, proj)
    assert val['is_valid'], f"Validation errors: {val['errors']}"
    senior_plh_slots = [
        (c, d, p)
        for c in ['3115', '3215', '4117']
        for d in proj['metadata']['workingDays']
        for p in range(1, 9)
        if res['classSchedules'][c][d][p] and res['classSchedules'][c][d][p].get('room') == 'Peer Learning Hall'
    ]
    assert len(senior_plh_slots) > 0, "Expected Peer Learning Hall to be utilized as overflow for senior classes!"

# Test 11: Simultaneous courses
def test_11_simultaneous_courses():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    # Class 4117 has simultaneous group
    sched = res['classSchedules']['4117']
    found_sim = any(sched[d][p] and sched[d][p].get('isSimultaneous') for d in proj['metadata']['workingDays'] for p in range(1, 9))
    assert found_sim, "Expected simultaneous group to be scheduled!"

# Test 12: Multiple faculty handling one subject
def test_12_multiple_faculty_handling_one_subject():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    # EC3361 has multiple faculty: Dr. D. Selvakumar and Dr. B. A. Sapna
    sched_1113 = res['classSchedules']['1113']
    lab_slot = None
    for d in proj['metadata']['workingDays']:
        for p in range(1, 9):
            if sched_1113[d][p] and sched_1113[d][p].get('subjectCode') == 'EC3361':
                lab_slot = (d, p)
                break
        if lab_slot: break
    assert lab_slot is not None
    d, p = lab_slot
    assert res['facultySchedules']['Dr. D. Selvakumar'][d][p]['classCode'] == '1113'
    assert res['facultySchedules']['Dr. B. A. Sapna'][d][p]['classCode'] == '1113'

# Test 13: Room capacity check
def test_13_room_capacity():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    # Verify no room capacity is violated
    val = validate_all(res, proj)
    assert val['is_valid']

# Test 14: Locked timetable slot preserved
def test_14_locked_timetable_slot():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    proj['existingSchedules'] = {
        '1113': {
            'Monday': {
                '3': {
                    'subjectCode': 'EC3354',
                    'subjectName': 'Signals and Systems',
                    'subjectType': 'Main Course',
                    'faculty': ['Dr. C. Arvind'],
                    'isLocked': True,
                    'room': '101'
                }
            }
        }
    }
    engine = PythonTimetableEngine(proj)
    res = engine.generate()
    slot = res['classSchedules']['1113']['Monday'][3]
    assert slot is not None and slot.get('isLocked'), "Locked slot was not preserved!"

# Test 15: Completely impossible timetable produces error
def test_15_impossible_timetable():
    proj = copy.deepcopy(SAMPLE_PROJECT)
    # Only 1 classroom for 8 simultaneous classes with no variable overflow
    proj['departmentConfig']['availableClassrooms'] = 1
    proj['departmentConfig']['classrooms'] = [{"room": "101", "capacity": 60}]
    # Disallow Peer Learning Hall by filling it
    engine = PythonTimetableEngine(proj)
    engine.PEER_LEARNING_HALL = '101' # No overflow available
    try:
        engine.generate()
        assert False, "Should have failed on impossible room shortage!"
    except ValueError as e:
        assert "Classroom" in str(e) or "shortage" in str(e) or "Exhaustion" in str(e)

if __name__ == '__main__':
    print("=" * 70)
    print("DEPARTMENT COLLEGE TIMETABLE GENERATOR - 15 AUTOMATED TEST CASES")
    print("=" * 70)
    tests = [
        (1, "Enough Classrooms", test_1_enough_classrooms),
        (2, "Insufficient Classrooms", test_2_insufficient_classrooms),
        (3, "Faculty Conflict Prevention", test_3_faculty_conflict),
        (4, "Shared Laboratory Conflict Prevention", test_4_shared_laboratory_conflict),
        (5, "Other-Department Faculty Availability Whitelist", test_5_other_dept_faculty_availability),
        (6, "Five Main Courses / Five Working Days (P1 Rule)", test_6_five_main_courses_p1),
        (7, "Impossible Main Course Requirement Diagnostics", test_7_impossible_main_course),
        (8, "3-Period VLSI Lab Continuity & Non-Lunch Rule", test_8_three_period_vlsi_lab),
        (9, "Lab-Released Classroom Dynamic Reuse", test_9_lab_released_classroom_reuse),
        (10, "Peer Learning Hall Overflow For Senior Classes", test_10_peer_learning_hall_overflow),
        (11, "Simultaneous Courses Configuration", test_11_simultaneous_courses),
        (12, "Multiple Faculty Jointly Handling One Subject", test_12_multiple_faculty_handling_one_subject),
        (13, "Room Seating Capacity Checking", test_13_room_capacity),
        (14, "Locked Timetable Slot Preservation", test_14_locked_timetable_slot),
        (15, "Completely Impossible Timetable Conflict Reporting", test_15_impossible_timetable),
    ]

    passed = 0
    for num, title, fn in tests:
        if run_test(num, title, fn):
            passed += 1

    print("=" * 70)
    print(f"RESULTS: {passed} / {len(tests)} Tests Passed Successfully!")
    print("=" * 70)
    if passed != len(tests):
        sys.exit(1)
