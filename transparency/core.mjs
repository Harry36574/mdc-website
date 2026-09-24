import { CONFIG } from './config.mjs';

export const ENDPOINTS = Object.freeze([
  Object.freeze({ label: 'PublicNode · Ethereum', url: 'https://ethereum-rpc.publicnode.com', batchSize: 8 }),
  Object.freeze({ label: 'dRPC · Ethereum', url: 'https://ethereum.drpc.org', batchSize: 3 })
]);
export const READ_METHODS = Object.freeze(['eth_chainId', 'eth_getBlockByNumber', 'eth_getCode', 'eth_call']);
export const UINT256_MAX = (1n << 256n) - 1n;
export const UNIT = 10n ** 18n;
const HASH = /^0x[0-9a-f]{64}$/i;
const WORD = /^0x[0-9a-f]{64}$/i;
const HEX = /^0x(?:[0-9a-f]{2})*$/i;
const lower = value => value.toLowerCase();
export class ReadError extends Error {
  constructor(code, detail, instance = null, retryable = false) {
    // Codes originate locally. Never retain upstream text, payloads or causes.
    super(code);
    this.code = code; this.instance = instance; this.retryable = retryable;
  }
}
const PUBLIC_MESSAGES = Object.freeze({
  RPC_TEMPORARILY_UNAVAILABLE: 'Live data is temporarily unavailable. Please try again later.',
  SNAPSHOT_UNAVAILABLE: 'Verified data is unavailable. Please try again later.',
  CHAIN_VERIFICATION_FAILED: 'Ethereum Mainnet could not be verified. No new snapshot was accepted.',
  DATA_INCOMPLETE: 'The response was incomplete or invalid. No new snapshot was accepted.',
  INTEGRITY_CHECK_FAILED: 'Data integrity checks failed. No new snapshot was accepted.'
});
export function publicError(error) {
  let code = 'SNAPSHOT_UNAVAILABLE';
  if (error instanceof ReadError) {
    if (['RPC TIMEOUT', 'RPC NETWORK ERROR', 'RPC HTTP ERROR', 'RPC RATE LIMITED (429)', 'RPC GETTER / METHOD ERROR'].includes(error.code)) code = 'RPC_TEMPORARILY_UNAVAILABLE';
    else if (error.code === 'WRONG CHAIN') code = 'CHAIN_VERIFICATION_FAILED';
    else if (['PARAMETER MISMATCH', 'BALANCE MISMATCH', 'SCHEDULE STATE MISMATCH', 'BLOCK HASH MISMATCH', 'BLOCK NUMBER MISMATCH'].includes(error.code)) code = 'INTEGRITY_CHECK_FAILED';
    else code = 'DATA_INCOMPLETE';
  }
  return Object.freeze({ code, message: PUBLIC_MESSAGES[code] });
}
function requireTrue(condition, code, detail, instance) { if (!condition) throw new ReadError(code, detail, instance); }
export function quantity(value) {
  requireTrue(typeof value === 'string' && /^0x(?:0|[1-9a-f][0-9a-f]*)$/i.test(value), 'MALFORMED QUANTITY');
  const result = BigInt(value);
  requireTrue(result <= UINT256_MAX, 'QUANTITY OVERFLOW');
  return result;
}
export function uint(value) {
  requireTrue(typeof value === 'string' && WORD.test(value), 'MALFORMED GETTER RESULT');
  return BigInt(value);
}
export function decode(value, type) {
  const integer = uint(value);
  if (type === 'address') {
    requireTrue(integer < 1n << 160n, 'MALFORMED ADDRESS RESULT');
    return '0x' + integer.toString(16).padStart(40, '0');
  }
  requireTrue(type === 'uint256' || type === 'uint8', 'UNEXPECTED ABI TYPE');
  if (type === 'uint8') requireTrue(integer <= 255n, 'MALFORMED GETTER RESULT');
  return integer;
}
export function formatMDC(value) {
  requireTrue(typeof value === 'bigint' && value >= 0n && value <= UINT256_MAX, 'INVALID AMOUNT');
  const whole = (value / UNIT).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const fraction = (value % UNIT).toString().padStart(18, '0').replace(/0+$/, '');
  return whole + (fraction ? '.' + fraction : '');
}
// Gregorian UTC rendering with integer arithmetic, including distant schedules.
export function utc(seconds) {
  const t = BigInt(seconds);
  requireTrue(t >= 0n, 'INVALID TIMESTAMP');
  const z = t / 86400n + 719468n;
  const era = z / 146097n;
  const doe = z - era * 146097n;
  const yoe = (doe - doe / 1460n + doe / 36524n - doe / 146096n) / 365n;
  let year = yoe + era * 400n;
  const doy = doe - (365n * yoe + yoe / 4n - yoe / 100n);
  const mp = (5n * doy + 2n) / 153n;
  const day = doy - (153n * mp + 2n) / 5n + 1n;
  const month = mp + (mp < 10n ? 3n : -9n);
  year += month <= 2n ? 1n : 0n;
  const pad = n => n.toString().padStart(2, '0');
  return `${year}-${pad(month)}-${pad(day)} ${pad(t / 3600n % 24n)}:${pad(t / 60n % 60n)}:${pad(t % 60n)} UTC`;
}
export const min = (a, b) => a < b ? a : b;
export function releaseAmounts(cumulative, released, balance) {
  const releasable = cumulative > released ? cumulative - released : 0n;
  return { releasable, availableToReleaseNow: min(releasable, balance) };
}
export function partISchedule(instance) {
  const p = instance.expected;
  const result = [];
  for (let i = 0n; i < BigInt(p.periodCount); i++) result.push({ period: i + 1n, timestamp: BigInt(p.startTime) + i * BigInt(p.interval), amount: BigInt(p.initialAmount) + i * BigInt(p.stepAmount) });
  return result;
}
export function halvingSummary(instance) {
  let tranche = BigInt(instance.expected.initialAmount), count = 0n, total = 0n;
  while (tranche > 0n) { total += tranche; count++; tranche /= 2n; }
  return { count, total, remainder: BigInt(instance.expected.allocation) - total };
}
export function eligible(instance, timestamp) {
  const p = instance.expected, t = BigInt(timestamp), allocation = BigInt(p.allocation ?? p.expectedLockedAmount);
  if (instance.type === 'MDCPermanentLock') return null;
  if (instance.type === 'MDCLiquidityReserveVault') return (t >= BigInt(p.batch2Time) ? BigInt(p.batch2Amount) : 0n) + (t >= BigInt(p.batch3Time) ? BigInt(p.batch3Amount) : 0n);
  if (t < BigInt(p.startTime)) return 0n;
  const periods = (t - BigInt(p.startTime)) / BigInt(p.interval) + 1n;
  if (instance.type === 'MDCFixedPeriodVault') return min(allocation, periods * BigInt(p.amountPerInterval));
  if (instance.type === 'MDCEcosystemPartIVault') {
    const count = min(periods, BigInt(p.periodCount));
    return min(allocation, count * (2n * BigInt(p.initialAmount) + (count - 1n) * BigInt(p.stepAmount)) / 2n);
  }
  let sum = 0n, tranche = BigInt(p.initialAmount);
  for (let i = 0n; i < min(periods, 256n) && tranche > 0n; i++) { sum += tranche; tranche /= 2n; }
  return min(allocation, sum);
}
export function fundingStatus(instance, state) {
  if (!state) return 'STATUS UNAVAILABLE';
  const a = BigInt(instance.expected.allocation ?? instance.expected.expectedLockedAmount), b = state.balance;
  if (instance.type === 'MDCPermanentLock') return b === a ? 'PERMANENTLY LOCKED' : b < a ? 'BELOW EXPECTED LOCKED AMOUNT' : 'EXCESS LOCKED BALANCE';
  const r = state.totalReleased;
  if (b === a && r === 0n) return 'FULLY FUNDED — NO RELEASE RECORDED';
  if (b + r === a) return 'ALLOCATION ACCOUNTED FOR';
  return b + r < a ? 'BELOW ALLOCATION ACCOUNTING' : 'EXCESS BALANCE';
}

