# Gold Miner evaluation

## Declaration

The concrete suite is in `src/scenarios.js`, with its pre-live declaration and hash in `SUITE.json`. Three development situations cover open targets, a blocked approach, and a tight time budget. Three separate held-out situations are reserved for the final comparison. The scenario fixtures were committed to the working tree before any model calls or prompt tuning. Their declaration is not evidence that live trials have run.

The shared controls use 60 Hz physics, 30 frames per decision, and a launch offset of 0–29 frames. The baseline predicts intercepts from visible geometry and ranks value per estimated waiting, outward, and return time with a 240-frame horizon. Both players get the same observations. There is no live model outcome yet.

## October 26 preliminary comparison

| Situation | Player | Score / quota | Result | Simulated seconds | Decisions | Forced waits | Invalid actions |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open-dev | Heuristic | 1011 / 750 | Success, field cleared | 14.40 | 13 | 16 | 0 |
| blocked-dev | Heuristic | 1570 / 700 | Success, field cleared | 13.23 | 12 | 15 | 0 |
| budget-dev | Heuristic | 1150 / 650 | Success, timer expired | 12.00 | 11 | 13 | 0 |
| open-dev | Vertex model | Pending | Project setup pending | — | — | — | — |

Baseline traces are saved under `reports/` by `npm run baseline`. Each trace records observations, actions, forced waits, physics events, outcomes, limits, scenario seed, source hashes, timestamp, commit context, and player configuration. There are zero provider calls or token costs in baseline runs. This is a baseline-only checkpoint table, not a completed model comparison.

Saved checkpoint evidence for implementation commit `2303986`:

- [Open field trace](reports/2026-10-26T18-17-02-679Z-baseline-open-dev-1.json)
- [Blocked approach trace](reports/2026-10-26T18-17-02-679Z-baseline-blocked-dev-1.json)
- [Tight budget trace](reports/2026-10-26T18-17-02-679Z-baseline-budget-dev-1.json)
- [Comparison data](reports/2026-10-26T18-17-02-679Z-baseline-summary.json)

## Verification

The deterministic test suite covers rule invariants, legal and illegal actions, a successful collection path, termination, a real integration regression, and episode limits. The regression was observed as `game.puff is not a function` when an empty grab left the playfield in the headless adapter. Its behavioral test failed before adding the rendering-neutral callback and passes afterward. The imported hook file remains unchanged.

All 25 local tests passed. Local browser checks exercised manual stepping, launch, reset, a complete heuristic episode, phone layout, and replay of a mocked call-limited episode. The open-field heuristic completed in the browser with score 1011. The mocked replay retained its `call_limit` failure. No browser errors or horizontal overflow were observed in those checks. Browser checks do not replace a human playtest. Independent review and its follow-up are recorded in [review.md](review.md).

The dedicated GitHub workflow is `.github/workflows/midterm-rogerwangdev.yml`. A green remote run is still pending until the branch is pushed and the workflow runs. Passing local commands alone is not reported as remote CI.

## Live protocol and cost

The student selected Google Vertex AI using course credits and deferred project setup. No live request has been made. Once configured, first run one development episode with `--live` and save the complete trace. Final primary evaluation runs each held-out situation twice with the baseline and live model. Compare observation-only mode with four retained decision/result entries on the same suite. All failures stay in the report.

Record the requested and resolved model identifiers, latency, calls, invalid actions, limits, fallback count, token usage, and game version. The adapter requests JSON actions, has no tools, and makes no automatic retries. It never silently substitutes the baseline.

For `gemini-3.5-flash-lite` standard global on-demand requests, published prices checked October 26, 2026 are $0.30 per million input tokens and $2.50 per million output tokens, including reasoning. The evaluation CLI calculates estimates only for that model and location. Other configurations produce an unknown cost rather than reusing these rates. Unreported failed-request usage and discounts are excluded from estimates. [Google Cloud pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

## Limitations and outstanding evidence

The checkpoint is incomplete until a real model episode and comparison are recorded. No claims about model competence, history benefits, or latency can yet be made. The baseline has only preliminary development results. Held-out trials, a human peer playtest, the student's own reflection, a second standalone skill-use session, and a final three-to-five-minute recording remain pending.

The browser is a stepped checkpoint interface. It deliberately pauses between manual steps and renders decision intervals rather than every physics frame. A later visual polish pass can improve animation without changing the authoritative physics or agent controls.
