# Gold Miner evaluation

## Declaration

The concrete suite is in `src/scenarios.js`, with its pre-live declaration and hash in `SUITE.json`. Three development situations cover open targets, a blocked approach, and a tight time budget. Three separate held-out situations are reserved for the final comparison. The scenario fixtures were committed to the working tree before any model calls or prompt tuning. Their declaration is not evidence that live trials have run.

The shared controls use 60 Hz physics, 30 frames per decision, and a launch offset of 0–29 frames. The baseline predicts intercepts from visible geometry and ranks value per estimated waiting, outward, and return time with a 240-frame horizon. Both players get the same observations. `SUITE.json` is preserved as the original pre-live declaration, including its historical setup status. Current results are recorded below.

## October 26 preliminary comparison

| Situation | Player | Score / quota | Result | Simulated seconds | Decisions | Forced waits | Invalid actions |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open-dev | Heuristic | 1011 / 750 | Success, field cleared | 14.40 | 13 | 16 | 0 |
| blocked-dev | Heuristic | 1570 / 700 | Success, field cleared | 13.23 | 12 | 15 | 0 |
| budget-dev | Heuristic | 1150 / 650 | Success, timer expired | 12.00 | 11 | 13 | 0 |
| open-dev | Vertex model | 0 / 750 | Failure, timer expired | 30.00 | 32 | 28 | 0 |

Traces are saved under `reports/`. Each trace records observations, actions, forced waits, physics events, outcomes, limits, scenario seed, source hashes, timestamp, commit context, and player configuration. There are zero provider calls or token costs in baseline runs. This is a preliminary checkpoint comparison with one live development episode, not the final repeated held-out evaluation.

Saved checkpoint evidence for implementation commit `2303986`:

- [Open field trace](reports/2026-10-26T18-17-02-679Z-baseline-open-dev-1.json)
- [Blocked approach trace](reports/2026-10-26T18-17-02-679Z-baseline-blocked-dev-1.json)
- [Tight budget trace](reports/2026-10-26T18-17-02-679Z-baseline-budget-dev-1.json)
- [Comparison data](reports/2026-10-26T18-17-02-679Z-baseline-summary.json)

Live checkpoint evidence for commit `07fabe4`:

- [Complete live episode trace](reports/2026-10-26T19-22-31-872Z-vertex-open-dev-1.json)
- [Live summary](reports/2026-10-26T19-22-31-872Z-vertex-summary.json)
- Requested and resolved model: `gemini-3.5-flash-lite`, Vertex AI, `global`, project `game-dev-f26-lw3240`.
- Start: October 26, 2026, 19:22:31 UTC. Actual episode wall time: 24.86 seconds. Simulated game time: 30 seconds.
- 32 real API calls, 22,102 input tokens, and 260 output tokens. No retries, fallbacks, invalid actions, or provider failures.
- Mean request latency: 776.23 ms. Median: 744.04 ms. Maximum: 1490.35 ms.
- Estimated cost: $0.0072806 USD using the dated standard global prices below. This is an estimate rather than a billing statement.
- Both compared traces have seed 101, the same scenario/suite hash, and game hash `67ca7cefe52c686116bbe8759b99dd9a96f4349ce6af2fe7708b1b6501462ee0`.

The model selected 20 waits and 12 launches. The trace records one small rock grabbed at 27.9 simulated seconds and no delivered objects before the timer expired. All 60 simulation intervals were replayed independently and matched their saved observations, events, and outcomes exactly. The result demonstrates a working autonomous model loop but poor first-trial performance. It does not establish a general model success rate or a history benefit. No prompt tuning or additional live episodes were performed for this checkpoint.

## Verification

The deterministic test suite covers rule invariants, legal and illegal actions, a successful collection path, termination, a real integration regression, and episode limits. The regression was observed as `game.puff is not a function` when an empty grab left the playfield in the headless adapter. Its behavioral test failed before adding the rendering-neutral callback and passes afterward. The imported hook file remains unchanged.

All 25 local tests passed. Local browser checks exercised manual stepping, launch, reset, a complete heuristic episode, phone layout, and replay of a mocked call-limited episode. The open-field heuristic completed in the browser with score 1011. The mocked replay retained its `call_limit` failure. No browser errors or horizontal overflow were observed in those checks. Browser checks do not replace a human playtest. Independent review and its follow-up are recorded in [review.md](review.md).

The dedicated GitHub workflow is `.github/workflows/midterm-rogerwangdev.yml`. Its [remote run on checkpoint commit 90b3e46 passed](https://github.com/rogerwangdev/game-dev-f26/actions/runs/40376569370), including source verification, all 25 tests, and development baseline runs. The fork's shared setup and minigame workflows also passed. The engine source is unchanged from implementation commit `2303986` referenced by the saved traces.

Course PR integration remains separate from the successful fork CI: the current trusted minigame boundary checker protects all `.github/` paths and rejects this dedicated midterm workflow, although the midterm brief explicitly requires it. This was reproduced by calling `scripts/minigames.py:check_paths` with the project README and its dedicated workflow. No shared course tooling was modified. Staff will need to resolve that policy mismatch before the final course PR can pass that boundary check.

## Live protocol and cost

The student selected Google Vertex AI using course credits and subsequently supplied project `game-dev-f26-lw3240`. One live development episode was run with `--live`, observation-only input, and the originally declared budgets. The suite and prompt were unchanged. Final primary evaluation still needs each held-out situation run twice with the baseline and live model. Compare observation-only mode with four retained decision/result entries on the same suite. All failures stay in the report.

Record the requested and resolved model identifiers, latency, calls, invalid actions, limits, fallback count, token usage, and game version. The adapter requests JSON actions, has no tools, and makes no automatic retries. It never silently substitutes the baseline.

For `gemini-3.5-flash-lite` standard global on-demand requests, published prices checked October 26, 2026 are $0.30 per million input tokens and $2.50 per million output tokens, including reasoning. The evaluation CLI calculates estimates only for that model and location. Other configurations produce an unknown cost rather than reusing these rates. Unreported failed-request usage and discounts are excluded from estimates. [Google Cloud pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

## Limitations and outstanding evidence

The October 26 checkpoint now has a playable five-operation game, completed baseline runs, a completed live model episode and trace, an initial comparison, and passing deterministic CI. The live model failed its quota and that failure is retained. One development trial cannot establish model competence or statistical certainty, and history has not been tested. Held-out trials, a human peer playtest, the student's own reflection, a second standalone skill-use session, and a final three-to-five-minute recording remain pending for the final submission.

The browser is a stepped checkpoint interface. It deliberately pauses between manual steps and renders decision intervals rather than every physics frame. A later visual polish pass can improve animation without changing the authoritative physics or agent controls.
