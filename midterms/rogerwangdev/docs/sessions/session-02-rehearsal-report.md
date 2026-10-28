# October 28, 2026 — isolated one-second rehearsal and review handoff

Invoked `gold-miner-rule-change` by name in this standalone Codex CLI authoring session at the student's explicit request. Read root/project AGENTS.md, root/project rule maps, the skill and its `references/simulation-timing.md`, SOURCE.json, and pinned vendor hook source. This is offline skill-use evidence in an isolated detached worktree, not a production change, live trial, student reflection, or independent review. The parent will export this actual session transcript; no other local sessions were inspected. No session-count claims were changed.

The new `design` row in `docs/rule-source-map.md` was written before implementation: decisions change from 0.5 seconds/30 frames/offsets 0–29 to one second/60 frames/offsets 0–59, retaining 60 Hz physics and 1/60-second aiming precision. Terminal outcomes can end an interval early. Provider wall time never advances simulation. Both baseline and model retain the same copied public observations and validated controls; no hidden state, repository tools, or engine handles enter player payloads.

Before implementation:

- `npm run check:timing`: passed the original contract; baseline scores 1011, 1570, 1150; original game hash `67ca7cefe52c686116bbe8759b99dd9a96f4349ce6af2fe7708b1b6501462ee0`.
- `npm run check:timing -- --seconds 1`: expected failure, requested interval not implemented (`30 !== 60`).
- Added `test/rehearsal-timing.test.js` before engine edits. `node test/rehearsal-timing.test.js`: five tests, one pass, four actual expected failures. Frame advance was 30 rather than 60; both launch-range tests saw maximum 29 rather than 59; after two decisions the partial-expiry test reached frame 60 rather than 61. Offset 60 already correctly rejected without changing observation or outcome. The first `node --test` invocation only exposed a file-level failure because of child-output restrictions; direct execution exposed the assertion failures in the transcript.

Changed files and reasons:

- `src/episode.js`: 60 decision frames; existing fixed-tick integration, terminal checks and validation retain physics behavior.
- `src/vertex.js`: actual outgoing prompt says up to 60 frames at 60 Hz, offsets 0–59, terminal early exit; response schema maximum 59. Mock request tests inspect both text and schema.
- `src/baseline.js`: explicitly retains four simulated seconds of search (`4 * physics.hz`), still 240 frames; no tuning or quota changes.
- `src/browser.js`, `index.html`: one-second interval derived from engine constants, updated labels, human offset input 0–59, and pre-replay timing rejection. Browser syntax checked; interaction/animation not tested.
- `src/replay.js`: rejects absent/incompatible public recording timing before browser playback; current timing replay still reproduces results. The timing helper additionally rejects the preserved checkpoint by full game hash.
- `scripts/declaration.js`, `scripts/evaluate.js`: explicit `--declaration` selection, defaulting to preserved SUITE.json (therefore intentionally rejected here). Validate physicsHz, decisionFrames, launchFrames and scenario hash before invoking the provider factory. Tests prove an old declaration and bad scenario hash never invoke even a mocked factory. New trace metadata includes declaration path, SHA256, date and status.
- `REHEARSAL-2026-10-28.json`: explicitly amends the original October 26 SUITE.json for this isolated rehearsal; preserves source/scenario identity and budgets. `README.md`, `agent-config.json`, and rule map identify the rehearsal and explicit commands; historical EVALUATION.md and session-count claims remain untouched.
- `test/episode.test.js`: copied timing expectations now use 60 frames/one second; invalid upper boundary is 60; one-second timer expires after one decision rather than two. No tests deleted.
- `test/timing-skill.test.js`: selects new declaration and no longer expects the historical trace to replay under changed physics timing; explicit incompatibility coverage is in replay tests. Controlled schema-drift fixture copies the new declaration. Child stdout/stderr capture uses temporary file descriptors because this sandbox rejects synchronous pipe capture with EPERM and asynchronous capture returned empty output. `package.json` runs the entire test set without process isolation so every assertion is visible. This changes test execution only, not game budgets.
- New `test/declaration.test.js`, `test/rehearsal-timing.test.js`; expanded runner/replay/Vertex tests cover delay invariance, bounded detached history, prompt/schema, and recording compatibility. New offline baseline artifacts only under `reports/rehearsal-2026-10-28/`.

