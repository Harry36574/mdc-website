export const T0='2026-09-21T00:00:00Z';
export const CADENCES=['AUDIT_30D','SAFE_REVIEW_3M','REGISTRY_RECONCILIATION_6M'];
// Number is used only for bounded calendar coordinates, never token/uint256 arithmetic.
export function due(type,n,anchor=T0){
  if(!CADENCES.includes(type)||!Number.isSafeInteger(n)||n<1)throw Error('INVALID_CADENCE');
  const a=new Date(anchor);if(!Number.isFinite(a.getTime()))throw Error('INVALID_T0');
  if(type==='AUDIT_30D')return new Date(a.getTime()+n*30*86400000).toISOString();
  const month=a.getUTCMonth()+n*(type==='SAFE_REVIEW_3M'?3:6),year=a.getUTCFullYear();
  const last=new Date(Date.UTC(year,month+1,0)).getUTCDate();
  return new Date(Date.UTC(year,month,Math.min(a.getUTCDate(),last),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds())).toISOString();
}
export function cadence(type,records,now=new Date().toISOString(),anchor=T0){
  const valid=records.filter(r=>r.recordType===type&&r.publicationStatus==='PUBLISHED'&&r.completeness==='COMPLETE'&&r.snapshot?.finality==='FINALIZED'&&r.completedAtUtc&&r.publishedAtUtc);
  const last=valid.sort((a,b)=>a.completedAtUtc.localeCompare(b.completedAtUtc)).at(-1)??null;
  // Only a completed observation on/after a deadline satisfies that interval.
  let n=1;while(last&&Date.parse(due(type,n,anchor))<=Date.parse(last.completedAtUtc))n++;
  const next=due(type,n,anchor);
  return {previousCompleted:last?.completedAtUtc??null,previousReason:last?null:'NO_PUBLISHED_COMPLETE_RECORD',nextDue:next,status:Date.parse(now)>Date.parse(next)?'STALE':'CURRENT'};
}
export function calendarLabel(c){return c.status==='STALE'?'STALE':c.previousCompleted?'CURRENT':'SCHEDULE ACTIVE';}
export function utcLabel(value){const date=new Date(value);if(!Number.isFinite(date.getTime()))throw Error('INVALID_UTC_DATE');return date.toISOString().slice(0,16).replace('T',' ')+' UTC';}
export function publishedCounts(records){const formal=records.filter(r=>r.publicationStatus==='PUBLISHED'&&r.publishedAtUtc);return {audits:formal.filter(r=>CADENCES.includes(r.recordType)).length,releases:formal.filter(r=>r.recordType==='RELEASE_EVENT').length,securityChanges:formal.filter(r=>r.recordType==='TREASURY_SECURITY_CHANGE').length};}
export const sha256=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
export async function verifyBundle(files,expectedManifestHash){
  const encoder=new TextEncoder(),asBytes=x=>typeof x==='string'?encoder.encode(x):x;
  if(!/^[a-f0-9]{64}$/.test(expectedManifestHash)||await sha256(asBytes(files['manifest.json']))!==expectedManifestHash)throw Error('INTEGRITY_FAILURE');
  if(new TextDecoder().decode(asBytes(files['manifest.sha256'])).trim()!==expectedManifestHash)throw Error('INTEGRITY_FAILURE');
  const manifest=JSON.parse(new TextDecoder().decode(asBytes(files['manifest.json'])));
  if(Object.keys(manifest.files).sort().join(',')!=='evidence.json,record.json,report.md')throw Error('INTEGRITY_FAILURE');
  for(const name of ['record.json','report.md','evidence.json'])if(await sha256(asBytes(files[name]))!==manifest.files[name])throw Error('INTEGRITY_FAILURE');
  const record=JSON.parse(new TextDecoder().decode(asBytes(files['record.json'])));
  if(record.recordId!==manifest.recordId||record.schemaVersion!==manifest.schemaVersion)throw Error('INTEGRITY_FAILURE');
  return {record,manifest};
}
export function safeEntry(entry){return entry&&/^[a-z0-9-]+$/.test(entry.recordId)&&/^records\/\d{4}\/[a-z0-9-]+\/$/.test(entry.path)&&entry.path.endsWith('/'+entry.recordId+'/')&&/^[a-f0-9]{64}$/.test(entry.manifestSha256);}
export function explorer(kind,value){if(kind==='address'&&/^0x[a-f0-9]{40}$/i.test(value))return 'https://etherscan.io/address/'+value;if(kind==='tx'&&/^0x[a-f0-9]{64}$/i.test(value))return 'https://etherscan.io/tx/'+value;if(kind==='block'&&/^\d+$/.test(value))return 'https://etherscan.io/block/'+value;throw Error('INVALID_EXPLORER_TARGET');}
