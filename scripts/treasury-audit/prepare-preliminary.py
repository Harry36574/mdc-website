"""Prepare an INCOMPLETE Phase 1 package from stored observations. Never publish it."""
import datetime, gzip, hashlib, json, pathlib, shutil, sys
root = pathlib.Path(__file__).resolve().parents[2]
source = pathlib.Path(sys.argv[1]).resolve()
meta = json.loads(pathlib.Path(sys.argv[2]).read_text())
snapshot = json.loads((source/'summary.json').read_text())
verification = json.loads((source/'verification.json').read_text())
static = json.loads(pathlib.Path(meta['staticReviewFile']).read_text())
discovery = json.loads(pathlib.Path(meta['discoveryFile']).read_text())
now = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds').replace('+00:00','Z')
record_id = 'mdc-treasury-30d-001'
destination = root/'transparency/history/records/2026'/record_id
raw = destination/'raw';raw.mkdir(parents=True,exist_ok=True)
sha = lambda b: hashlib.sha256(b).hexdigest()
write = lambda p,v: p.write_text(json.dumps(v,indent=2,ensure_ascii=False)+'\n')
raw_files = []
inputs = {'mainnet-summary.json':source/'summary.json','rpc-transcript.jsonl':source/'rpc-transcript.jsonl','etherscan-status.json':source/'etherscan-status.json','verification.json':source/'verification.json','static-review.json':pathlib.Path(meta['staticReviewFile']),'discovery.json':pathlib.Path(meta['discoveryFile']),'local-rpc-probe.json':pathlib.Path(meta['localProbeFile']),'safe-v1.4.1-deployment.json':pathlib.Path(meta['safeDeploymentFile']),'safe-v1.4.1-fallback-deployment.json':pathlib.Path(meta['safeFallbackFile'])}
for name,p in inputs.items():
    original=p.read_bytes();compressed=gzip.compress(original,mtime=0)
    (raw/(name+'.gz')).write_bytes(compressed)
    raw_files.append({'path':'raw/'+name+'.gz','encoding':'gzip','sha256':sha(compressed),'decodedSha256':sha(original),'decodedBytes':len(original)})

def finding(code,status,severity,detail,remediation,priority='P1'):
    return dict(code=code,status=status,severity=severity,detail=detail,remediation=remediation,priority=priority)
