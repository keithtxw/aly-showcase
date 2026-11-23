import stationBg from '../assets/joyland-police-station.png?webp'
import { ImageStage } from '../components/ImageStage'
import { ProceedButton } from '../components/ProceedButton'
import { SpeechBubble } from '../components/SpeechBubble'
import type { SceneProps } from './index'

const IMAGE_ASPECT = 1672 / 941

/** Back at Joyland Police Station with the suspects rounded up. */
export function PoliceStationScene({ next }: SceneProps) {
  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#1b1b3a]">
      <ImageStage src={stationBg} aspect={IMAGE_ASPECT} />

      {/* Bottom of the screen (road and pavement): the bubble, then the Proceed button under it */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-6">
        <SpeechBubble className="relative max-w-5xl" tailSide="none" origin="center bottom" delay={0.6}>
          The suspects have been rounded. Are you ready to catch the burglar?
        </SpeechBubble>

        <ProceedButton onClick={next} delay={1.8} />
      </div>
    </div>
  )
}
