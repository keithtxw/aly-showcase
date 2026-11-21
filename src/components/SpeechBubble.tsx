import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Pops in with a bounce. Position it via `className` (e.g. `absolute ...` or `relative`).
 * `tail` is a Tailwind position string for the pointer, e.g. "left-10".
 */
export function SpeechBubble({
  children,
  className = '',
  tail = 'left-10',
  tailSide = 'bottom',
  origin = 'center bottom',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  tail?: string
  /** Which edge the pointer sits on. `tail` then positions it along that edge (e.g. "top-16" for 'left' or 'right'). */
  tailSide?: 'bottom' | 'left' | 'right'
  /** CSS transform-origin for the pop-in, so it grows out of its speaker */
  origin?: string
  /** Seconds to wait before popping in */
  delay?: number
}) {
  return (
    <motion.div
      className={`
        rounded-3xl border-4 border-night bg-white px-8 py-5 text-center text-3xl font-bold text-night shadow-2xl
        lg:text-4xl ${className}
      `}
      style={{ transformOrigin: origin }}
      initial={{ scale: 0, rotate: -8, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 14, delay }}
    >
      {children}
      <span
        className={`absolute h-7 w-7 rotate-45 border-night bg-white ${
          tailSide === 'left'
            ? '-left-4 border-b-4 border-l-4'
            : tailSide === 'right'
              ? '-right-4 border-r-4 border-t-4'
              : '-bottom-4 border-b-4 border-r-4'
        } ${tail}`}
      />
    </motion.div>
  )
}
