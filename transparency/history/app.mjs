import { CADENCES, T0, cadence, calendarLabel, utcLabel, publishedCounts, verifyBundle, safeEntry, explorer } from './core.mjs';
import { formatMDC } from '../core.mjs';
const root=new URL('./',import.meta.url),local=['localhost','127.0.0.1','[::1]'].includes(location.hostname);
const preview=new URLSearchParams(location.search).get('preview')==='dry-run';
const names={AUDIT_30D:'30-day Audit',SAFE_REVIEW_3M:'Safe Review',REGISTRY_RECONCILIATION_6M:'Registry Reconciliation',RELEASE_EVENT:'Release Event',TREASURY_SECURITY_CHANGE:'Treasury Security Change'};
const $=id=>document.getElementById(id);let loaded=[],filter='all',busy=false;
function el(tag,text,cls){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;}
function append(parent,...nodes){parent.append(...nodes);return parent;}
function link(text,url,download=false){const a=el('a',text);a.href=url;if(download)a.download='';if(url.startsWith('https://etherscan.io/')){a.target='_blank';a.rel='noopener noreferrer';}return a;}
async function fetchBytes(url){if(url.origin!==location.origin)throw Error('CROSS_ORIGIN_ARCHIVE_BLOCKED');const r=await fetch(url,{cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer'});if(!r.ok)throw Error('ARCHIVE_HTTP_'+r.status);return new Uint8Array(await r.arrayBuffer());}
function details(parent,title,value){const d=el('details');append(d,el('summary',title),el('pre',JSON.stringify(value,null,2)));parent.append(d);}
function tag(text){return el('span',text,'tag'+(/ATTENTION|INCOMPLETE|PENDING|STALE|UNPUBLISHED|INTEGRITY/.test(text)?' warning':''));}
function metric(parent,label,value){const group=el('div');append(group,el('dt',label),el('dd',value??'UNKNOWN'));parent.append(group);}
function amount(value){if(value==='NOT_APPLICABLE')return value;if(typeof value!=='string'||!/^(0|[1-9][0-9]*)$/.test(value))return 'UNKNOWN';return formatMDC(BigInt(value))+' MDC';}
function resetCounts(){for(const id of ['published-audits','published-releases','published-security-changes'])$(id).textContent='Unavailable';}
function renderCalendar(){const node=$('cadences');node.replaceChildren();if(loaded.some(x=>!x.record)){resetCounts();node.append(el('p','Maintenance status unavailable — archive integrity is incomplete.','error'));node.setAttribute('aria-busy','false');return;}const formal=loaded.filter(x=>x.record&&!x.preview).map(x=>x.record),counts=publishedCounts(formal);
  $('published-audits').textContent=String(counts.audits);$('published-releases').textContent=counts.releases+' published records';$('published-security-changes').textContent=counts.securityChanges+' published records';
  for(const type of CADENCES){const c=cadence(type,formal),card=el('article',undefined,'cadence-card'),dl=el('dl');append(card,el('h3',names[type]),tag(calendarLabel(c)));metric(dl,'Latest '+names[type],c.previousCompleted?utcLabel(c.previousCompleted):'None yet');metric(dl,'Next '+names[type],utcLabel(c.nextDue));append(card,dl);if(!c.previousCompleted)card.append(el('p','No published complete record','small'));node.append(card);}node.setAttribute('aria-busy','false');}
function renderRecord(item){const {record:r,manifest:m,entry,base}=item;
  if(!r){const card=el('article',undefined,'history-record record-error');append(card,el('h3','INTEGRITY_FAILURE / REPORT UNAVAILABLE'),el('p',entry.recordId,'mono'),el('p',item.error));return card;}
  const card=el('article',undefined,'history-record'),head=el('div',undefined,'record-head');append(head,el('h3',names[r.recordType]??r.recordType),el('p',r.auditDateUtc+' · Block '+(r.snapshot?.number??'UNKNOWN'),'record-meta'),tag(r.finalStatus),tag(r.completeness));if(r.readState!==r.completeness)head.append(tag(r.readState));if(item.preview)head.append(tag('DRY-RUN / UNPUBLISHED'));card.append(head);
  const d=el('details'),body=el('div',undefined,'record-body');d.append(el('summary','Read evidence and accounting'));const dl=el('dl');metric(dl,'Record ID',r.recordId);metric(dl,'Snapshot UTC',r.snapshot?.utc);metric(dl,'Snapshot block hash',r.snapshot?.hash);metric(dl,'Coverage',r.coverage?r.coverage.coverageStartBlock+' → '+r.coverage.coverageEndBlock:'UNKNOWN — '+r.unknownReasons.coverage);metric(dl,'RPC sources',r.rpcSources.map(x=>x.label+' · '+x.url).join('\n'));metric(dl,'Manifest SHA-256',entry.manifestSha256);body.append(dl);
  if(r.data.instances){body.append(el('h4','Production instances · '+r.data.instances.length));const grid=el('div',undefined,'audit-grid');for(const x of r.data.instances){const c=el('div',undefined,'audit-item');append(c,el('h5',x.id+' · '+x.identityStatus),link(x.address,explorer('address',x.address)),el('p','Balance: '+amount(x.state?.balance)),el('p','Total released: '+amount(x.state?.totalReleased)));details(c,'Exact readback',x);grid.append(c);}body.append(grid);}
  if(r.data.treasuries){body.append(el('h4','Treasury Safes · '+r.data.treasuries.length));const grid=el('div',undefined,'audit-grid');for(const x of r.data.treasuries){const c=el('div',undefined,'audit-item');append(c,el('h5',x.name),link(x.address,explorer('address',x.address)),el('p',x.state?`${x.state.threshold}-of-${x.state.ownerCount} · ${x.state.status}`:'NOT VERIFIED'),el('p','MDC balance: '+amount(x.state?.balance)));details(c,'Public owners and configuration',x);grid.append(c);}body.append(grid);}
  if(r.data.accounting)details(body,'Balance / release accounting deltas',r.data.accounting);
  body.append(el('h4','Findings'));if(r.findings.length)for(const f of r.findings)body.append(el('p',f.code+' — '+f.detail,'finding'));else body.append(el('p','No unresolved findings in this completed observation.','small'));
  details(body,'Checks and complete record',r);details(body,'File hashes and archive references',{...m,previousRecord:r.previousRecord,supersedes:r.supersedes});
  const links=el('div',undefined,'record-links');append(links,link('View report',new URL('report.md',base).href),link('Download JSON',new URL('record.json',base).href,true),link('View evidence',new URL('evidence.json',base).href));if(r.data.txHash)links.append(link('View transaction on Etherscan',explorer('tx',r.data.txHash)));if(r.snapshot)links.append(link('View block on Etherscan',explorer('block',r.snapshot.number)));body.append(links);append(d,body);card.append(d);return card;
}
function render(){const target=$('records');target.replaceChildren();let count=0;for(const item of loaded){const type=item.record?.recordType,show=filter==='all'||filter==='scheduled'&&CADENCES.includes(type)||filter==='release'&&type==='RELEASE_EVENT'||filter==='safe'&&type==='TREASURY_SECURITY_CHANGE';if(show){target.append(renderRecord(item));count++;}}
  if(!count)target.append(el('p',loaded.length?'No records match this filter.':'No published audit records yet. A local dry-run does not establish a published maintenance history.','empty-state'));target.setAttribute('aria-busy','false');}
async function refresh(){if(busy)return;busy=true;resetCounts();$('reload-history').disabled=true;$('load-status').textContent='Loading and verifying archive hashes…';$('records').setAttribute('aria-busy','true');
  try{if(preview&&!local)throw Error('DRY_RUN_PREVIEW_LOCALHOST_ONLY');$('preview-banner').hidden=!preview;
    const index=JSON.parse(new TextDecoder().decode(await fetchBytes(new URL(preview?'preview-index.json':'index.json',root))));
    if(index.schemaVersion!=='1.0'||index.maintenanceT0!==T0||!Array.isArray(index.records)||new Set(index.records.map(e=>e.recordId)).size!==index.records.length)throw Error('INVALID_ARCHIVE_INDEX');
    loaded=[];
    for(const entry of [...index.records].reverse()){
      if(!safeEntry(entry))throw Error('INVALID_ARCHIVE_PATH');const base=new URL(entry.path,root);
      try{const files=Object.fromEntries(await Promise.all(['record.json','report.md','evidence.json','manifest.json','manifest.sha256'].map(async name=>[name,await fetchBytes(new URL(name,base))])));const {record,manifest}=await verifyBundle(files,entry.manifestSha256);
        if(record.recordId!==entry.recordId||record.publicationStatus!==(preview?'DRY_RUN_UNPUBLISHED':'PUBLISHED')||(!preview&&!record.publishedAtUtc)||(preview&&record.publishedAtUtc!==null))throw Error('PUBLICATION_STATE_MISMATCH');
        loaded.push({entry,base,record,manifest,preview});
      }catch(error){loaded.push({entry,error:String(error.message),preview});}
    }
    const errors=loaded.filter(x=>!x.record).length;$('load-status').textContent=errors?`${errors} record(s) unavailable or failed integrity. No PASS is inferred.`:preview?`${loaded.length} local dry-run record(s) · UNPUBLISHED · SHA-256 verified`:loaded.length?`${loaded.length} published record(s) · SHA-256 verified`:'0 published record(s) · NO FORMAL RECORD YET';
    renderCalendar();render();
  }catch(error){loaded=[];$('load-status').textContent='HISTORY UNAVAILABLE — '+error.message;$('records').replaceChildren(el('p','INCOMPLETE. Previous records and maintenance status cannot be established.','error'));$('cadences').replaceChildren(el('p','Maintenance status unavailable.','error'));$('records').setAttribute('aria-busy','false');$('cadences').setAttribute('aria-busy','false');}
  finally{busy=false;$('reload-history').disabled=false;}
}
for(const button of document.querySelectorAll('[data-filter]'))button.addEventListener('click',()=>{filter=button.dataset.filter;for(const b of document.querySelectorAll('[data-filter]'))b.setAttribute('aria-pressed',String(b===button));render();});
$('reload-history').addEventListener('click',refresh);refresh();
