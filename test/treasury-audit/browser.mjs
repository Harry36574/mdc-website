// Exercise the existing read-only history page with every request intercepted.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(process.env.MDC_AUDIT_DEPENDENCY_ROOT?path.resolve(process.env.MDC_AUDIT_DEPENDENCY_ROOT,'package.json'):import.meta.url);
const {chromium}=require('playwright');
const root=path.resolve(process.env.MDC_AUDIT_SITE_ROOT??'.'),out=path.resolve(process.env.MDC_AUDIT_BROWSER_OUT??'validation/treasury-30d-001/browser');
fs.mkdirSync(out,{recursive:true});
const origin='https://mdctoken.org',directory='transparency/history/records/2026/mdc-treasury-30d-001/';
const hash=b=>createHash('sha256').update(b).digest('hex');
const browser=await chromium.launch({executablePath:process.env.MDC_AUDIT_BROWSER_PATH??'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const results=[],unexpected=[],pageErrors=[],csp=[];
async function check(name,fn){try{await fn();results.push({name,status:'PASS'});}catch(error){results.push({name,status:'FAIL',error:error.stack});}console.log(JSON.stringify(results.at(-1)));}
async function pageFor(width=1280,overrides={}){
 const context=await browser.newContext({viewport:{width,height:900}});
 await context.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(url.origin!==origin||route.request().method()!=='GET'){unexpected.push({origin:url.origin,method:route.request().method()});return route.abort();}
  const relative=decodeURIComponent(url.pathname).replace(/^\//,'');
  const file=path.resolve(root,relative);
  if(!file.startsWith(root+path.sep))return route.abort();
  if(!fs.existsSync(file)||!fs.statSync(file).isFile())return route.fulfill({status:404,body:'Not found'});
  const type=({'.html':'text/html','.mjs':'text/javascript','.json':'application/json','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg','.md':'text/plain','.gz':'application/gzip'})[path.extname(file)]??'text/plain';
  return route.fulfill({contentType:type,body:overrides[relative]??fs.readFileSync(file)});
 });
 await context.routeWebSocket('**',socket=>{unexpected.push({websocket:socket.url()});socket.close();});
 const page=await context.newPage();
 page.on('pageerror',e=>pageErrors.push(String(e)));
 await page.addInitScript(()=>{window.__csp=[];window.addEventListener('securitypolicyviolation',e=>window.__csp.push({directive:e.violatedDirective,blocked:e.blockedURI}));});
 await page.clock.install({time:new Date('2026-10-27T12:00:00Z')});
 await page.goto(origin+'/transparency/history.html');
 await page.locator('#records[aria-busy="false"]').waitFor();
 return {context,page,async close(){csp.push(...await page.evaluate(()=>window.__csp));await context.close();}};
}
try{
 for(const width of [390,1280])await check('incomplete-real-evidence-keeps-counters-and-overdue-'+width,async()=>{
  const t=await pageFor(width),p=t.page;
  assert.equal(await p.locator('#published-audits').textContent(),'0');
  assert.equal(await p.locator('#published-releases').textContent(),'0 published records');assert.equal(await p.locator('#published-security-changes').textContent(),'0 published records');
  const calendar=await p.locator('.cadence-card').first().textContent();assert.match(calendar,/STALE/);assert.match(calendar,/2026-10-21 00:00 UTC/);assert.match(calendar,/None yet/);
  assert.match(await p.locator('#load-status').textContent(),/0 published record\(s\) · 1 incomplete unpublished attempt/);
  assert.match(await p.locator('.record-head').textContent(),/INCOMPLETE \/ UNPUBLISHED/);
  await p.locator('.history-record > details > summary').click();
  assert.match(await p.locator('.record-body').textContent(),/Not completed/);assert.match(await p.locator('.record-body').textContent(),/Not published/);assert.match(await p.locator('.record-body').textContent(),/MDC-TREASURY-30D-001/);
  assert.equal(await p.locator('.audit-item').count(),17);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(new URL(await p.getByRole('link',{name:'View report',exact:true}).getAttribute('href')).pathname,'/'+directory+'report.md');
  await p.getByRole('button',{name:'Release Events',exact:true}).click();assert.equal(await p.locator('.history-record').count(),0);await p.getByRole('button',{name:'Scheduled audits',exact:true}).click();assert.equal(await p.locator('.history-record').count(),1);
  await p.screenshot({path:path.join(out,'incomplete-'+width+'.png'),fullPage:true});await t.close();
 });
 for(const filename of ['record.json','report.md','evidence.json','manifest.json'])await check('tampered-'+filename+'-fails-closed',async()=>{
  const t=await pageFor(1280,{[directory+filename]:fs.readFileSync(path.join(root,directory,filename),'utf8')+'tampered'});
  assert.equal(await t.page.locator('#published-audits').textContent(),'Unavailable');assert.match(await t.page.locator('#records').textContent(),/INTEGRITY_FAILURE/);assert.match(await t.page.locator('#cadences').textContent(),/unavailable/);await t.close();
 });
 for(const mutation of ['published-draft','complete-draft'])await check('rehashed-'+mutation+'-cannot-claim-completion',async()=>{
  const r=JSON.parse(fs.readFileSync(path.join(root,directory,'record.json')));
  if(mutation==='published-draft')r.publicationStatus='PUBLISHED';else r.completeness='COMPLETE';
  const record=JSON.stringify(r),m=JSON.parse(fs.readFileSync(path.join(root,directory,'manifest.json')));m.files['record.json']=hash(record);
  const manifest=JSON.stringify(m),digest=hash(manifest),index=JSON.parse(fs.readFileSync(path.join(root,'transparency/history/index.json')));index.inProgressRecords[0].manifestSha256=digest;
  const overrides={[directory+'record.json']:record,[directory+'manifest.json']:manifest,[directory+'manifest.sha256']:digest+'\n','transparency/history/index.json':JSON.stringify(index)};
  const t=await pageFor(1280,overrides);assert.equal(await t.page.locator('#published-audits').textContent(),'Unavailable');assert.match(await t.page.locator('#load-status').textContent(),/No PASS is inferred/);await t.close();
 });
 await check('malformed-draft-index-fails-closed',async()=>{
  const index=JSON.parse(fs.readFileSync(path.join(root,'transparency/history/index.json')));index.inProgressRecords={};
  const t=await pageFor(1280,{'transparency/history/index.json':JSON.stringify(index)});assert.equal(await t.page.locator('#published-audits').textContent(),'Unavailable');assert.match(await t.page.locator('#load-status').textContent(),/HISTORY UNAVAILABLE/);await t.close();
 });
 await check('read-only-no-external-requests-script-errors-or-csp-violations',async()=>{assert.deepEqual(unexpected,[]);assert.deepEqual(pageErrors,[]);assert.deepEqual(csp,[]);});
}finally{await browser.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({executedAtUtc:new Date().toISOString(),results,unexpected,pageErrors,csp,scope:'Intercepted website rendering and integrity checks only. Not a Mainnet test or a contract security PASS.',realWalletRequests:0,signatures:0,broadcasts:0},null,2)+'\n');}
process.exitCode=results.some(r=>r.status==='FAIL')?1:0;
