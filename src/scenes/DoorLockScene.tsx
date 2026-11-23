import { motion } from 'motion/react'
import doorBg from '../assets/supermarket-door-lock.png?webp'
import { BigButton } from '../components/BigButton'
import { ImageStage } from '../components/ImageStage'
import { SpeechBubble } from '../components/SpeechBubble'
import type { SceneProps } from './index'

const IMAGE_ASPECT = 1672 / 941

/** The locked "Storage - Staff Only" door the burglar went through. */
export function DoorLockScene({ next }: SceneProps) {
  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#f3e6dc]">
      <ImageStage src={doorBg} aspect={IMAGE_ASPECT}>
        {/* Bubble on the left, pointing across to the door, with the button underneath */}
        <div className="absolute left-[3%] top-[26%] flex w-[31%] flex-col items-center gap-8">
          <SpeechBubble
            className="relative w-full text-left"
            tailSide="right"
            tail="top-24"
            origin="right center"
            delay={0.6}
          >
            The burglar must have went in through the door, but it is locked!
          </SpeechBubble>

          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 1.6 }}>
            <BigButton onClick={next}>Let&apos;s unlock it</BigButton>
          </motion.div>
        </div>
      </ImageStage>
    </div>
  )
}
