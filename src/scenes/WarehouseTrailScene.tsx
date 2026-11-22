import warehouseBg from '../assets/warehouse-shoe-trail.png'
import { ImageStage } from '../components/ImageStage'
import { ProceedButton } from '../components/ProceedButton'
import { SpeechBubble } from '../components/SpeechBubble'
import type { SceneProps } from './index'

const IMAGE_ASPECT = 1672 / 941

/** The warehouse: five numbered doors, each with a trail of shoe prints leading to it. */
export function WarehouseTrailScene({ next }: SceneProps) {
  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#2b2f3a]">
      <ImageStage src={warehouseBg} aspect={IMAGE_ASPECT} />

      {/* Bubbles stack at the bottom left (one after the other); Proceed sits at the bottom right. */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 px-8 pb-8">
        <div className="flex max-w-3xl flex-col items-start gap-3">
          <SpeechBubble className="relative text-left" tailSide="none" origin="left bottom" delay={1.2}>
            It looks like the burglar went through one of these doors. How do we know which did he go?
          </SpeechBubble>

          <SpeechBubble className="relative text-left" tailSide="none" origin="left bottom" delay={1.8}>
            Let me get HQ to find a picture of the same shoe the burglar was wearing!
          </SpeechBubble>
        </div>

        <ProceedButton onClick={next} delay={3} />
      </div>
    </div>
  )
}
