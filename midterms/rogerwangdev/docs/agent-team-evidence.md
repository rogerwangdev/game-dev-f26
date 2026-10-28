# Agent-team evidence and second-session handoff

Status as of October 28, 2026. This is an artifact index and task handoff, not the student's personal `AGENT-TEAM.md` or a claim that final submission requirements are complete.

| Requirement from midterm page 4 | Existing evidence | Remaining work |
| --- | --- | --- |
| Implementation instructions and linked authoring session | `AGENTS.md`, `agent-config.json`, implementation commits, `docs/work-log.md`, actual `docs/sessions/session-01-implementation.md` excerpts | Link the exported session evidence from the course PR after an authorized push |
| Committed reusable skill invoked by name in at least two sessions | `skills/gold-miner-rule-change/SKILL.md`, timing reference/helper, and two actual authoring-session exports indexed in `docs/sessions/README.md` | Both invocations are documented locally. Link both session files from the course PR after an authorized push |
| Independent read-only review with findings | `review.md` records the separate reviewer, actual findings, resolutions and follow-up | Link review evidence from the PR and review later material changes |
| One-page agent-team log in the student's own voice | Factual inputs are in `docs/work-log.md`, `review.md` and this index | Student writes `AGENT-TEAM.md`, including recommendations, their own decisions and evidence links |

## What the timing skill supplies

Read `skills/gold-miner-rule-change/references/simulation-timing.md` for the concrete migration procedure. It covers physics versus decision frequency, offset bounds, provider schema and prompt, baseline fairness, budgets, browser/replay behavior, versioned declarations, behavioral tests and review.

From `midterms/rogerwangdev/`:

```bash
npm run check:timing
npm run check:timing -- --trace reports/2026-10-26T19-22-31-872Z-vertex-open-dev-1.json
```

The helper runs offline and prints JSON. It does not change game settings, write experiment reports, authenticate to Google, or make provider requests. It checks executable behavior and the mocked outgoing action schema. Prompt wording, browser behavior and evaluation-version selection also require inspection as described in the procedure.

`npm run check:timing -- --seconds 1` currently fails intentionally: a one-second runtime has not been implemented. The active game remains 0.5 seconds per decision with 60 Hz physics. The four helper tests in `test/timing-skill.test.js` cover the current contract and saved replay, a requested interval mismatch, an unrepresentable duration, and a deliberately corrupted schema in a temporary copy.

An independent subagent also exercised the skill in an isolated one-second copy. The actual patch and 32-test passing output are retained as `reports/2026-10-28-timing-skill-rehearsal.patch` and `reports/2026-10-28-timing-skill-rehearsal-tests.txt`. See `review.md` for the before/after failures, browser checks and the incomplete evaluator-declaration migration. This is a partial rehearsal, not an active game change or a second standalone session.

## Completed second session and reusable handoff

At the student's request, a fresh standalone Codex CLI session `01a1839b-f210-7e42-acdb-e47be9825ea6` completed the timing task on October 28. Its actual prompt, messages and commands/results are in [session-02-timing-skill.md](sessions/session-02-timing-skill.md), with the report and patch linked from [the session index](sessions/README.md). It ran 40 copied-project tests and complete offline development baseline episodes, including explicit evaluator declaration selection. Browser interaction was not tested. No production timing or original checkpoint files changed.

The original handoff below is retained as a reusable request. The actual executed prompt, rather than this template, is preserved in Session 02.

> Use the project skill `gold-miner-rule-change` at `midterms/rogerwangdev/skills/gold-miner-rule-change/SKILL.md`. Rehearse a change from 0.5-second to 1-second decisions at 60 Hz in an isolated temporary copy. Follow its simulation-timing reference. Keep the active game, original declaration and existing traces unchanged. Write and run a failing behavioral test first, then migrate the copy's affected consumers and run the offline checks. Preserve the same controls and observations for the heuristic and model. Do not call a live provider or tune held-out cases. Record actual commands, failures, fixes, limits and remaining findings in a dated report in the submission folder, update `docs/work-log.md` with this session's actual reference, and obtain independent read-only review. Describe the outcome as an offline skill-use rehearsal, not a new live model result.

Keep the resulting report or patch inspectable. Do not count a date change, a new turn in an existing chat, reading the skill alone, or a reviewer subagent as that second standalone session. The count/status in `agent-config.json` and this table now reflect the completed standalone CLI session, not a review subagent. Include both actual exported-session links in the PR when publication is authorized. A future production timing change still requires the student to choose that change explicitly.

## Inputs for the student's own log

In your own words, explain which agents you directed, what each could access, their recommendations, your decisions and reasons, and the linked evidence. Distinguish Codex building/reviewing the game from Gemini choosing gameplay actions. Discuss the failed live run honestly and incorporate the required peer feedback when available. Do not submit this index as personal reflection.
