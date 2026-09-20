import csv
import json
import os
import re

ROMAN_SEMESTERS = {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7, "VIII": 8}

def parse_subjects():
    csv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'BE_ECE_All_Subjects_Codes.csv')
    subjects = []
    seen = set()
    
    # Pre-add dedicated VLSI subjects
    vlsi_subjects = [
        {"code": "EC3552", "name": "VLSI and Chip Design", "category": "Compulsory", "defaultType": "Main Course", "semester": 5},
        {"code": "EC3561", "name": "VLSI Laboratory", "category": "Compulsory", "defaultType": "Lab", "semester": 5, "defaultLab": "VLSI Lab", "continuous": 3},
        {"code": "VL3401", "name": "Digital VLSI Design", "category": "Core", "defaultType": "Main Course", "semester": 4},
        {"code": "VL3501", "name": "CMOS Analog IC Design", "category": "Core", "defaultType": "Main Course", "semester": 5},
        {"code": "VL3601", "name": "Low Power VLSI Design", "category": "Core", "defaultType": "Main Course", "semester": 6},
        {"code": "VL3611", "name": "FPGA and ASIC Design Laboratory", "category": "Core", "defaultType": "Lab", "semester": 6, "defaultLab": "VLSI Lab", "continuous": 3},
        {"code": "VL3701", "name": "VLSI Testing and Verification", "category": "Core", "defaultType": "Main Course", "semester": 7},
        {"code": "VL3702", "name": "Hardware Description Languages (Verilog/VHDL)", "category": "Core", "defaultType": "Main Course", "semester": 7},
        {"code": "VL3711", "name": "Cadence / Synopsys EDA Lab", "category": "Core", "defaultType": "Lab", "semester": 7, "defaultLab": "EDA Lab", "continuous": 3}
    ]
    for vs in vlsi_subjects:
        vs["regulation"] = "2021"
        seen.add(vs["code"])
        subjects.append(vs)

    if os.path.exists(csv_path):
        with open(csv_path, mode='r', encoding='utf-8-sig', errors='ignore') as f:
            reader = csv.DictReader(f)
            for row in reader:
                group = (row.get('Group') or '').strip()
                cat = (row.get('Category') or '').strip()
                code = (row.get('Subject Code') or '').strip()
                title = (row.get('Subject Title') or '').strip()
                regulation = (row.get('Regulation') or '2021').strip()
                
                if not title:
                    continue
                if not code:
                    code = "SUB" + str(len(subjects) + 1)
                
                if code in seen:
                    continue
                seen.add(code)

                # Determine defaultType
                is_lab = 'laboratory' in title.lower() or ' lab' in title.lower() or 'practices' in title.lower()
                is_elective = 'elective' in group.lower() or 'elective' in cat.lower() or 'vertical' in group.lower()
                
                default_type = "Main Course"
                if is_lab:
                    default_type = "Lab"
                elif is_elective:
                    default_type = "Elective Course"
                elif 'honours' in title.lower():
                    default_type = "Honours Course"

                # Extract semester hint
                sem = None
                if 'Semester I' in group and 'Semester II' not in group: sem = 1
                elif 'Semester II' in group: sem = 2
                elif 'Semester III' in group: sem = 3
                elif 'Semester IV' in group: sem = 4
                elif 'Semester V' in group: sem = 5
                elif 'Semester VI' in group: sem = 6
                elif 'Semester VII' in group: sem = 7
                elif 'Semester VIII' in group: sem = 8

                if regulation == '2025':
                    m = re.match(r'Semester (VIII|VII|VI|IV|V|III|II|I)\b', group)
                    sem = ROMAN_SEMESTERS[m.group(1)] if m else None

                subj_obj = {
                    "code": code,
                    "name": title,
                    "category": cat or group,
                    "defaultType": default_type,
                    "semester": sem,
                    "regulation": regulation
                }
                if default_type == "Lab":
                    # Assign a reasonable default lab name
                    if 'vlsi' in title.lower():
                        subj_obj["defaultLab"] = "VLSI Lab"
                    elif 'dsp' in title.lower() or 'signal' in title.lower():
                        subj_obj["defaultLab"] = "DSP Lab"
                    elif 'communication' in title.lower() or 'rf' in title.lower() or 'circuit' in title.lower():
                        subj_obj["defaultLab"] = "Communication & Circuits Lab"
                    elif 'python' in title.lower() or 'programming' in title.lower() or 'data structures' in title.lower():
                        subj_obj["defaultLab"] = "Computing Lab"
                    else:
                        subj_obj["defaultLab"] = title + " Lab"
                    subj_obj["continuous"] = 3

                subjects.append(subj_obj)

    out_file = os.path.join(os.path.dirname(__file__), 'subjects.json')
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(subjects, f, indent=2)
    print(f"Generated subjects.json with {len(subjects)} subjects.")
    return subjects

