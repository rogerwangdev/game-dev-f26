# Final local reproducibility verification

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

The latest published fork CI is the earlier passing run on `67c25ee`. These fresh-clone checks cover the current dedicated workflow commands locally. New remote/course CI awaits an authorized push and the trusted-base policy issue in [course-integration.md](course-integration.md). Human playtesting, personal authorship and public accessibility are not inferred from these automated results.

## Independent follow-up

The separate read-only `final_gap_review` context reported **No findings**. It independently reran the fresh clone's 34 tests and 24-trace audit, compared all 82 checked-file hashes against the candidate, main workspace and clean clone, verified all five saved command-log hashes, checked the empty tracked diff, and verified compressed-video hash, size, decoding, duration, seeking and readability. It found no browser errors, external requests or broken final-documentation links. Personal and peer fields remained correctly labeled incomplete. Details are retained in [review.md](../review.md).
