// Public, read-only operational evidence collector. Never accepts credentials.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { CONFIG } from '../../transparency/config.mjs';
const require = createRequire(process.env.MDC_AUDIT_DEPENDENCY_ROOT ? path.resolve(process.env.MDC_AUDIT_DEPENDENCY_ROOT, 'package.json') : import.meta.url);
const { keccak256, encodeFunctionData, decodeFunctionResult, parseAbi, toEventSelector } = require('viem');
const out = path.resolve(process.argv[2] ?? 'audit-output'); fs.mkdirSync(out, { recursive: true });
const transcript = path.join(out, 'rpc-transcript.jsonl'); fs.writeFileSync(transcript, '');
const now = () => new Date().toISOString();
const endpoints = ['https://ethereum-rpc.publicnode.com', 'https://eth.drpc.org'];
const allowed = new Set(['eth_chainId','eth_getBlockByNumber','eth_getCode','eth_getBalance','eth_call','eth_getStorageAt','eth_getTransactionReceipt','eth_getTransactionByHash','eth_getLogs']);
let id = 0;
async function rpc(endpoint, method, params) {
  if (!endpoints.includes(endpoint) || !allowed.has(method)) throw Error('READ_ONLY_ALLOWLIST');
  const request = { jsonrpc:'2.0', id:++id, method, params }, entry = { startedAtUtc:now(), endpoint, request };
  try {
    const response = await fetch(endpoint, { method:'POST', redirect:'error', headers:{'Content-Type':'application/json'}, body:JSON.stringify(request), signal:AbortSignal.timeout(20000) });
    entry.httpStatus = response.status;
    const body = await response.text();
    if (body.length > 8*1024*1024) throw Error('RESPONSE_SIZE_LIMIT');
    entry.responseText = body;
    if (!response.ok) throw Error('HTTP_'+response.status);
    const parsed = JSON.parse(body);
    if (parsed.jsonrpc !== '2.0' || parsed.id !== request.id || parsed.error || !Object.hasOwn(parsed,'result')) throw Error('INVALID_OR_ERROR_RPC_RESPONSE');
    entry.outcome = 'RESPONSE_RECEIVED'; return parsed.result;
  } catch (error) { entry.outcome='UNVERIFIED'; entry.error=String(error.message); throw error; }
  finally { entry.finishedAtUtc=now(); fs.appendFileSync(transcript,JSON.stringify(entry)+'\n'); }
}
const abi = parseAbi([
 'function totalSupply() view returns (uint256)', 'function decimals() view returns (uint8)',
 'function balanceOf(address) view returns (uint256)', 'function allowance(address,address) view returns (uint256)',
 'function owner() view returns (address)', 'function getOwners() view returns (address[])',
 'function getThreshold() view returns (uint256)', 'function nonce() view returns (uint256)',
 'function VERSION() view returns (string)', 'function getModulesPaginated(address,uint256) view returns (address[],address)'
]);
const quantity = value => { if(typeof value!=='string'||!/^0x(?:0|[1-9a-f][0-9a-f]*)$/i.test(value))throw Error('INVALID_QUANTITY');return BigInt(value); };
const json = value => JSON.stringify(value,(_,x)=>typeof x==='bigint'?x.toString():x,2)+'\n';
const summary = { auditId:'MDC-TREASURY-30D-001', startedAtUtc:now(), status:'INCOMPLETE', snapshot:null, endpoints:[], token:null, vaults:[], treasuries:[], history:{status:'UNVERIFIED'}, limitations:[] };
const probes = [];
for (const endpoint of endpoints) {
 try {
  if(quantity(await rpc(endpoint,'eth_chainId',[]))!==1n) throw Error('WRONG_CHAIN');
  const block=await rpc(endpoint,'eth_getBlockByNumber',['finalized',false]);
  if(!block||!/^0x[0-9a-f]{64}$/i.test(block.hash)) throw Error('INVALID_FINALIZED_BLOCK');
  probes.push({endpoint,block});summary.endpoints.push({endpoint,status:'FINALIZED_HEADER_RECEIVED',number:quantity(block.number).toString(),hash:block.hash});
 } catch(error) {summary.endpoints.push({endpoint,status:'UNVERIFIED',error:error.message});}
}
async function observe(endpoint, method, params) {
 try{return {status:'OBSERVED_SINGLE_SOURCE',value:await rpc(endpoint,method,params)};}
 catch(error){return {status:'UNVERIFIED',error:error.message};}
}
async function call(endpoint, address, functionName, args=[]) {
 const r=await observe(endpoint,'eth_call',[{to:address,data:encodeFunctionData({abi,functionName,args})},summary.snapshot.tag]);
 if(r.status!=='UNVERIFIED')try{r.decoded=decodeFunctionResult({abi,functionName,data:r.value});}catch{r.status='UNVERIFIED';r.error='ABI_DECODE_FAILED';}
 return r;
}
async function collect() {
 if(!probes.length){summary.limitations.push('Neither endpoint supplied a verified Mainnet finalized header. No chain state was inferred.');return;}
 const minimum=probes.reduce((a,b)=>quantity(a.block.number)<quantity(b.block.number)?a:b),tag=minimum.block.number;
 const headers=[];
 for(const p of probes){try{headers.push({endpoint:p.endpoint,block:await rpc(p.endpoint,'eth_getBlockByNumber',[tag,false])});}catch(error){summary.limitations.push('Numbered header unavailable: '+p.endpoint);}}
 if(!headers.length||headers.some(x=>!x.block||quantity(x.block.number)!==quantity(tag)||x.block.hash!==minimum.block.hash||x.block.timestamp!==minimum.block.timestamp))throw Error('SNAPSHOT_HEADER_DISAGREEMENT');
 summary.snapshot={number:quantity(tag).toString(),tag,hash:minimum.block.hash,utc:new Date(Number(quantity(minimum.block.timestamp))*1000).toISOString(),finality:headers.length===2?'FINALIZED_TWO_SOURCE_AGREEMENT':'FINALIZED_SINGLE_SOURCE_ONLY'};
 const endpoint=headers[0].endpoint;
 const addresses=[CONFIG.token.address,...CONFIG.instances.map(x=>x.address),...new Set(CONFIG.instances.map(x=>x.expected.treasury).filter(Boolean))];
 const codes={};
 for(const address of addresses) {
  const code=await observe(endpoint,'eth_getCode',[address,tag]);
  if(code.value&&/^0x(?:[a-f0-9]{2})+$/i.test(code.value))code.keccak256=keccak256(code.value);
  codes[address]={address,code,ethBalance:await observe(endpoint,'eth_getBalance',[address,tag]),mdcBalance:await call(endpoint,CONFIG.token.address,'balanceOf',[address])};
 }
 summary.token={...codes[CONFIG.token.address],totalSupply:await call(endpoint,CONFIG.token.address,'totalSupply'),decimals:await call(endpoint,CONFIG.token.address,'decimals'),ownerGetterProbe:await call(endpoint,CONFIG.token.address,'owner')};
 // An absent owner getter is not proof that other privileged paths do not exist.
 const slots={implementation:'0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc',admin:'0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103',beacon:'0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50'};
 summary.token.proxySlotProbes={};for(const [name,slot]of Object.entries(slots))summary.token.proxySlotProbes[name]=await observe(endpoint,'eth_getStorageAt',[CONFIG.token.address,slot,tag]);
 for(const instance of CONFIG.instances){
  const v={id:instance.id,...codes[instance.address],expectedRuntimeHash:instance.runtimeHash,getters:{},deploymentTx:instance.deploymentTx,fundingTx:instance.fundingTx};
  for(const [name,g]of Object.entries(CONFIG.types[instance.type].getters))v.getters[name]=await observe(endpoint,'eth_call',[{to:instance.address,data:g.selector},tag]);
  v.runtimeMatchesWebsiteConfiguration=v.code.keccak256===instance.runtimeHash;
  v.deploymentReceipt=await observe(endpoint,'eth_getTransactionReceipt',[instance.deploymentTx]);
  v.fundingReceipt=await observe(endpoint,'eth_getTransactionReceipt',[instance.fundingTx]);
  summary.vaults.push(v);
 }
 for(const address of [...new Set(CONFIG.instances.map(x=>x.expected.treasury).filter(Boolean))]){
  const t={...codes[address],configuration:{},proxySlotProbes:{}};
  for(const name of ['getOwners','getThreshold','nonce','VERSION'])t.configuration[name]=await call(endpoint,address,name);
  t.configuration.modules=await call(endpoint,address,'getModulesPaginated',['0x0000000000000000000000000000000000000001',100n]);
  // Safe proxy singleton is stored in slot 0; implementation identity still needs source validation.
  for(const [name,slot]of Object.entries({singleton:'0x0',guard:keccak256(Buffer.from('guard_manager.guard.address')),fallbackHandler:keccak256(Buffer.from('fallback_manager.handler.address'))}))t.proxySlotProbes[name]=await observe(endpoint,'eth_getStorageAt',[address,slot,tag]);
  summary.treasuries.push(t);
 }
 if(headers.length===2){
  const other=headers[1].endpoint;
  summary.crossChecks={totalSupply:await call(other,CONFIG.token.address,'totalSupply'),decimals:await call(other,CONFIG.token.address,'decimals'),addresses:[]};
  for(const address of addresses)summary.crossChecks.addresses.push({address,code:await observe(other,'eth_getCode',[address,tag]),ethBalance:await observe(other,'eth_getBalance',[address,tag]),mdcBalance:await call(other,CONFIG.token.address,'balanceOf',[address])});
 }
 // Historical scanning is bounded and explicitly reports gaps instead of inferring absence.
 const receiptBlocks=summary.vaults.map(x=>x.deploymentReceipt.value?.blockNumber).filter(Boolean).map(quantity);
 if(receiptBlocks.length===9){
  const start=receiptBlocks.reduce((a,b)=>a<b?a:b),end=quantity(tag),chunks=[];
  const monitored=addresses.filter(a=>a!==CONFIG.token.address),topics=monitored.map(a=>'0x'+a.slice(2).toLowerCase().padStart(64,'0'));
  let complete=true;
  for(let from=start;from<=end;from+=50000n){
   if(chunks.length>=30){complete=false;summary.limitations.push('Historical scan chunk budget reached.');break;}
   const to=from+49999n<end?from+49999n:end,range={fromBlock:'0x'+from.toString(16),toBlock:'0x'+to.toString(16)};
   const chunk={...range,transfersFrom:await observe(endpoint,'eth_getLogs',[{...range,address:CONFIG.token.address,topics:[toEventSelector('Transfer(address,address,uint256)'),topics]}]),transfersTo:await observe(endpoint,'eth_getLogs',[{...range,address:CONFIG.token.address,topics:[toEventSelector('Transfer(address,address,uint256)'),null,topics]}]),approvals:await observe(endpoint,'eth_getLogs',[{...range,address:CONFIG.token.address,topics:[toEventSelector('Approval(address,address,uint256)'),topics]}]),controls:await observe(endpoint,'eth_getLogs',[{...range,address:monitored}])};
   chunks.push(chunk);if(Object.values(chunk).some(v=>v?.status==='UNVERIFIED'))complete=false;
  }
  summary.history={status:complete?'BOUNDED_RANGE_OBSERVED_SINGLE_SOURCE':'INCOMPLETE',coverageStartBlock:start.toString(),coverageEndBlock:end.toString(),chunks};
  const spenders=new Map();
  for(const chunk of chunks)for(const log of chunk.approvals.value??[]){if(log.topics?.length===3){const owner='0x'+log.topics[1].slice(-40),spender='0x'+log.topics[2].slice(-40);spenders.set(owner+spender,{owner,spender});}}
  summary.allowances=[];for(const pair of spenders.values())summary.allowances.push({...pair,value:await call(endpoint,CONFIG.token.address,'allowance',[pair.owner,pair.spender])});
  summary.limitations.push('Approval events before the earliest recorded vault deployment are not covered; zero discovered spenders does not establish zero allowances. Native ETH internal transfers require traces not supplied by this collector.');
 }
 const recheck=await observe(endpoint,'eth_getBlockByNumber',[tag,false]);summary.endOfReadHeader=recheck;
 if(recheck.value?.hash!==summary.snapshot.hash)summary.limitations.push('Snapshot recheck failed; no chain state may be accepted as verified.');
 summary.limitations.push('This collector does not complete Solidity review, canonical registry/source authentication, all privileged-role discovery, complete historical allowances, independent historical-log reconciliation, liquidity-lock verification or key-management/CI authorization review.');
}
try{await collect();}catch(error){summary.limitations.push(error.message);}
summary.finishedAtUtc=now();fs.writeFileSync(path.join(out,'summary.json'),json(summary));
console.log('AUDIT_COLLECTION_SUMMARY '+json({auditId:summary.auditId,startedAtUtc:summary.startedAtUtc,finishedAtUtc:summary.finishedAtUtc,status:summary.status,snapshot:summary.snapshot,endpoints:summary.endpoints,vaults:summary.vaults.length,treasuries:summary.treasuries.length,historyStatus:summary.history.status,limitations:summary.limitations}).replace(/\n/g,' '));
// Operational completeness is deliberately never inferred from collector success.
process.exitCode=summary.snapshot?0:2;