def parse_faculty():
    csv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'PSG_iTech_Faculty_Department_Wise.csv')
    faculty_dict = {}
    faculty_list = []

    # Ensure VLSI department is populated with key faculty as well
    vlsi_defaults = [
        {"id": "FAC_VLSI_1", "name": "Dr. P. Vijayakumar", "department": "VLSI", "designation": "Professor & HoD", "specialization": "VLSI (Low Power), Automation", "email": "pvk@psgitech.ac.in"},
        {"id": "FAC_VLSI_2", "name": "Dr. M. Jayasanthi", "department": "VLSI", "designation": "Professor", "specialization": "ASIC Design & Signal Processing", "email": "jayasanthiranjith@psgitech.ac.in"},
        {"id": "FAC_VLSI_3", "name": "Dr. S. Sridevi Sathya Priya", "department": "VLSI", "designation": "Associate Professor", "specialization": "VLSI, FPGA Hardware Security", "email": "sridevi.ec@psgitech.ac.in"},
        {"id": "FAC_VLSI_4", "name": "Dr. S. Padmapriya", "department": "VLSI", "designation": "Assistant Professor (Sl.G)", "specialization": "Low Power VLSI, Reconfigurable Architectures", "email": "padmapriya@psgitech.ac.in"},
        {"id": "FAC_VLSI_5", "name": "Dr. M. Deepa", "department": "VLSI", "designation": "Assistant Professor (Sl.G)", "specialization": "Digital Design and VLSI Design", "email": "deepa@psgitech.ac.in"},
        {"id": "FAC_VLSI_6", "name": "Dr. K. Paldurai", "department": "VLSI", "designation": "Assistant Professor (Sl.G)", "specialization": "Digital Arithmetic Circuit Design, Mixed Signal IC", "email": "paldurai.k@psgitech.ac.in"},
        {"id": "FAC_VLSI_7", "name": "Dr. J. R. Dinesh Kumar", "department": "VLSI", "designation": "Assistant Professor (Sl.G)", "specialization": "VLSI, Low Power Architectures", "email": "dineshkumar.ec@psgitech.ac.in"},
        {"id": "FAC_VLSI_8", "name": "Dr. M. Priyadharshini", "department": "VLSI", "designation": "Assistant Professor", "specialization": "Hardware Security, VLSI Design, AI", "email": "priyadharshini.ec@psgitech.ac.in"}
    ]
    for fac in vlsi_defaults:
        faculty_list.append(fac)
        faculty_dict.setdefault("VLSI", []).append(fac)

    count = 100
    if os.path.exists(csv_path):
        with open(csv_path, mode='r', encoding='utf-8-sig', errors='ignore') as f:
            reader = csv.DictReader(f)
            for row in reader:
                dept = (row.get('Department') or '').strip()
                name = (row.get('Faculty Name') or '').strip()
                desig = (row.get('Designation') or '').strip()
                spec = (row.get('Specialization') or '').strip()
                email = (row.get('Email') or '').strip()
                if not name or not dept:
                    continue
                count += 1
                fac_obj = {
                    "id": f"FAC_{dept[:3].upper()}_{count}",
                    "name": name,
                    "department": dept,
                    "designation": desig,
                    "specialization": spec,
                    "email": email
                }
                faculty_list.append(fac_obj)
                faculty_dict.setdefault(dept, []).append(fac_obj)

    out_file = os.path.join(os.path.dirname(__file__), 'faculty.json')
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump({"departments": faculty_dict, "list": faculty_list}, f, indent=2)
    print(f"Generated faculty.json with {len(faculty_list)} faculty across {len(faculty_dict)} departments.")
    return faculty_dict, faculty_list

