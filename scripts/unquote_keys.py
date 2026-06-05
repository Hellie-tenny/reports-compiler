from pathlib import Path
import re
from datetime import datetime

p = Path('src/App.jsx')
if not p.exists():
    print('FILE_NOT_FOUND')
    raise SystemExit(1)
text = p.read_text(encoding='utf-8')
# backup
bak = p.with_suffix(p.suffix + '.bak.' + datetime.now().strftime('%Y%m%d%H%M%S'))
bak.write_text(text, encoding='utf-8')
# Replace quoted keys like "key":  -> key:
pattern = re.compile(r'"([A-Za-z_][A-Za-z0-9_]*)"\s*:')
new_text, count = pattern.subn(r"\1:", text)
if count > 0:
    p.write_text(new_text, encoding='utf-8')
print(f'REPLACED:{count}\nBACKUP:{bak.name}')
