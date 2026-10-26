# Development evidence

## Checkpoint implementation session, October 26, 2026

- Authoring assistant: Codex in the current conversation. This is one session.
- Read the course `AGENTS.md`, rule-change procedure, and read-only review instructions.
- Used the system `skill-creator` skill to create the project-local `gold-miner-rule-change` skill before implementation.
- Invocation: `gold-miner-rule-change` for the initial fixed-step engine and player boundary. Evidence follows in this file, the rule map, tests, and review handoff.
- At skill creation, the second real session invocation and independent review were pending. Review subsequently took place as recorded below. No live episode has occurred.

### Implementation and verification

- Imported 13 source files unchanged from the pinned MIT-licensed revision. SHA-256 verification passes.
- Wrote engine behavior tests before adding the adapter. Initial run failed because the engine modules did not exist.
- Observed an actual empty-launch integration crash, wrote a regression test, confirmed `game.puff is not a function`, and added the rendering-neutral callback. The regression then passed without modifying imported files.
- Verified three development baseline episodes and browser desktop/phone behavior. No live model requests were made.
- The student selected Vertex AI and deferred Google Cloud project setup. The live checkpoint is explicitly pending.
- Requested the independent read-only reviewer required by the course instructions. Their separate review found replay termination, source-version hashing, and evidence-map omissions. Addressed those findings with replay validation, imported-source hashing, and expanded rule evidence. Detailed review evidence is in `review.md`.
- A second standalone session invoking the reusable skill is still pending. A review subagent is not represented as that second session.
- Independent follow-up verified all three fixes and reported no findings. The reviewer performed no edits or provider calls.
