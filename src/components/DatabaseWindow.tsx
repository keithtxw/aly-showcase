import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** The HQ database window: title bar, search status line, and the records (`children`) inside. */
export function DatabaseWindow({
  title,
  search,
  status,
  children,
  className = 'max-w-6xl',
}: {
  title: string
  /** What was searched for, e.g. "BURGLAR'S SHOE" */
  search: string
  /** Result summary, e.g. "1 RECORD FOUND" */
  status: string
  children: ReactNode
  /** Sizing classes for the window, e.g. its max width */
  className?: string
}) {
  return (
    <motion.div
      className={`
        relative w-full overflow-hidden rounded-xl border-2 border-sky/50 bg-[#08111f]
        shadow-[0_0_60px_rgba(59,193,255,0.2)] ${className}
      `}
      initial={{ scaleY: 0.05, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-sky/30 bg-[#0d1b30] px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 font-mono text-sm tracking-widest text-sky/80 lg:text-base">{title}</span>
      </div>

      {/* Search status */}
      <div
        className={`
          flex items-center justify-between border-b border-sky/20 px-5 py-2 font-mono text-sm
          lg:text-lg
        `}
      >
        <span className="text-white/80">
          SEARCH: <span className="text-sunny">{search}</span>
        </span>
        <span className="font-bold text-[#5fe3a1]">{status}</span>
      </div>

      {/* The records */}
      <div className="flex items-center justify-center gap-16 p-5">{children}</div>
    </motion.div>
  )
}
