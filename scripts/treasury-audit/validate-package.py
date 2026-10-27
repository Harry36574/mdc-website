"""Validate the unpublished package, hash chain, scope and preserved website files."""
import gzip, hashlib, json, pathlib, re
import jsonschema
root=pathlib.Path(__file__).resolve().parents[2]
directory=root/'transparency/history/records/2026/mdc-treasury-30d-001'
read=lambda p:json.loads(p.read_text())
digest=lambda b:hashlib.sha256(b).hexdigest()
record=read(directory/'record.json');schema=read(root/'scripts/treasury-audit/phase1-draft.schema.json')
jsonschema.Draft202012Validator(schema,format_checker=jsonschema.FormatChecker()).validate(record)
index=read(root/'transparency/history/index.json')
assert index['records']==[] and index['publicationStatus']=='NO_PUBLISHED_RECORDS'
assert index['maintenanceT0']=='2026-09-21T00:00:00Z'
assert len(index['inProgressRecords'])==1
entry=index['inProgressRecords'][0]
manifest=read(directory/'manifest.json')
assert set(manifest['files'])=={'record.json','report.md','evidence.json'}
assert manifest['recordId']==entry['recordId']==record['recordId']
assert manifest['schemaVersion']==record['schemaVersion']=='1.0'
assert digest((directory/'manifest.json').read_bytes())==entry['manifestSha256']==(directory/'manifest.sha256').read_text().strip()
for name,expected in manifest['files'].items():assert digest((directory/name).read_bytes())==expected,name
evidence=read(directory/'evidence.json');decoded={}
for f in evidence['files']:
    assert re.fullmatch(r'raw/[a-zA-Z0-9.-]+\.gz',f['path'])
    compressed=(directory/f['path']).read_bytes();assert digest(compressed)==f['sha256'],f['path']
    data=gzip.decompress(compressed);assert digest(data)==f['decodedSha256'] and len(data)==f['decodedBytes'],f['path']
    decoded[f['path'][4:-3]]=data
summary=json.loads(decoded['mainnet-summary.json']);verification=json.loads(decoded['verification.json'])
assert record['snapshot']['number']==summary['snapshot']['number']==verification['snapshot']['number']
assert record['snapshot']['hash']==summary['snapshot']['hash']==verification['snapshot']['hash']
assert record['completedAtUtc'] is None and record['publishedAtUtc'] is None
assert record['calendar']['maintenanceStatus']=='STALE' and not record['calendar']['advanceSchedule']
assert record['publicationCounters']=={'publishedAudits':0,'releaseEvents':0,'treasurySecurityChanges':0}
assert record['data']['token']['mintingAuthority']=='UNVERIFIED'
assert all(x['canonicalSourceVerification']=='UNVERIFIED' and x['currentEtherscanVerification']=='UNVERIFIED' for x in record['data']['instances'])
assert any(p['status']=='UNVERIFIED' for p in record['mandatoryProcedures'])
assert verification['fullAuditStatus']==record['finalStatus']=='INCOMPLETE'
assert not any(c['status']=='FAIL' for c in verification['checks'])
allowed={'eth_chainId','eth_getBlockByNumber','eth_getCode','eth_getBalance','eth_call','eth_getStorageAt','eth_getTransactionReceipt','eth_getTransactionByHash','eth_getLogs'}
requests=[json.loads(line) for line in decoded['rpc-transcript.jsonl'].decode().splitlines()]
assert len(requests)==evidence['rpcObservationCount']
assert all(x['request']['method'] in allowed and x['startedAtUtc'] and x['finishedAtUtc'] for x in requests)
changed={'transparency/history.html','transparency/history/app.mjs','transparency/history/core.mjs','transparency/history/index.json'}
discovery=json.loads(decoded['discovery.json'])
for file in discovery['sourceFiles']:
    if file['path'] in changed:continue
    p=root/file['path'];assert p.is_file(),'Missing baseline file '+file['path']
    data=p.read_bytes();actual=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
    assert actual==file['gitBlobSha1'],'Unrelated baseline file changed: '+file['path']
for p in list(directory.glob('*.json'))+[directory/'report.md']:
    text=p.read_text()
    assert not re.search(r'(?:PRIVATE_KEY|API_TOKEN|API_SECRET|SEED_PHRASE)\s*[=:]\s*[\"\']?(?:0x)?[a-zA-Z0-9+/]{32,}',text,re.I),'Potential secret assignment: '+p.name
    assert 'oaiusercontent.com' not in text and 'sig=' not in text,'Temporary signed URL must not be published'
print(json.dumps({'package':'MDC-TREASURY-30D-001','status':'INCOMPLETE','schemaValidation':'PASS','hashChainValidation':'PASS','rawFiles':len(evidence['files']),'readOnlyRpcRequests':len(requests),'observationChecksPassed':len(verification['checks']),'publicCountersPreserved':True,'unrelatedBaselineFilesPreserved':True,'completedAtUtc':None,'publishedAtUtc':None}))
