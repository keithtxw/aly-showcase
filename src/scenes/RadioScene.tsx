import { motion } from 'motion/react'
import { SpeechBubble } from '../components/SpeechBubble'
import { Stars } from '../components/Stars'
import { WalkieTalkie } from '../components/WalkieTalkie'

/** Police radio message about the suspicious person. */
export function RadioScene() {
  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-8 px-6 py-5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1b4d] via-[#2b1055] to-[#1b1b3a]" />
      <Stars count={30} />

      <motion.h2
        className="relative text-center text-3xl font-bold text-sunny drop-shadow-lg lg:text-5xl"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring' }}
      >
        Incoming message on the police radio! 📻
      </motion.h2>

      <div className="relative flex items-center justify-center gap-14">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          <WalkieTalkie className="h-72 w-auto lg:h-96" />
        </motion.div>

        <SpeechBubble
          className="relative max-w-2xl text-left"
          tailSide="left"
          tail="top-24"
          origin="left center"
          delay={1}
        >
          Someone has reported a suspicious person entering the nearby supermarket. He looks to be carrying a sack of
          toys.
        </SpeechBubble>
      </div>
    </div>
  )
}
