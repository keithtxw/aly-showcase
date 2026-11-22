import { motion } from 'motion/react'

/** One record slot in the database screen: a label above a framed image, with a scan line sweeping over it. */
export function DatabasePanel({
  label,
  tag = '● MATCH',
  src,
  alt,
  aspect,
  height,
  zoom,
  delay = 0,
}: {
  label: string
  /** Small green status text beside the label */
  tag?: string
  /** The picture. Leave out to show a "no image" placeholder. */
  src?: string
  alt: string
  /** Width / height of the picture, so the frame hugs it (shoe is wide, sole is tall) */
  aspect: number
  /** CSS height of the picture; the width follows from the aspect ratio */
  height: string
  /** Zoom into the picture: scale, and the point (CSS transform-origin, e.g. "85% 50%") that stays in place */
  zoom?: { scale: number; origin: string }
  delay?: number
}) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', delay }}
    >
      <div
        className={`
          flex items-center justify-between font-mono text-sm font-bold tracking-widest text-sky
          lg:text-lg
        `}
      >
        <span>{label}</span>
        <span className="text-[#5fe3a1]">{tag}</span>
      </div>

      <div
        className={`
          relative overflow-hidden rounded-lg border-2 border-sky/60 bg-[#0a1424]
          shadow-[0_0_24px_rgba(59,193,255,0.25)]
        `}
        style={{ height, width: `calc(${height} * ${aspect})` }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-contain p-2"
            style={zoom && { transform: `scale(${zoom.scale})`, transformOrigin: zoom.origin }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sky/50">
            <span className="text-6xl">👟</span>
            <span className="font-mono text-lg tracking-widest">NO IMAGE</span>
          </div>
        )}

        {/* Scan line sweeping down the picture */}
        <motion.div
          className={`
            pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-sky/25
            to-transparent
          `}
          initial={{ top: '-15%' }}
          animate={{ top: '110%' }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay }}
        />
      </div>
    </motion.div>
  )
}
