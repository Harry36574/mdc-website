"""Check that the real Pages build preserves every hash-sensitive archive byte."""
import pathlib,sys
source=pathlib.Path(__file__).resolve().parents[2]
built=pathlib.Path(sys.argv[1]).resolve()
files=[source/p for p in ['transparency/history.html','transparency/history/app.mjs','transparency/history/core.mjs','transparency/history/index.json','CNAME']]
files+=list((source/'transparency/history/records/2026/mdc-treasury-30d-001').rglob('*'))
count=0
for p in files:
    if p.is_file():
        relative=p.relative_to(source);target=built/relative
        assert target.is_file(),'Build omitted '+str(relative)
        assert p.read_bytes()==target.read_bytes(),'Build transformed hash-sensitive file '+str(relative)
        count+=1
print('Pages build preserved',count,'archive and entry files byte-for-byte; no deployment performed.')
