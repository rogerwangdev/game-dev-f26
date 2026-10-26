import { Episode } from './episode.js'
import { baseline } from './baseline.js'
import { scenarios } from './scenarios.js'
import { finishReplay } from './replay.js'

const $ = id => document.getElementById(id)
const canvas = $('game'), ctx = canvas.getContext('2d'), GM = window.GM
const background = GM.Sprites.background(960, 640, 150, 1)
let episode, trace, running = false, queued = null, playback = null, recording = null
for (const s of scenarios.filter(x => x.split === 'development')) $('scenario').add(new Option(s.id.replace('-dev', ''), s.id))
function draw() {
  episode.draw(ctx, GM.Sprites, background)
  const o = episode.observe(), end = episode.outcome()
  $('score').textContent = `$${o.score}`
  $('quota').textContent = `$${o.quota}`
  $('time').textContent = `${o.timeLeft.toFixed(1)}s`
  $('claw').textContent = o.claw.state
  $('launch').disabled = end.terminal || o.claw.state !== 'swing' || $('mode').value !== 'human' || !!recording
  $('wait').disabled = end.terminal || !!recording
  $('next-recorded').disabled = !playback || running || end.terminal
  $('run').disabled = end.terminal || (!!recording && !playback)
  if (end.terminal) {
    running = false
    $('status').textContent = `${end.success ? 'Quota reached!' : 'Episode finished.'} $${end.score} / $${end.quota} · ${end.reason.replaceAll('_', ' ')} · ${end.simulatedSeconds.toFixed(1)} simulated seconds`
  }
  $('run').textContent = recording ? (running ? 'Pause replay' : 'Resume replay') : (running ? 'Pause clock' : 'Start clock')
}
function reset(scenario = scenarios.find(x => x.id === $('scenario').value), seed = scenario.seed) {
  running = false; queued = null; playback = null; recording = null
  if ($('mode').value === 'recorded') $('mode').value = 'human'
  $('mode').querySelector('option[value="recorded"]')?.remove()
  $('mode').disabled = false
  episode = new Episode(GM, scenario)
  episode.reset(seed)
  trace = { metadata: { kind: 'browser', scenario: scenario.id, player: $('mode').value }, seed, steps: [] }
  $('status').textContent = 'Choose a target. Large gold is valuable but heavy. Rocks cost precious time.'
  $('replay-progress').textContent = 'Saved recording · no API calls'
  $('decision-label').textContent = 'Load a recording to inspect its decisions'
  $('decision-meta').textContent = 'The saved episode includes the game observation, returned action, latency, and result. It contains no model reasoning text.'
  $('agent-observation').textContent = 'No recorded step selected.'
  $('agent-action').textContent = 'No recorded step selected.'
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
  if (event.code === 'ArrowRight') { event.preventDefault(); $(recording ? 'next-recorded' : 'wait').click() }
})
$('download').onclick = () => {
  if (!recording) trace.summary = episode.outcome()
  const url = URL.createObjectURL(new Blob([JSON.stringify(recording ?? trace, null, 2)], { type: 'application/json' }))
  const a = document.createElement('a'); a.href = url; a.download = 'gold-miner-trace.json'; a.click()
  URL.revokeObjectURL(url)
}
function loadRecording(saved) {
  const scenario = scenarios.find(x => x.id === saved.metadata?.scenario)
  if (!scenario || !Array.isArray(saved.steps)) throw new Error('Trace has no supported scenario')
  reset(scenario, saved.seed)
  if (![...$('scenario').options].some(option => option.value === scenario.id)) $('scenario').add(new Option(`${scenario.id} (recorded)`, scenario.id))
  $('scenario').value = scenario.id
  $('mode').add(new Option(`${saved.metadata.player} · recorded`, 'recorded'))
  $('mode').value = 'recorded'
  $('mode').disabled = true
  recording = saved
  playback = { steps: saved.steps.filter(x => x.result && x.action), summary: saved.summary, index: 0 }
  playback.total = playback.steps.length
  running = true
  $('status').textContent = `Replaying ${saved.metadata.player} on ${scenario.id}. No model calls are made during replay.`
  $('replay-progress').textContent = `0 / ${playback.total} steps · recorded episode · no API calls`
  draw()
}
$('replay').onchange = async event => {
  try {
    const saved = JSON.parse(await event.target.files[0].text())
    loadRecording(saved)
  } catch (error) { $('status').textContent = error.message }
}
async function watchModel() {
  $('watch-model').disabled = true
  try {
    const response = await fetch('reports/2026-10-26T19-22-31-872Z-vertex-open-dev-1.json')
    if (!response.ok) throw new Error('Cannot load the saved Gemini trace')
    loadRecording(await response.json())
  } catch (error) { $('status').textContent = error.message }
  finally { $('watch-model').disabled = false }
}
$('watch-model').onclick = watchModel
function advancePlayback() {
  if (!playback || episode.outcome().terminal) return
    try {
      const record = playback.steps.shift()
      if (record) {
        playback.index++
        const forced = record.source === 'forced_wait'
        $('decision-label').textContent = forced ? 'Engine wait while claw is busy' : 'Recorded player decision'
        $('decision-meta').textContent = forced ? 'Only waiting was legal in this interval, so the engine made no model request.' : `${record.modelVersion ?? recording.metadata.player} · request latency ${(record.latencyMs ?? 0).toFixed(0)} ms · action selected from the observation below`
        $('agent-observation').textContent = JSON.stringify(record.observation, null, 2)
        $('agent-action').textContent = JSON.stringify({ source: record.source, action: record.action, events: record.result.events, scoreAfter: record.result.observation.score, timeLeftAfter: record.result.observation.timeLeft }, null, 2)
        $('replay-progress').textContent = `${playback.index} / ${playback.total} steps · recorded episode · no API calls`
        const result = step(record.action)
        if (JSON.stringify(result?.observation) !== JSON.stringify(record.result.observation)) throw new Error('Replay mismatch: this game version produces a different observation')
      }
      if (!playback.steps.length) {
        finishReplay(episode, playback.summary)
        running = false; playback = null; draw()
        if (!episode.outcome().terminal) $('status').textContent = 'Saved partial trace ended.'
      }
    } catch (error) { running = false; playback = null; draw(); $('status').textContent = error.message }
}
$('next-recorded').onclick = () => { if (!running) advancePlayback() }
setInterval(() => {
  if (!running || episode.outcome().terminal) return
  if (playback) advancePlayback()
  else {
    const action = $('mode').value === 'baseline' ? baseline(episode.observe()) : queued ?? { type: 'wait' }
    queued = null
    step(action)
  }
}, 500)
reset()
if (new URLSearchParams(location.search).get('replay') === 'vertex') watchModel()