findings = [
finding('MAINT-001','FAIL','MEDIUM','The first scheduled 30-day audit was due 2026-10-21T00:00:00Z. At the reviewed website baseline there were zero published complete audit records, and this attempt remains incomplete.','Complete and document the missing procedures, obtain review/publication approval and publish using the actual completion/publication dates.'),
finding('SOURCE-001','UNVERIFIED','HIGH','Canonical Treasury/Vault Solidity source, registry originals, compiler settings and locked artifacts are unavailable. The owner confirmed they may reside on an unavailable computer. No canonical source has been reconstructed.','Recover original files, match the website registry digest and artifact hashes, authenticate build inputs, reproduce bytecode and execute the original contract/security tests.'),
finding('EXPLORER-001','UNVERIFIED','MEDIUM','All ten current Mainnet Etherscan source-verification page requests returned HTTP 403. Stored website labels are historical project assertions, not current Exact Match evidence.','Independently inspect each linked Etherscan code page or use a supported authenticated read API, record exact/similar/unverified status, then compare original source and compiler inputs.'),
finding('MINT-001','UNVERIFIED','HIGH','Current totalSupply and decimals are verified. Absence of an owner() getter and zero common EIP-1967 slots do not establish that minting, upgrade or privileged paths are impossible.','Review authenticated token source and complete runtime control flow, initialization and all administrative/role paths. Do not infer mint-authority removal from one reverted getter.'),
finding('HISTORY-001','UNVERIFIED','HIGH','Historical completeness, all Treasury spending purposes, native ETH internal transfers and changes since a previous authenticated Treasury baseline have not been fully reconciled. See the recorded range status and failed/successful requests.','Obtain complete historical logs/traces, reconcile transfers and Safe executions with approved purposes, and cross-check coverage against an independent source.'),
finding('ALLOWANCE-001','UNVERIFIED','HIGH','MDC allowance discovery is bounded by the recorded log coverage and standard Approval events. No empty result is accepted as proof of zero allowances; other tokens and nonstandard authority paths are not covered.','Complete approval/permit and spender discovery from token creation, read every relevant current allowance, inventory other Treasury tokens and investigate significant approvals.'),
finding('CUSTODY-001','UNVERIFIED','HIGH','Current on-chain owners and thresholds are observable. Key custody, signer independence, backup/recovery, transaction purpose approval and operator access cannot be verified from those addresses.','Provide non-secret custody/authorization procedures and evidence of control reviews. Never provide keys, seed phrases, signing credentials or personal signer identities.'),
finding('OPS-001','UNVERIFIED','MEDIUM','Canonical administrative scripts, prior signed snapshots, incident/monitoring/rollback procedures and all repository/hosting access controls were unavailable or outside accessible configuration. The rulesets API returned an empty list; that does not establish the absence or presence of legacy branch protections.','Supply non-secret operational documents and access-control evidence. Review required approvals, branch protections, CI permissions, incident escalation and rollback controls.'),
finding('LIQUIDITY-001','UNVERIFIED','MEDIUM','The historical liquidity-lock transaction and locker code have read evidence, but current NFT custody, lock ID 106, NFT 396442, unlock conditions and privileged escape paths have not been fully verified. H7 reserve eligibility is separate from this historical LP lock.','Authenticate locker source/ABI and deployment; read the actual lock/NFT state and restrictions at a named block and reconcile the historical transaction.'),
finding('PROMOTION-001','WARNING','MEDIUM','H4 reports 2,000 MDC totalReleased and a 998,000 MDC balance; the Promotion Treasury has zero MDC and nonce 2. These facts require transfer/purpose reconciliation and do not establish misuse.','Reconcile the release(s), Safe execution(s), recipients and documented community-promotion purposes. Keep Release Events at zero until a qualifying reviewed event record exists.'),
finding('SIGNER-001','WARNING','MEDIUM','The eight Treasury configurations use four distinct public owner addresses in overlapping sets. This is a concentration observation; independent custody of the four keys is unverified.','Review signer independence and correlated-loss risk using non-secret procedures; do not disclose private signer identities or custody locations.','P2'),
finding('RPC-001','WARNING','MEDIUM','PublicNode omitted the 18 referenced historical receipts while dRPC supplied them. The transaction references were recovered rather than labelled nonexistent. Historical RPC availability and explorer restrictions limit some procedures.','Retain both response sets, use independent receipt/history sources and never interpret an unavailable/null receipt as proof that a transaction never occurred.','P2'),
finding('PUBLICATION-001','FAIL','LOW','The baseline publishedCounts function counted a PUBLISHED scheduled record without requiring completeness or finalized snapshot metadata. The proposed branch adds those requirements and tests; the live site has no such record and its existing count is zero.','Review the proposed publication safeguard. Do not merge/deploy this branch without explicit approval.','P2')
]
procedures = [
 ('Mainnet finalized block agreement','PASS','Two provider headers, numbered snapshot and final recheck in the RPC transcript.'),
 ('Identify website-referenced vaults and validate deployed bytes/parameters','PASS','Nine configured addresses checked on chain; runtime and getter verification checks.'),
 ('Authenticate canonical registry and original source/build artifacts','UNVERIFIED','Original files unavailable; owner-directed Phase 1 scope.'),
 ('Current MDC total supply and decimals','PASS','Two-source totalSupply=54000000000000000000000000; decimals=18.'),
 ('Current ETH and MDC balances','PASS','Two-source agreement for token, nine instances and eight Treasury addresses.'),
 ('Current Safe owners, thresholds, modules, guard, fallback and singleton','PASS','Two-source configuration equality; singleton/fallback hashes match public Safe deployment metadata.'),
 ('All privileged roles, minting and upgrade paths','UNVERIFIED','Probes are limited observations and do not replace original source/control-flow review.'),
 ('Vault withdrawal access-control security','UNVERIFIED','Runtime and getter conformity are checked; source-level access-control proof/security tests remain unavailable.'),
 ('Referenced deployments and initial funding receipts','PASS','Successful receipts recovered and checked against contract addresses and expected funding Transfer logs.'),
 ('Complete historical movements and changes since baseline','UNVERIFIED','Recorded bounded event scan is not an authenticated prior audit baseline or complete native ETH trace history.'),
 ('All relevant approvals and significant allowances','UNVERIFIED','Bounded standard-event discovery and incomplete token/authority inventory.'),
 ('Current liquidity-lock restrictions','UNVERIFIED','Historical receipt/code observations do not establish complete current lock controls.'),
 ('Canonical Solidity tests, compiler checks and static analysis','UNVERIFIED','Not executed: original source/build inputs unavailable. No source was reconstructed.'),
 ('Full key-management, administrative-script and CI/CD review','UNVERIFIED','Deferred source/operational evidence unavailable; this is Phase 1 only.'),
 ('Preliminary record, evidence hash chain and website compatibility','PASS','Validate with the committed package verifier, unit and intercepted browser tests.'),
 ('Smart-contract changes, asset movement or wallet signing','NOT APPLICABLE','Explicitly outside scope; collector methods are read only and no real transaction was created.')
]
instances=[]
for v in snapshot['vaults']:
    source_config=next(i for i in static['inventory'] if i['id']==v['id'])
    getters={k:('0x'+x['value'][-40:] if k in ['token','treasury'] else str(int(x['value'],16))) for k,x in v['getters'].items() if x.get('value') is not None}
    instances.append({'id':v['id'],'name':source_config['name'],'type':source_config['type'],'address':v['address'],'identityStatus':'ONCHAIN_RUNTIME_AND_CONFIG_MATCH','canonicalSourceVerification':'UNVERIFIED','currentEtherscanVerification':'UNVERIFIED','historicalWebsiteSourceLabel':source_config['sourceVerificationLabel'],'expected':source_config['expected'],'state':{'balance':v['mdcBalance']['decoded'],'ethBalanceWei':str(int(v['ethBalance']['value'],16)),**getters},'runtimeHash':v['code']['keccak256'],'deploymentTx':v['deploymentTx'],'fundingTx':v['fundingTx']})
