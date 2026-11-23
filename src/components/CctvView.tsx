import type { ComponentProps } from 'react'
import { motion } from 'motion/react'
import { CctvScreen } from './CctvScreen'
import { BesideProceedButton } from './BesideProceedButton'
import { Stars } from './Stars'

/** A full CCTV page: dark background, heading, and the monitor. Pass `screen` props for the footage. */
export function CctvView({
  title,
  onProceed,
  ...screen
}: { title: string; onProceed?: () => void } & ComponentProps<typeof CctvScreen>) {
  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-6 px-6 py-5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070f] via-[#0d1226] to-[#05070f]" />
      <Stars count={15} />

      <motion.h2
        className="relative text-center text-3xl font-bold text-sunny drop-shadow-lg lg:text-5xl"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring' }}
      >
        {title}
      </motion.h2>

      {/* Same width as the screen, so the Proceed button can sit right beside its bottom-right corner */}
      <div className="relative" style={{ width: 'min(100%, calc((100vh - 220px) * 16 / 9))' }}>
        <CctvScreen {...screen} />
        {onProceed && <BesideProceedButton onClick={onProceed} />}
      </div>
    </div>
  )
}
