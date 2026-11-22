import { motion } from 'motion/react'
import { useEffect } from 'react'
import { BigButton } from './BigButton'
import { DatabasePanel } from './DatabasePanel'
import { DatabaseWindow } from './DatabaseWindow'

export interface Clue {
  label: string
  src: string
  alt: string
  /** Width / height of the picture */
  aspect: number
  /** Optionally zoom in on part of the picture */
  zoom?: { scale: number; origin: string }
}

/**
 * Modal showing one clue in the police database window, over a dimmed scene.
 * Closes on the Close button, a click outside the window, or Escape.
 * Place it inside a `relative` full-screen scene.
 */
export function CluePopup({
  clue,
  number,
  total,
  onPrev,
  onNext,
  onClose,
}: {
  clue: Clue
  /** 1-based position of this clue, for "CLUE 2 OF 3" */
  number: number
  total: number
  /** Go back / forward through clues already revealed. Leave out when there is nowhere to go. */
  onPrev?: () => void
  onNext?: () => void
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Biggest picture that fits: limited by screen height, and by the window's inner width (at most 64rem)
  const height = `min(calc(100vh - 340px), calc((min(100vw - 48px, 64rem) - 40px) / ${clue.aspect}))`

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-black/80 px-6 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      {/* Clicks inside the window shouldn't close it */}
      <div className="flex w-full max-w-5xl flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
        <DatabaseWindow
          title="JOYLAND POLICE HQ // CLUE FILE"
          search="BURGLAR"
          status={`CLUE ${number} OF ${total}`}
          className="max-w-5xl"
        >
          <DatabasePanel
            label={clue.label}
            tag="● CLUE"
            src={clue.src}
            alt={clue.alt}
            aspect={clue.aspect}
            height={height}
            zoom={clue.zoom}
          />
        </DatabaseWindow>

        <div className="flex items-center gap-6">
          {onPrev && (
            <BigButton size="md" pulse={false} onClick={onPrev}>
              Previous
            </BigButton>
          )}
          <BigButton size="md" pulse={false} onClick={onClose}>
            Close
          </BigButton>
          {onNext && (
            <BigButton size="md" pulse={false} onClick={onNext}>
              Next
            </BigButton>
          )}
        </div>
      </div>
    </motion.div>
  )
}