treasuries=[]
for t in snapshot['treasuries']:
    c=t['configuration'];owners=c['getOwners']['decoded']
    treasuries.append({'name':next(i['id']+' Treasury' for i in instances if i['expected'].get('treasury','').lower()==t['address'].lower()),'address':t['address'],'state':{'threshold':c['getThreshold']['decoded'],'ownerCount':len(owners),'owners':owners,'nonce':c['nonce']['decoded'],'version':c['VERSION']['decoded'],'modules':c['modules']['decoded'][0],'modulePaginationNext':c['modules']['decoded'][1],'balance':t['mdcBalance']['decoded'],'ethBalanceWei':str(int(t['ethBalance']['value'],16)),'status':'CURRENT_CONFIGURATION_OBSERVED_NOT_CUSTODY_VERIFIED'},'proxyStorage':{k:v['value'] for k,v in t['proxySlotProbes'].items()}})
vault_balance=sum(int(v['state']['balance']) for v in instances)
released=sum(int(v['state'].get('totalReleased','0')) for v in instances)
record={
 'schemaVersion':'1.0','draftSchemaVersion':'MDC_PHASE1_DRAFT_1','auditId':'MDC-TREASURY-30D-001','recordId':record_id,'recordType':'AUDIT_30D','auditDateUtc':now[:10],
 'scheduledAtUtc':'2026-10-21T00:00:00Z','attemptedAtUtc':snapshot['finishedAtUtc'],'preliminaryPreparedAtUtc':now,'completedAtUtc':None,'publishedAtUtc':None,'publicationStatus':'DRAFT','completeness':'INCOMPLETE','readState':'PARTIAL_ONCHAIN_EVIDENCE','finalStatus':'INCOMPLETE','phase':'PHASE_1_PRELIMINARY_ONCHAIN_ONLY',
 'snapshot':{k:v for k,v in snapshot['snapshot'].items() if k in ['number','hash','utc'] }|{'finality':'FINALIZED','validation':'TWO_PUBLIC_RPC_PROVIDERS_AGREE_NOT_LOCAL_CONSENSUS_VERIFICATION'},
 'coverage':None,'attemptedCoverage':{k:v for k,v in snapshot['history'].items() if k!='chunks'},'unknownReasons':{'coverage':'Complete historical reconciliation, native ETH traces and an authenticated previous Treasury baseline are unavailable. Refer to the bounded range status for what was actually read.','canonicalSource':'Owner confirmed original files may be on an unavailable computer.','etherscan':'All ten direct public verification-page reads returned HTTP 403.'},
 'rpcSources':[{'label':'PublicNode · Ethereum','url':'https://ethereum-rpc.publicnode.com'},{'label':'dRPC · Ethereum','url':'https://eth.drpc.org'}],
 'scope':'Preliminary read-only Ethereum Mainnet Treasury/Vault operational observations. Source-dependent work remains unverified. Not an independent third-party security audit.',
 'mandatoryProcedures':[{'procedure':p,'status':s,'evidence':e}for p,s,e in procedures],
 'findings':findings,'data':{'token':{'address':snapshot['token']['address'],'totalSupply':snapshot['token']['totalSupply']['decoded'],'decimals':snapshot['token']['decimals']['decoded'],'mintingAuthority':'UNVERIFIED','ownershipAndPrivilegedRoles':'UNVERIFIED','commonProxySlotObservations':snapshot['token']['proxySlotProbes']},'instances':instances,'treasuries':treasuries,'accounting':{'vaultMdcBalance':str(vault_balance),'vaultTotalReleased':str(released),'balancePlusReleased':str(vault_balance+released),'configuredAllocation':'49000000000000000000000000','treasuryMdcBalance':str(sum(int(t['state']['balance'])for t in treasuries)),'limitation':'Arithmetic identity, not complete spending-purpose or historical funding reconciliation.'}},
 'previousRecord':None,'supersedes':None,'realTransactionsCreated':0,'calendar':{'maintenanceT0':'2026-09-21T00:00:00Z','nextUnsatisfiedAuditDue':'2026-10-21T00:00:00Z','nextNominalIntervalDue':'2026-11-20T00:00:00Z','advanceSchedule':False,'maintenanceStatus':'STALE'},'publicationCounters':{'publishedAudits':0,'releaseEvents':0,'treasurySecurityChanges':0},
 'completionGate':'Do not mark COMPLETE until the original source/build verification and every mandatory outstanding procedure have been executed and documented. No merge/deploy without explicit approval.'}
