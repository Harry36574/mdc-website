// Observe public Etherscan labels. Do not treat stored website labels as current verification.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { CONFIG } from '../../transparency/config.mjs';
const out=path.resolve(process.argv[2]??'audit-output');fs.mkdirSync(out,{recursive:true});
const results=[];
for(const instance of [{id:'MDC',address:CONFIG.token.address},...CONFIG.instances]){
 const item={id:instance.id,address:instance.address,url:'https://etherscan.io/address/'+instance.address+'#code',observedAtUtc:new Date().toISOString(),status:'UNVERIFIED',storedWebsiteLabel:instance.sourceVerification??null};
 try{
  const response=await fetch(item.url,{redirect:'error',signal:AbortSignal.timeout(20000)});item.httpStatus=response.status;
  const html=await response.text();item.responseSha256=createHash('sha256').update(html).digest('hex');
  const text=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/\s+/g,' ');
  if(!response.ok||/just a moment|attention required|verify you are human|enable javascript and cookies/i.test(text))item.reason='Explorer request denied or challenge page; no verification inference.';
  else{
   const exact=text.match(/Contract Source Code Verified\s*\(\s*Exact Match\s*\)/i),similar=text.match(/Similar Match Source Code|Contract Source Code Verified\s*\(\s*Similar Match\s*\)/i),unverified=text.match(/Contract source code (?:is )?not verified|Are you the contract creator\?\s*Verify and Publish/i);
   const match=exact??similar??unverified;
   if(match){item.status=exact?'EXACT_MATCH_LABEL_OBSERVED':similar?'SIMILAR_MATCH_LABEL_OBSERVED':'NOT_VERIFIED_LABEL_OBSERVED';item.excerpt=text.slice(Math.max(0,match.index-150),match.index+match[0].length+450);}
   else item.reason='No unambiguous verification label found; automated parsing is not proof of verification.';
  }
 }catch(error){item.reason=error.message;}
 item.finishedAtUtc=new Date().toISOString();results.push(item);
 console.log('EXPLORER_OBSERVATION '+JSON.stringify(item));
}
fs.writeFileSync(path.join(out,'etherscan-status.json'),JSON.stringify({scope:'Public Mainnet Etherscan display labels only; not authentication of missing canonical project source or compiler inputs.',results},null,2)+'\n');
