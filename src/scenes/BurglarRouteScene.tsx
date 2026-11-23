import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import dairy from '../assets/dairy-section.png?webp'
import fruit from '../assets/fruit-section.png?webp'
import seafood from '../assets/seafood-section.png?webp'
import vegetable from '../assets/vegetable-section.png?webp'
import { BigButton } from '../components/BigButton'
import { ExclamationBurst } from '../components/ExclamationBurst'
import { Stars } from '../components/Stars'
import type { SceneProps } from './index'

/** The burglar's route, in the order the panels appear. */
const PANELS = [
  { src: fruit, alt: 'The fruits section', tilt: -1.5 },
  { src: seafood, alt: 'The seafood section', tilt: 1.5 },
  { src: vegetable, alt: 'The vegetables section', tilt: 1.2 },
  { src: dairy, alt: 'The dairy section', tilt: -1.2 },
]

/** How long after the last panel appears before "Slam!" bangs in. */
const SLAM_DELAY_MS = 1000

const PANEL_ASPECT = 831 / 466

/**
 * Recap of the burglar's route as a comic page. Each → press adds the next panel;
 * 1 second after the last panel "Slam!" bangs in in the middle (or the next → press brings it in early).
 */
export function BurglarRouteScene({ next, registerAdvance }: SceneProps) {
  const [shown, setShown] = useState<Set<number>>(new Set()) // panels revealed so far (any order)
  const [slam, setSlam] = useState(false)

  const reveal = (i: number) => setShown((prev) => new Set(prev).add(i))

  // "Slam!" bangs in by itself 1 second after the last panel has appeared
  const allShown = shown.size === PANELS.length
  useEffect(() => {
    if (!allShown || slam) return
    const timer = setTimeout(() => setSlam(true), SLAM_DELAY_MS)
    return () => clearTimeout(timer)
  }, [allShown, slam])

  useEffect(
    () =>
      registerAdvance(() => {
        const nextPanel = PANELS.findIndex((_, i) => !shown.has(i))
        if (nextPanel !== -1) reveal(nextPanel)
        else if (!slam) setSlam(true)
        else return false
        return true
      }),
    [shown, slam, registerAdvance],
  )

  return (
    <div className="relative flex h-full flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1b4d] via-[#2b1055] to-[#1b1b3a]" />
      <Stars count={30} />

      <motion.h2
        className="relative px-6 pb-3 pt-5 text-center text-3xl font-bold text-sunny drop-shadow-lg lg:text-5xl"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring' }}
      >
        Let&apos;s go through the sections to find the burglar
      </motion.h2>

      {/* Comic page: the four panels centred under the header */}
      <div className="relative flex w-full flex-1 items-center justify-center px-6 pb-5">
        {/* Sized so both rows of panels always fit on screen */}
        <div
          className="relative grid grid-cols-2 gap-4"
          style={{ width: `min(100%, calc((100vh - 170px) * ${PANEL_ASPECT}))` }}
        >
          {PANELS.map((panel, i) => (
            // Every slot is always there so the page doesn't shift; panels pop into them
            <div key={i} className="relative" style={{ aspectRatio: PANEL_ASPECT }}>
              {/* Empty slot shown until its panel arrives: tap it to bring in the panel */}
              {!shown.has(i) && (
                <motion.button
                  type="button"
                  aria-label={`Show panel ${i + 1}`}
                  onClick={() => reveal(i)}
                  whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
                  whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
                  className={`
                    cursor-pointer
                    absolute inset-0 flex items-center justify-center rounded-xl border-4 border-dashed
                    border-white/30 bg-white/5 text-7xl font-bold text-white/30 lg:text-8xl
                  `}
                >
                  {i + 1}
                </motion.button>
              )}
              <AnimatePresence>
                {shown.has(i) && (
                  <motion.img
                    src={panel.src}
                    alt={panel.alt}
                    className={`
                      h-full w-full rounded-xl border-4 border-white object-cover shadow-[6px_6px_0_rgba(0,0,0,0.45)]
                    `}
                    initial={{ scale: 0.5, opacity: 0, rotate: panel.tilt * 6 }}
                    animate={{ scale: 1, opacity: 1, rotate: panel.tilt }}
                    transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Slam! bangs in right in the middle of the page */}
          {slam && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <ExclamationBurst className="h-56 w-80 text-7xl lg:h-72 lg:w-96 lg:text-8xl">Slam!</ExclamationBurst>
            </div>
          )}
        </div>
      </div>

      {/* Once "Slam!" has landed, an arrow in the bottom-right corner moves on (same as pressing →) */}
      {slam && (
        <motion.div
          className="absolute bottom-6 right-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.8 }}
        >
          <BigButton size="md" pulse={false} className="px-5! text-3xl!" onClick={next}>
            ➡️
          </BigButton>
        </motion.div>
      )}
    </div>
  )
}
