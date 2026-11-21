import type { ComponentProps } from 'react'
import { motion } from 'motion/react'
import { CctvScreen } from './CctvScreen'
import { Stars } from './Stars'

/** A full CCTV page: dark background, heading, and the monitor. Pass `screen` props for the footage. */
export function CctvView({ title, ...screen }: { title: string } & ComponentProps<typeof CctvScreen>) {
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

      <CctvScreen {...screen} />
    </div>
  )
}
