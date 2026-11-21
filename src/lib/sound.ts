let ctx: AudioContext | null = null

function getCtx() {
  ctx ??= new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Two-tone alarm siren, synthesised in the browser (no audio file needed). */
export function playAlarm(durationSec = 3) {
  const c = getCtx()
  const t0 = c.currentTime
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'square'
  for (let i = 0; i * 0.4 < durationSec; i++) {
    osc.frequency.setValueAtTime(i % 2 === 0 ? 960 : 720, t0 + i * 0.4)
  }
  gain.gain.setValueAtTime(0.1, t0)
  gain.gain.setValueAtTime(0.1, t0 + durationSec - 0.15)
  gain.gain.linearRampToValueAtTime(0, t0 + durationSec)
  osc.connect(gain).connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + durationSec)
}