Declaration SHA256: `331bf6e58ae11ba59a4e310f96b0a05ec7d94abd3353b18e0bc4662599d26afa`.
New runtime game hash: `53ecd47d99b754d757374f069eb3e89b1b0c0e3b739addbd45bf2ed899282495`.
Pinned upstream revision: `b0f10f6b3488e02a69418391550c3d5bb7d612d4`.
Budgets remain maxSteps 200, maxCalls 60, maxInvalid 3, call timeout 15000 ms, episode wall timeout 180000 ms. Longest development timer is 35 seconds, requiring at most 35 one-second timer-only steps; no budget increase is needed. Baseline and model call budgets remain explicit and separate from forced waits.

Final commands/results (from project directory):

- `npm test`: **40 passed, 0 failed**, no skipped/deleted tests. Includes five focused timing cases, mocked provider delays with identical actions/results, history sizes 0 and bounded 2, and distinct timer/step/call/invalid/provider/wall failure checks.
- `npm run verify-source`: all 13 imported source files verified unchanged.
- `npm run check:timing -- --seconds 1 --declaration REHEARSAL-2026-10-28.json`: passed; zero provider requests; all development baselines successful.
- `node scripts/evaluate.js --player baseline --suite development --declaration REHEARSAL-2026-10-28.json --output-dir reports/rehearsal-2026-10-28`: complete episodes with history 0; repeated with `--history 4` after final evaluator wiring. Both modes produce the table below. Six traces and two summaries retained, never overwriting original reports.
- `node scripts/evaluate.js --player baseline --declaration SUITE.json`: expected nonzero exit, `Declaration timing mismatch: physicsHz/decisionFrames/launchFrames`, before provider creation.
- Timing checker with new declaration and `--trace reports/2026-10-26T19-22-31-872Z-vertex-open-dev-1.json`: expected nonzero exit, `Recording game version differs. Use its original code version for replay`. Replay unit test also explicitly rejects its 30-frame timing before stepping.
- `node --check src/browser.js`, `git diff --check`: passed. Byte comparison against HEAD verified all 23 original declaration/report/vendor files unchanged. Six new trace metadata hashes, quotas, reasons, limits and per-step timing were checked by script.

| Development case | Score / quota | Reason | Seconds | Steps | Calls / forced waits |
| --- | --- | --- | --- | --- | --- |
| open-dev | 1011 / 750 | field_cleared | 14.4 | 15 | 6 / 9 |
| blocked-dev | 1570 / 700 | field_cleared | 13.4666666667 | 14 | 7 / 7 |
| budget-dev | 1150 / 650 | timer_expired | 12 | 12 | 5 / 7 |

All six evaluation traces have zero invalid actions, fallbacks, tokens and provider cost. Quotas, scenarios and original evidence are unchanged. Only development scenarios were executed. These deterministic offline outcomes do not demonstrate live model competence or a history benefit. Minor command-location mistakes and restricted child-output attempts appear in the transcript; they did not change engine evidence.

Independent read-only review is pending with the parent. Please review timing boundaries and partial terminal intervals, provider-factory ordering and declaration identity, public payload/history boundaries, preserved source/checkpoint bytes, and copied-test rationale. Browser interaction remains untested, including the new offset input; no browser approval is claimed. No live provider, credential access, held-out tuning, agent/session invocation, commit, push, gate approval, or student reflection occurred. The original workspace was outside the editing scope. Do not promote this rehearsal to production or claim independent review from this authoring report.
