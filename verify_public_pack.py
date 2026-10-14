"""NEW bounded publication check, 2026-10-14. Not a security certification."""
import json
import re
from pathlib import Path

def text_values(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for key, item in value.items():
            yield str(key)
            yield from text_values(item)
    elif isinstance(value, list):
        for item in value:
            yield from text_values(item)

def main():
    root = Path(__file__).resolve().parent
    files = [p for p in root.rglob('*') if p.is_file() and '__pycache__' not in p.parts
             and '.git' not in p.parts]
    prohibited_extensions = {'.sqlite', '.db', '.eml', '.msg', '.jsonl', '.pem', '.key'}
    errors = []
    private_path = re.compile(r'(?:[A-Za-z]:[\\/]|/Users/|/home/)[A-Za-z]')
    secret = re.compile(r'sk-proj-[A-Za-z0-9]{12,}|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY')
    for path in files:
        if path.suffix in prohibited_extensions or path.name in {'.env', 'config.json'}:
            errors.append('Runtime/secret file: ' + str(path.relative_to(root)))
        if path.suffix in {'.py', '.md', '.json', '.txt', '.html', '.css', '.js', '.svg', '.xml'} or path.name in {'LICENSE', 'NOTICE', '_headers'}:
            text = path.read_text(encoding='utf-8')
            if path.suffix == '.json':
                # Scan decoded strings. Escaped newlines after a colon in code
                # excerpts are not Windows drive paths.
                text = '\n'.join(text_values(json.loads(text)))
            if private_path.search(text) or secret.search(text):
                errors.append('Private path or credential shape: ' + str(path.relative_to(root)))
    mapping = json.loads((root / 'SOURCE_MAP.json').read_text(encoding='utf-8'))
    for row in mapping['files']:
        if not (root / row['path']).is_file():
            errors.append('Missing source-map file: ' + row['path'])
    for row in mapping['sources']:
        if not re.fullmatch('[0-9a-f]{64}', row['original_sha256']):
            errors.append('Invalid source hash: ' + row['source_id'])
    if errors:
        print('\n'.join(errors))
        return 1
    print(f'PASS: {len(files)} publishable source/docs files; provenance, runtime exclusions and bounded privacy patterns')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
