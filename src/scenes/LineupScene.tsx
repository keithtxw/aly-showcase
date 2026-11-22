import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import lineup from '../assets/suspects-lineup.png'
import { BigButton } from '../components/BigButton'
import { ProceedButton } from '../components/ProceedButton'
import { CluePopup } from '../components/CluePopup'
import { Stars } from '../components/Stars'
import { BURGLAR_SUSPECT, LINEUP_CLUES } from '../config/gameConfig'
import type { SceneProps } from './index'

const IMAGE_ASPECT = 1536 / 1024
/** Grid position of the burglar (suspects are numbered from 1 in the picture and config). */
const BURGLAR = BURGLAR_SUSPECT - 1
const COLUMNS = 5
const ROWS = 2

/**
 * Where the 10 mugshot cards sit inside the picture (% of its size): the picture has a thin margin around the
 * grid and small gaps between cards. The invisible buttons use the same numbers so they line up with the cards.
 */
const GRID = { left: 0.5, right: 0.9, top: 3.4, bottom: 3.3, columnGap: 0.5, rowGap: 1.2 }

/**
 * Suspect line-up. Tap a mugshot to flip its card over (eliminating it; tap again to undo).
 * The Clue button opens the next clue, but only moves on to a new one if at least one card was flipped since the
 * last clue was shown, so each round of elimination gets its own clue.
 */
export function LineupScene({ next, registerAdvance }: SceneProps) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
  const [open, setOpen] = useState(false)
  const [clueIndex, setClueIndex] = useState(-1) // newest clue revealed so far; -1: none yet
  const [viewIndex, setViewIndex] = useState(0) // the clue currently shown (can be an earlier one)
  const [flippedSinceClue, setFlippedSinceClue] = useState(false)
  const [arrested, setArrested] = useState(false)

  const toggle = (i: number) => {
    if (arrested && i === BURGLAR) return
    setFlipped((prev) => {
      const copy = new Set(prev)
      if (!copy.delete(i)) copy.add(i)
      return copy
    })
    setFlippedSinceClue(true)
  }

  /** Arrest the burglar: turn their card face-up (if it was flipped) and stamp it. */
  const arrest = () => {
    setFlipped((prev) => {
      const copy = new Set(prev)
      copy.delete(BURGLAR)
      return copy
    })
    setArrested(true)
  }

  const showClue = () => {
    let latest = clueIndex
    if (clueIndex === -1) latest = 0
    else if (flippedSinceClue && clueIndex < LINEUP_CLUES.length - 1) latest = clueIndex + 1
    setClueIndex(latest)
    setViewIndex(latest) // always open on the newest clue
    setFlippedSinceClue(false)
    setOpen(true)
  }

  // While the clue is open, → just closes it instead of leaving the scene
  useEffect(
    () =>
      registerAdvance(() => {
        if (!open) return false
        setOpen(false)
        return true
      }),
    [open, registerAdvance],
  )

  return (
    <div className="relative flex h-full min-h-[600px] flex-col overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1b4d] via-[#2b1055] to-[#1b1b3a]" />
      <Stars count={30} />

      {/* The picture, as large as fits; the invisible card buttons sit on top of it */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pt-4">
        <motion.div
          className="relative"
          style={{ aspectRatio: IMAGE_ASPECT, width: `min(100%, calc((100vh - 240px) * ${IMAGE_ASPECT}))` }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <img src={lineup} alt="Ten suspects in a line-up" className="h-full w-full rounded-2xl" />

          <div
            className="absolute grid"
            style={{
              left: `${GRID.left}%`,
              right: `${GRID.right}%`,
              top: `${GRID.top}%`,
              bottom: `${GRID.bottom}%`,
              gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              columnGap: `${GRID.columnGap}%`,
              rowGap: `${GRID.rowGap}%`,
            }}
          >
            {Array.from({ length: COLUMNS * ROWS }, (_, i) => {
              const isFlipped = flipped.has(i)
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Suspect ${i + 1}${isFlipped ? ' (eliminated)' : ''}`}
                  onClick={() => toggle(i)}
                  className="cursor-pointer [perspective:900px]"
                  // The stamp spills past its card, so lift this card above its neighbours
                  style={{ zIndex: arrested && i === BURGLAR ? 10 : undefined }}
                >
                  <motion.div
                    className="relative h-full w-full [transform-style:preserve-3d]"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    {/* Back of the card: covers the suspect once flipped */}
                    <div
                      className={`
                        absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border-4
                        border-slate-500 bg-slate-800 [backface-visibility:hidden] [transform:rotateY(180deg)]
                      `}
                    >
                      <span className="text-6xl text-red-500 lg:text-8xl">✖</span>
                      <span className="font-mono text-lg font-bold tracking-widest text-slate-300 lg:text-2xl">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </motion.div>

                  {/* Red tint and stamp on the burglar once arrested */}
                  {arrested && i === BURGLAR && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center rounded-xl bg-red-600/60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.span
                        className={`
                          rounded-xl border-4 border-white px-3 py-1 text-3xl font-black tracking-widest text-white
                          [text-shadow:0_2px_6px_rgba(0,0,0,0.6)] lg:text-5xl
                        `}
                        initial={{ scale: 3, rotate: -25, opacity: 0 }}
                        animate={{ scale: 1, rotate: -12, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.2 }}
                      >
                        ARRESTED
                      </motion.span>
                    </motion.div>
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom strip: Clue on the left, Arrest on the right */}
      <div className="relative flex h-44 items-start justify-between px-10 pt-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.8 }}
          className="mt-5"
        >
          <BigButton color="blue" onClick={showClue}>
            Clue
          </BigButton>
        </motion.div>

        {arrested ? (
          // Appears once the ARRESTED stamp has landed
          <ProceedButton key="proceed" onClick={next} delay={1.2} />
        ) : (
          <ProceedButton key="arrest" onClick={arrest} customLabel="Arrest" delay={0.8} />
        )}
      </div>

      <AnimatePresence>
        {open && (
          <CluePopup
            key="clue"
            clue={LINEUP_CLUES[viewIndex]}
            number={viewIndex + 1}
            total={LINEUP_CLUES.length}
            onPrev={viewIndex > 0 ? () => setViewIndex(viewIndex - 1) : undefined}
            onNext={viewIndex < clueIndex ? () => setViewIndex(viewIndex + 1) : undefined}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
