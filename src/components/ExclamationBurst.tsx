import { motion } from 'motion/react'
import type { ReactNode } from 'react'

// Comic "burst" star shape
const BURST = Array.from({ length: 32 }, (_, i) => {
  const r = i % 2 === 0 ? 50 : 36
  const a = (((i * 360) / 32) * Math.PI) / 180
  return `${(50 + r * Math.cos(a)).toFixed(1)}% ${(50 + r * Math.sin(a)).toFixed(1)}%`
}).join(', ')

/** A spiky pink comic-book "exclamation bubble" that bangs in. Set its size/text size via `className`. */
export function ExclamationBurst({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`
        flex items-center justify-center bg-candy text-center font-bold leading-tight text-white ${className}
      `}
      style={{ clipPath: `polygon(${BURST})` }}
      initial={{ scale: 0, rotate: -25 }}
      animate={{ scale: 1, rotate: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <span className="drop-shadow-[0_3px_0_rgba(0,0,0,0.4)]">{children}</span>
    </motion.div>
  )
}
