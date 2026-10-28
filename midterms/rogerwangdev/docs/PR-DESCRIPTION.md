# Draft PR: Gold Miner model-player evaluation

**Local draft only.** Do not post or push without the student's authorization. Complete personal reflection and peer fields before marking ready. The links below refer to files in the submission folder, and should be replaced with the published submission-commit links when opening the course PR.

GitHub login: `rogerwangdev`

Project: **Gold Miner — fixed-step model player and heuristic comparison**

Adds a bounded, MIT-licensed Gold Miner adaptation with one complete level format, three development layouts and three held-out layouts. The player times launches rather than selecting target IDs. Physics runs at 60 Hz, each decision advances 0.5 simulated seconds, and launch offsets retain 1/60-second precision. The local runner owns state and validates all model actions.

The declared held-out experiment compares a public-geometry heuristic with Vertex `gemini-3.5-flash-lite`, using observation-only input and four-entry history. Two live trials per case and history arm yielded 2/6 model quota successes with H0 and 0/6 with H4. The heuristic reached every quota. All 24 traces, including failures, are retained and independently replayable. The small sample and sequential arm order limit interpretation. Reported token cost was about $0.1994.

Required evidence, relative to `midterms/rogerwangdev/`:

- [README and exact commands](../README.md)
- [Evaluation, metrics and limitations](../EVALUATION.md)
- [Student agent-team log — incomplete worksheet](../AGENT-TEAM.md)
- [Peer notes — blank pending human exchange](../PEER-NOTES.md)
- [3½-minute recording](../recordings/gold-miner-demo.webm), [recording provenance](../recordings/README.md)
- [Two actual named skill-use sessions](sessions/README.md)
- [Independent findings and resolutions](../review.md)
- [Rules/source map](rule-source-map.md) and [import manifest/license](../SOURCE.json)

Validation: source-file hashes, deterministic game/runner/adapter tests, timing checks, complete saved-trace replay, browser checks and fresh-clone verification. Detailed version-specific evidence is linked from the README. Live calls are excluded from CI.

Open items: student-authored reflection, peer feedback, publication and the trusted-base course workflow policy described in [course-integration.md](course-integration.md). The one-second skill rehearsal remains an unapplied evidence artifact. The submitted game still uses 0.5-second decisions.
