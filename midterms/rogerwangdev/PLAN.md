# Gold Miner midterm plan

Draft dated October 21, 2026. This is a planning document, not an implementation or a report of completed experiments.

Implementation began October 26. See [README.md](README.md) and [EVALUATION.md](EVALUATION.md) for current checkpoint evidence and remaining work. The original plan below is retained as the scope record.

## Objective and starting point

Adapt a bounded version of Gold Miner and compare a model-driven player with a credible heuristic player. Study whether the model can balance target value, retrieval time, obstacles, and the remaining level budget.

- Course repository: `columbia-university-ai-games/game-dev-f26`.
- Working branch: `rogerwangdev/midterm`, created from course `main` at `4a3b5b94442d95caa54d4445c231cd87f456bd9e`.
- Submission folder: `midterms/rogerwangdev/`.
- Proposed source: <https://github.com/Lor3walker/gold-miner>.
- Source revision selected for review: `b0f10f6b3488e02a69418391550c3d5bb7d612d4`.
- Reuse evidence: the upstream `LICENSE` contains the MIT license. Retain its copyright and permission notice, credit the author, and record imported files and modifications.

The source and license have been inspected. Browser playability and headless execution still need verification. Importing the source is the next implementation step, not part of this planning change.

## Bounded game scope

Keep the automatically swinging claw, timed launch, extending rope, first-object collision, weight-dependent retrieval, score, quota, and level timer. Include small and large gold, diamonds, and rocks. Translate relevant interface text into English.

Use one complete level format with multiple reproducible layouts. A run ends when its simulated timer expires or the field is cleared. The quota determines success. Runner failures and resource limits end the episode with separate reasons and never count as game wins.

Initially exclude shops, permanent upgrades, combos, dynamite, mystery bags, moving animals, and the twenty-level campaign. Explain these exclusions and any resulting rule adaptations in the rule/source map. Avoid hidden-value items so the first experiment can focus on planning and timing with visible information.

If time becomes tight, cut audio, decorative animation, and additional item types before reducing rule verification or evaluation quality.

## Fixed-step interface and timing

Keep a fixed physics tick separate from rendering. A proposed starting point is 60 physics frames per simulated second and 30 frames per agent decision. These values are provisional until offline feasibility checks, then fixed before prompt tuning and final evaluation.

At each decision boundary, take an observation, request an action, apply it, and advance the declared number of physics frames, stopping early on termination. The simulation does not advance while waiting for the provider. Gameplay deadlines use simulated time. API latency, request timeouts, and the episode wall-clock limit are measured separately.

Initial actions are `wait` and `launch`. Launch occurs at the beginning of the interval. If timing resolution proves inadequate, consider an explicit launch-frame offset within the same fixed interval before freezing the interface. Record that choice and expose the identical controls to both players. Never silently auto-aim at a selected object.

While the claw is extending or returning and only `wait` is available, the runner can advance forced wait intervals without a model call. Count and trace every interval. This policy must be identical for the model and baseline and must not skip a genuine player decision.

Implement the five operations:

| Operation | Contract |
| --- | --- |
| `reset(seed)` | Create an isolated, reproducible episode |
| `observe(player_id)` | Return a serialized copy of permitted visible information |
| `legal_actions(player_id)` | Return state-appropriate controls without target recommendations |
| `step(player_id, action)` | Validate the action and apply the declared simulation interval |
| `outcome()` | Return ongoing or terminal status, reason, score, and simulated time |

Observations include claw position, angle, swing direction and speed, claw state, visible objects and their known properties, score, quota, and remaining simulated time. Exclude the engine object, repository access, future random outcomes, provider credentials, reference solutions, and evaluator annotations.

Invalid actions do not mutate gameplay state and are counted. Use a finite invalid-response budget to prevent stalled episodes. Failed requests count toward the model-call limit. A timeout ends the run or triggers a documented, counted fallback policy chosen before evaluation. Never report a fallback as a model-selected move.

## Players and the experimental question

Primary question: can a model choose productive launches under a simulated time budget, compared with a heuristic using the same information and controls?

- Baseline: estimate the first reachable object along candidate launch directions, waiting time, outward travel, and weight-dependent return time. Select opportunities by value per estimated total collection time, accounting for the remaining quota and timer. Avoid an unjustified random baseline.
- Model player: receive structured observations and legal actions, then return a validated structured action. The provider adapter and runner execute the action without human move selection.
- Fairness: give both players the same observations, action timing, layouts, and episode rules. Disclose any additional search or computation used by the baseline. It must not inspect hidden engine state or evaluator-only helpers.
- History comparison: compare current observation alone with a bounded history of observations, launches, and results. Because the proposed game is fully observed, discuss whether history adds useful information or merely extra context.
- Success is a reproducible and honestly interpreted comparison. The model does not need to beat the baseline.

Use one live provider only after the student explicitly selects it and credentials are configured. No provider calls or cloud spending are authorized by this plan alone. Mocked responses verify the application and must remain labeled as mocked.

## Evaluation suite to freeze before tuning

Prepare and validate three scenario families:

| Family | Decision being tested |
| --- | --- |
| Open field | Select between quickly collected small objects and slower large gold |
| Blocked approach | Account for rocks intercepting a valuable target |
| Tight budget | Choose a feasible collection sequence when high value alone is misleading |

