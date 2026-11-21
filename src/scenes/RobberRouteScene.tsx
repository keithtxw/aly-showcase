import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import dairy from '../assets/dairy-section.png'
import fruit from '../assets/fruit-section.png'
import seafood from '../assets/seafood-section.png'
import vegetable from '../assets/vegetable-section.png'
import { ExclamationBurst } from '../components/ExclamationBurst'
import { Stars } from '../components/Stars'
import type { SceneProps } from './index'

/** The robber's route, in the order the panels appear. */
const PANELS = [
  { src: fruit, alt: 'The fruits section', tilt: -1.5 },
  { src: seafood, alt: 'The seafood section', tilt: 1.5 },
  { src: vegetable, alt: 'The vegetables section', tilt: 1.2 },
  { src: dairy, alt: 'The dairy section', tilt: -1.2 },
]

const PANEL_ASPECT = 831 / 466

/**
 * Recap of the robber's route as a comic page. Each → press adds the next panel;
 * after the last panel one more press bangs in "Slam!" in the middle; then → moves on.
 */
export function RobberRouteScene({ registerAdvance }: SceneProps) {
  const [shown, setShown] = useState(0)
  const [slam, setSlam] = useState(false)

  useEffect(
    () =>
      registerAdvance(() => {
        if (shown < PANELS.length) setShown(shown + 1)
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
        Let&apos;s go through the sections to find the robber
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
            <div key={i} style={{ aspectRatio: PANEL_ASPECT }}>
              <AnimatePresence>
                {i < shown && (
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
    </div>
  )
}
