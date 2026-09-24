import { CONFIG } from './config.mjs';
import { SnapshotStore, formatMDC, utc, partISchedule, halvingSummary, canRefresh, publicError } from './core.mjs';

const store = new SnapshotStore();
const element = id => document.getElementById(id);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const external = (url, text) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(text)} ↗</a>`;
const explorer = (kind, value, label) => external(`https://etherscan.io/${kind}/${value}`, label);
const md = value => value === undefined ? '—' : `${formatMDC(value)} <small>MDC</small>`;
const metric = (label, value) => `<div><dt>${escape(label)}</dt><dd>${md(value)}</dd></div>`;
const exactRow = (label, value) => `<dt>${escape(label)}</dt><dd class="mono">${value === undefined ? '—' : escape(value)}${value === undefined ? '' : ' base units'}</dd>`;
const timeRow = (label, value) => `<dt>${escape(label)}</dt><dd>${utc(value)}<br><span class="mono">${escape(value)} Unix seconds</span></dd>`;
const durationRow = value => `<dt>interval</dt><dd>${BigInt(value) / 86400n} fixed days · ${escape(value)} seconds</dd>`;

function scheduleMarkup(instance) {
  const p = instance.expected;
  if (instance.id === 'H2') return '';
  let content = '';
  if (instance.id === 'H7') {
    for (const batch of ['batch2', 'batch3']) content += timeRow(`${batch}Time`, p[`${batch}Time`]) + exactRow(`${batch}Amount · ${formatMDC(BigInt(p[`${batch}Amount`]))} MDC`, p[`${batch}Amount`]);
  } else {
    content += timeRow('startTime', p.startTime) + durationRow(p.interval);
    for (const name of ['amountPerInterval', 'initialAmount', 'stepAmount']) if (p[name]) content += exactRow(`${name} · ${formatMDC(BigInt(p[name]))} MDC`, p[name]);
    if (p.periodCount) content += `<dt>periodCount</dt><dd>${escape(p.periodCount)}</dd>`;
  }
  let table = '';
  if (instance.id === 'H8') {
    const periods = partISchedule(instance);
    table = `<table class="schedule"><caption>Ten eligibility periods · 9,750,000 MDC total</caption><thead><tr><th>Period / UTC</th><th>Maximum MDC</th></tr></thead><tbody>${periods.map(x => `<tr><td>${x.period}<time>${utc(x.timestamp)}</time><span class="mono">${x.timestamp}</span></td><td>${formatMDC(x.amount)}</td></tr>`).join('')}</tbody></table>`;
  }
  return `<details class="card-details"><summary>Frozen schedule & timestamps</summary><div class="detail-body"><p class="small">Registry parameters. Live identity checks must match these values. Intervals use fixed days.</p><dl>${content}</dl>${table}</div></details>`;
}
function renderCard(instance) {
  const p = instance.expected, snapshot = store.snapshot, state = snapshot?.states[instance.id];
  const isLock = instance.id === 'H2';
  const amount = BigInt(p.allocation ?? p.expectedLockedAmount);
  const identityError = store.error?.code === 'PARAMETER MISMATCH' && (!store.error.instance || store.error.instance === instance.id);
  const status = store.error ? identityError ? 'PARAMETER MISMATCH' : 'STATUS UNAVAILABLE' : state?.status ?? 'STATUS UNAVAILABLE';
  const warning = /MISMATCH|UNAVAILABLE|BELOW|EXCESS/.test(status) || store.isStale();
  const badge = instance.sourceVerification;
  const treasury = isLock ? '<p class="card-note">No Treasury · No release interface</p>' : `<span class="address-label">Treasury Safe</span><div class="address">${escape(p.treasury)}</div>`;
  const metrics = metric(isLock ? 'lockedBalance' : 'Vault balance', state?.balance) + (isLock ? metric('expectedLockedAmount', BigInt(p.expectedLockedAmount)) : ['totalReleased', 'cumulativeEligible', 'releasable', 'availableToReleaseNow'].map(name => metric(name, state?.[name])).join(''));
  let note = '';
  if (instance.id === 'H7') note = 'Historical Batch 1 is separate and not included in H7.';
  if (instance.id === 'H8') note = 'Ten fixed-interval periods. Schedule eligibility totals 9,750,000 MDC.';
  if (instance.id === 'H9') {
    const half = halvingSummary(instance);
    note = `Integer floor-halving · ${half.count} non-zero tranches.<br><strong>${half.remainder} base units permanently ineligible = ${formatMDC(half.remainder)} MDC.</strong><br>This is not the Funding Source accounting residual.`;
  }
  const exact = exactRow(isLock ? 'expectedLockedAmount (Registry)' : 'allocation (Registry)', amount) + exactRow(isLock ? 'lockedBalance' : 'Vault balance', state?.balance) + (isLock ? '' : ['totalReleased', 'cumulativeEligible', 'releasable', 'availableToReleaseNow'].map(name => exactRow(name, state?.[name])).join(''));
  const caption = snapshot ? `Snapshot block ${snapshot.block.number} · ${utc(snapshot.block.timestamp)}<br>Last updated ${utc(snapshot.updatedAt / 1000n)}${store.error || store.isStale() ? '<br>Previous complete snapshot; current state unconfirmed.' : ''}` : 'No successful snapshot yet. Live amounts are unavailable.';
  return `<article class="vault-card" id="${instance.id.toLowerCase()}" aria-labelledby="title-${instance.id}">
    <div class="card-main"><div class="card-heading"><span class="instance-id">${instance.id}</span><div><h3 id="title-${instance.id}">${escape(instance.name)}</h3><div class="contract-type">${escape(instance.type)}</div></div></div>
    <span class="source-badge ${badge === 'Verified Source' ? '' : 'pending'}">${escape(badge)}</span>
    <span class="address-label">Contract address</span><div class="address">${escape(instance.address)}</div>${treasury}
    <div class="allocation"><div class="label">${isLock ? 'Expected locked amount' : 'Allocation'} · Registry</div><div class="amount">${formatMDC(amount)} <span class="unit">MDC</span></div></div>
    <dl class="metrics">${metrics}</dl><p class="status ${warning ? 'warning' : ''}">${escape(status)}${store.isStale() ? ' · STALE SNAPSHOT' : ''}</p>
    ${note ? `<p class="card-note">${note}</p>` : ''}</div>
    ${scheduleMarkup(instance)}
    <details class="card-details"><summary>Exact base units & identity</summary><div class="detail-body"><dl>${exact}<dt>Official MDC token</dt><dd class="mono">${escape(p.token)}</dd><dt>Expected complete runtime keccak256</dt><dd class="mono">${escape(instance.runtimeHash)}</dd><dt>Live runtime / parameter conformity</dt><dd>${store.error || store.isStale() || !state ? 'STATUS UNAVAILABLE' : 'MATCH at snapshot block'}</dd></dl></div></details>
    <div class="card-footer"><div class="evidence-links">${explorer('address', instance.address + '#code', 'View Contract on Etherscan')}${p.treasury ? explorer('address', p.treasury, 'View Treasury on Etherscan') : ''}${explorer('tx', instance.deploymentTx, 'Deployment transaction')}${explorer('tx', instance.fundingTx, 'Funding transaction')}</div><p class="snapshot-caption">${caption}</p></div>
  </article>`;
}
function renderCards() {
  const open = new Set([...document.querySelectorAll('.vault-card details[open]')].map(node => `${node.closest('article').id}:${[...node.parentElement.children].indexOf(node)}`));
  element('instances').innerHTML = CONFIG.instances.map(renderCard).join('');
  for (const node of document.querySelectorAll('.vault-card details')) node.open = open.has(`${node.closest('article').id}:${[...node.parentElement.children].indexOf(node)}`);
}
function renderStatus() {
  const snapshot = store.snapshot, status = element('snapshot-status');
  const stale = store.isStale();
  status.dataset.state = stale ? 'stale' : store.error ? 'error' : snapshot ? 'live' : 'loading';
  status.textContent = store.busy ? `${snapshot ? 'Keeping previous snapshot · ' : ''}Reading and verifying a complete snapshot…` : stale ? 'STALE · Last successful snapshot is over 120 seconds old' : store.error ? 'STATUS UNAVAILABLE · Refresh failed' : snapshot ? 'VERIFIED SNAPSHOT · All nine instances at one block' : 'STATUS UNAVAILABLE · Awaiting first verified snapshot';
  element('refresh').disabled = store.busy;
  element('instances').setAttribute('aria-busy', String(store.busy));
  element('snapshot-error').hidden = !store.error;
  const safe = store.error ? publicError(store.error) : null;
  element('snapshot-error').textContent = safe ? `${safe.code} · ${safe.message} ${snapshot ? `Retaining the complete snapshot at block ${snapshot.block.number}.` : 'No live values have been published.'}` : '';
  if (snapshot) {
    element('snapshot-block').textContent = snapshot.block.number.toString();
    element('snapshot-utc').textContent = utc(snapshot.block.timestamp);
    element('snapshot-source').textContent = snapshot.source.label;
    element('snapshot-updated').textContent = utc(snapshot.updatedAt / 1000n);
  }
  element('refresh-note').textContent = document.hidden ? 'Automatic refresh paused while this page is hidden.' : 'Refreshes every 60 seconds while this page is visible. Values older than 120 seconds are marked STALE.';
}
async function refresh() {
  if (!canRefresh(document.hidden, store.busy)) return;
  const pending = store.refresh();
  renderStatus();
  await pending;
  renderCards(); renderStatus();
}
element('registry-digest').textContent = `Registry SHA-256: ${CONFIG.provenance.registrySha256}`;
element('refresh').addEventListener('click', refresh);
document.addEventListener('visibilitychange', () => { renderStatus(); if (!document.hidden && (!store.snapshot || store.age() >= 60000n)) void refresh(); });
setInterval(() => { if (canRefresh(document.hidden, store.busy)) void refresh(); }, 60000);
let wasStale = false;
setInterval(() => { const stale = store.isStale(); if (stale !== wasStale) { wasStale = stale; renderCards(); } renderStatus(); }, 1000);
renderCards(); renderStatus();
void refresh();
