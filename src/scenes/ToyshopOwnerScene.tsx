import { motion } from 'motion/react'
import { useState } from 'react'
import ownerBg from '../assets/toyshop-owner-joyful.png?webp'
import snack from '../assets/hello-panda-snack.png?webp'
import { ImageStage } from '../components/ImageStage'
import { ProceedButton } from '../components/ProceedButton'
import { SpeechBubble } from '../components/SpeechBubble'

const IMAGE_ASPECT = 1672 / 941

/** The toy shop owner, delighted that the burglar was caught. */
export function ToyshopOwnerScene() {
  const [gift, setGift] = useState(false)

  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#2a2350]">
      <ImageStage src={ownerBg} aspect={IMAGE_ASPECT} />

      {/* On the right, over the shelves, with the pointer aimed back at the owner on the left */}
      <div className="absolute right-[20%] top-[22%] flex max-w-2xl flex-col items-center">
        <SpeechBubble className="relative text-left" tailSide="left" tail="top-24" origin="left center" delay={0.6}>
          You detectives are so amazing. Thank you for catching the burglar. For your great work, I have a gift!
        </SpeechBubble>

        {!gift && <ProceedButton onClick={() => setGift(true)} customLabel="Get my gift" delay={1.8} />}
      </div>

      {/* The gift slides up from the bottom right; the screen edge cuts off its bottom 10% */}
      {gift && (
        <motion.img
          src={snack}
          alt="Three packs of Hello Panda biscuits"
          className="absolute bottom-0 right-6 w-[clamp(460px,55vw,980px)] drop-shadow-2xl"
          initial={{ x: '40%', y: '120%' }}
          animate={{ x: 0, y: '10%' }} // ends 10% below the screen edge
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        />
      )}
    </div>
  )
}