write(destination/'record.json',record)
evidence={'schemaVersion':'1.0','auditId':record['auditId'],'preparedAtUtc':now,'status':'INCOMPLETE','reviewedRepository':'Harry36574/mdc-website','reviewedCommit':meta['reviewedCommit'],'historyFrameworkBaseline':meta['baselineCommit'],'sourceUnavailableConfirmedByOwner':True,'acceptedCollection':meta['acceptedCollection'],'earlierReadAttempts':meta['earlierReadAttempts'],'rpcObservationCount':len((source/'rpc-transcript.jsonl').read_text().splitlines()),'offlineVerifiedChecks':{'pass':sum(c['status']=='PASS'for c in verification['checks']),'fail':sum(c['status']=='FAIL'for c in verification['checks']),'meaning':'Only the individual observation checks; full audit remains INCOMPLETE.'},'files':raw_files,'verificationReferences':[{'url':'https://github.com/safe-global/safe-deployments/blob/main/src/assets/v1.4.1/safe.json','gitBlobSha1':'b8df31b3ae5b9b6a856c1d40f1878b4a17e3b4f4'},{'url':'https://github.com/safe-global/safe-deployments/blob/main/src/assets/v1.4.1/compatibility_fallback_handler.json','gitBlobSha1':'02d8451e1841edef008f70ec60aaab75e98a7afb'}],'notes':['No keys, credentials, private signer identities or private infrastructure details were collected for this package.','Real public RPC evidence is separate from synthetic website/browser fixtures.','The original contract-project schema is unavailable. The provisional Phase 1 schema is consumer-compatible with the existing website and does not authenticate the missing source archive.']}
write(destination/'evidence.json',evidence)
def mdc(units):
    n=int(units);whole,fraction=divmod(n,10**18);return f'{whole:,}'+('.'+str(fraction).zfill(18).rstrip('0')if fraction else'')
