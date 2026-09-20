"""
Scrape faculty details from psgitech.ac.in department pages and merge them into
PSG_iTech_Faculty_Department_Wise.csv.

Merge rules (existing rows are never dropped, so timetable projects that
reference faculty by name keep working):
  * A scraped faculty is matched to an existing row by e-mail, else by
    normalised name within the same department.
  * Matched rows get designation / specialization / e-mail refreshed from the
    website; the existing name spelling is kept.
  * Unmatched scraped faculty are appended to their department.
  * Rows not found on the website (e.g. Tamil, Humanities) are left untouched.

Usage:  python3 data/scrape_faculty.py [--dry-run]
Then:   python3 data/sync_faculty_data.py   (refresh faculty.json and js/data.js)
Requires: requests-free stdlib fetch + beautifulsoup4
"""
import csv
import os
import re
import sys
import urllib.request

from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(ROOT, 'PSG_iTech_Faculty_Department_Wise.csv')
FIELDS = ['Department', 'Faculty Name', 'Designation', 'Specialization', 'Email']

# (CSV department name, faculty page URL)
SOURCES = [
    ('ECE', 'https://ece.psgitech.ac.in/ece/faculty'),
    ('CSE', 'https://cse.psgitech.ac.in/cse/faculty'),
    ('EEE', 'https://eee.psgitech.ac.in/eee/faculty'),
    ('Civil', 'https://civil.psgitech.ac.in/civil/faculty'),
    ('Mechanical', 'https://mechanical.psgitech.ac.in/mech/faculty'),
    ('AI & DS', 'https://psgitech.ac.in/ai-ds/faculty'),
    ('Chemistry', 'https://psgitech.ac.in/chemistry'),
    ('Physics', 'https://psgitech.ac.in/physics'),
    ('Mathematics', 'https://psgitech.ac.in/maths'),
    ('English', 'https://psgitech.ac.in/english'),
]


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read().decode('utf-8', errors='ignore')


def clean(text):
    return re.sub(r'\s+', ' ', (text or '').replace('\xa0', ' ')).strip()


def norm_name(name):
    name = re.sub(r'\b(dr|prof|mr|mrs|ms)\b\.?', '', name.lower())
    return re.sub(r'[^a-z]', '', name)


def parse_cards(html):
    """Yield dicts for every faculty card on a page."""
    soup = BeautifulSoup(html, 'html.parser')
    seen = set()
    for card in soup.find_all(class_='box1'):
        mail = card.select_one('a[href^="mailto:"]')
        name_tag = card.find('b')
        if not mail or not name_tag:
            continue
        # Skip wrapper elements that contain several cards.
        if len(card.select('a[href^="mailto:"]')) != 1:
            continue
        name = clean(name_tag.get_text())
        text = clean(card.get_text(' '))
        m = re.search(r'Specialization\s*:?\s*(.*?)\s*(?:' + re.escape(clean(mail.get_text())) + r'|$)', text, re.I)
        spec = clean(m.group(1)) if m else ''
        head = text.split('Specialization')[0]
        designation = clean(head.replace(name, '', 1)).strip(' ,-')
        email = mail['href'].replace('mailto:', '').strip().lower()
        if not name or email in seen:
            continue
        seen.add(email)
        yield {'name': name, 'designation': designation, 'specialization': spec, 'email': email}


def load_csv():
    with open(CSV_PATH, encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


def main():
    dry = '--dry-run' in sys.argv
    rows = load_csv()
    stats = {'updated': 0, 'added': 0, 'unchanged': 0}
    log = []

    for dept, url in SOURCES:
        try:
            cards = list(parse_cards(fetch(url)))
        except Exception as exc:  # network / HTTP failure: leave that dept as-is
            print(f'[skip] {dept}: {exc}')
            continue
        print(f'{dept}: {len(cards)} faculty found at {url}')
        for c in cards:
            match = next((r for r in rows if r['Email'].strip().lower() == c['email']), None)
            if not match:
                match = next((r for r in rows if r['Department'] == dept
                              and norm_name(r['Faculty Name']) == norm_name(c['name'])), None)
            if match:
                new = {'Designation': c['designation'] or match['Designation'],
                       'Specialization': c['specialization'] or match['Specialization'],
                       'Email': c['email']}
                if any(match[k] != v for k, v in new.items()):
                    log.append(f'  ~ {dept}: {match["Faculty Name"]}')
                    match.update(new)
                    stats['updated'] += 1
                else:
                    stats['unchanged'] += 1
            else:
                log.append(f'  + {dept}: {c["name"]}')
                rows.append({'Department': dept, 'Faculty Name': c['name'],
                             'Designation': c['designation'],
                             'Specialization': c['specialization'], 'Email': c['email']})
                stats['added'] += 1

    print('\n'.join(log))
    print(stats)
    if dry:
        return

    # Keep departments grouped, in first-seen order.
    order = []
    for r in rows:
        if r['Department'] not in order:
            order.append(r['Department'])
    rows.sort(key=lambda r: order.index(r['Department']))

    with open(CSV_PATH, 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(rows)
    print(f'Wrote {len(rows)} rows to {CSV_PATH}')


if __name__ == '__main__':
    main()