def create_branches():
    branches = [
        {"code": 1, "name": "ECE", "fullName": "Electronics and Communication Engineering"},
        {"code": 2, "name": "VLSI", "fullName": "VLSI Design & Technology"},
        {"code": 3, "name": "CSE", "fullName": "Computer Science and Engineering"},
        {"code": 4, "name": "EEE", "fullName": "Electrical and Electronics Engineering"},
        {"code": 5, "name": "AI & DS", "fullName": "Artificial Intelligence and Data Science"}
    ]
    out_file = os.path.join(os.path.dirname(__file__), 'branches.json')
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(branches, f, indent=2)
    print(f"Generated branches.json with {len(branches)} branches.")
    return branches

def create_sample_project(subjects, faculty_dict):
    # Create realistic sample project for ECE & VLSI department
    # Classes:
    # 1113 (1st Yr ECE A Sem 3), 1123 (1st Yr ECE B Sem 3)
    # 2115 (2nd Yr ECE A Sem 5), 2125 (2nd Yr ECE B Sem 5)
    # 2215 (2nd Yr VLSI A Sem 5)
    # 3115 (3rd Yr ECE A Sem 5), 3215 (3rd Yr VLSI A Sem 5)
    # 4117 (4th Yr ECE A Sem 7)
    # Total classes = 8
    # Available classrooms = 6 (Insufficiency! Forces variable rooms, lab-released room reuse & Peer Learning Hall)
    # Rooms: 101, 102, 103, 104, 201, 202

    project = {
        "metadata": {
            "collegeName": "PSG Institute of Technology and Applied Research",
            "departmentName": "Department of Electronics and Communication Engineering",
            "academicYear": "2026-2027",
            "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "periodsPerDay": 8
        },
        "departmentConfig": {
            "totalClasses": 8,
            "availableClassrooms": 6,
            "classrooms": [
                {"room": "101", "capacity": 65},
                {"room": "102", "capacity": 65},
                {"room": "103", "capacity": 65},
                {"room": "104", "capacity": 65},
                {"room": "201", "capacity": 60},
                {"room": "202", "capacity": 60}
            ]
        },
        "classes": [
            {"code": "1113", "year": 1, "branchCode": 1, "branch": "ECE", "division": "A", "semester": 3, "strength": 60},
            {"code": "1123", "year": 1, "branchCode": 1, "branch": "ECE", "division": "B", "semester": 3, "strength": 58},
            {"code": "2115", "year": 2, "branchCode": 1, "branch": "ECE", "division": "A", "semester": 5, "strength": 60},
            {"code": "2125", "year": 2, "branchCode": 1, "branch": "ECE", "division": "B", "semester": 5, "strength": 58},
            {"code": "2215", "year": 2, "branchCode": 2, "branch": "VLSI", "division": "A", "semester": 5, "strength": 55},
            {"code": "3115", "year": 3, "branchCode": 1, "branch": "ECE", "division": "A", "semester": 5, "strength": 62},
            {"code": "3215", "year": 3, "branchCode": 2, "branch": "VLSI", "division": "A", "semester": 5, "strength": 54},
            {"code": "4117", "year": 4, "branchCode": 1, "branch": "ECE", "division": "A", "semester": 7, "strength": 56}
        ],
        "facultyAvailability": {
            # Mathematics faculty (Other department) restricted periods
            "Dr. S. Aramuthakannan": {
                "department": "Mathematics",
                "isOtherDept": True,
                "availableSlots": {
                    "Monday": [1, 2, 3, 4],
                    "Tuesday": [1, 2, 5, 6],
                    "Wednesday": [2, 3, 4, 5],
                    "Thursday": [1, 2, 3, 4],
                    "Friday": [3, 4, 5, 6]
                }
            },
            "Dr. P. Chinnaraj": {
                "department": "Mathematics",
                "isOtherDept": True,
                "availableSlots": {
                    "Monday": [3, 4, 5, 6],
                    "Tuesday": [1, 2, 3, 4],
                    "Wednesday": [1, 2, 5, 6],
                    "Thursday": [5, 6, 7, 8],
                    "Friday": [1, 2, 3, 4]
                }
            },
            "Dr. B. Gomathy": {
                "department": "CSE",
                "isOtherDept": True,
                "availableSlots": {
                    "Monday": [1, 2, 5, 6],
                    "Tuesday": [3, 4, 7, 8],
                    "Wednesday": [1, 2, 3, 4],
                    "Thursday": [1, 2, 5, 6],
                    "Friday": [5, 6, 7, 8]
                }
            }
        },
        "classConfigurations": {}
    }

    # Class 1113 (1st Year ECE A Sem 3)
    project["classConfigurations"]["1113"] = {
        "subjects": [
            {"code": "MA3355", "name": "Random Processes and Linear Algebra", "type": "Main Course", "hours": 5, "faculty": ["Dr. S. Aramuthakannan"]},
            {"code": "CS3353", "name": "C Programming and Data Structures", "type": "Main Course", "hours": 5, "faculty": ["Dr. B. Gomathy"]},
            {"code": "EC3354", "name": "Signals and Systems", "type": "Main Course", "hours": 5, "faculty": ["Dr. C. Arvind"]},
            {"code": "EC3353", "name": "Electronic Devices and Circuits", "type": "Main Course", "hours": 5, "faculty": ["Dr. D. Selvakumar"]},
            {"code": "EC3351", "name": "Control Systems", "type": "Main Course", "hours": 5, "faculty": ["Dr. G. Santhanamari"]},
            {"code": "EC3361", "name": "Electronic Devices and Circuits Laboratory", "type": "Lab", "hours": 3, "continuous": 3, "labName": "Circuits Lab", "faculty": ["Dr. D. Selvakumar", "Dr. B. A. Sapna"]},
            {"code": "CS3362", "name": "C Programming and Data Structures Laboratory", "type": "Lab", "hours": 3, "continuous": 3, "labName": "Computing Lab", "faculty": ["Dr. B. Gomathy"]},
            {"code": "GE3361", "name": "Professional Development", "type": "Elective Course", "hours": 2, "faculty": ["Dr. K. Pramila"]},
            {"code": "FREE", "name": "Free Period", "type": "Free Period", "hours": 7, "faculty": []}
        ],
        "simultaneousGroups": []
    }

    # Class 1123 (1st Year ECE B Sem 3)
    project["classConfigurations"]["1123"] = {
        "subjects": [
            {"code": "MA3355", "name": "Random Processes and Linear Algebra", "type": "Main Course", "hours": 5, "faculty": ["Dr. P. Chinnaraj"]},
            {"code": "CS3353", "name": "C Programming and Data Structures", "type": "Main Course", "hours": 5, "faculty": ["Dr. B. Gomathy"]},
            {"code": "EC3354", "name": "Signals and Systems", "type": "Main Course", "hours": 5, "faculty": ["Dr. P. Sridhar"]},
            {"code": "EC3353", "name": "Electronic Devices and Circuits", "type": "Main Course", "hours": 5, "faculty": ["Dr. M. Deepa"]},
            {"code": "EC3351", "name": "Control Systems", "type": "Main Course", "hours": 5, "faculty": ["Dr. G. Santhanamari"]},
            {"code": "EC3361", "name": "Electronic Devices and Circuits Laboratory", "type": "Lab", "hours": 3, "continuous": 3, "labName": "Circuits Lab", "faculty": ["Dr. M. Deepa", "Dr. B. A. Sapna"]},
            {"code": "CS3362", "name": "C Programming and Data Structures Laboratory", "type": "Lab", "hours": 3, "continuous": 3, "labName": "Computing Lab", "faculty": ["Dr. B. Gomathy"]},
            {"code": "GE3361", "name": "Professional Development", "type": "Elective Course", "hours": 2, "faculty": ["Dr. S. Gandhimathi"]},
            {"code": "FREE", "name": "Free Period", "type": "Free Period", "hours": 7, "faculty": []}
        ],
        "simultaneousGroups": []
    }

    # Class 2115 (2nd Year ECE A Sem 5)
    project["classConfigurations"]["2115"] = {
        "subjects": [
            {"code": "EC3501", "name": "Wireless Communication", "type": "Main Course", "hours": 5, "faculty": ["Dr. B. Tharini"]},
            {"code": "EC3552", "name": "VLSI and Chip Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. P. Vijayakumar"]},
            {"code": "EC3551", "name": "Transmission Lines and RF Systems", "type": "Main Course", "hours": 5, "faculty": ["Dr. S. P. Cowsigan"]},
            {"code": "EC3492", "name": "Digital Signal Processing", "type": "Main Course", "hours": 5, "faculty": ["Dr. M. Jothibasu"]},
            {"code": "EC3352", "name": "Digital Systems Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. K. Paldurai"]},
            {"code": "EC3561", "name": "VLSI Laboratory", "type": "Lab", "hours": 3, "continuous": 3, "labName": "VLSI Lab", "faculty": ["Dr. P. Vijayakumar", "Dr. M. Deepa"]},
            {"code": "CEC366", "name": "Image Processing", "type": "Elective Course", "hours": 4, "faculty": ["Dr. J. S. Sujin"]},
            {"code": "FREE", "name": "Free Period", "type": "Free Period", "hours": 8, "faculty": []}
        ],
        "simultaneousGroups": []
    }

    # Class 2125 (2nd Year ECE B Sem 5)
    project["classConfigurations"]["2125"] = {
        "subjects": [
            {"code": "EC3501", "name": "Wireless Communication", "type": "Main Course", "hours": 5, "faculty": ["Dr. P. Sakthivel"]},
            {"code": "EC3552", "name": "VLSI and Chip Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. M. Jayasanthi"]},
            {"code": "EC3551", "name": "Transmission Lines and RF Systems", "type": "Main Course", "hours": 5, "faculty": ["Dr. S. P. Cowsigan"]},
            {"code": "EC3492", "name": "Digital Signal Processing", "type": "Main Course", "hours": 5, "faculty": ["Dr. P. Sridhar"]},
            {"code": "EC3352", "name": "Digital Systems Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. S. Padmapriya"]},
            {"code": "EC3561", "name": "VLSI Laboratory", "type": "Lab", "hours": 3, "continuous": 3, "labName": "VLSI Lab", "faculty": ["Dr. M. Jayasanthi", "Dr. S. Padmapriya"]},
            {"code": "CEC366", "name": "Image Processing", "type": "Elective Course", "hours": 4, "faculty": ["Dr. J. S. Sujin"]},
            {"code": "FREE", "name": "Free Period", "type": "Free Period", "hours": 8, "faculty": []}
        ],
        "simultaneousGroups": []
    }

    # Class 2215 (2nd Year VLSI A Sem 5)
    project["classConfigurations"]["2215"] = {
        "subjects": [
            {"code": "VL3401", "name": "Digital VLSI Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. S. Sridevi Sathya Priya"]},
            {"code": "VL3501", "name": "CMOS Analog IC Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. K. Paldurai"]},
            {"code": "EC3552", "name": "VLSI and Chip Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. P. Vijayakumar"]},
            {"code": "VL3702", "name": "Hardware Description Languages", "type": "Main Course", "hours": 5, "faculty": ["Dr. J. R. Dinesh Kumar"]},
            {"code": "CEC370", "name": "Low Power IC Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. S. Padmapriya"]},
            {"code": "EC3561", "name": "VLSI Laboratory", "type": "Lab", "hours": 3, "continuous": 3, "labName": "VLSI Lab", "faculty": ["Dr. S. Sridevi Sathya Priya", "Dr. J. R. Dinesh Kumar"]},
            {"code": "CEC342", "name": "Mixed Signal IC Design Testing", "type": "Elective Course", "hours": 4, "faculty": ["Dr. K. Paldurai"]},
            {"code": "FREE", "name": "Free Period", "type": "Free Period", "hours": 8, "faculty": []}
        ],
        "simultaneousGroups": []
    }

    # Class 3115 (3rd Year ECE A Sem 5)
    project["classConfigurations"]["3115"] = {
        "subjects": [
            {"code": "EC3501", "name": "Wireless Communication", "type": "Main Course", "hours": 5, "faculty": ["Dr. B. Tharini"]},
            {"code": "EC3552", "name": "VLSI and Chip Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. M. Jayasanthi"]},
            {"code": "EC3551", "name": "Transmission Lines and RF Systems", "type": "Main Course", "hours": 5, "faculty": ["Dr. S. P. Cowsigan"]},
            {"code": "EC3492", "name": "Digital Signal Processing", "type": "Main Course", "hours": 5, "faculty": ["Dr. M. Jothibasu"]},
            {"code": "ET3491", "name": "Embedded Systems and IOT Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. G. Santhanamari"]},
            {"code": "EC3561", "name": "VLSI Laboratory", "type": "Lab", "hours": 3, "continuous": 3, "labName": "VLSI Lab", "faculty": ["Dr. M. Jayasanthi", "Dr. M. Priyadharshini"]},
            {"code": "CEC335", "name": "Antenna Design", "type": "Honours Course", "hours": 4, "faculty": ["Dr. S. P. Cowsigan"]},
            {"code": "FREE", "name": "Free Period", "type": "Free Period", "hours": 8, "faculty": []}
        ],
        "simultaneousGroups": []
    }

    # Class 3215 (3rd Year VLSI A Sem 5)
    project["classConfigurations"]["3215"] = {
        "subjects": [
            {"code": "VL3601", "name": "Low Power VLSI Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. S. Padmapriya"]},
            {"code": "VL3501", "name": "CMOS Analog IC Design", "type": "Main Course", "hours": 5, "faculty": ["Dr. K. Paldurai"]},
            {"code": "VL3701", "name": "VLSI Testing and Verification", "type": "Main Course", "hours": 5, "faculty": ["Dr. M. Priyadharshini"]},
            {"code": "VL3702", "name": "Hardware Description Languages", "type": "Main Course", "hours": 5, "faculty": ["Dr. J. R. Dinesh Kumar"]},
            {"code": "CEC362", "name": "VLSI Testing and Design For Testability", "type": "Main Course", "hours": 5, "faculty": ["Dr. S. Sridevi Sathya Priya"]},
            {"code": "EC3561", "name": "VLSI Laboratory", "type": "Lab", "hours": 3, "continuous": 3, "labName": "VLSI Lab", "faculty": ["Dr. M. Priyadharshini", "Dr. K. Paldurai"]},
            {"code": "CEC370", "name": "Low Power IC Design", "type": "Honours Course", "hours": 4, "faculty": ["Dr. S. Padmapriya"]},
            {"code": "FREE", "name": "Free Period", "type": "Free Period", "hours": 8, "faculty": []}
        ],
        "simultaneousGroups": []
    }

    # Class 4117 (4th Year ECE A Sem 7)
    # Includes simultaneous group demo (e.g. Elective Pool: CEC352 Satellite Comm vs CEC345 Optical Comm)
    project["classConfigurations"]["4117"] = {
        "subjects": [
            {"code": "GE3791", "name": "Human Values and Ethics", "type": "Main Course", "hours": 4, "faculty": ["Dr. R. Ravikumar"]},
            {"code": "GE3751", "name": "Principles of Management", "type": "Main Course", "hours": 4, "faculty": ["Dr. R. Uma"]},
            {"code": "CEC352", "name": "Satellite Communication", "type": "Elective Course", "hours": 4, "faculty": ["Dr. B. Tharini"]},
            {"code": "CEC345", "name": "Optical Communication & Networks", "type": "Elective Course", "hours": 4, "faculty": ["Dr. P. Sakthivel"]},
            {"code": "CEC371", "name": "Massive MIMO Networks", "type": "Main Course", "hours": 5, "faculty": ["Dr. C. Arvind"]},
            {"code": "EC3711", "name": "Summer internship", "type": "Main Course", "hours": 4, "faculty": ["Dr. P. Vijayakumar"]},
            {"code": "VL3711", "name": "Cadence / Synopsys EDA Lab", "type": "Lab", "hours": 3, "continuous": 3, "labName": "EDA Lab", "faculty": ["Dr. J. R. Dinesh Kumar", "Dr. M. Priyadharshini"]},
            {"code": "FREE", "name": "Free Period", "type": "Free Period", "hours": 12, "faculty": []}
        ],
        "simultaneousGroups": [
            {
                "id": "SIM_GROUP_1",
                "name": "Professional Elective Vertical Pool",
                "subjects": ["CEC352", "CEC345"]
            }
        ]
    }

    out_file = os.path.join(os.path.dirname(__file__), 'sample-project.json')
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(project, f, indent=2)
    print(f"Generated sample-project.json with {len(project['classes'])} classes.")
    return project

if __name__ == '__main__':
    subjs = parse_subjects()
    fac_dict, fac_list = parse_faculty()
    create_branches()
    create_sample_project(subjs, fac_dict)
