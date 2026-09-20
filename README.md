# Department Timetable Generator

Timetable preparation and automatic generation for engineering departments at **PSG Institute of Technology and Applied Research** (ECE and VLSI, extensible to other departments).

The generator produces conflict-free weekly timetables from the classes, subjects, faculty, classrooms and laboratories you configure. It runs entirely in the browser (HTML, CSS and vanilla JavaScript, no backend), so it can be opened locally or hosted on GitHub Pages. A Python mirror of the scheduling engine and a 15-case test suite are included.

---

## Features

- **Class codes**: four digits, `Year` `Branch` `Division` `Semester`. For example `3125` is 3rd year, ECE, Division B, Semester 5. A live badge interprets the code as you type.
- **Two regulations**: the subject picker offers **2021** and **2025** regulation catalogues.
- **Master catalogues** (editable, with dependency checks):
  - **Subjects**: 365 in total (227 for 2021, 138 for 2025), covering semesters, professional verticals, open, minor, one-credit, language and mandatory courses.
  - **Faculty**: 207 across 13 departments, scraped from psgitech.ac.in. New faculty can be added from the **Master Faculty** dialog.
- **Class configuration**: searchable subject picker, hours per week, subject type (`Main Course`, `Lab`, `Elective Course`, `Honours Course`, `Free Period`), multiple faculty per subject, simultaneous-course groups and free periods.
- **Constraint engine**:
  - Hard rules: no class, faculty, room or shared-lab clashes; other-department faculty availability; continuous lab periods that never cross lunch; the Period 1 rule for main courses; fixed rooms for years 1-2 and variable rooms for years 3-4; reuse of rooms freed by lab sessions; Peer Learning Hall as overflow for years 3-4; seating capacity checks.
  - Soft rules: even subject distribution, limits on continuous teaching, stable rooms for senior classes, and a 0-100 quality score.
- **Views**: class, faculty, classroom and laboratory timetables, with click-to-swap editing that checks conflicts live and lets you lock slots.
- **Import, export and print**: save and load the project as JSON, export timetables as CSV, print to A4 landscape.

---

## Directory Structure

```text
ECE Timetable/
├── index.html                                # Web application entry point
├── psgitech.png                              # PSG iTech logo (header, left)
├── ecea.png                                  # ECE Association logo (header, right)
├── BE_ECE_All_Subjects_Codes.csv             # Subject catalogue source (2021 and 2025 regulations)
├── PSG_iTech_Faculty_Department_Wise.csv     # Faculty catalogue source
├── css/
│   └── style.css                             # Theme and print styles
├── js/
│   ├── data.js                               # Embedded master data and sample project
│   ├── app.js                                # Application coordinator, master dialogs
│   ├── ui.js                                 # Step screens, grids, cell editor
│   ├── class-parser.js                       # Class code parser
│   ├── subject-manager.js                    # Subject catalogue operations
│   ├── faculty-manager.js                    # Faculty catalogue and availability
│   ├── classroom-manager.js                  # Classroom and Peer Learning Hall allocation
│   ├── constraints.js                        # Hard and soft constraints
│   ├── timetable-engine.js                   # Scheduling engine
│   ├── validator.js                          # Post-generation validation
│   ├── optimizer.js                          # Quality score
│   └── export.js                             # JSON, CSV and print
├── data/
│   ├── subjects.json                         # Generated from the subjects CSV
│   ├── faculty.json                          # Generated from the faculty CSV
│   ├── branches.json                         # Branch codes (1 ECE, 2 VLSI, ...)
│   ├── sample-project.json                   # Sample 8-class ECE + VLSI scenario
│   ├── convert_csv_data.py                   # CSV to JSON converter
│   ├── scrape_faculty.py                     # Scrapes faculty from psgitech.ac.in into the CSV
│   ├── sync_faculty_data.py                  # Rebuilds faculty.json and embeds it in js/data.js
│   └── sync_subjects_data.py                 # Rebuilds subjects.json and embeds it in js/data.js
└── python/
    ├── timetable_engine.py                   # Python mirror of the scheduling engine
    ├── validator.py                          # Python constraint validator
    └── test_cases.py                         # 15 automated test scenarios
```

---

## Running

Open `index.html` in any modern browser. The data in `js/data.js` is embedded, so no server is needed.

To use a local server instead:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000`.

---

## Updating the Data

`js/data.js` is what the app reads; the CSV files are the sources. After editing a CSV, regenerate it:

```bash
# Faculty: scrape psgitech.ac.in, merge into the CSV, then refresh the app data
python3 data/scrape_faculty.py            # add --dry-run to preview the changes
python3 data/sync_faculty_data.py

# Subjects: refresh the app data after editing BE_ECE_All_Subjects_Codes.csv
python3 data/sync_subjects_data.py
```

The subjects CSV has the columns `Group, Category, Subject Code, Subject Title, Regulation` (`2021` or `2025`). The scraper needs `beautifulsoup4`.

---

## Tests

```bash
python3 python/test_cases.py
```

Runs 15 scenarios against the Python engine: classroom sufficiency, faculty and lab conflicts, other-department availability, the Period 1 rule, lab continuity, room reuse, Peer Learning Hall overflow, simultaneous courses, joint faculty, seating capacity, locked slots, and impossible-timetable reporting.

---

## User Guide

1. **Department Setup**: enter the number of classes and classrooms, and each room's identifier and capacity. Do not count the Peer Learning Hall; it is added automatically as overflow for years 3-4. **Load Sample Realistic Dataset** fills in an 8-class scenario.
2. **Classes & Classrooms**: enter four-digit class codes (for example `1113`, `2115`, `3215`, `4117`) and check the interpretation badge.
3. **Select Class**: pick a class to configure.
4. **Class Configuration**: choose the regulation (2021 or 2025) in the subject picker, add subjects, set hours and type, name the lab and continuous periods for labs, assign faculty, and set availability for other-department faculty.
5. **Generation & Dashboard**: generate the timetable, review the validation results and quality score, switch between class, faculty, room and lab views, edit by clicking two cells to swap, then export or print.

Master data is managed from the header: **Master Subjects** and **Master Faculty** (including **+ Add Faculty**), and **Save** / **Load** for the project file.

---

## Deploying to GitHub Pages

Push the repository to GitHub, then under **Settings > Pages** choose the `main` branch and the root folder. The app is served at `https://<username>.github.io/<repository>/`.
