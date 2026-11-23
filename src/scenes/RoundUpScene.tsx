import carparkBg from '../assets/warehouse-carpark.png?webp'
import { ImageStage } from '../components/ImageStage'
import { SpeechBubble } from '../components/SpeechBubble'

const IMAGE_ASPECT = 1672 / 941

/** The warehouse car park is full of burglars: time to round them all up. */
export function RoundUpScene() {
  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#1b1b3a]">
      <ImageStage src={carparkBg} aspect={IMAGE_ASPECT} />

      {/* Top of the screen, where the picture is least busy */}
      <div className="absolute inset-x-0 top-[5%] flex justify-center px-6">
        <SpeechBubble className="relative max-w-4xl" tailSide="none" origin="center top" delay={0.6}>
          What! Which one is the burglar? Let&apos;s just round them all up!
        </SpeechBubble>
      </div>
    </div>
  )
}
