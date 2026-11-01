# Course PR integration — current submission status

An authorized push published `7b3bfa2` on October29, with green fork CI. Later commits remain local under the student’s no-push instruction. On October31, no open course PR by `rogerwangdev` was found. No staff message or CourseWorks submission is claimed. The PR body is prepared in [PR-DESCRIPTION.md](PR-DESCRIPTION.md).

The brief's page 7 requires the student's own `.github/workflows/midterm-<login>.yml`. Our dedicated workflow runs source verification, project tests, timing checks, the full saved-evaluation audit and development baseline episodes without credentials or live calls.

Rechecked October31: the course's trusted `scripts/minigames.py:check_paths` still lists `.github/` in `PROTECTED` (content SHA `ad29b3090d28b09621263e46b6bad4943e276e9b`). Reproducing its path check with these two paths:

```text
midterms/rogerwangdev/README.md
.github/workflows/midterm-rogerwangdev.yml
```

and author `rogerwangdev` raises:

```text
A student variation PR may change only its author’s game folder. Instructor-owned files need an instructor PR. Outside scope: .github/workflows/midterm-rogerwangdev.yml
```

This is a trusted-base course policy conflict, not a missing game test. The boundary workflow checks out its tooling from the base commit. Editing student code cannot legitimately repair that policy. No instructor-owned script or shared workflow has been changed or bypassed.

## Before the course PR is ready

1. Student reviews the supplied-notes-based `AGENT-TEAM.md` draft and retains the outgoing peer feedback. Received feedback is already filed, with unknowns documented.
2. Student authorizes publication of later local commits. The recording is already public.
3. Open one PR to `columbia-university-ai-games/game-dev-f26:main`, linking the required files and actual session exports.
4. Verify trusted-base policy and course CI at that point. If the conflict persists, ask staff which permitted route satisfies the required workflow. Do not remove the required workflow silently or modify instructor-owned policy.
5. Submit the course PR URL to CourseWorks by the deadline. Merge approval belongs to staff.

Draft question for staff, not sent: “The midterm brief requires my dedicated `.github/workflows/midterm-rogerwangdev.yml`, while the trusted minigame boundary checker rejects student `.github/` changes. What is the approved route for the midterm workflow?”
