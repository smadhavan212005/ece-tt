"""
Rebuild data/faculty.json from PSG_iTech_Faculty_Department_Wise.csv and embed the
result into js/data.js (the `facultyData:` block) so the offline app picks it up.

Usage:  python3 data/sync_faculty_data.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from convert_csv_data import parse_faculty  # noqa: E402  (also writes faculty.json)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_JS = os.path.join(ROOT, 'js', 'data.js')


def embed_in_data_js(key, value):
    """Replace the `key: <json>` literal inside js/data.js with `value` serialised as JSON."""
    with open(DATA_JS, encoding='utf-8') as f:
        src = f.read()

    start = src.index(f'{key}:')
    brace = min(i for i in (src.find('{', start), src.find('[', start)) if i != -1)
    opener = src[brace]
    closer = '}' if opener == '{' else ']'
    # Walk the brackets (skipping strings) to find the end of the literal.
    depth, i, in_str, esc = 0, brace, False, False
    while i < len(src):
        ch = src[i]
        if in_str:
            if esc:
                esc = False
            elif ch == '\\':
                esc = True
            elif ch == '"':
                in_str = False
        elif ch == '"':
            in_str = True
        elif ch == opener:
            depth += 1
        elif ch == closer:
            depth -= 1
            if depth == 0:
                break
        i += 1

    src = src[:brace] + json.dumps(value, indent=2, ensure_ascii=False) + src[i + 1:]
    with open(DATA_JS, 'w', encoding='utf-8') as f:
        f.write(src)


def main():
    parse_faculty()
    with open(os.path.join(ROOT, 'data', 'faculty.json'), encoding='utf-8') as f:
        faculty = json.load(f)
    embed_in_data_js('facultyData', faculty)
    print(f'Updated facultyData in js/data.js ({len(faculty["list"])} faculty)')


if __name__ == '__main__':
    main()
