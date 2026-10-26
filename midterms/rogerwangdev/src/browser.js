import { Episode } from './episode.js'
import { baseline } from './baseline.js'
import { scenarios } from './scenarios.js'
import { finishReplay } from './replay.js'

const $ = id => document.getElementById(id)
const canvas = $('game'), ctx = canvas.getContext('2d'), GM = window.GM
const background = GM.Sprites.background(960, 640, 150, 1)
let episode, trace, running = false, queued = null, playback = null
for (const s of scenarios.filter(x => x.split === 'development')) $('scenario').add(new Option(s.id.replace('-dev', ''), s.id))
function draw() {
  episode.draw(ctx, GM.Sprites, background)
  const o = episode.observe(), end = episode.outcome()
  $('score').textContent = `$${o.score}`
  $('quota').textContent = `$${o.quota}`
  $('time').textContent = `${o.timeLeft.toFixed(1)}s`
  $('claw').textContent = o.claw.state
  $('launch').disabled = end.terminal || o.claw.state !== 'swing' || $('mode').value !== 'human' || !!playback
  $('wait').disabled = end.terminal || !!playback
  if (end.terminal) {
    running = false
    $('status').textContent = `${end.success ? 'Quota reached!' : 'Episode finished.'} $${end.score} / $${end.quota} · ${end.reason.replaceAll('_', ' ')} · ${end.simulatedSeconds.toFixed(1)} simulated seconds`
  }
  $('run').textContent = running ? 'Pause clock' : 'Start clock'
}
function reset(scenario = scenarios.find(x => x.id === $('scenario').value), seed = scenario.seed) {
  running = false; queued = null; playback = null
  episode = new Episode(GM, scenario)
  episode.reset(seed)
  trace = { metadata: { kind: 'browser', scenario: scenario.id, player: $('mode').value }, seed, steps: [] }
  $('status').textContent = 'Choose a target. Large gold is valuable but heavy. Rocks cost precious time.'
  draw()
}
function step(action) {
  if (episode.outcome().terminal) return
  const observation = episode.observe()
  try {
    const result = episode.step(0, action)
    trace.steps.push({ observation, action, source: $('mode').value, result })
    draw()
    return result
  } catch (error) { $('status').textContent = error.message }
}
$('restart').onclick = () => reset()
$('scenario').onchange = () => reset()
$('mode').onchange = () => reset()
$('run').onclick = () => { if (!episode.outcome().terminal) running = !running; draw() }
$('wait').onclick = () => step({ type: 'wait' })
$('launch').onclick = () => {
  if ($('launch').disabled) return
  if (running) queued = { type: 'launch', frame: 0 }
  else step({ type: 'launch', frame: 0 })
}
canvas.onclick = () => $('launch').click()
window.addEventListener('keydown', event => {
  if (['SELECT', 'INPUT'].includes(event.target.tagName)) return
  if (event.code === 'Space' || event.code === 'ArrowDown') { event.preventDefault(); $('launch').click() }
  if (event.code === 'ArrowRight') { event.preventDefault(); $('wait').click() }
})
$('download').onclick = () => {
  trace.summary = episode.outcome()
  const url = URL.createObjectURL(new Blob([JSON.stringify(trace, null, 2)], { type: 'application/json' }))
  const a = document.createElement('a'); a.href = url; a.download = 'gold-miner-trace.json'; a.click()
  URL.revokeObjectURL(url)
}
$('replay').onchange = async event => {
  try {
    const saved = JSON.parse(await event.target.files[0].text())
    const scenario = scenarios.find(x => x.id === saved.metadata?.scenario)
    if (!scenario || !Array.isArray(saved.steps)) throw new Error('Trace has no supported scenario')
    reset(scenario, saved.seed)
    playback = { steps: saved.steps.filter(x => x.result && x.action), summary: saved.summary }
    running = true
    $('status').textContent = `Replaying ${saved.metadata.player} actions. No model calls are made during replay.`
  } catch (error) { $('status').textContent = error.message }
}
setInterval(() => {
  if (!running || episode.outcome().terminal) return
  if (playback) {
    try {
      const record = playback.steps.shift()
      if (record) {
        const result = step(record.action)
        if (JSON.stringify(result?.observation) !== JSON.stringify(record.result.observation)) throw new Error('Replay mismatch: this game version produces a different observation')
      }
      if (!playback.steps.length) {
        finishReplay(episode, playback.summary)
        running = false; playback = null; draw()
        if (!episode.outcome().terminal) $('status').textContent = 'Saved partial trace ended.'
      }
    } catch (error) { running = false; playback = null; draw(); $('status').textContent = error.message }
  } else {
    const action = $('mode').value === 'baseline' ? baseline(episode.observe()) : queued ?? { type: 'wait' }
    queued = null
    step(action)
  }
}, 500)
reset()
