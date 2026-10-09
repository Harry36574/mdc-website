const $ = id => document.getElementById(id);
const local = ['127.0.0.1','localhost','::1'].includes(location.hostname);
const api = local ? location.origin : 'https://claim-api.mdctoken.org';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let applicationsOpen = false, submitted = false, current = null, config = null, busy = false, generation = 0;
const widgets = {apply:{token:'',id:undefined},correct:{token:'',id:undefined}};
const show = (id,text,kind='') => { $(id).textContent=text; $(id).className=kind; };
function ready() {
  $('submit').disabled = busy || !applicationsOpen || submitted || !widgets.apply.token;
  $('submit-correction').disabled = busy || current?.status !== 'NEEDS_CORRECTION' || !widgets.correct.token;
  $('check-status').disabled = busy; $('application-id').disabled = busy; $('show-correction').disabled = busy;
}
function reset(kind) {
  const widget=widgets[kind]; widget.token=''; ready();
  if(widget.id!==undefined && window.turnstile) window.turnstile.reset(widget.id);
}
async function captcha(kind) {
  const widget=widgets[kind]; if(widget.id!==undefined){reset(kind);return;}
  const box=kind==='apply'?'captcha':'correction-captcha',message=kind==='apply'?'message':'correction-message';
  const deadline=performance.now()+10000;
  while(!window.turnstile && performance.now()<deadline) await new Promise(resolve=>setTimeout(resolve,100));
  if(!window.turnstile || !config){show(message,'Human verification is unavailable. Please try again later.','error');return;}
  widget.id=window.turnstile.render('#'+box,{sitekey:config.siteKey,action:config.action,cData:config.cData,
    size:$(box).clientWidth<300?'compact':'flexible',callback:value=>{widget.token=value;ready();},
    'expired-callback':()=>{widget.token='';ready();},'error-callback':()=>{widget.token='';ready();}});
}
async function request(path,init={}) {
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
  try {const response=await fetch(api+path,{...init,credentials:'omit',signal:controller.signal});
    const data=await response.json();return{response,data};}finally{clearTimeout(timer);}
}
const post=(path,intent,body)=>request(path,{method:'POST',headers:{'Content-Type':'application/json','X-MDC-Faucet-Intent':intent},body:JSON.stringify(body)});
const errors={DUPLICATE_APPLICATION:'This Ethereum address or X username has already been submitted.',
  DUPLICATE_X:'This X username has already been used for another application.',
  APPLICATION_NOT_FOUND:'Application not found. Please check your Application ID.',
  CORRECTION_NOT_ALLOWED:'This application cannot be corrected. Please check its current status.',
  RATE_LIMITED:'Too many attempts. Please wait a minute before trying again.',
  FAUCET_CLOSED:'Applications are currently closed.',FAUCET_FULL:'This Faucet round is fully distributed.',
  CAPTCHA_REQUIRED:'Please complete human verification.',CAPTCHA_FAILED:'Human verification failed. Please try again.',
  CAPTCHA_UNAVAILABLE:'Human verification is unavailable. Please try again later.'};
