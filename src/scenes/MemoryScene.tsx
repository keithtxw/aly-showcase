import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { ProceedButton } from '../components/ProceedButton'
import { Stars } from '../components/Stars'
import { MEMORY_MISMATCH_DELAY_MS, MEMORY_OBJECTS } from '../config/gameConfig'
import type { SceneProps } from './index'

const BACK_FACE =
  'absolute inset-0 flex items-center justify-center rounded-2xl border-b-8 text-6xl shadow-xl ' +
  '[backface-visibility:hidden] [transform:rotateY(180deg)] lg:text-7xl'

function shuffledDeck() {
  const deck = [...MEMORY_OBJECTS, ...MEMORY_OBJECTS]
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

/** Memory game: flip two cards at a time; matching pairs stay open. Proceed appears once all are found. */
export function MemoryScene({ next }: SceneProps) {
  const [cards] = useState(shuffledDeck)
  const [flipped, setFlipped] = useState<number[]>([]) // face-up, not yet matched
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const complete = matched.size === cards.length

  // A wrong pair stays face-up for a moment, then flips back.
  useEffect(() => {
    if (flipped.length !== 2) return
    const timer = setTimeout(() => setFlipped([]), MEMORY_MISMATCH_DELAY_MS)
    return () => clearTimeout(timer)
  }, [flipped])

  const flip = (i: number) => {
    // Ignore clicks while a wrong pair is showing, or on cards that are already up
    if (flipped.length >= 2 || flipped.includes(i) || matched.has(i)) return
    if (flipped.length === 1 && cards[flipped[0]] === cards[i]) {
      // Second card matches the first: keep both open
      setMatched((prev) => new Set(prev).add(flipped[0]).add(i))
      setFlipped([])
    } else {
      setFlipped([...flipped, i])
    }
  }

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-4 px-6 py-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1b4d] via-[#2b1055] to-[#1b1b3a]" />
      <Stars count={30} />

      <motion.h2
        className="relative text-center text-3xl font-bold text-sunny drop-shadow-lg lg:text-5xl mt-3"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring' }}
      >
        Find the matching pairs to break the lock code!
      </motion.h2>

      {/* Sized so the whole square grid (plus the Proceed button below) fits on screen */}
      <div
        className="relative grid grid-cols-4 gap-6 lg:gap-6 mt-5"
        style={{ width: 'min(100%, calc(100vh - 290px))', minWidth: '320px' }}
      >
        {cards.map((emoji, i) => {
          const faceUp = flipped.includes(i) || matched.has(i)
          const isMatched = matched.has(i)
          return (
            <motion.button
              key={i}
              onClick={() => flip(i)}
              aria-label={faceUp ? emoji : 'Hidden card'}
              className={`relative aspect-square [perspective:800px] ${faceUp ? '' : 'cursor-pointer'}`}
              initial={{ scale: 0 }}
              // The stagger delay belongs to the entrance only, so hovering reacts instantly
              animate={{ scale: 1, transition: { type: 'spring', delay: 0.2 + i * 0.04 } }}
              whileHover={
                faceUp ? undefined : { scale: 1.08, transition: { type: 'spring', stiffness: 500, damping: 25 } }
              }
              whileTap={
                faceUp ? undefined : { scale: 0.93, transition: { type: 'spring', stiffness: 500, damping: 25 } }
              }
            >
              <motion.div
                className="absolute inset-0 [transform-style:preserve-3d]"
                animate={{ rotateY: faceUp ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Front: the button the kids tap */}
                <div
                  className={`
                    absolute inset-0 flex items-center justify-center rounded-2xl border-b-8 border-orange-500 bg-sunny
                    text-5xl font-bold text-night shadow-xl [backface-visibility:hidden] lg:text-6xl
                  `}
                >
                  ?
                </div>
                {/* Back: the supermarket object */}
                <div
                  className={`${BACK_FACE} ${
                    isMatched ? 'border-green-600 bg-green-200' : 'border-slate-300 bg-white'
                  }`}
                >
                  {emoji}
                </div>
              </motion.div>
            </motion.button>
          )
        })}
      </div>

      {/* Space is reserved so the grid doesn't jump when the button appears */}
      <div className="relative flex h-28 items-center justify-center">
        {complete && <ProceedButton onClick={next} />}
      </div>
    </div>
  )
}
