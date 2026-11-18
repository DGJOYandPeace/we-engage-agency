# qa

Run `python3 -m http.server 8099 &` then `python3 qa/qa.py` (needs `pip install playwright==1.56.0`; chromium at /opt/pw-browsers/chromium in cloud sessions).
Covers the five-card order, one-open-at-a-time and overflow at 320/360/390/430/768/1440, the contact preselect, and the brief form (validation, payload, failure path).
