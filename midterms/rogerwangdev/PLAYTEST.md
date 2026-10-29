# Gold Miner — 15-minute peer playtest

Play, then fill in the notes below. Honest criticism is useful. No installation, account or API key is required.

- [Play the game](https://gold-miner-peer-playtest.rogerwang0506.chatgpt.site/)
- [Controls and playtest guide](https://gold-miner-peer-playtest.rogerwang0506.chatgpt.site/playtest.html)
- [Captioned agent video](https://gold-miner-peer-playtest.rogerwang0506.chatgpt.site/watch.html)

## What to try

1. **Play as You, 5 minutes.** Try open, blocked and budget. Meet the quota before time expires. Use Start clock, then click the field or press Space to launch. Try pause, restart and optional Debug stepping.
2. **Watch the heuristic, 2 minutes.** Select Heuristic agent and Start clock. Note its choices and anything unclear.
3. **Inspect Gemini, 5 minutes.** In Gemini recording, compare open trials 1 and 2 under No history. Pause and use Next recorded step. Inspect one run under 4 previous decisions too. Can you connect the displayed state, action and result? Note the selections watched.
4. **Write feedback, 3 minutes.** Complete the form below. Optional: try a phone/narrow window or download a trace for a bug report.

The three Gemini groups mean:

| Group | Context Gemini received |
| --- | --- |
| Original checkpoint | An early test run with the current game state and no previous decisions. |
| No history | Current visible game state and legal actions only. |
| 4 previous decisions | Current state and legal actions, plus up to four earlier decisions and results from that episode. |

Gemini runs are saved replays with no new API calls. The heuristic runs locally. Human play is smooth. Agent replays show fixed decision steps.

## Ratings and notes to return

Use **4 = clear and reliable**, **3 = minor friction**, **2 = substantial confusion or problems**, **1 = blocked or unusable**, or **N/O = not observed**. Give one concrete example for every rating. These rate usability, not the course submission. Winning is not required.

Date and approximate session length:

Device/browser:

Situations played and Gemini recordings watched:

| Area | What to evaluate | Rating | Observed example |
| --- | --- | --- | --- |
| Instructions | Could you understand the goal, quota and controls? | | |
| Controls | Were aiming, launch, pause and restart responsive and predictable? | | |
| Game feedback | Were collection, score, remaining time and the ending understandable? | | |
| Page layout | Were labels readable and buttons aligned, accessible and easy to find? | | |
| Agent presentation | Could you distinguish human play, heuristic play and saved Gemini runs, and follow recorded actions? | | |

- **One thing that worked well, with an example:**
- **What I tried → what happened → how it felt:**
- **One thing I or an agent would have to guess:**
- **One question that would remove that guess:**
- **Most useful improvement and why:**
- **Bug, if observed:** situation/mode → steps to reproduce → expected result → actual result. Attach a screenshot or trace if useful.

Send notes through our agreed course/private channel. Omit identifying details. Feedback is not submitted automatically. Leave code, CI and reproduction unassessed unless you inspect or run them.

## Optional LLM prompt

After playing, paste this file and your rough notes into an LLM with:

> Organize my actual playtest notes using the form above. Preserve my ratings and meaning. Separate observations from interpretations and suggestions. Never invent gameplay, quotes, bugs, tests or ratings. Mark missing information Not observed. If real notes are absent, ask for them. Include the guess, clarifying question and improvement. Omit identifying details. Return a draft for me to check before sharing.
