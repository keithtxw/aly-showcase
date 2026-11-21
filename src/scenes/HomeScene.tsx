import { motion } from 'motion/react'
import { BigButton } from '../components/BigButton'
import { PoliceBadge } from '../components/PoliceBadge'
import { Stars } from '../components/Stars'
import type { SceneProps } from './index'

export function HomeScene({ next }: SceneProps) {
  return (
    <div
      className={`
        relative flex min-h-full flex-col items-center justify-center gap-8 bg-gradient-to-b from-night to-night-light
        p-6 text-center
      `}
    >
      <Stars />
      <motion.div
        className="relative"
        animate={{ rotate: [-6, 6, -6], y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PoliceBadge className="h-56 w-auto drop-shadow-2xl sm:h-64" />
      </motion.div>
      <motion.h1
        className="relative text-5xl font-bold text-sunny drop-shadow-lg sm:text-7xl"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
      >
        Joyland Police Department
      </motion.h1>
      <motion.p
        className="relative max-w-xl text-2xl text-sky sm:text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        A crime needs solving... and we need YOU, super detectives!
      </motion.p>
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 1 }}
      >
        <BigButton onClick={next}>Begin! 🕵️</BigButton>
      </motion.div>
    </div>
  )
}
