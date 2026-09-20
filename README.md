# Department College Timetable Generator

A professional, college-grade **Department Timetable Preparation and Automatic Timetable Generation System** designed for engineering departments (ECE, VLSI, and extensible to CSE, EEE, AI & DS, etc.).

The system automatically generates conflict-free weekly timetables considering classes, subjects, subject types, faculty availability, classrooms, shared laboratories, variable classrooms, and the Peer Learning Hall overflow.

Built with **HTML5, Vanilla CSS3, and Vanilla JavaScript** for 100% static client-side execution deployable directly to **GitHub Pages** with zero backend or external database required. An offline **Python 3 CSP scheduling engine and 15 automated test cases** are also provided.

---

## 🌟 Key Features

1. **4-Digit Class Code Standard & Live Interpretation**:
   - Class format: `Year` (1-4) + `Branch` (1: ECE, 2: VLSI, extensible) + `Division` (1: A, 2: B...) + `Semester` (1-8).
   - E.g. `3125` &rarr; 3rd Year ECE Division B Semester 5.
   - Real-time live interpretation badge and validation.

2. **Master Catalogs Pre-Populated from PSG iTech CSVs**:
   - **227+ Master Subjects** across Semesters 1 to 8, Professional Verticals (Chip Design, Signal Processing, RF, Biomedical, Space), and Open Electives.
   - **173+ Master Faculty** organized department-wise (ECE, VLSI, CSE, AI & DS, EEE, Civil, Mathematics, Physics, Chemistry, English, Humanities, Tamil).
   - Editable modals to Add, Edit, Delete subjects and faculty with dependency checks.

3. **Multi-Class Configuration Workflow**:
   - Class-by-class setup with visual progress indicators (`✓ Complete`, `○ Pending`).
   - Searchable subject list with multi-select and weekly hours input.
   - Searchable multi-faculty assignment per subject.
   - Subject type overrides: `Main Course`, `Lab`, `Elective Course`, `Honours Course`, `Free Period`.

4. **Rigorous Constraint-Satisfaction (CSP) Engine**:
   - **Hard Constraints**:
     - Class conflict (at most one course per slot unless simultaneous group).
     - Faculty conflict (global: no faculty double-booked across the college).
     - Classroom collision prevention.
     - Shared laboratory collision prevention (e.g. shared `VLSI Lab`).
     - Other-department faculty availability whitelisting (interactive matrix).
     - Continuous laboratory periods (e.g. 3 continuous periods).
     - Lab lunch rule (labs cannot cross lunch between P4 and P5).
     - **Main-Course Period 1 Rule**: If a class has 5 Main Courses, all 5 are distributed across Period 1 on separate working days (Mon–Fri).
     - Fixed classrooms for 1st and 2nd years.
     - Variable classrooms for 3rd and 4th years.
     - Lab-released classroom reuse (rooms freed by classes attending labs).
     - Peer Learning Hall used strictly as variable overflow for 3rd & 4th years.
     - Room seating capacity checks.
   - **Soft Optimization Constraints**:
     - Subject distribution across the week (avoiding clusters of theory lectures).
     - Faculty continuous teaching limits (minimizing fatigue).
     - Classroom stability for senior classes.
     - Timetable Quality Score (0–100) calculation.

5. **Multi-Dimensional Timetable Views & Output**:
   - **Class Timetables**: Weekly Day &times; Period grid with Subject, Faculty, Room/Lab, and Lock/Unlock status.
   - **Faculty Timetables**: Weekly schedule showing Class, Subject, and Room/Lab movement info (`Class &rarr; Room`).
   - **Classroom Timetables**: Room occupancy grid.
   - **Laboratory Timetables**: Physical lab occupancy grid.
   - **Interactive Cell Swapper / Manual Editor**: Click-to-swap slots with instant real-time conflict prevention.

6. **Import, Export & Print**:
   - **Save Project**: Exports complete state as `department-timetable-project.json`.
   - **Load Project**: Drag-and-drop or upload project JSON file.
   - **CSV Export**: Timetable export for Classes, Faculty, Rooms, and Labs.
   - **A4 Landscape Print**: High-resolution print styles with official institutional header.

---

## 🏗️ Project Architecture

