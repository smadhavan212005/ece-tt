"""
Rebuild data/subjects.json from BE_ECE_All_Subjects_Codes.csv (both the 2021 and 2025
regulation rows) and embed the result into js/data.js (the `subjects:` block).

Usage:  python3 data/sync_subjects_data.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from convert_csv_data import parse_subjects  # noqa: E402  (also writes subjects.json)
from sync_faculty_data import embed_in_data_js  # noqa: E402


def main():
    subjects = parse_subjects()
    embed_in_data_js('subjects', subjects)
    by_reg = {}
    for s in subjects:
        by_reg[s['regulation']] = by_reg.get(s['regulation'], 0) + 1
    print(f'Updated subjects in js/data.js: {by_reg}')


if __name__ == '__main__':
    main()
