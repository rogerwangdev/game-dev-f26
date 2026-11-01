# Submission sanity audit — October 31, 2026

**13 checks have supporting evidence. 3C and 5B remain partial. Final submission is not yet ready.** These are evidence statuses, not a predicted grade. Scope: the student's complete midterm folder and dedicated workflow, checked against midterm PDF pp. 4–7 and 9–12.

## Rubric coverage

| Check | Status | Evidence |
| --- | --- | --- |
| 1a Rule/source evidence | Present | [Rule map](rule-source-map.md) labels inherited code and design adaptations with locators |
| 1b Scope and exclusions | Present | [README](../README.md#scope-and-controls) documents the bounded level and omissions |
| 1c Reuse terms | Present | [SOURCE.json](../SOURCE.json), pinned source and retained [MIT license](../vendor/gold-miner/LICENSE) |
| 2a Complete playable loop | Present | Human play and baseline reach clear endings. Fresh-clone/browser checks passed |
| 2b Actual model player | Present | [Runner](../src/runner.js), [adapter](../src/vertex.js), retained live [evaluation/traces](../EVALUATION.md) |
| 2c Information boundary | Present | Copied public observations, validated actions and [boundary tests](../test/episode.test.js) |
| 3a Reproducibility | Present | Fresh clone of `36d43b0`, 38 tests and all documented deterministic checks passed. [Verification](verification.md) |
| 3b Authoritative runner/limits | Present | [Runner tests](../test/runner.test.js) exercise limits, errors, invalid input and provider-delay independence |
| 3c CI coverage | **Partial** | All required categories and dedicated workflow exist and pass locally. Last remote fork CI is `7b3bfa2`, before later commits. Current course policy rejects the required workflow path. [Integration evidence](course-integration.md) |
| 3d Agent-team artifacts | Present | [Configuration](../agent-config.json), [two actual authoring sessions](sessions/README.md), [skill](../skills/gold-miner-rule-change/SKILL.md), [independent findings](../review.md) |
| 4a Purposeful choices | Present | Scope, observation/action timing, baseline and history choices explained in [README](../README.md), [evaluation](../EVALUATION.md) and [student-notes-based draft](../AGENT-TEAM.md) |
| 4b Credible baseline | Present | Public-geometry heuristic completes cases. Comparison separates players and discloses its computation |
| 5a Fair comparison | Present | [Pre-run protocol](../FINAL-EVALUATION.json), held-out/history comparison, complete metrics and [24 exact replay audits](../reports/final-analysis.json) |
| 5b Personal reflection/peer use | **Partial** | [Reflection draft](../AGENT-TEAM.md) and [received feedback](../PEER-NOTES.md) are linked. Student review/final decisions and outgoing peer feedback are not recorded |
| 5c Honest autonomous recording | Present | [211.6-second video](../recordings/gold-miner-demo.webm), [public viewing page](https://gold-miner-peer-playtest.rogerwang0506.chatgpt.site/watch.html), retained actions, explicit replay/half-speed/limitations labels |

## Verification actually performed

- Clean independent clone of `36d43b0fea08e64117b3bd7e43ddfae2ffa5f578`, with no copied credentials or provider calls.
- All 38 tests passed, all 13 vendor hashes matched, timing checks passed, all 24 final traces replayed exactly and all three development baseline quotas were reached.
- Browser checks verified smooth human launch/pause/reset, optional 0.5-second inspection, a complete heuristic win, every one of the 13 menu replays to its recorded outcome, 390px layout, recording presentation loading and 211.6-second video decoding.
- No browser page errors or external requests occurred. Gameplay hash remains `67ca7cefe52c686116bbe8759b99dd9a96f4349ce6af2fe7708b1b6501462ee0`.
- [Machine-readable results, tested-file hashes and raw command logs](../reports/verification-2026-10-31.json) retain the evidence. Later audit documentation does not alter tested runtime inputs.

## Markdown findings and cleanup

Active peer-note templates were replaced with explicit missing-evidence statements. Stale claims that sessions, feedback or recording publication had not happened were corrected. Supplied student ideas now also appear as a review-pending interpretation/limitations draft in `EVALUATION.md`.

Historical session exports, original rehearsal reports, the October21 plan and the received peer report retain their provenance and dated limitations. The peer's unchecked confirmation box is preserved. Skill examples describe reusable procedures. Those are not unfilled current authoring templates.

## Real remaining work

1. **Student review:** finalize the supplied-notes-based reflection and evaluation interpretation, including actual decisions about peer suggestions. No student approval is inferred from this audit.
2. **Outgoing peer notes:** retain the report actually given to a classmate. No such report was supplied.
3. **Publication and CI:** when separately authorized, push later commits, run CI for that revision and open the course PR. Reconcile the documented trusted-base workflow policy with staff if it remains unchanged. No policy bypass, PR or message was made by this audit.
4. **CourseWorks:** submit the completed course PR URL by November 7, 11:59 p.m. The PR must link README, evaluation, agent-team log, peer notes and recording. No CourseWorks submission is recorded.
5. **Later activity:** post the three assigned recording replies before class November 16, after the November 9 assignments. This is separate from the midterm PR deadline.

The received report's unknown duration/build/agent view, absent referenced traces and unchecked confirmation are explicit evidence limitations. Its Not verified technical topics are not five separate failed peer-review checkboxes. They do not become verified through this audit. Numerical peer ratings are optional.

Additional campaign levels, a beginner aiming guide and a browser interface debugger are optional scope choices, not newly discovered mandatory deliverables.