vault_rows='\n'.join(f"| {v['id']} · {v['name']} | `{v['address']}` | {mdc(v['state']['balance'])} | {mdc(v['state'].get('totalReleased','0')) if v['id']!='H2' else 'N/A — permanent lock'} | {v['state']['ethBalanceWei']} |"for v in instances)
safe_rows='\n'.join(f"| {t['name']} | `{t['address']}` | {t['state']['threshold']}-of-{t['state']['ownerCount']} | {t['state']['nonce']} | {mdc(t['state']['balance'])} | {t['state']['ethBalanceWei']} |"for t in treasuries)
reference_rows='\n'.join(f"| {v['id']} | [{v['deploymentTx']}](https://etherscan.io/tx/{v['deploymentTx']}) | [{v['fundingTx']}](https://etherscan.io/tx/{v['fundingTx']}) |"for v in instances)
findings_md='\n\n'.join(f"### {f['code']} — {f['status']} · {f['severity']} · {f['priority']}\n\n{f['detail']}\n\nRequired remediation: {f['remediation']}"for f in findings)
procedures_md='\n'.join(f'| {p} | {s} | {e} |'for p,s,e in procedures)
report=f'''# MDC — First Treasury / Vault 30-Day Audit

**Audit ID: MDC-TREASURY-30D-001 · Overall status: INCOMPLETE**

**UNPUBLISHED PRELIMINARY PHASE 1 REPORT — on-chain observations only.** This is a first-party operational review assisted by Codex, not an independent third-party security audit, formal verification or a security guarantee.

## Dates and completion gate

- Scheduled audit: **2026-10-21T00:00:00Z**.
- Accepted Mainnet collection: **{snapshot['startedAtUtc']} → {snapshot['finishedAtUtc']}**.
- Preliminary report prepared: **{now}**.
- Actual full-audit completion: **not completed (`completedAtUtc: null`)**.
- Publication: **not published (`publishedAtUtc: null`)**. This review branch is not the deployed site.

The scheduled date has passed. This attempt does not satisfy the October 21 interval. No date is backdated, and the report preparation time is not substituted for completion. The next **unsatisfied** audit deadline remains October 21. The next nominal fixed interval is November 20, 2026, 00:00 UTC; the calendar must not advance to it until a qualifying complete record exists. Release Events and Treasury Security Changes remain at zero.

The owner confirmed the canonical Solidity/source/build material may be on an unavailable computer and directed Phase 1 only. No canonical source was reconstructed. All source-dependent security checks remain UNVERIFIED. Complete source/build review, explorer verification and outstanding operational/history controls before any full-audit completion decision.

## Repository and publication discovery

- Correct source: [Harry36574/mdc-website](https://github.com/Harry36574/mdc-website), reviewed commit `{meta['reviewedCommit']}`.
- Existing deployment branch: `main`. Domain declaration: `CNAME` contains `mdctoken.org`. The reviewed commit has successful GitHub Pages build/deploy checks.
- Existing Audit History: <https://mdctoken.org/transparency/history.html>.
- Publication consumer: `transparency/history/app.mjs` and `core.mjs`; index schema `1.0`; each bundle contains `record.json`, `report.md`, `evidence.json`, `manifest.json`, `manifest.sha256`. `manifest.files` hashes the first three files, and the index pins the manifest hash.
- Framework baseline: `{meta['baselineCommit']}`, September 20 introduction of Audit History. This is a website-code baseline, **not a previous completed Treasury audit or authenticated Treasury configuration snapshot**.
- The canonical registry path and locked artifact hashes referenced in `transparency/config.mjs` are recorded in the evidence inventory. Their original files are unavailable. The original contract-project record schema/generators are also unavailable; the proposed Phase 1 draft schema is explicitly provisional and consumer-compatible.
- Existing formal `records` entries are preserved (the reviewed index contains none). The proposed `inProgressRecords` channel exposes an incomplete draft without incrementing Published audits or clearing STALE. Nothing has been merged or deployed.

## Scope and methodology

Read-only Ethereum Mainnet queries were issued by a dedicated GitHub Actions job with `contents: read`, without secrets, lifecycle installation scripts, wallet access, signing or broadcast methods. Initial local probes were denied (HTTP 403); this failure is retained. CI could reach the same public Mainnet providers. No denial was relabelled as PASS.

The accepted collection queried chain ID and finalized headers from PublicNode and dRPC, pinned all current-state calls to one numbered block, compared deployed code/ETH/MDC balances across both sources, read Vault getters and Treasury Safe configuration, rechecked the numbered header, and retained request IDs, parameters, response bodies, UTC start/end times and failures. This is agreement between public RPC services, not local consensus verification, and the providers are not assumed to have independent upstream infrastructure.

The locked snapshot is [Ethereum block {snapshot['snapshot']['number']}](https://etherscan.io/block/{snapshot['snapshot']['number']}), `{snapshot['snapshot']['hash']}`, block time **{snapshot['snapshot']['utc']}**. Both providers reported it finalized. See `raw/rpc-transcript.jsonl.gz` for every accepted-collection RPC request/response, including null or rejected results.

**Classification:** PASS = the specifically named observation verified; FAIL = confirmed issue within the stated scope; WARNING = risk requiring attention; UNVERIFIED = insufficient evidence; NOT APPLICABLE = explicitly outside documented scope. A passed collector/CI execution is not an audit PASS. Successful website tests do not prove contract safety.

## Token observations

- MDC contract: [`{snapshot['token']['address']}`](https://etherscan.io/address/{snapshot['token']['address']}).
- `totalSupply`: **54,000,000 MDC**, exact **54000000000000000000000000 base units**; **18 decimals**, agreed by both providers at the snapshot.
- Minting authority, ownership, privileged roles and comprehensive upgradeability: **UNVERIFIED**. `owner()` reverted; this is not proof of absent ownership/roles. The common EIP-1967 implementation/admin/beacon slots read zero; this is not proof that every proxy/privilege mechanism is absent.
- The historical token code boundary was probed at blocks 25,920,201 and 25,920,202; consult the raw observation's verified flag and provider. A historical code boundary alone is not constructor-source authentication or complete mint-event history.
- Current Etherscan verification for the token and H1–H9: **UNVERIFIED**. All ten direct page probes returned HTTP 403. The stored labels “Verified Source” / “Similar Match …” are preserved as historical labels, not adopted as fresh findings. Exact-match verification still needs original compiler/source inputs.

## Vault / lock balances and schedule observations

Addresses were extracted from the existing public project configuration at the pinned website commit and cross-checked against current deployed bytes and getters. The canonical registry original is unavailable; the runtime match does not authenticate missing source/build artifacts. No Treasury address was inferred from a deployer or arbitrary transaction counterparty.

| Instance | Vault / lock address | MDC balance | totalReleased (MDC) | ETH balance (wei) |
| --- | --- | ---: | ---: | ---: |
{vault_rows}

All nine deployed runtimes match the website's frozen complete byte arrays; both providers agree on code. Configured token/Treasury/schedule getters and integer eligibility accounting pass the explicitly scoped replay checks. H2 has no configured Treasury destination; its security/permanent-withdrawal claim still requires original source/access-control review. No zero or unavailable getter is silently treated as proof of security.

Vault balances total **{mdc(vault_balance)} MDC**, reported cumulative releases total **{mdc(released)} MDC**, and the arithmetic sum is **{mdc(vault_balance+released)} MDC**. This equals the configured 49M allocation; it is not a substitute for full movement/purpose reconciliation. H9's 23 permanently ineligible base units are part of H9's allocation, separate from the website's Funding Source residual claim.

## Treasury configurations

| Treasury | Address | Threshold | Nonce | MDC balance | ETH balance (wei) |
| --- | --- | --- | ---: | ---: | ---: |
{safe_rows}

Current owners, thresholds, version, nonce, module result, singleton, guard and fallback slots agree across two RPC providers. All current module lists are empty with the end sentinel returned; guards read zero. The singleton is `0x41675C099F32341bf84BFc5382aF534df5C7461a`, fallback handler `0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99`. Their deployed runtime hashes match the public Safe v1.4.1 deployment metadata archived in this package. These are proxies, and valid Safe operations may change controls; no immutable-governance guarantee is made.

The eight Safes use four distinct **public on-chain owner addresses** in overlapping sets. Full owner lists are in `record.json`. No real-world signer identities or private custody locations are collected. Shared keys create correlated-loss exposure; key independence and authorization procedures remain UNVERIFIED.

## Deployment/funding references and historical coverage

| Instance | Referenced deployment transaction | Referenced funding transaction |
| --- | --- | --- |
{reference_rows}

The successful deployment receipts were checked against each expected created contract; funding receipts were checked for successful MDC Transfer logs to the instance and the configured funding amount. PublicNode returned null for these historical receipts while dRPC supplied them; transaction objects were available. The disagreement is retained. A null receipt was not used to declare a project reference false or a transaction nonexistent.

Historical log request range: **{snapshot['history'].get('coverageStartBlock','UNAVAILABLE')} → {snapshot['history'].get('coverageEndBlock','UNAVAILABLE')}**; actual collection status: **{snapshot['history']['status']}**. The transcript records every successful/rejected range. Readable Transfer observations, if supplied, are decoded in `raw/verification.json.gz`. An attempted range is not asserted as complete coverage. Native ETH internal transfers/traces, independent full-history reconciliation, spending-purpose documentation and an authenticated previous Treasury snapshot remain unavailable.

H4's 2,000 MDC release and Treasury nonce 2 require reconciliation with release and Safe execution transactions and documented promotion purposes. No misuse finding is inferred from those amounts. The existence of chain movements does not itself create a published Release Event record or authorize a counter change.

## Approvals, withdrawals and liquidity

Current allowance discovery only addresses candidate MDC spenders found in the bounded standard Approval-event query. Empty candidates do **not** prove zero allowances, particularly if log reads are incomplete. Other Treasury tokens, permit/nonstandard paths and complete spender inventory remain UNVERIFIED.

Getter/runtime/schedule conformity is independently observed. Comprehensive withdrawal authorization, privileged bypasses, initialization paths, upgradeability and static-analysis/contract-test results remain UNVERIFIED without the original source and locked artifacts. No real withdrawal or authorization transaction was created to test them.

The historical homepage claims UNCX V4 locker `0x147AECa171a79466Fe9E2c03f21b45155Ff403F8`, lock 106, position NFT 396442 and a September 8, 2028 unlock. Its referenced lock transaction is [`0xe0d22ea9d019a49c736ee4b5bc0457a937df691cc1eb847b8fea6a60de3e0aa8`](https://etherscan.io/tx/0xe0d22ea9d019a49c736ee4b5bc0457a937df691cc1eb847b8fea6a60de3e0aa8). Receipt/transaction/locker-code responses are retained. Those reads do not establish the complete current NFT custody, lock parameters, beneficiary, withdrawal permissions or privileged escape paths. **Current lock-control conclusion: UNVERIFIED.** H7 is the separate remaining liquidity reserve, not this historical LP position.

## Findings and remediation priorities

{findings_md}

## Procedure matrix

| Procedure | Classification | Evidence / limitation |
| --- | --- | --- |
{procedures_md}

No source-dependent control is marked passed. Original Solidity compilation, Foundry/contract tests and source static analysis were **not executed** because their inputs are missing. Existing website schedule calculations, replay checks and publication integrity tests have a narrower scope.

## Reproduction and evidence integrity

Accepted CI collection: [{meta['acceptedCollection']['runId']}](https://github.com/Harry36574/mdc-website/actions/runs/{meta['acceptedCollection']['runId']}), source commit `{meta['acceptedCollection']['sourceCommit']}`. `evidence.json` records the earlier probes and their scope. Every raw evidence file is losslessly gzip-compressed; its compressed and decoded SHA-256 hashes are listed in `evidence.json`. The outer manifest pins the record, this report and the evidence index.

From a checkout of this review branch, with Node 24.19.0, Python 3, viem 2.57.4 and the documented validation dependencies installed:

```sh
gzip -dc transparency/history/records/2026/{record_id}/raw/mainnet-summary.json.gz > /tmp/mdc-mainnet-summary.json
python3 scripts/treasury-audit/validate-package.py
node --test --test-isolation=none test/treasury-audit/*.test.mjs
node test/treasury-audit/browser.mjs
```

To recollect current read-only observations (this produces a **new** observation, not the historical snapshot above):

```sh
node scripts/treasury-audit/collect-mainnet.mjs audit-output
node scripts/treasury-audit/check-explorer.mjs audit-output
node scripts/treasury-audit/verify-observations.mjs audit-output audit-output/verification.json
```

The collector accepts no keys and restricts RPC methods to chain/block/code/storage/balance/call/log/transaction-read methods. Re-running it must not be treated as retroactive proof of this historical snapshot. Named raw responses, headers, runtime hashes, deployment/funding hashes and deterministic replay checks support independent review; they are not cryptographic state proofs or provider signatures.

Validation commands, real UTC execution times, exit codes and log hashes are archived under `validation/treasury-30d-001/`. An initial local unit-test harness used a string where the byte-hash helper requires bytes; the fixture encoding was corrected. That was a test-harness error, not a contract finding. The RPC range-limit failures remain retained in the evidence/CI records rather than counted as successful history checks.

## Required next steps and publication boundary

1. Recover and authenticate original source, canonical registry and locked build artifacts; finish all source-dependent verification and contract tests.
2. Establish current Etherscan status, complete historical/allowance/asset reconciliation, verify current liquidity-lock restrictions and review non-secret operational controls.
3. Resolve or explicitly disposition confirmed issues and warnings; append/supersede records without erasing prior evidence.
4. Only after every mandatory procedure has been executed and documented, set the real full-audit completion time and request explicit approval for merge/deployment/publication. A completed operational audit may still contain WARNINGS or FAIL findings.

For this branch: **INCOMPLETE, UNPUBLISHED, STALE/OVERDUE retained; Published audits 0; Release Events 0; Treasury Security Changes 0. No contract changes, assets moved, signatures or broadcasts. No merge or deployment performed.**
'''
(destination/'report.md').write_text(report)
files={name:sha((destination/name).read_bytes())for name in ['record.json','report.md','evidence.json']}
manifest={'schemaVersion':'1.0','recordId':record_id,'files':files}
write(destination/'manifest.json',manifest);digest=sha((destination/'manifest.json').read_bytes());(destination/'manifest.sha256').write_text(digest+'\n')
index_path=root/'transparency/history/index.json';index=json.loads(index_path.read_text());assert index['records']==[] and index['publicationStatus']=='NO_PUBLISHED_RECORDS'
index['inProgressRecords']=[{'recordId':record_id,'path':'records/2026/'+record_id+'/','manifestSha256':digest}];write(index_path,index)
print(json.dumps({'auditId':record['auditId'],'status':'INCOMPLETE','completedAtUtc':None,'publicationStatus':'DRAFT','snapshot':record['snapshot'],'rawFiles':len(raw_files),'reportBytes':len(report.encode()),'manifestSha256':digest}))
