import mazeBg from '../assets/warehouse-maze-overview.png?webp'
import { ImageStage } from '../components/ImageStage'
import { ProceedButton } from '../components/ProceedButton'
import { SpeechBubble } from '../components/SpeechBubble'
import type { SceneProps } from './index'

const IMAGE_ASPECT = 1672 / 941

/** The mission: find where the burglar left the warehouse. */
export function FindExitScene({ next }: SceneProps) {
  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#2b2f3a]">
      <ImageStage src={mazeBg} aspect={IMAGE_ASPECT} />

      {/* Bottom of the screen: the bubble, then the Proceed button under it */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-6">
        <SpeechBubble className="relative max-w-5xl" tailSide="none" origin="center bottom" delay={0.6}>
          The burglar must have went through that exit! This place is an absolute maze. Can we find our way out?
        </SpeechBubble>

        <ProceedButton onClick={next} delay={1.8} customLabel="We found the exit!" />
      </div>
    </div>
  )
}
