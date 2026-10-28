# Actual Codex session evidence

Two distinct authoring sessions used `gold-miner-rule-change` by name. These are local evidence files ready to link from the course PR after publication is authorized. No Codex-hosted public URL is claimed.

| Session | Actual ID and origin | Inspectable evidence |
| --- | --- | --- |
| 01: implementation | `01a13d3a-ca69-73c1-9754-390b76c321f3`, VS Code. The conversation began earlier, with the excerpted Gold Miner implementation on October 26, 2026 | [Actual transcript excerpts](session-01-implementation.md), including the named invocation, test-first failures, implementation, fixes and verification |
| 02: timing skill | `01a1839b-f210-7e42-acdb-e47be9825ea6`, a fresh standalone `codex exec` process started October 28 at the student's request | [Actual task prompt and public CLI transcript](session-02-timing-skill.md), [author's report/review handoff](session-02-rehearsal-report.md), [unapplied rehearsal patch](../../reports/2026-10-28-session-02-rehearsal.patch) |

Session 02 is not a reviewer subagent or another turn in Session 01. It has a distinct persisted session ID and `exec` source metadata, and no fork/resume was used. It followed the skill in an isolated detached checkout, writing failing tests before a one-second decision-interval migration. The copied project passed 40 tests, retained all original checkpoint files, exercised explicit evaluator declaration selection and completed development baseline episodes. Browser interaction and live model performance were not tested.

The production game remains at 0.5 seconds per decision. The one-second patch is an evidence artifact, not an applied game change. The earlier review-subagent rehearsal remains a separate validation artifact and is not counted as Session 02.

Exports identify their actual source recordings, hashes and selection rules. Session 01 is explicitly an excerpt. Session 02 preserves the actual prompt and all completed public CLI messages/commands/results. Internal reasoning, system/developer instructions, unrelated sessions and binary attachments are excluded. Credential-pattern redaction is disclosed. The source JSONL recordings remain local rather than being copied wholesale into this public course submission.

Independent findings and their resolution belong in [review.md](../../review.md). Final evaluation and the local recording are now complete and linked from the project README. The student's own `AGENT-TEAM.md`, peer notes and course PR remain separate submission work. This index and the session reports are factual evidence, not the student's personal reflection.
