import { motion } from 'motion/react'
import { BigButton } from '../components/BigButton'
import { Stars } from '../components/Stars'
import type { SceneProps } from './index'

/**
 * Pre-screen before the story starts. The click here also lets the browser
 * play sound (browsers block audio until the page has been clicked once).
 */
export function StartScene({ next }: SceneProps) {
  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-10 p-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070f] via-[#0d1226] to-[#1b1b3a]" />
      <Stars count={50} />

      <motion.div
        className="relative h-32 w-32 rounded-full bg-[#fff8d6] shadow-[0_0_80px_30px_rgba(255,248,214,0.35)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.h1
        className="relative text-5xl font-bold text-sunny drop-shadow-lg sm:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        A quiet night in Joyland... 🌙
      </motion.h1>
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.8 }}
      >
        <BigButton onClick={next}>Start</BigButton>
      </motion.div>
    </div>
  )
}
