// Offline checks of the public website configuration. These are NOT live chain checks.
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import path from 'node:path';
import { CONFIG } from '../../transparency/config.mjs';
import { due, cadence, publishedCounts } from '../../transparency/history/core.mjs';
import { halvingSummary, partISchedule } from '../../transparency/core.mjs';
const require=createRequire(process.env.MDC_AUDIT_DEPENDENCY_ROOT?path.resolve(process.env.MDC_AUDIT_DEPENDENCY_ROOT,'package.json'):import.meta.url);
const { keccak256 }=require('viem');
const root=path.resolve(import.meta.dirname,'../..');
const checks=[];
function check(id,condition,detail){checks.push({id,status:condition?'PASS':'FAIL',scope:'OFFLINE_REPOSITORY_ONLY',detail});}
const inventory=CONFIG.instances.map(x=>({id:x.id,name:x.name,address:x.address,type:x.type,treasury:x.expected.treasury??null,expected:x.expected,deploymentTx:x.deploymentTx,fundingTx:x.fundingTx,sourceVerificationLabel:x.sourceVerification,expectedRuntimeHash:x.runtimeHash,calculatedRuntimeHash:keccak256(x.runtime),addressVerification:'PROJECT_WEBSITE_REFERENCE_ONLY_NOT_CHAIN_VERIFIED',liveState:null}));
check('CONFIG_RUNTIME_HASHES',inventory.every(x=>x.expectedRuntimeHash===x.calculatedRuntimeHash),'Keccak-256 of all nine embedded byte arrays matches its configured hash; this does not match them to deployed chain code.');
check('CONFIG_ALLOCATION_TOTAL',CONFIG.instances.reduce((s,x)=>s+BigInt(x.expected.allocation??x.expected.expectedLockedAmount),0n)===49000000n*10n**18n,'The configured allocations sum to 49M MDC; no live funding is inferred.');
check('CONFIG_UNIQUE_ADDRESSES',new Set(inventory.map(x=>x.address.toLowerCase())).size===9,'Nine distinct configured vault/lock addresses.');
check('CONFIG_TREASURY_COUNT',new Set(inventory.map(x=>x.treasury).filter(Boolean)).size===8,'Eight distinct configured Treasury destinations, with none configured for H2.');
const halves=halvingSummary(CONFIG.instances.find(x=>x.id==='H9'));
check('CONFIG_H9_INTEGER_HALVING',halves.count===83n&&halves.remainder===23n,'Configured H9 integer floor-halving has 83 nonzero tranches and 23 ineligible base units.');
const partI=partISchedule(CONFIG.instances.find(x=>x.id==='H8'));
check('CONFIG_H8_SCHEDULE',partI.length===10&&partI.reduce((s,x)=>s+x.amount,0n)===9750000n*10n**18n,'Ten configured H8 tranches total 9.75M MDC.');
check('SCHEDULE_FIRST_DUE',due('AUDIT_30D',1)==='2026-10-21T00:00:00.000Z','Fixed 30-day cadence from 2026-09-21, not a rolling date based on this attempt.');
const index=JSON.parse(fs.readFileSync(path.join(root,'transparency/history/index.json')));
check('EXISTING_FORMAL_INDEX_EMPTY',index.records.length===0&&publishedCounts([]).audits===0,'No formal published record exists at the reviewed website baseline.');
const now=new Date().toISOString();
const calendar=cadence('AUDIT_30D',[],now);
check('OVERDUE_RETAINED',calendar.status==='STALE'&&calendar.nextDue==='2026-10-21T00:00:00.000Z','An incomplete attempt must not satisfy the overdue interval or advance its next unsatisfied deadline.');
const disassembly=CONFIG.instances.map(instance=>{
 const all=Buffer.from(instance.runtime.slice(2),'hex'),metadataLength=all.readUInt16BE(all.length-2),code=all.subarray(0,all.length-metadataLength-2),counts={CALL:0,DELEGATECALL:0,CALLCODE:0,SELFDESTRUCT:0,SSTORE:0,CALLER:0,ORIGIN:0};
 const names={241:'CALL',244:'DELEGATECALL',242:'CALLCODE',255:'SELFDESTRUCT',85:'SSTORE',51:'CALLER',50:'ORIGIN'};
 for(let pc=0;pc<code.length;pc++){const op=code[pc];if(names[op])counts[names[op]]++;if(op>=0x60&&op<=0x7f)pc+=op-0x5f;}
 return{id:instance.id,runtimeBytes:all.length,metadataBytes:metadataLength+2,linearOpcodeCounts:counts,limitation:'Offline linear disassembly of a configured byte array; neither execution-path proof nor deployed-code identity. No source-level access-control PASS is inferred.'};
});
const result={executedAtUtc:now,scope:'OFFLINE_PUBLIC_WEBSITE_CONFIGURATION',checks,inventory,disassembly,calendar,nominalSecondIntervalDue:due('AUDIT_30D',2),limitations:['Canonical registry, Solidity sources, compiler artifacts and key-management procedures were unavailable.','No balance, supply, deployment receipt, ownership, Safe configuration, allowance or liquidity-lock observation is established by these checks.']};
const output=process.argv[2];if(output){fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify({checks,resultFile:output??null},null,2));
process.exitCode=checks.some(x=>x.status==='FAIL')?1:0;