function displayStatus(data,id) {
  const descriptions={PENDING:'Your application is under review.',
    APPROVED:'Your application has been approved. The 10 MDC payment is being processed manually.',
    NEEDS_CORRECTION:'Your application needs correction. We could not verify the information you submitted.',
    REJECTED:'Your application was not approved.',PAID:'10 MDC has been sent.'};
  if(data.applicationId!==id || !Object.hasOwn(descriptions,data.status) ||
      !/^0x[0-9a-f]{4}\.\.\.[0-9a-f]{4}$/i.test(data.walletAddress ?? '') ||
      !/^[a-z0-9_]{1,15}$/i.test(data.xUsername ?? '') ||
      !(data.publicMessage===null || typeof data.publicMessage==='string' && data.publicMessage.length<=1000)) throw Error('INVALID_STATUS_RESPONSE');
  if(data.status==='PAID' && !/^0x[0-9a-f]{64}$/i.test(data.txHash ?? '')) throw Error('INVALID_PAYMENT_RESPONSE');
  current={applicationId:id,status:data.status,walletAddress:data.walletAddress,xUsername:data.xUsername};
  $('status-title').textContent=data.status==='NEEDS_CORRECTION'?'Application Needs Correction':data.status==='PAID'?'Payment completed':data.status;
  $('status-description').textContent=descriptions[data.status];
  $('public-reason').hidden=!data.publicMessage; $('public-reason').textContent=data.publicMessage?'Reason: '+data.publicMessage:'';
  $('status-wallet').textContent='Ethereum Address: '+data.walletAddress; $('status-username').textContent='X Username: @'+data.xUsername;
  $('payment-details').hidden=data.status!=='PAID'; $('payment-link').removeAttribute('href'); $('payment-link').textContent='';
  if(data.status==='PAID'){$('payment-link').href='https://etherscan.io/tx/'+data.txHash;$('payment-link').textContent=data.txHash;}
  $('show-correction').hidden=data.status!=='NEEDS_CORRECTION'; $('status-result').hidden=false;
}
try {
  const{response,data}=await request('/faucet/status');
  if(!response.ok || data.maxParticipants!==100 || data.rewardMdc!=='10' || data.budgetMdc!=='1000') throw Error();
  applicationsOpen=data.acceptingApplications===true; config=data.turnstile?.mode==='REQUIRED'?data.turnstile:null;
  $('remaining').textContent=`Remaining: ${data.remaining} / 100`;
  show('message',data.remaining===0?'This Faucet round is fully distributed.':applicationsOpen?'':'Applications are currently closed.');
  if(applicationsOpen && config) await captcha('apply');
}catch{show('message','The faucet is temporarily unavailable. Please try again later.','error');}
ready();
$('application-form').addEventListener('submit',async event=>{
  event.preventDefault();if(busy || !applicationsOpen || submitted)return;
  const walletAddress=$('wallet').value.trim(),xUsername=$('username').value.trim().replace(/^@/,'');
  if(!/^0x[0-9a-fA-F]{40}$/.test(walletAddress) || /^0x0{40}$/.test(walletAddress)){show('message','Enter a valid Ethereum address.','error');return;}
  if(!/^[a-z0-9_]{1,15}$/i.test(xUsername)){show('message','Enter a valid X username.','error');return;}
  if(!widgets.apply.token){show('message','Please complete human verification.','error');return;}
  busy=true;ready();show('message','Submitting…'); const token=widgets.apply.token;widgets.apply.token='';
  try{
    const{response,data}=await post('/faucet/apply','submit',{walletAddress,xUsername,turnstileToken:token});
    if(response.ok && data.status==='PENDING' && UUID.test(data.applicationId ?? '')){
      submitted=true;$('application-form').reset();show('message','Application submitted successfully.','success');
      $('saved-application-id').textContent=data.applicationId;$('submission-receipt').hidden=false;$('application-id').value=data.applicationId;
    }else{if(['FAUCET_FULL','FAUCET_CLOSED'].includes(data.error))applicationsOpen=false;
      show('message',errors[data.error] || 'Could not submit. Please try again with new human verification.','error');}
  }catch{show('message','Could not confirm submission. Please retry with new human verification; duplicate submissions are blocked.','error');}
  finally{busy=false;reset('apply');}
});
$('application-id').addEventListener('input',()=>{
  if(busy)return;generation++;current=null;$('status-result').hidden=true;$('correction-form').hidden=true;reset('correct');
});
$('status-form').addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;
  current=null;$('status-result').hidden=true;$('correction-form').hidden=true;reset('correct');
  const id=$('application-id').value.trim().toLowerCase(),requestGeneration=++generation;
  if(!UUID.test(id)){show('status-message',errors.APPLICATION_NOT_FOUND,'error');return;}
  busy=true;ready();show('status-message','Checking…');
  try{const{response,data}=await post('/faucet/status','status',{applicationId:id});
    if(requestGeneration!==generation)return;
    if(!response.ok){show('status-message',errors[data.error] || 'Could not check status. Please try again later.','error');return;}
    displayStatus(data,id);show('status-message','');
  }catch{show('status-message','Could not check status. Please try again later.','error');}
  finally{busy=false;ready();}
});
$('show-correction').addEventListener('click',async()=>{
  if(busy || current?.status!=='NEEDS_CORRECTION')return;
  $('correction-wallet').value=current.walletAddress;$('correction-username').value='@'+current.xUsername;
  $('correction-form').hidden=false;show('correction-message','');await captcha('correct');
});
$('correction-form').addEventListener('submit',async event=>{
  event.preventDefault();if(busy || current?.status!=='NEEDS_CORRECTION')return;
  const xUsername=$('correction-username').value.trim().replace(/^@/,'');
  if(!/^[a-z0-9_]{1,15}$/i.test(xUsername)){show('correction-message','Enter a valid X username.','error');return;}
  if(!widgets.correct.token){show('correction-message','Please complete new human verification.','error');return;}
  const id=current.applicationId,token=widgets.correct.token;widgets.correct.token='';busy=true;ready();show('correction-message','Submitting correction…');
  try{const{response,data}=await post('/faucet/correct','correct',{applicationId:id,xUsername,turnstileToken:token});
    if(!response.ok){show('correction-message',errors[data.error] || 'Could not submit correction. Please try again.','error');return;}
    if(data.applicationId!==id || data.status!=='PENDING')throw Error();
    displayStatus({...current,applicationId:id,xUsername,status:'PENDING',publicMessage:null},id);
    $('correction-form').hidden=true;show('status-message','Correction submitted successfully. Your application is now pending review again.','success');
  }catch{show('correction-message','Could not confirm correction. Check your application status before retrying.','error');}
  finally{busy=false;reset('correct');ready();}
});
