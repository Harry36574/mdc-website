# MDC — First Treasury / Vault 30-Day Audit

**Audit ID: MDC-TREASURY-30D-001 · Overall status: INCOMPLETE**

**UNPUBLISHED PRELIMINARY PHASE 1 REPORT — on-chain observations only.** This is a first-party operational review assisted by Codex, not an independent third-party security audit, formal verification or a security guarantee.

## Dates and completion gate

- Scheduled audit: **2026-10-21T00:00:00Z**.
- Accepted Mainnet collection: **2026-10-27T08:55:57.954Z → 2026-10-27T08:58:28.294Z**.
- Preliminary report prepared: **2026-10-27T09:03:30Z**.
- Actual full-audit completion: **not completed (`completedAtUtc: null`)**.
- Publication: **not published (`publishedAtUtc: null`)**. This review branch is not the deployed site.

The scheduled date has passed. This attempt does not satisfy the October 21 interval. No date is backdated, and the report preparation time is not substituted for completion. The next **unsatisfied** audit deadline remains October 21. The next nominal fixed interval is November 20, 2026, 00:00 UTC; the calendar must not advance to it until a qualifying complete record exists. Release Events and Treasury Security Changes remain at zero.

The owner confirmed the canonical Solidity/source/build material may be on an unavailable computer and directed Phase 1 only. No canonical source was reconstructed. All source-dependent security checks remain UNVERIFIED. Complete source/build review, explorer verification and outstanding operational/history controls before any full-audit completion decision.

## Repository and publication discovery

