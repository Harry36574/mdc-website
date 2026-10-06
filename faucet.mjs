const form = document.querySelector('#application-form');
const button = document.querySelector('#submit');
const message = document.querySelector('#message');
const local = ['127.0.0.1','localhost','::1'].includes(location.hostname);
const api = local ? location.origin : 'https://claim-api.mdctoken.org';
let available = false, token = '', widgetId, rendering = false;
const show = (text, kind = '') => { message.textContent = text; message.className = kind; };
function ready() { button.disabled = !available || !token; }
function reset() {
  token = ''; ready();
  if (widgetId !== undefined && window.turnstile) window.turnstile.reset(widgetId);
}
async function renderCaptcha(config) {
  if (rendering) return; rendering = true;
  const deadline = performance.now() + 10000;
  while (!window.turnstile && performance.now() < deadline) await new Promise(resolve=>setTimeout(resolve,100));
  if (!window.turnstile) { show('Human verification is unavailable. Please try again later.','error'); return; }
  widgetId = window.turnstile.render('#captcha', {sitekey:config.siteKey, action:config.action,
    cData:config.cData, size:document.querySelector('#captcha').clientWidth < 300 ? 'compact' : 'flexible', callback:value=>{token=value;ready();},
    'expired-callback':()=>{token='';ready();}, 'error-callback':()=>{token='';ready();}});
}
async function request(path, init = {}) {
  const controller = new AbortController(); const timer = setTimeout(()=>controller.abort(),15000);
  try { const response = await fetch(api+path,{...init,credentials:'omit',signal:controller.signal});
    const data = await response.json(); return {response,data};
  } finally { clearTimeout(timer); }
}
try {
  const {response,data} = await request('/faucet/status');
  if (!response.ok || data.maxParticipants !== 100 || data.rewardMdc !== '10' || data.budgetMdc !== '1000') throw Error();
  available = data.acceptingApplications === true;
  document.querySelector('#remaining').textContent = `Remaining: ${data.remaining} / 100`;
  show(available ? '' : 'Applications are currently closed.');
  if (available && data.turnstile?.mode === 'REQUIRED') await renderCaptcha(data.turnstile);
} catch { show('The faucet is temporarily unavailable. Please try again later.','error'); }
ready();
form.addEventListener('submit', async event => {
  event.preventDefault(); if (!available) return;
  const walletAddress = document.querySelector('#wallet').value.trim();
  const xUsername = document.querySelector('#username').value.trim().replace(/^@/,'');
  if (!/^0x[0-9a-fA-F]{40}$/.test(walletAddress) || /^0x0{40}$/.test(walletAddress)) {
    show('Enter a valid Ethereum address.','error'); return;
  }
  if (!/^[a-z0-9_]{1,15}$/i.test(xUsername)) { show('Enter a valid X username.','error'); return; }
  if (!token) { show('Please complete human verification.','error'); return; }
  button.disabled = true; show('Submitting…');
  try {
    const {response,data} = await request('/faucet/apply',{method:'POST',
      headers:{'Content-Type':'application/json','X-MDC-Faucet-Intent':'submit'},
      body:JSON.stringify({walletAddress,xUsername,turnstileToken:token})});
    if (response.ok && data.message === 'Your request has been submitted for manual review.') {
      available = false; form.reset(); show(data.message,'success');
    } else {
      const errors = {DUPLICATE_APPLICATION:'This Ethereum address or X username has already been submitted.',
        RATE_LIMITED:'Too many attempts. Please wait a minute before trying again.',
        FAUCET_FULL:'Applications are closed.',FAUCET_CLOSED:'Applications are currently closed.',CAPTCHA_FAILED:'Human verification failed. Please try again.',
        CAPTCHA_UNAVAILABLE:'Human verification is unavailable. Please try again later.'};
      if (data.error === 'FAUCET_FULL' || data.error === 'FAUCET_CLOSED') available = false;
      show(errors[data.error] || 'Could not submit. Please try again with new human verification.','error');
    }
  } catch { show('Could not confirm submission. Please retry with new human verification; duplicate submissions are blocked.','error'); }
  finally { reset(); }
});
