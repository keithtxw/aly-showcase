import { motion } from 'motion/react'
import { useState } from 'react'
import closeupBg from '../assets/warehouse-shoe-trail-closeup.png?webp'
import { BigButton } from '../components/BigButton'
import { ImageStage } from '../components/ImageStage'
import { ProceedButton } from '../components/ProceedButton'
import { FOOTPRINT_ANSWER } from '../config/gameConfig'
import type { SceneProps } from './index'

const IMAGE_ASPECT = 1671 / 941

/** Horizontal centre of each trail in the picture (% of its width), so each button sits above its own trail. */
const DOORS = [
  { number: 1, left: 12.5 },
  { number: 2, left: 31.5 },
  { number: 3, left: 50.5 },
  { number: 4, left: 69 },
  { number: 5, left: 89 },
]

/** Close-up of the five footprint trails: the children pick the door that matches the burglar's shoe. */
export function ShoeCloseupScene({ next }: SceneProps) {
  const [wrong, setWrong] = useState<Set<number>>(new Set())
  const [solved, setSolved] = useState(false)

  const choose = (number: number) => {
    if (number === FOOTPRINT_ANSWER) setSolved(true)
    else setWrong((prev) => new Set(prev).add(number))
  }

  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#2b2f3a]">
      <ImageStage src={closeupBg} aspect={IMAGE_ASPECT}>
        {DOORS.map(({ number, left }, i) => {
          const isWrong = wrong.has(number)
          const isRight = solved && number === FOOTPRINT_ANSWER
          return (
            <div key={number} className="absolute top-[10%] -translate-x-1/2" style={{ left: `${left}%` }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { type: 'spring', delay: 0.3 + i * 0.1 } }}
              >
                <BigButton
                  size="xl"
                  className="h-32 w-32 rounded-3xl! px-0! text-6xl!"
                  pulse={false}
                  state={isRight ? 'right' : isWrong ? 'wrong' : 'idle'}
                  disabled={isWrong || solved}
                  onClick={() => choose(number)}
                >
                  {number}
                </BigButton>
              </motion.div>
            </div>
          )
        })}
      </ImageStage>

      {/* Centred on the screen, over the footprints */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {solved && (
          <div className="pointer-events-auto">
            <ProceedButton onClick={next} delay={0.4} />
          </div>
        )}
      </div>
    </div>
  )
}
