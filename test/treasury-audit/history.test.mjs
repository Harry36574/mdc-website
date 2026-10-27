import test from 'node:test';
import assert from 'node:assert/strict';
import { cadence, due, publishedCounts, sha256, verifyBundle, safeEntry } from '../../transparency/history/core.mjs';
const digestText=s=>sha256(new TextEncoder().encode(s));
const complete={recordType:'AUDIT_30D',publicationStatus:'PUBLISHED',completeness:'COMPLETE',snapshot:{finality:'FINALIZED'},completedAtUtc:'2026-10-27T09:00:00Z',publishedAtUtc:'2026-10-27T10:00:00Z'};
test('unpublished/incomplete attempts cannot satisfy or advance the overdue interval',()=>{
 const draft={...complete,publicationStatus:'DRAFT',completeness:'INCOMPLETE',completedAtUtc:null,publishedAtUtc:null};
 const c=cadence('AUDIT_30D',[draft],'2026-10-27T12:00:00Z');
 assert.equal(c.status,'STALE');assert.equal(c.previousCompleted,null);assert.equal(c.nextDue,'2026-10-21T00:00:00.000Z');assert.equal(publishedCounts([draft]).audits,0);
});
test('even a published incomplete observation does not increment Published audits',()=>{
 assert.equal(publishedCounts([{...complete,completeness:'INCOMPLETE'}]).audits,0);
 assert.equal(publishedCounts([{...complete,snapshot:null}]).audits,0);
 assert.equal(publishedCounts([{...complete,completedAtUtc:null}]).audits,0);
});
test('completed maintenance uses the fixed baseline and does not shift to completion plus 30 days',()=>{
 const c=cadence('AUDIT_30D',[complete],'2026-10-27T12:00:00Z');
 assert.equal(c.nextDue,'2026-11-20T00:00:00.000Z');assert.equal(publishedCounts([complete]).audits,1);assert.equal(due('AUDIT_30D',2),c.nextDue);
});
test('audit attempts never increment release or security-change counters',()=>{
 const records=[{...complete,publicationStatus:'DRAFT',completeness:'INCOMPLETE',completedAtUtc:null,publishedAtUtc:null}];
 assert.deepEqual(publishedCounts(records),{audits:0,releases:0,securityChanges:0});
 const events=[{recordType:'RELEASE_EVENT',publicationStatus:'PUBLISHED',publishedAtUtc:'2026-10-27T10:00:00Z'},{recordType:'TREASURY_SECURITY_CHANGE',publicationStatus:'PUBLISHED',publishedAtUtc:'2026-10-27T10:00:00Z'}];
 assert.deepEqual(publishedCounts([...events,...records]),{audits:0,releases:1,securityChanges:1});
});
test('bundle integrity rejects every changed report, record, evidence and manifest',async()=>{
 const files={'record.json':JSON.stringify({schemaVersion:'1.0',recordId:'mdc-treasury-30d-001'}),'report.md':'Incomplete preliminary report','evidence.json':'{}'};
 files['manifest.json']=JSON.stringify({schemaVersion:'1.0',recordId:'mdc-treasury-30d-001',files:Object.fromEntries(await Promise.all(Object.entries(files).map(async([k,v])=>[k,await digestText(v)])))});
 const digest=await digestText(files['manifest.json']);files['manifest.sha256']=digest+'\n';
 assert.equal((await verifyBundle(files,digest)).record.recordId,'mdc-treasury-30d-001');
 for(const name of Object.keys(files))await assert.rejects(verifyBundle({...files,[name]:files[name]+'x'},digest),/INTEGRITY_FAILURE/);
});
test('archive path cannot traverse or substitute a different record id',()=>{
 assert.equal(safeEntry({recordId:'mdc-treasury-30d-001',path:'records/2026/mdc-treasury-30d-001/',manifestSha256:'a'.repeat(64)}),true);
 assert.equal(safeEntry({recordId:'mdc-treasury-30d-001',path:'../../other/',manifestSha256:'a'.repeat(64)}),false);
});