Provide separate development and held-out layouts for each family. Proposed development seeds are `101`, `102`, and `103`. Proposed held-out seeds are `701`, `702`, and `703`. Seeds alone are not a complete suite declaration. Before tuning, commit the actual layout fixtures, quotas, time limits, frame interval, action schema, budgets, and suite hashes in `EVALUATION.md` and the fixture files.

Validate reachability and feasible quotas using engine checks and the baseline before freezing. Keep held-out layouts and traces out of prompt tuning. If a case must change later because of an engine bug, record the amendment and rerun affected comparisons rather than replacing a difficult result silently.

For the primary comparison, run at least two fresh live trials on each of the three held-out situations, with baseline runs on the same cases. Run the history comparison on the same suite and report it separately. Log all development and evaluation live trials, including failures, and keep their purposes distinct. Set a spending ceiling and episode step, call, invalid-response, and wall-clock limits before live runs. A reduced suite requires instructor agreement.

Report completion, score, quota attainment, simulated time, misses, rock grabs, illegal actions, forced waits, model calls, fallback actions, timeout and terminal reasons, latency, input and output tokens, estimated cost with dated prices, trial counts, seeds, model identifier, configuration, and game commit. Present a small classroom sample without claims of statistical certainty.

## Implementation phases and acceptance checks

1. **Import and feasibility.** Preserve the selected upstream snapshot and license with a provenance manifest and an inspectable import commit. Verify human play. Trace hook physics, scoring, collision order, randomness, and timer behavior. Confirm that a bounded level and headless simulation can share the same rules.
2. **Rules and deterministic engine.** Create the rule/source map, separate authoritative game state from Canvas/audio/storage, inject seeded gameplay randomness, and implement fixed-step updates and the five operations. Repeating the same reset and action sequence must reproduce the gameplay trace.
3. **Baseline and runner.** Complete episodes with the heuristic. Enforce and log all budgets. Check that the decision interval permits useful launches without excessive model calls. Freeze the interface and evaluation suite before prompt tuning.
4. **Model integration.** Add one explicitly selected live provider, strict response validation, bounded history, and trace recording. Verify failures using mocked responses first. Complete a live episode only after funded access and the provider choice are confirmed.
5. **Evaluation and playtest.** Run the declared comparisons and independent review. Arrange a classmate playtest, retain anonymous observations, and document resulting changes. Re-evaluate any changed game version used for final claims.
6. **Submission.** Complete the reports, verify fresh-clone commands, run the final workflow, record three to five minutes of autonomous play, and prepare the course PR with all required links.

## Tests, evidence, and repository boundaries

Keep source, dependency manifests, configuration, skills, tests, reports, and small traces inside this submission folder. The only planned change outside it is `.github/workflows/midterm-rogerwangdev.yml`, running this folder's deterministic checks for relevant PR changes. Do not modify the shared starter, shared workflows, or another student's work.

CI must cover all five required kinds of check:

1. Rule invariants, including fixed-step timer accounting and valid claw states.
2. Legal and illegal actions, validation, and information boundaries.
3. A verified successful trace and terminal outcomes, including timer expiry.
4. A genuine bug observed during development, reproduced by a failing regression test before its fix. Do not invent a regression to fill this requirement.
5. Episode limits, including step and model-call exhaustion, request timeouts, and invalid-response handling.

Also check determinism, collision ordering, score delivery, retrieval-speed differences, forced-wait accounting, and action application at decision boundaries. CI uses deterministic or explicitly mocked inputs and requires no live-provider secrets.

Follow the repository's rule-change procedure when implementation begins: map the rule and its evidence, write and observe the failing test, change the engine, check the boundary, and prepare an independent-review summary. Use project-local paths for this midterm and the `design` label for intentional adaptations, as the assignment specifies.

## Required artifacts and student decisions

- `README.md`: scope, exclusions, rule/source map or its link, reuse terms, recording, and exact setup/play/test/evaluation commands with working directories.
- `EVALUATION.md`: frozen suite, comparison tables, traces, version-matched CI evidence, history findings, and limitations.
- `AGENT-TEAM.md`: one page written by the student in their own voice, naming recommendations, decisions, permissions, and evidence. Do not fabricate personal reflection.
- Project-local `AGENTS.md`, `agent-config.json`, and a reusable skill under `skills/`, invoked by name in at least two actual sessions with evidence of each invocation.
- Independent read-only review from a separate session that did not implement the code, with findings in `review.md` and their resolution recorded. Do not mark implementation as independently reviewed by this session.
- Anonymous peer notes given and received, plus a three-to-five-minute recording of the agent selecting and submitting actions autonomously.
- A source-provenance record retaining the imported license, source commit, file list, and subsequent changes.

Open decisions before implementation: confirm the bounded scope, choose the live provider and spending ceiling before live work, and select the final decision interval after offline feasibility checks. Update the Week 3 scope thread if Gold Miner changes the previously recorded choice.

## Course milestones

- **October 26:** five-operation engine, completed baseline episode, at least one live model episode and trace, first comparison table, and green deterministic CI.
- **November 6:** partner playtest notes delivered.
- **November 7, 11:59 p.m.:** completed course PR URL submitted to CourseWorks. The last pre-deadline push determines the graded version.
- **Before class November 16:** silent-playtester feedback on three assigned classmates' recordings.

The final PR targets `columbia-university-ai-games/game-dev-f26:main` and links the README, evaluation, agent-team log, peer notes, and recording. The current planning task does not include importing the game, implementing code, publishing, or making live model calls.
