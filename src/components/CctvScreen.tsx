import { motion } from 'motion/react'

interface CctvScreenProps {
  /** The footage image. Leave out to show a "no signal" placeholder. */
  src?: string
  camera?: string
  location?: string
  /** Timestamp shown on screen (static) */
  time?: string
}

/** A security-monitor frame with timestamp and scanlines around a still image. */
export function CctvScreen({
  src,
  camera = 'CAM 01',
  location = 'JOYLAND TOY SHOP',
  time = '10:00:12PM',
}: CctvScreenProps) {
  return (
    // The CRT "switches on" by expanding from a thin line
    <motion.div
      className={`
        relative aspect-video overflow-hidden rounded-3xl border-[14px] border-slate-700 bg-black
        shadow-[0_0_60px_rgba(0,0,0,0.8)]
      `}
      style={{ width: 'min(100%, calc((100vh - 220px) * 16 / 9))' }}
      initial={{ scaleY: 0.02, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.3 }}
    >
      {/* Footage */}
      {src ? (
        <img src={src} alt="CCTV footage" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900 text-center text-slate-400
          `}
        >
          <span className="text-7xl">📹</span>
          <span className="text-2xl font-semibold tracking-widest">NO SIGNAL</span>
        </div>
      )}

      {/* Scanlines, green tint and vignette */}
      <div
        className={`
          pointer-events-none absolute inset-0
          bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0_2px,transparent_2px_4px)]
        `}
      />
      <div className="pointer-events-none absolute inset-0 bg-green-900/10 mix-blend-multiply" />
      <div
        className={`
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)]
        `}
      />

      {/* On-screen display */}
      <div
        className={`
          pointer-events-none absolute inset-0 flex flex-col justify-between p-5 font-mono text-xl font-bold
          text-white/90 [text-shadow:0_2px_4px_rgba(0,0,0,0.9)] lg:p-7 lg:text-3xl
        `}
      >
        <div className="flex items-start justify-end">
          <div>{camera}</div>
        </div>
        <div className="flex items-end justify-between">
          <div>{time}</div>
          <div>{location}</div>
        </div>
      </div>
    </motion.div>
  )
}
