# Department Timetable Generator

**Live app: https://smadhavan212005.github.io/ece-tt/**

A web tool for **PSG Institute of Technology and Applied Research** that builds conflict-free weekly timetables for engineering departments (ECE and VLSI, extensible to others). You describe your classes, subjects, faculty and rooms, and it generates class, faculty, classroom and laboratory timetables that you can fine-tune by hand, save, export and print.

It runs entirely in your browser: there is no server or database, so nothing you enter leaves your computer. The app is plain HTML, CSS and JavaScript, hosted on GitHub Pages. A Python mirror of the scheduling engine and a 15-case test suite are included for development.

**Contents:** [What it does](#what-it-does) · [Quick start](#quick-start) · [User guide](#user-guide) · [Troubleshooting](#troubleshooting) · [Directory structure](#directory-structure) · [Updating the data](#updating-the-data) · [Development and deployment](#development-and-deployment)

---

## What it does

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

## Quick start

1. Open the live app, or open `index.html` from a downloaded copy (no server needed).
2. On **Step 1**, click **Load Sample Realistic Dataset (ECE + VLSI)** to try an 8-class example.
3. Go to **Step 5** and click **Generate Department Timetable**.
4. Browse the class, faculty, room and lab timetables, then export or print.

To start from scratch instead, follow the [user guide](#user-guide).

> **Your work is not saved automatically.** Refreshing or closing the page clears the project. Use **Save** in the header to download a project file, and **Load** to restore it later. Faculty you add through the Master Faculty dialog are the exception: they are kept in your browser's local storage.

---

## User Guide

1. **Department Setup**: enter the number of classes and classrooms, and each room's identifier and capacity. Do not count the Peer Learning Hall; it is added automatically as overflow for years 3-4. **Load Sample Realistic Dataset** fills in an 8-class scenario.
2. **Classes & Classrooms**: enter four-digit class codes (for example `1113`, `2115`, `3215`, `4117`) and check the interpretation badge.
3. **Select Class**: pick a class to configure.
4. **Class Configuration**: choose the regulation (2021 or 2025) in the subject picker, add subjects, set hours and type, name the lab and continuous periods for labs, assign faculty, and set availability for other-department faculty.
5. **Generation & Dashboard**: generate the timetable, review the validation results and quality score, switch between class, faculty, room and lab views, edit by clicking two cells to swap, then export or print.

Master data is managed from the header: **Master Subjects** and **Master Faculty** (including **+ Add Faculty**), and **Save** / **Load** for the project file.

---

## Troubleshooting

**The page looks old or a new change is missing**
GitHub Pages and browsers cache files. Hard-refresh with `Ctrl+Shift+R` (`Cmd+Shift+R` on Mac). After a push, Pages can take a minute or two to update.

**Blank page, or buttons do nothing**
Open the browser console (`F12`, then the **Console** tab) and look for red errors. A script that failed to load usually means a wrong file name or path. Note that GitHub Pages file names are case-sensitive (`psgitech.png` is not `PSGiTech.png`).

**Logos are missing**
`psgitech.png` and `ecea.png` must sit next to `index.html`, with exactly those names and in lowercase.

**"Missing faculty assignment" when saving a class**
Every subject except `FREE` needs at least one faculty member. Use **+ Assign / Edit Faculty** on each subject.

**The hours counter is not 40 / 40**
A class needs exactly 40 periods a week (subject hours plus free periods). Adjust hours or the **Free Periods** field until the counter turns green.

**Generation reports conflicts or fails**
Read the messages on the dashboard; they name the class, subject or faculty involved. Common causes:
- Too few classrooms for the number of classes. The Peer Learning Hall only helps years 3-4 and is not counted in Step 1.
- The same faculty member assigned to several classes at the same time slot, or only available in a few periods (other-department availability matrix).
- Five main courses in one class need Period 1 on five different days; fewer than five working days makes this impossible.
- A lab that needs continuous periods but cannot fit before or after lunch.
- A room's seating capacity smaller than the class strength.
Relax one constraint (add a room, widen availability, reduce continuous lab periods) and generate again.

**A faculty member or subject is not in the list**
- Faculty: use **Master Faculty > + Add Faculty**. Or update the CSV and re-run the [data scripts](#updating-the-data).
- Subjects: check the **Regulation** dropdown in the subject picker. 2021 and 2025 subjects are listed separately. Subjects you add manually appear under both.

**Added faculty disappeared**
They are stored in your browser's local storage, so they are lost if you clear site data or use another browser or private window. Add them to `PSG_iTech_Faculty_Department_Wise.csv` to make them permanent.

**Saved project will not load**
Only files created by **Save** (`.json`) can be loaded. If it still fails, open the file in a text editor and check that it is valid JSON and was not edited by hand.

**Manual swap is refused**
The editor blocks moves that would break a hard constraint (faculty or room clash, lab crossing lunch). This is intended; unlock the slot (the lock icon) or choose a different target cell.

**Faculty scraper returns fewer people than expected**
Some department pages on psgitech.ac.in respond slowly or are temporarily down (a run can take a few minutes). The scraper skips a department it cannot reach and leaves its existing rows untouched. Run it again later, or use `--dry-run` first to preview.

**Tests fail**
Run `python3 python/test_cases.py` from the repository root. Each failing test prints the reason. Make sure you are using Python 3.

If none of this helps, open an issue at https://github.com/smadhavan212005/ece-tt/issues with what you did, what you expected, and any red console errors.

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

## Running locally

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

## Development and deployment

The site is served by **GitHub Pages** from the `main` branch, root folder. Publishing a change is just a push:

```bash
git add .
git commit -m "Describe the change"
git push
```

Pages rebuilds automatically; check the **Actions** tab or wait a minute and hard-refresh the live URL.

To test changes locally before pushing, open `index.html` or run `python3 -m http.server 8000` and visit `http://localhost:8000`. If you change a CSV, regenerate the embedded data first (see [Updating the data](#updating-the-data)).

To host your own copy: fork or push the repository to your account, then go to **Settings > Pages**, choose branch `main` and folder `/ (root)`, and save. The app will be available at `https://<username>.github.io/<repository>/`.
