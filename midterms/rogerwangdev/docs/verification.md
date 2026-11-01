# Final local reproducibility verification

## Latest check — October 31

Verified a clean independent clone of `36d43b0fea08e64117b3bd7e43ddfae2ffa5f578` with Node `v22.22.1` and Python `3.12.3`. All 38 tests, 13 imported-source hashes, timing checks, 24 exact final-trace audits and three development baseline episodes passed. The clone started with an empty Git status and its tracked source stayed unchanged. No credentials were copied and no new live model calls were made.

The browser check covered human start/launch/pause/reset, debug inspection, a complete $1,011/$750 heuristic win, all 13 catalog replays to their recorded outcomes, phone layout, presentation loading and video decoding at 211.6 seconds/1280×900. No page errors or external requests occurred. [Machine-readable command results, logs and tested-file hashes](../reports/verification-2026-10-31.json) retain the actual run. Later audit/status documentation does not change the tested runtime inputs or the frozen gameplay hash.

The latest known remote fork CI is still `7b3bfa2`. Later local commits have not been pushed, and the course PR/policy integration remains open. This distinction is reflected in the [full submission audit](submission-audit.md). Local passing commands are not presented as a new remote CI run.

Independent follow-up by `submission_sanity_review` reported No findings. It checked all 122 candidate hashes, five command-log hashes, unchanged runtime/peer/media inputs and 127 active-document links, and independently reran the clean clone's 38 tests and 24-trace audit. It reviewed browser results against the actual saved traces. Student review, outgoing feedback and external submission steps remain open; this verification does not approve them.

## Historical October 28 verification

Verified October 28, 2026, on clean candidate commit `5d25da8a09199c4f394b3242f7867f3208c85caa`.

A new `git clone --no-hardlinks --single-branch --branch rogerwangdev/midterm` from the local repository started with an empty `git status --porcelain`. It used no uncommitted source, copied credentials, npm dependency installation or new live model calls.
Runtime: `v22.22.1` and `Python 3.12.3`. All commands below ran from `midterms/rogerwangdev/` in that clone.

| Command | Actual result |
| --- | --- |
| `npm test` | 34 passed, 0 failed |
| `npm run verify-source` | All 13 imported file hashes match |
| `npm run check:timing` | 60 Hz, 30-frame decisions, correct offsets and all development baseline quotas |
| `npm run audit:evaluation` | All 24 final traces replay exactly and match frozen configuration, limits and token/cost totals |
| `node scripts/evaluate.js --player baseline --suite development --output-dir reports/reproduction-clean-clone` | All three development quotas reached, with new outputs isolated from recorded final results |

The last command runs the same baseline entry point as `npm run baseline`, with a separate output directory. [Machine-readable results, output hashes and tested-file hashes](../reports/verification-clean-clone.json) and its linked command logs retain the actual checks. The tracked source stayed unchanged.

## Browser and video checks

A separate local server served the fresh clone on loopback port 8766. Browser tooling was Playwright 1.64.1 and installed Chromium, outside application dependencies. It was not required to run the game or CLI tests.

- Manual wait advanced 0.5 seconds, launch worked and reset restored the initial 30-second timer.
- A complete autonomous heuristic episode ended at $1011/750 with field clearance after 14.4 simulated seconds.
- The actual first blocked held-out model trace replayed to its recorded $970/700 quota success and 35-second timer expiry.
- The 390-pixel phone layout had no horizontal overflow.
- The recording presentation loaded from the clone with all local assets.
- The compressed video decoded at 1280×900, reported 211.6 seconds, and sought to 110 seconds without a decode error.
- There were no page errors or external network requests during these checks.

## Scope and remaining external work

The gameplay version remains `67ca7cefe52c686116bbe8759b99dd9a96f4349ce6af2fe7708b1b6501462ee0`, identical to the final live trials. The fresh-clone candidate contains all final code, tests, recorded data and video. Later commits that only record verification/review do not change those tested inputs. The live adapter was exercised by mocked tests and is the unchanged adapter used for the retained real trials. A new authenticated paid episode was not redundantly run in the clean clone.

At the October28 verification, the latest fork CI was `67c25ee`. This historical record covers that candidate. A later authorized push published `7b3bfa2`; subsequent local revisions need their own remote CI. Course integration is tracked in [course-integration.md](course-integration.md). Human playtesting, personal authorship and public accessibility are not inferred from these automated results.

## Independent follow-up

The separate read-only `final_gap_review` context reported **No findings**. It independently reran the fresh clone's 34 tests and 24-trace audit, compared all 82 checked-file hashes against the candidate, main workspace and clean clone, verified all five saved command-log hashes, checked the empty tracked diff, and verified compressed-video hash, size, decoding, duration, seeking and readability. It found no browser errors, external requests or broken final-documentation links. Personal and peer fields remained correctly labeled incomplete. Details are retained in [review.md](../review.md).

## Subsequent human-control fix, October 29

The October 28 clean-clone evidence above is historical. The later human browser fix adds a separate frame adapter, 60 Hz animation and explicit debug controls. All 38 current tests, source verification, timing checks and the complete 24-trace audit passed locally. The frozen evaluation code/hash and retained experiment remain unchanged. New browser evidence is in [the human check report](../reports/2026-10-29-human-browser-check.json). Independent review and resolved findings are recorded in [review.md](../review.md#human-realtime-controls-review-october-29).

Commit `7b3bfa2` was subsequently pushed with permission and [fork CI passed](https://github.com/rogerwangdev/game-dev-f26/actions/runs/40924048142). The human-control edit is a later local commit with no claimed new GitHub CI result. The public Sites copy is published separately from the course repository. Received peer feedback and a student-notes-based reflection draft were subsequently filed. Student review and outgoing feedback remain unrecorded.