```text
c:/Users/Harikrishna/OneDrive/Desktop/ECE Timetable/
├── index.html                   # Main static web application
├── README.md                    # Documentation
├── .gitignore                   # Git ignore file
├── BE_ECE_All_Subjects_Codes.csv# Source dataset: ECE & VLSI subjects
├── PSG_iTech_Faculty_Department_Wise.csv # Source dataset: Faculty database
├── css/
│   └── style.css                # Professional academic theme & print stylesheet
├── js/
│   ├── app.js                   # Application coordinator & event listeners
│   ├── data.js                  # Preloaded master datasets & sample project
│   ├── class-parser.js          # 4-digit code validator & parser
│   ├── subject-manager.js       # Master subject list CRUD & search
│   ├── faculty-manager.js       # Master faculty CRUD & availability matrix
│   ├── classroom-manager.js     # Classroom allocation & Peer Learning Hall
│   ├── constraints.js           # Hard and soft constraints rules
│   ├── timetable-engine.js      # Client-side CSP scheduling engine
│   ├── validator.js             # Post-generation validator & conflict reporter
│   ├── optimizer.js             # Quality score calculation (0 - 100)
│   ├── export.js                # JSON save/load, CSV exports, Print
│   └── ui.js                    # UI controller, forms, grids & cell editor
├── data/
│   ├── subjects.json            # Parsed master subjects list
│   ├── faculty.json             # Parsed faculty list by department
│   ├── branches.json            # Configurable branches (1: ECE, 2: VLSI...)
│   ├── sample-project.json      # Pre-configured 8-class ECE + VLSI scenario
│   └── convert_csv_data.py      # CSV parser utility
└── python/
    ├── timetable_engine.py      # Standalone Python mirror of CSP engine
    ├── validator.py             # Python constraint validator
    └── test_cases.py            # Automated test runner for 15 test scenarios
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch (Zero Installation)
Simply double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox, Safari).
The embedded datasets in `js/data.js` allow the entire system to run offline without any web server.

### Option 2: Local HTTP Server (Python)
If you prefer running through a local server:
```bash
python -m http.server 8000
```
Open your browser at `http://localhost:8000`.

---

## 🧪 Running Automated Test Suite (15 Test Cases)

To run the Python automated test cases covering all 15 scenarios specified in Section 72:

```bash
python python/test_cases.py
```

### Verified Test Cases:
- **Test 1**: Enough Classrooms (4 classes, 4 classrooms) &rarr; `[PASSED]`
- **Test 2**: Insufficient Classrooms (8 classes, 6 classrooms) &rarr; `[PASSED]`
- **Test 3**: Faculty Conflict Prevention &rarr; `[PASSED]`
- **Test 4**: Shared Laboratory Conflict Prevention &rarr; `[PASSED]`
- **Test 5**: Other-Department Faculty Availability Whitelist &rarr; `[PASSED]`
- **Test 6**: Five Main Courses / Five Working Days (P1 Rule) &rarr; `[PASSED]`
- **Test 7**: Impossible Main Course Requirement Diagnostics &rarr; `[PASSED]`
- **Test 8**: 3-Period VLSI Lab Continuity & Non-Lunch Rule &rarr; `[PASSED]`
- **Test 9**: Lab-Released Classroom Dynamic Reuse &rarr; `[PASSED]`
- **Test 10**: Peer Learning Hall Overflow for Senior Classes &rarr; `[PASSED]`
- **Test 11**: Simultaneous Courses Configuration &rarr; `[PASSED]`
- **Test 12**: Multiple Faculty Jointly Handling One Subject &rarr; `[PASSED]`
- **Test 13**: Room Seating Capacity Checking &rarr; `[PASSED]`
- **Test 14**: Locked Timetable Slot Preservation &rarr; `[PASSED]`
- **Test 15**: Completely Impossible Timetable Conflict Reporting &rarr; `[PASSED]`

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Department Timetable Generator"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Navigate to your repository on GitHub:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Branch**, select `main` and root folder `/`.
   - Click **Save**.
3. Your static application will be live at:
   `https://<your-username>.github.io/<repo-name>/`

---

## 📖 User Guide

### 1. Department Setup (Step 1)
- Enter **Total Number of Classes** and **Total Number of Available Classrooms**.
- Note: **Do NOT include Peer Learning Hall in the classroom count**. Peer Learning Hall is automatically reserved as overflow for 3rd and 4th years.
- Enter unique Classroom identifiers (e.g. `101`, `102`, `103`...) and optional seating capacity.
- **Tip**: Click **"Load Sample Realistic Dataset (ECE + VLSI)"** to instantly populate an 8-class scenario!

### 2. Enter Classes (Step 2)
- Enter 4-digit class codes (e.g. `1113`, `2115`, `2215`, `3115`, `3215`, `4117`).
- View the live interpretation badge beside the input.
- Edit or delete classes from the summary table.

### 3. Select Class & Configure (Steps 3 & 4)
- Select a class to configure.
- Search and pick subjects from the Master Catalog.
- Set **Hours/Week** and **Subject Type** (`Main Course`, `Lab`, `Elective Course`, `Honours Course`, `Free Period`).
- If **Lab**, enter the physical **Lab Name** (e.g. `VLSI Lab`, `Circuits Lab`) and continuous periods.
- Assign **Multiple Faculty** per subject using the searchable faculty picker.
- Mark faculty as **Same Department** or **Other Department** (Mathematics, CSE, etc.) and configure their weekly availability whitelist.
- Save configuration and return to class selection.

### 4. Generate & Inspect Dashboard (Step 5)
- Click **Generate Department Timetable**.
- Inspect validation metrics and Timetable Quality Score (0–100).
- Switch between **Class Timetables**, **Faculty Timetables**, **Classroom Timetables**, and **Laboratory Timetables**.
- **Interactive Editing**: Click a cell, then click another cell to swap. Hard constraints are verified in real time before moving! Click 🔒 to lock a slot.
- Export as JSON, CSV, or print to A4 Landscape.
