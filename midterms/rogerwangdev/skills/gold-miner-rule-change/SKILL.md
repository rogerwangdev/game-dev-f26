---
name: gold-miner-rule-change
description: Change Gold Miner rules or its observation/action interface with source evidence, a failing test, fixed-step accounting, and an independent-review handoff.
---

Resolve paths from `midterms/rogerwangdev/`.

1. Read `docs/rule-source-map.md` and the relevant source pinned in `SOURCE.json`. Add or identify the map row before implementing. Use `code` for verified inherited behavior and `design` for a deliberate adaptation. Include a locator and rationale.
2. Write a behavioral test in `test/` and run it before the change. Record the actual failure. For timing, distinguish physics frames, decision intervals, and provider wall time. A new interval must not change outcomes through rendering or API latency.
3. Change project code outside `vendor/`. The baseline and model must receive the same observations and controls. Invalid actions must not mutate gameplay state. Keep future outcomes, hidden values, repository tools, credentials, and engine handles out of player inputs.
4. Run `npm test`. If the change affects play, verify the browser or a complete headless episode too. Mocked model responses prove runner behavior, not live model performance.
5. Update the map and write a review handoff identifying the rule, evidence, before/after test result, information-boundary effect, and remaining assumptions. A separate read-only reviewer supplies findings. Do not approve your own work.

Record actual invocation evidence in `docs/work-log.md`. Multiple turns in one chat are one session. Do not claim the required second session has happened until it has.
