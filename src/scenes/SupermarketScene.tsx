import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import shopperBg from '../assets/worried-shopper-supermarket.png?webp'
import { BigButton } from '../components/BigButton'
import { ImageStage } from '../components/ImageStage'
import { SectionsQuiz } from '../components/SectionsQuiz'
import { SpeechBubble } from '../components/SpeechBubble'
import type { SceneProps } from './index'

const IMAGE_ASPECT = 1672 / 941

/**
 * In the supermarket. Two stages in ONE scene, so the picture never reloads:
 * 1. A worried shopper tells the detectives what she saw.
 * 2. "Find out more" fades a white wash over the picture and starts the sorting questions.
 */
export function SupermarketScene({ next }: SceneProps) {
  const [quiz, setQuiz] = useState(false)

  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#f3e6dc]">
      <ImageStage src={shopperBg} aspect={IMAGE_ASPECT}>
        <AnimatePresence>
          {!quiz && (
            <motion.div
              key="shopper"
              className="absolute left-[28%] top-[44%] flex w-[38%] flex-col items-center gap-8"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              {/* Bubble with the button underneath it, so the button follows however tall the bubble gets */}
              <SpeechBubble
                className="relative w-full text-left"
                tailSide="left"
                tail="top-24"
                origin="left center"
                delay={0.8}
              >
                He went through the sections... but I cannot remember what were they. I can only remember what I saw in
                there.
              </SpeechBubble>

              {/* Appears just after the shopper has spoken */}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 1.8 }}>
                <BigButton onClick={() => setQuiz(true)}>Find out more</BigButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ImageStage>

      {quiz && (
        <>
          {/* White wash fades the picture out */}
          <motion.div
            className="absolute inset-0 bg-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <SectionsQuiz next={next} />
        </>
      )}
    </div>
  )
}
