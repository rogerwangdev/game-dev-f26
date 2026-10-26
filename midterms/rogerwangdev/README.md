# Gold Miner checkpoint

A bounded adaptation of [Lor3walker/gold-miner](https://github.com/Lor3walker/gold-miner), comparing model-selected launch timing with a geometry-based heuristic. The original claw physics, item definitions, and procedural artwork are reused under MIT. The pinned source, license, and file hashes are recorded in [SOURCE.json](SOURCE.json).

## Checkpoint status

- Playable browser game and five-operation engine implemented.
- Heuristic completes all three development situations and reaches their quotas.
- Deterministic engine, runner, and mocked Vertex adapter tests pass locally.
- Vertex AI selected by the student. **Live episode and model comparison are pending Google Cloud project setup. No live model calls have been made.**
- Dedicated CI workflow prepared. Remote CI evidence will be linked once run.

## Run locally

Use Node.js 22 or later and Python 3 for the static server. No npm dependencies are required.

From the repository root, enter this project once:

```bash
cd midterms/rogerwangdev
```

Run every command below from `midterms/rogerwangdev/`:

```bash
npm test
npm run verify-source
npm run baseline
npm run serve
```

Open <http://127.0.0.1:8765>. Choose a situation and player. Start the clock for automatic play, or use **Wait 0.5 seconds** and **Launch claw** to inspect individual decisions. Space or Down launches and Right advances one interval. Download traces or replay an evaluation JSON file. Replays make no provider calls.

## Scope and controls

One complete level format includes static gold, diamonds, rocks, quotas, and a simulated timer. Value is awarded after retrieval. A run ends when the field is cleared or time expires. Success means reaching the quota. Shops, upgrades, combos, dynamite, hidden-value bags, moving animals, and the original campaign are excluded to isolate timing and value/time decisions.

The shared engine uses 60 Hz physics and 30 frames per decision. An action is `{"type":"wait"}` or `{"type":"launch","frame":N}` for integer `N` from 0 to 29. A launch waits exactly N physics frames in the current interval before firing. Model thinking time does not advance the game. The runner advances forced waits without model calls while the claw cannot accept another launch. Both players use identical controls.

The authoritative engine exposes `reset(seed)`, `observe(player_id)`, `legal_actions(player_id)`, `step(player_id, action)`, and `outcome()`. Public numeric object properties support evaluation without a vision model. Players receive copied observations and have no engine handle, file-reading tools, credentials, or evaluator annotations.

The [rule/source map](docs/rule-source-map.md) distinguishes inherited rules from intentional adaptations. Our contribution is the fixed-step interface, bounded level scenarios, baseline, model adapter, runner, tests, traces, and English checkpoint interface.

## Live Vertex episode after project setup

These commands make paid API calls only when `--live` is present. Run from this project folder after configuring the project associated with your course credits and application-default credentials:

```bash
export GOOGLE_CLOUD_PROJECT='your-course-project-id'
export GOOGLE_CLOUD_LOCATION='global'
export COURSE_MODEL='gemini-3.5-flash-lite'
gcloud auth application-default login
npm run evaluate -- --player vertex --live --suite development --scenario open-dev --trials 1
```

For existing application-default credentials outside the standard WSL directory, set `GOOGLE_APPLICATION_CREDENTIALS` to that local file. Do not copy credentials into this repository. The adapter reads an access token through `gcloud` and sends only public gameplay context to Vertex. It has no retry or heuristic fallback.

The default live limits are 60 calls, three invalid responses, 15 seconds per call, and 180 seconds per episode. Failed calls count. Use a small development episode first. Inspect the saved summary and trace, including failures, before broader evaluation.

Final evaluation uses the held-out suite, two trials per situation, and the same cases for both players:

```bash
npm run evaluate -- --player baseline --suite heldout --trials 2
npm run evaluate -- --player vertex --live --suite heldout --trials 2
npm run evaluate -- --player vertex --live --suite heldout --trials 2 --history 4
```

Do not use held-out results to tune the prompt. [SUITE.json](SUITE.json) records the declared cases, budgets, and scenario hash before any live trials. [EVALUATION.md](EVALUATION.md) reports actual evidence and outstanding work.

## Development workflow and remaining submission work

Project instructions are in [AGENTS.md](AGENTS.md). The committed [gold-miner-rule-change skill](skills/gold-miner-rule-change/SKILL.md) connects design rationale, source evidence, failing tests, implementation, boundary checks, and independent review. Actual usage is recorded in [the work log](docs/work-log.md). A second standalone session invocation remains pending.

Codex assisted with implementation and suggested wrapping the existing claw simulation rather than replacing timing with target selection. This suggestion was retained in the implementation. The student still needs to write their own one-page `AGENT-TEAM.md` explaining their decisions. Human playtest observations, the final recording, and final evaluation are also pending and must not be inferred from automated tests.

Original source: Lor3walker, revision recorded in SOURCE.json. Preserve [the imported MIT license](vendor/gold-miner/LICENSE). The upstream artwork is drawn procedurally by its code. This project is an independent adaptation and does not claim affiliation with the original Gold Miner publisher.