- Correct source: [Harry36574/mdc-website](https://github.com/Harry36574/mdc-website), reviewed commit `92af13e7d57fd592f580eb126c8f5a715bffc43b`.
- Existing deployment branch: `main`. Domain declaration: `CNAME` contains `mdctoken.org`. The reviewed commit has successful GitHub Pages build/deploy checks.
- Existing Audit History: <https://mdctoken.org/transparency/history.html>.
- Publication consumer: `transparency/history/app.mjs` and `core.mjs`; index schema `1.0`; each bundle contains `record.json`, `report.md`, `evidence.json`, `manifest.json`, `manifest.sha256`. `manifest.files` hashes the first three files, and the index pins the manifest hash.
- Framework baseline: `60cccef4a67f9082feb45518dd1373d81b62487a`, September 20 introduction of Audit History. This is a website-code baseline, **not a previous completed Treasury audit or authenticated Treasury configuration snapshot**.
- The canonical registry path and locked artifact hashes referenced in `transparency/config.mjs` are recorded in the evidence inventory. Their original files are unavailable. The original contract-project record schema/generators are also unavailable; the proposed Phase 1 draft schema is explicitly provisional and consumer-compatible.
- Existing formal `records` entries are preserved (the reviewed index contains none). The proposed `inProgressRecords` channel exposes an incomplete draft without incrementing Published audits or clearing STALE. Nothing has been merged or deployed.

## Scope and methodology

Read-only Ethereum Mainnet queries were issued by a dedicated GitHub Actions job with `contents: read`, without secrets, lifecycle installation scripts, wallet access, signing or broadcast methods. Initial local probes were denied (HTTP 403); this failure is retained. CI could reach the same public Mainnet providers. No denial was relabelled as PASS.

The accepted collection queried chain ID and finalized headers from PublicNode and dRPC, pinned all current-state calls to one numbered block, compared deployed code/ETH/MDC balances across both sources, read Vault getters and Treasury Safe configuration, rechecked the numbered header, and retained request IDs, parameters, response bodies, UTC start/end times and failures. This is agreement between public RPC services, not local consensus verification, and the providers are not assumed to have independent upstream infrastructure.

The locked snapshot is [Ethereum block 26282915](https://etherscan.io/block/26282915), `0x6bd1a95e5cbadf53d2b1ad9a402395d634ae8d45eef5e446c4ece634ec3ded80`, block time **2026-10-27T08:41:59.000Z**. Both providers reported it finalized. See `raw/rpc-transcript.jsonl.gz` for every accepted-collection RPC request/response, including null or rejected results.

**Classification:** PASS = the specifically named observation verified; FAIL = confirmed issue within the stated scope; WARNING = risk requiring attention; UNVERIFIED = insufficient evidence; NOT APPLICABLE = explicitly outside documented scope. A passed collector/CI execution is not an audit PASS. Successful website tests do not prove contract safety.

## Token observations

- MDC contract: [`0xd6b160672Fad1376943F1E6d60C41adb103aED33`](https://etherscan.io/address/0xd6b160672Fad1376943F1E6d60C41adb103aED33).
- `totalSupply`: **54,000,000 MDC**, exact **54000000000000000000000000 base units**; **18 decimals**, agreed by both providers at the snapshot.
- Minting authority, ownership, privileged roles and comprehensive upgradeability: **UNVERIFIED**. `owner()` reverted; this is not proof of absent ownership/roles. The common EIP-1967 implementation/admin/beacon slots read zero; this is not proof that every proxy/privilege mechanism is absent.
- The historical token code boundary was probed at blocks 25,920,201 and 25,920,202; consult the raw observation's verified flag and provider. A historical code boundary alone is not constructor-source authentication or complete mint-event history.
- Current Etherscan verification for the token and H1–H9: **UNVERIFIED**. All ten direct page probes returned HTTP 403. The stored labels “Verified Source” / “Similar Match …” are preserved as historical labels, not adopted as fresh findings. Exact-match verification still needs original compiler/source inputs.

## Vault / lock balances and schedule observations

Addresses were extracted from the existing public project configuration at the pinned website commit and cross-checked against current deployed bytes and getters. The canonical registry original is unavailable; the runtime match does not authenticate missing source/build artifacts. No Treasury address was inferred from a deployer or arbitrary transaction counterparty.

| Instance | Vault / lock address | MDC balance | totalReleased (MDC) | ETH balance (wei) |
| --- | --- | ---: | ---: | ---: |
| H1 · Founder Releasable Vault | `0xcA206cB2810528ddb3032547B54F419190F5492e` | 4,000,000 | 0 | 0 |
| H2 · Founder Permanent Lock | `0x7bC7F3aDD58986b1C5B92714A0fB80C1b672fa0a` | 1,000,000 | N/A — permanent lock | 0 |
| H3 · Security Vault | `0x825892BD3eA80Ff1d01b9D69EE58d07F98ABB369` | 5,000,000 | 0 | 0 |
| H4 · Promotion Vault | `0x1380E0F1d9AeBA2Dc447Aaa1d3fbbE73Af9bd6ee` | 998,000 | 2,000 | 0 |
| H5 · Development Vault | `0x18249ABC9bd22848a096168493b2acf88Bf7aEaE` | 5,000,000 | 0 | 0 |
| H6 · Team Vault | `0x95181C13E57A46Ab674B4a31E658a5c466D0810e` | 5,000,000 | 0 | 0 |
| H7 · Remaining Liquidity Reserve Vault | `0xBc8b60A131c112258e26b6D4adb82bDa80D19849` | 8,500,000 | 0 | 0 |
| H8 · Ecosystem Part I Vault | `0x936e059C7Ea9f29FE7D6D0bAeb586CCafCb48bba` | 9,750,000 | 0 | 0 |
| H9 · Ecosystem Part II Vault | `0xC0e6F4cFD517c36Bd3ADA025e63cf4B9ADE6670a` | 9,750,000 | 0 | 0 |

All nine deployed runtimes match the website's frozen complete byte arrays; both providers agree on code. Configured token/Treasury/schedule getters and integer eligibility accounting pass the explicitly scoped replay checks. H2 has no configured Treasury destination; its security/permanent-withdrawal claim still requires original source/access-control review. No zero or unavailable getter is silently treated as proof of security.

Vault balances total **48,998,000 MDC**, reported cumulative releases total **2,000 MDC**, and the arithmetic sum is **49,000,000 MDC**. This equals the configured 49M allocation; it is not a substitute for full movement/purpose reconciliation. H9's 23 permanently ineligible base units are part of H9's allocation, separate from the website's Funding Source residual claim.

## Treasury configurations

| Treasury | Address | Threshold | Nonce | MDC balance | ETH balance (wei) |
| --- | --- | --- | ---: | ---: | ---: |
| H1 Treasury | `0x2F668bC15C710251e8A15C65A73eF87F01A50962` | 2-of-3 | 0 | 0 | 0 |
| H3 Treasury | `0x024ed346AF0813435D398a0d46d968157ca5f373` | 2-of-3 | 0 | 0 | 0 |
| H4 Treasury | `0x623d3B101c03c5C4B53Efed35D0731DD8Ebb0Ff2` | 2-of-3 | 2 | 0 | 0 |
| H5 Treasury | `0x71C082Ac52ABc1bE00A302b8976FB4A9bcF6A093` | 2-of-3 | 0 | 0 | 0 |
| H6 Treasury | `0x18D23a56A3deae5c857e9Cc1AA8428DEF74dc6C0` | 2-of-3 | 0 | 0 | 0 |
| H7 Treasury | `0x8E991f30F532242335917C4dD6AE85a8f33daec1` | 3-of-4 | 0 | 0 | 0 |
| H8 Treasury | `0x0DAe5650cb05FFeCe7C5cE30ed39Fb6D82b21a46` | 3-of-4 | 0 | 0 | 0 |
| H9 Treasury | `0xd3C8A2A1efc06964E255250460548853ED9bcf3d` | 3-of-4 | 0 | 0 | 0 |

Current owners, thresholds, version, nonce, module result, singleton, guard and fallback slots agree across two RPC providers. All current module lists are empty with the end sentinel returned; guards read zero. The singleton is `0x41675C099F32341bf84BFc5382aF534df5C7461a`, fallback handler `0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99`. Their deployed runtime hashes match the public Safe v1.4.1 deployment metadata archived in this package. These are proxies, and valid Safe operations may change controls; no immutable-governance guarantee is made.

The eight Safes use four distinct **public on-chain owner addresses** in overlapping sets. Full owner lists are in `record.json`. No real-world signer identities or private custody locations are collected. Shared keys create correlated-loss exposure; key independence and authorization procedures remain UNVERIFIED.

## Deployment/funding references and historical coverage

| Instance | Referenced deployment transaction | Referenced funding transaction |
| --- | --- | --- |
| H1 | [0xf25148803469119092d1164574bfb76dcc7515c348faf420eb46be45c526001d](https://etherscan.io/tx/0xf25148803469119092d1164574bfb76dcc7515c348faf420eb46be45c526001d) | [0xff66cb4fc62b2d63ed0dd90e415c7ce8213667c7972749fab13141f0c8e189dc](https://etherscan.io/tx/0xff66cb4fc62b2d63ed0dd90e415c7ce8213667c7972749fab13141f0c8e189dc) |
| H2 | [0x9f048b3eb9bde12aeead001b058cd11fb3488ea6578c8049466f54b6171779c5](https://etherscan.io/tx/0x9f048b3eb9bde12aeead001b058cd11fb3488ea6578c8049466f54b6171779c5) | [0x52ab507c2615157f7c833671000f9b188af238b77d282f5249999e68e17267bc](https://etherscan.io/tx/0x52ab507c2615157f7c833671000f9b188af238b77d282f5249999e68e17267bc) |
| H3 | [0x5191f67afb7552ff67cf5fd9005822ca74c95895004f4caf45a6e0b30740c057](https://etherscan.io/tx/0x5191f67afb7552ff67cf5fd9005822ca74c95895004f4caf45a6e0b30740c057) | [0xc3a4e01b9fef58d66ecea3f1e64dff30f3c7ee4649f0a13c01c63012c454b422](https://etherscan.io/tx/0xc3a4e01b9fef58d66ecea3f1e64dff30f3c7ee4649f0a13c01c63012c454b422) |
| H4 | [0xcbbfeff20e872300de94dc85cf104517aec413a106c20ab6cc4c228607d9243d](https://etherscan.io/tx/0xcbbfeff20e872300de94dc85cf104517aec413a106c20ab6cc4c228607d9243d) | [0xad2920fd485ef185754abc49837ad0389fbe14fb05fbbfd85ff689c273454e26](https://etherscan.io/tx/0xad2920fd485ef185754abc49837ad0389fbe14fb05fbbfd85ff689c273454e26) |
| H5 | [0xe41345a6b6ffaa2d7a7ee5a0dac8a27a9786ed4b88dbb6bd2dde25024019084f](https://etherscan.io/tx/0xe41345a6b6ffaa2d7a7ee5a0dac8a27a9786ed4b88dbb6bd2dde25024019084f) | [0x41adab2208cbca6e07dc7feb1b71144378462dec4639ba7878f46d4f34f79a08](https://etherscan.io/tx/0x41adab2208cbca6e07dc7feb1b71144378462dec4639ba7878f46d4f34f79a08) |
| H6 | [0xb28b470b914c47262ee594702460a637562aa0d96ad6269e0eb3232205893481](https://etherscan.io/tx/0xb28b470b914c47262ee594702460a637562aa0d96ad6269e0eb3232205893481) | [0x68a4f0adc603c49635e2fbcc6084a7d1372779a2a64e0773d7e4c61b574629e9](https://etherscan.io/tx/0x68a4f0adc603c49635e2fbcc6084a7d1372779a2a64e0773d7e4c61b574629e9) |
| H7 | [0x8d803a07187fa1554017e7149c8e93ce12fb585e92f341f40a2784b49a3537f9](https://etherscan.io/tx/0x8d803a07187fa1554017e7149c8e93ce12fb585e92f341f40a2784b49a3537f9) | [0x9856a7ce2f0832dda6ecd62c50fbdf8bb104373c1518e3b7985634d79935f5fb](https://etherscan.io/tx/0x9856a7ce2f0832dda6ecd62c50fbdf8bb104373c1518e3b7985634d79935f5fb) |
| H8 | [0x0b8636a7a5461aa41925505b08bfafe781ec2f271f5539e3e1d3594036ff9ebd](https://etherscan.io/tx/0x0b8636a7a5461aa41925505b08bfafe781ec2f271f5539e3e1d3594036ff9ebd) | [0x4a9e49105e130b4b208c1493b37a6cfa5448b785adf6ba6f5c3d887ffba87e5a](https://etherscan.io/tx/0x4a9e49105e130b4b208c1493b37a6cfa5448b785adf6ba6f5c3d887ffba87e5a) |
| H9 | [0x2128d2ef513b165575a96bf81d7a0de8c97657bb607301a96f24fff275c29860](https://etherscan.io/tx/0x2128d2ef513b165575a96bf81d7a0de8c97657bb607301a96f24fff275c29860) | [0x26e1af74d362e07b0169c8ad2b00db8a7289c8caa3ec2f68c5e9ec8fc875ee9e](https://etherscan.io/tx/0x26e1af74d362e07b0169c8ad2b00db8a7289c8caa3ec2f68c5e9ec8fc875ee9e) |

The successful deployment receipts were checked against each expected created contract; funding receipts were checked for successful MDC Transfer logs to the instance and the configured funding amount. PublicNode returned null for these historical receipts while dRPC supplied them; transaction objects were available. The disagreement is retained. A null receipt was not used to declare a project reference false or a transaction nonexistent.

Historical log request range: **25920202 → 26282915**; actual collection status: **INCOMPLETE**. The transcript records every successful/rejected range. Readable Transfer observations, if supplied, are decoded in `raw/verification.json.gz`. An attempted range is not asserted as complete coverage. Native ETH internal transfers/traces, independent full-history reconciliation, spending-purpose documentation and an authenticated previous Treasury snapshot remain unavailable.

H4's 2,000 MDC release and Treasury nonce 2 require reconciliation with release and Safe execution transactions and documented promotion purposes. No misuse finding is inferred from those amounts. The existence of chain movements does not itself create a published Release Event record or authorize a counter change.

## Approvals, withdrawals and liquidity

Current allowance discovery only addresses candidate MDC spenders found in the bounded standard Approval-event query. Empty candidates do **not** prove zero allowances, particularly if log reads are incomplete. Other Treasury tokens, permit/nonstandard paths and complete spender inventory remain UNVERIFIED.

Getter/runtime/schedule conformity is independently observed. Comprehensive withdrawal authorization, privileged bypasses, initialization paths, upgradeability and static-analysis/contract-test results remain UNVERIFIED without the original source and locked artifacts. No real withdrawal or authorization transaction was created to test them.

The historical homepage claims UNCX V4 locker `0x147AECa171a79466Fe9E2c03f21b45155Ff403F8`, lock 106, position NFT 396442 and a September 8, 2028 unlock. Its referenced lock transaction is [`0xe0d22ea9d019a49c736ee4b5bc0457a937df691cc1eb847b8fea6a60de3e0aa8`](https://etherscan.io/tx/0xe0d22ea9d019a49c736ee4b5bc0457a937df691cc1eb847b8fea6a60de3e0aa8). Receipt/transaction/locker-code responses are retained. Those reads do not establish the complete current NFT custody, lock parameters, beneficiary, withdrawal permissions or privileged escape paths. **Current lock-control conclusion: UNVERIFIED.** H7 is the separate remaining liquidity reserve, not this historical LP position.

## Findings and remediation priorities

### MAINT-001 — FAIL · MEDIUM · P1

The first scheduled 30-day audit was due 2026-10-21T00:00:00Z. At the reviewed website baseline there were zero published complete audit records, and this attempt remains incomplete.

Required remediation: Complete and document the missing procedures, obtain review/publication approval and publish using the actual completion/publication dates.

### SOURCE-001 — UNVERIFIED · HIGH · P1

Canonical Treasury/Vault Solidity source, registry originals, compiler settings and locked artifacts are unavailable. The owner confirmed they may reside on an unavailable computer. No canonical source has been reconstructed.

Required remediation: Recover original files, match the website registry digest and artifact hashes, authenticate build inputs, reproduce bytecode and execute the original contract/security tests.

### EXPLORER-001 — UNVERIFIED · MEDIUM · P1

All ten current Mainnet Etherscan source-verification page requests returned HTTP 403. Stored website labels are historical project assertions, not current Exact Match evidence.

Required remediation: Independently inspect each linked Etherscan code page or use a supported authenticated read API, record exact/similar/unverified status, then compare original source and compiler inputs.

### MINT-001 — UNVERIFIED · HIGH · P1

Current totalSupply and decimals are verified. Absence of an owner() getter and zero common EIP-1967 slots do not establish that minting, upgrade or privileged paths are impossible.

Required remediation: Review authenticated token source and complete runtime control flow, initialization and all administrative/role paths. Do not infer mint-authority removal from one reverted getter.

### HISTORY-001 — UNVERIFIED · HIGH · P1

Historical completeness, all Treasury spending purposes, native ETH internal transfers and changes since a previous authenticated Treasury baseline have not been fully reconciled. See the recorded range status and failed/successful requests.

Required remediation: Obtain complete historical logs/traces, reconcile transfers and Safe executions with approved purposes, and cross-check coverage against an independent source.

### ALLOWANCE-001 — UNVERIFIED · HIGH · P1

MDC allowance discovery is bounded by the recorded log coverage and standard Approval events. No empty result is accepted as proof of zero allowances; other tokens and nonstandard authority paths are not covered.

Required remediation: Complete approval/permit and spender discovery from token creation, read every relevant current allowance, inventory other Treasury tokens and investigate significant approvals.

### CUSTODY-001 — UNVERIFIED · HIGH · P1

Current on-chain owners and thresholds are observable. Key custody, signer independence, backup/recovery, transaction purpose approval and operator access cannot be verified from those addresses.

Required remediation: Provide non-secret custody/authorization procedures and evidence of control reviews. Never provide keys, seed phrases, signing credentials or personal signer identities.

### OPS-001 — UNVERIFIED · MEDIUM · P1

Canonical administrative scripts, prior signed snapshots, incident/monitoring/rollback procedures and all repository/hosting access controls were unavailable or outside accessible configuration. The rulesets API returned an empty list; that does not establish the absence or presence of legacy branch protections.

Required remediation: Supply non-secret operational documents and access-control evidence. Review required approvals, branch protections, CI permissions, incident escalation and rollback controls.

### LIQUIDITY-001 — UNVERIFIED · MEDIUM · P1

The historical liquidity-lock transaction and locker code have read evidence, but current NFT custody, lock ID 106, NFT 396442, unlock conditions and privileged escape paths have not been fully verified. H7 reserve eligibility is separate from this historical LP lock.

Required remediation: Authenticate locker source/ABI and deployment; read the actual lock/NFT state and restrictions at a named block and reconcile the historical transaction.

### PROMOTION-001 — WARNING · MEDIUM · P1

H4 reports 2,000 MDC totalReleased and a 998,000 MDC balance; the Promotion Treasury has zero MDC and nonce 2. These facts require transfer/purpose reconciliation and do not establish misuse.

Required remediation: Reconcile the release(s), Safe execution(s), recipients and documented community-promotion purposes. Keep Release Events at zero until a qualifying reviewed event record exists.

### SIGNER-001 — WARNING · MEDIUM · P2

The eight Treasury configurations use four distinct public owner addresses in overlapping sets. This is a concentration observation; independent custody of the four keys is unverified.

Required remediation: Review signer independence and correlated-loss risk using non-secret procedures; do not disclose private signer identities or custody locations.

### RPC-001 — WARNING · MEDIUM · P2

PublicNode omitted the 18 referenced historical receipts while dRPC supplied them. The transaction references were recovered rather than labelled nonexistent. Historical RPC availability and explorer restrictions limit some procedures.

Required remediation: Retain both response sets, use independent receipt/history sources and never interpret an unavailable/null receipt as proof that a transaction never occurred.

### PUBLICATION-001 — FAIL · LOW · P2

The baseline publishedCounts function counted a PUBLISHED scheduled record without requiring completeness or finalized snapshot metadata. The proposed branch adds those requirements and tests; the live site has no such record and its existing count is zero.

Required remediation: Review the proposed publication safeguard. Do not merge/deploy this branch without explicit approval.

## Procedure matrix

| Procedure | Classification | Evidence / limitation |
| --- | --- | --- |
| Mainnet finalized block agreement | PASS | Two provider headers, numbered snapshot and final recheck in the RPC transcript. |
| Identify website-referenced vaults and validate deployed bytes/parameters | PASS | Nine configured addresses checked on chain; runtime and getter verification checks. |
| Authenticate canonical registry and original source/build artifacts | UNVERIFIED | Original files unavailable; owner-directed Phase 1 scope. |
| Current MDC total supply and decimals | PASS | Two-source totalSupply=54000000000000000000000000; decimals=18. |
| Current ETH and MDC balances | PASS | Two-source agreement for token, nine instances and eight Treasury addresses. |
| Current Safe owners, thresholds, modules, guard, fallback and singleton | PASS | Two-source configuration equality; singleton/fallback hashes match public Safe deployment metadata. |
| All privileged roles, minting and upgrade paths | UNVERIFIED | Probes are limited observations and do not replace original source/control-flow review. |
| Vault withdrawal access-control security | UNVERIFIED | Runtime and getter conformity are checked; source-level access-control proof/security tests remain unavailable. |
| Referenced deployments and initial funding receipts | PASS | Successful receipts recovered and checked against contract addresses and expected funding Transfer logs. |
| Complete historical movements and changes since baseline | UNVERIFIED | Recorded bounded event scan is not an authenticated prior audit baseline or complete native ETH trace history. |
| All relevant approvals and significant allowances | UNVERIFIED | Bounded standard-event discovery and incomplete token/authority inventory. |
| Current liquidity-lock restrictions | UNVERIFIED | Historical receipt/code observations do not establish complete current lock controls. |
| Canonical Solidity tests, compiler checks and static analysis | UNVERIFIED | Not executed: original source/build inputs unavailable. No source was reconstructed. |
| Full key-management, administrative-script and CI/CD review | UNVERIFIED | Deferred source/operational evidence unavailable; this is Phase 1 only. |
| Preliminary record, evidence hash chain and website compatibility | PASS | Validate with the committed package verifier, unit and intercepted browser tests. |
| Smart-contract changes, asset movement or wallet signing | NOT APPLICABLE | Explicitly outside scope; collector methods are read only and no real transaction was created. |

No source-dependent control is marked passed. Original Solidity compilation, Foundry/contract tests and source static analysis were **not executed** because their inputs are missing. Existing website schedule calculations, replay checks and publication integrity tests have a narrower scope.

## Reproduction and evidence integrity

Accepted CI collection: [40476961173](https://github.com/Harry36574/mdc-website/actions/runs/40476961173), source commit `364cbd874401584f683a186263f81e7cc62f13f8`. `evidence.json` records the earlier probes and their scope. Every raw evidence file is losslessly gzip-compressed; its compressed and decoded SHA-256 hashes are listed in `evidence.json`. The outer manifest pins the record, this report and the evidence index.

From a checkout of this review branch, with Node 24.19.0, Python 3, viem 2.57.4 and the documented validation dependencies installed:

```sh
gzip -dc transparency/history/records/2026/mdc-treasury-30d-001/raw/mainnet-summary.json.gz > /tmp/mdc-mainnet-summary.json
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
