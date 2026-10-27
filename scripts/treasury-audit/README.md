# Preliminary Treasury audit tooling

This branch prepares **MDC-TREASURY-30D-001**, an **INCOMPLETE, unpublished Phase 1 operational observation**. It must not be merged, deployed or presented as a completed audit without explicit approval and completion of the outstanding procedures.

The original Solidity project, canonical registry/schema and locked artifacts are unavailable. No source is reconstructed here. Current Etherscan requests were denied; old website source labels are not fresh verification evidence. This is not an independent third-party security audit.

## Reproduce the stored observation checks

Use Node 24.19.0, Python 3, viem 2.57.4, Playwright 1.62.1 and jsonschema 4.26.0. Dependencies can be installed in a separate temporary directory with npm lifecycle scripts disabled. Set `MDC_AUDIT_DEPENDENCY_ROOT` to that directory if they are not available in normal Node module resolution. The new validation workflow pins the GitHub Action commits and has `contents: read`; it does not deploy.

```sh
python3 scripts/treasury-audit/validate-package.py
node --test --test-isolation=none test/treasury-audit/history.test.mjs
node test/treasury-audit/browser.mjs
python3 scripts/treasury-audit/syntax-check.py
```

The browser test intercepts every request and does not access a real wallet or Mainnet RPC. It checks the incomplete draft, counters, overdue date, mobile/desktop layout, tampered hashes and falsely completed/republished drafts. It is separate from the actual Mainnet collection evidence.

The real accepted RPC transcript and summary are losslessly compressed in `transparency/history/records/2026/mdc-treasury-30d-001/raw/`. Both compressed and original SHA-256 hashes are pinned by `evidence.json`. Decode those two files into a temporary directory as `summary.json` and `rpc-transcript.jsonl`, then run:

```sh
node scripts/treasury-audit/verify-observations.mjs /tmp/mdc-audit-replay /tmp/mdc-audit-verification.json
```

This replay verifies only the specifically named observations. It always retains `fullAuditStatus: INCOMPLETE`. It cannot establish missing original source, complete historical coverage or private operational controls.

## Collect a new observation

```sh
node scripts/treasury-audit/collect-mainnet.mjs audit-output
node scripts/treasury-audit/check-explorer.mjs audit-output
```

These commands create a new observation with real execution timestamps. They do not reproduce the historical state retroactively or establish a completed audit. The collector allows only explicit chain/block/code/balance/call/storage/log/transaction-read methods. No private keys, signing credentials or wallet providers are accepted. RPC/explorer rejections are retained as unverified evidence.

`prepare-preliminary.py` is a draft-only package builder. Its inputs are a stored collection directory, verifier output and an explicitly supplied metadata file naming public evidence paths and source-run references. It uses the real preparation time and forces completion/publication timestamps to null. Do not use it to overwrite published records; future corrections must append a new record with a supersedes reference.

## Publication model

The existing formal `records` list remains empty and `publicationStatus` remains `NO_PUBLISHED_RECORDS`. The proposed `inProgressRecords` extension is displayed with an incomplete/unpublished warning and cannot advance the schedule or counters. The schema in this directory is a provisional draft schema compatible with this site's consumer, not the missing original contract-project schema.

The outer bundle hashes `record.json`, `report.md` and `evidence.json`; the index pins the manifest. The package validator checks every compressed evidence hash, the read-only RPC method list, the incomplete/source-unverified gates and unchanged unrelated website files. The build validator additionally verifies that the actual Pages build preserves all archive bytes and download paths.

The existing GitHub Pages build/deployment uses `main`. The review branch's workflows only collect evidence and validate/build; they contain no merge, deployment or asset-transfer step. Production source and public maintenance status remain unchanged.