const byAddress = new Map(CONFIG.instances.map(x => [lower(x.address), x]));
const tokenAddress = lower(CONFIG.token.address);
export function getterCall(instance, name) {
  const getter = CONFIG.types[instance.type].getters[name];
  requireTrue(getter, 'GETTER NOT ALLOWED');
  return { to: instance.address, data: getter.selector };
}
export function tokenCall(name, instance = null) {
  const getter = CONFIG.token.getters[name];
  requireTrue(getter, 'GETTER NOT ALLOWED');
  if (name === 'balanceOf') requireTrue(instance && byAddress.has(lower(instance.address)), 'ADDRESS NOT ALLOWED');
  return { to: CONFIG.token.address, data: getter.selector + (name === 'balanceOf' ? lower(instance.address).slice(2).padStart(64, '0') : '') };
}
// The allowlist checks the complete call, not only the JSON-RPC method name.
export function validateRequest(method, params) {
  requireTrue(READ_METHODS.includes(method) && Array.isArray(params), 'RPC METHOD NOT ALLOWED');
  if (method === 'eth_chainId') return requireTrue(params.length === 0, 'INVALID RPC PARAMETERS');
  if (method === 'eth_getBlockByNumber') {
    requireTrue(params.length === 2 && params[1] === false, 'INVALID RPC PARAMETERS');
    if (params[0] !== 'latest') quantity(params[0]);
    return;
  }
  requireTrue(params.length === 2, 'INVALID RPC PARAMETERS');
  quantity(params[1]); // A canonical number string only; no object block tags.
  if (method === 'eth_getCode') return requireTrue(typeof params[0] === 'string' && byAddress.has(lower(params[0])), 'ADDRESS NOT ALLOWED');
  const call = params[0];
  requireTrue(call && typeof call === 'object' && Object.keys(call).sort().join(',') === 'data,to' && typeof call.to === 'string' && typeof call.data === 'string', 'INVALID CALL');
  const instance = byAddress.get(lower(call.to));
  if (instance) return requireTrue(Object.values(CONFIG.types[instance.type].getters).some(x => x.selector === call.data), 'GETTER NOT ALLOWED');
  requireTrue(lower(call.to) === tokenAddress, 'ADDRESS NOT ALLOWED');
  const allowed = [tokenCall('decimals').data, tokenCall('totalSupply').data, ...CONFIG.instances.map(x => tokenCall('balanceOf', x).data)];
  requireTrue(allowed.includes(call.data), 'GETTER NOT ALLOWED');
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
export class ReadClient {
  constructor(endpoint, { fetcher = (url, options) => globalThis.fetch(url, options), timeoutMs = 12000, batchDelayMs = 750 } = {}) {
    requireTrue(ENDPOINTS.some(x => x.url === endpoint.url), 'RPC ENDPOINT NOT ALLOWED');
    this.endpoint = ENDPOINTS.find(x => x.url === endpoint.url); this.fetcher = fetcher; this.timeoutMs = timeoutMs; this.batchDelayMs = batchDelayMs; this.sequence = 0;
  }
  async requestMany(requests) {
    const results = [];
    for (let offset = 0; offset < requests.length; offset += this.endpoint.batchSize) {
      if (offset) await wait(this.batchDelayMs);
      const batch = requests.slice(offset, offset + this.endpoint.batchSize).map(({ method, params }) => {
        validateRequest(method, params);
        return { jsonrpc: '2.0', id: ++this.sequence, method, params };
      });
      const controller = new AbortController();
      let timer;
      try {
        const timeout = new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new ReadError('RPC TIMEOUT', '', null, true)); }, this.timeoutMs); });
        const work = async () => {
          let response;
          try {
            response = await this.fetcher(this.endpoint.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store', signal: controller.signal, body: JSON.stringify(batch.length === 1 ? batch[0] : batch) });
          } catch { throw new ReadError('RPC NETWORK ERROR', '', null, true); }
          if (!response?.ok) throw new ReadError(response?.status === 429 ? 'RPC RATE LIMITED (429)' : 'RPC HTTP ERROR', '', null, true);
          let payload;
          try { payload = await response.json(); } catch { throw new ReadError('INVALID RPC JSON'); }
          const items = batch.length === 1 ? [payload] : payload;
          requireTrue(Array.isArray(items) && items.length === batch.length, 'INVALID RPC RESPONSE');
          requireTrue(new Set(items.map(x => x?.id)).size === batch.length, 'DUPLICATE RPC RESPONSE');
          return batch.map(request => {
            const item = items.find(x => x?.id === request.id);
            requireTrue(item?.jsonrpc === '2.0', 'INVALID RPC RESPONSE');
            if (item.error) throw new ReadError('RPC GETTER / METHOD ERROR');
            requireTrue(Object.hasOwn(item, 'result'), 'MISSING RPC RESULT');
            return item.result;
          });
        };
        results.push(...await Promise.race([work(), timeout]));
      } finally { clearTimeout(timer); }
    }
    return results;
  }
  async request(method, params) { return (await this.requestMany([{ method, params }]))[0]; }
}
function blockRecord(block, expectedNumber = null) {
  requireTrue(block && typeof block === 'object' && HASH.test(block.hash), 'INVALID BLOCK');
  const number = quantity(block.number), timestamp = quantity(block.timestamp);
  if (expectedNumber !== null) requireTrue(number === expectedNumber, 'BLOCK NUMBER MISMATCH');
  return { number, timestamp, hash: lower(block.hash), tag: '0x' + number.toString(16) };
}
const identityKey = instance => `${CONFIG.chainId}:${lower(instance.address)}:${instance.runtimeHash}:${CONFIG.provenance.registrySha256}`;
const decimalsKey = `${CONFIG.chainId}:${tokenAddress}:decimals:${CONFIG.provenance.registrySha256}`;
export async function readSnapshot(client, now = () => BigInt(Date.now()), identityCache = {}) {
  requireTrue(quantity(await client.request('eth_chainId', [])) === 1n, 'WRONG CHAIN');
  const block = blockRecord(await client.request('eth_getBlockByNumber', ['latest', false]));
  const codes = await client.requestMany(CONFIG.instances.map(x => ({ method: 'eth_getCode', params: [x.address, block.tag] })));
  CONFIG.instances.forEach((x, i) => requireTrue(typeof codes[i] === 'string' && HEX.test(codes[i]) && lower(codes[i]) === x.runtime, 'PARAMETER MISMATCH', 'Full runtime bytes differ from frozen Registry evidence', x.id));
  // Cached fields are only compiler immutables already matched to the Registry.
  // The complete runtime is checked again at THIS block before any reuse.
  const calls = [], states = Object.fromEntries(CONFIG.instances.map(x => [x.id, {}])), token = {};
  for (const instance of CONFIG.instances) {
    const cached = identityCache[identityKey(instance)];
    for (const [name, getter] of Object.entries(CONFIG.types[instance.type].getters)) {
      if (Object.hasOwn(instance.expected, name) && cached && Object.hasOwn(cached, name)) states[instance.id][name] = cached[name];
      else calls.push({ instance, name, output: getter.output, call: getterCall(instance, name) });
    }
    calls.push({ instance, name: 'balance', output: 'uint256', call: tokenCall('balanceOf', instance) });
  }
  // Official MDC's fixed precision is cached for this token/chain/Registry only.
  if (Object.hasOwn(identityCache, decimalsKey)) token.decimals = identityCache[decimalsKey];
  else calls.push({ name: 'decimals', output: CONFIG.token.getters.decimals.output, call: tokenCall('decimals') });
  calls.push({ name: 'totalSupply', output: CONFIG.token.getters.totalSupply.output, call: tokenCall('totalSupply') });
  const results = await client.requestMany(calls.map(x => ({ method: 'eth_call', params: [x.call, block.tag] })));
  calls.forEach((entry, i) => { (entry.instance ? states[entry.instance.id] : token)[entry.name] = decode(results[i], entry.output); });
  requireTrue(token.decimals === BigInt(CONFIG.decimals) && token.totalSupply === BigInt(CONFIG.totalSupply), 'PARAMETER MISMATCH', 'Official MDC decimals / supply');
  for (const instance of CONFIG.instances) {
    const state = states[instance.id];
    for (const [name, expected] of Object.entries(instance.expected)) {
      const same = name === 'token' || name === 'treasury' ? state[name] === lower(expected) : state[name] === BigInt(expected);
      requireTrue(same, 'PARAMETER MISMATCH', `${name} differs from Registry`, instance.id);
    }
    if (instance.type === 'MDCPermanentLock') {
      requireTrue(state.lockedBalance === state.balance, 'BALANCE MISMATCH', 'Independent MDC balance', instance.id);
    } else {
      const calculated = eligible(instance, block.timestamp), released = state.totalReleased;
      const amounts = releaseAmounts(calculated, released, state.balance);
      requireTrue(state.vaultBalance === state.balance, 'BALANCE MISMATCH', 'Independent MDC balance', instance.id);
      requireTrue(released <= calculated && calculated <= state.allocation && state.cumulativeEligible === calculated && state.releasable === amounts.releasable && state.availableToReleaseNow === amounts.availableToReleaseNow, 'SCHEDULE STATE MISMATCH', 'Getter / integer schedule comparison failed', instance.id);
    }
    state.status = fundingStatus(instance, state);
  }
  const finalBlock = blockRecord(await client.request('eth_getBlockByNumber', [block.tag, false]), block.number);
  requireTrue(finalBlock.hash === block.hash && finalBlock.timestamp === block.timestamp, 'BLOCK HASH MISMATCH', 'Canonical snapshot changed during read');
  // Publish cache entries only with the complete successful snapshot, never from
  // a partially successful or reorganized round. Dynamic values are not cached.
  const nextIdentityCache = Object.fromEntries(CONFIG.instances.map(instance => [identityKey(instance), Object.freeze(Object.fromEntries(Object.keys(instance.expected).map(name => [name, states[instance.id][name]])))]));
  nextIdentityCache[decimalsKey] = token.decimals;
  return { block, states, token, source: client.endpoint, updatedAt: now(), identityCache: Object.freeze(nextIdentityCache) };
}
export class SnapshotStore {
  constructor({ endpoints = ENDPOINTS, clientOptions = {}, now = () => BigInt(Date.now()) } = {}) {
    this.endpoints = endpoints; this.clientOptions = clientOptions; this.now = now; this.snapshot = null; this.error = null; this.busy = false;
    this.identityCache = Object.freeze({});
  }
  age() { return this.snapshot ? this.now() - this.snapshot.updatedAt : null; }
  isStale() { return this.snapshot !== null && this.age() > 120000n; }
  async refresh() {
    if (this.busy) return false;
    this.busy = true;
    try {
      for (let i = 0; i < this.endpoints.length; i++) {
        try {
          const next = await readSnapshot(new ReadClient(this.endpoints[i], this.clientOptions), this.now, this.identityCache);
          this.snapshot = next; this.identityCache = next.identityCache; this.error = null; return true;
        } catch (error) {
          // Unexpected browser/runtime errors must not survive into store JSON.
          this.error = error instanceof ReadError ? error : new ReadError('SNAPSHOT UNAVAILABLE');
          if (!this.error.retryable) this.identityCache = Object.freeze({});
          // Availability fallback restarts the ENTIRE snapshot. Integrity errors stop.
          if (!this.error.retryable || i === this.endpoints.length - 1) return false;
        }
      }
      return false;
    } finally { this.busy = false; }
  }
}
export function canRefresh(hidden, busy) { return !hidden && !busy; }
