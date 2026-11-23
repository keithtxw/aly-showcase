import { motion } from 'motion/react'
import beanieDrop from '../assets/beanie-drop.png?webp'
import { ProceedButton } from '../components/ProceedButton'
import { Stars } from '../components/Stars'
import type { SceneProps } from './index'

/** The burglar drops a beanie: the comic picture takes most of the screen, with Proceed in a strip below. */
export function BeanieDropScene({ next }: SceneProps) {
  return (
    <div className="relative flex h-full min-h-[600px] flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1b4d] via-[#2b1055] to-[#1b1b3a]" />
      <Stars count={30} />

      {/* Picture area: everything above the button strip, picture as large as fits without cropping */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-1 pt-4">
        <motion.img
          src={beanieDrop}
          alt="The burglar dropping a beanie"
          className="max-h-full max-w-full rounded-2xl border-8 border-white object-contain shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        />
      </div>

      {/* Button strip */}
      <div className="relative flex h-44 items-start justify-center">
        <ProceedButton onClick={next} delay={1} />
      </div>
    </div>
  )
}
