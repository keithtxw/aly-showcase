import { motion } from 'motion/react'
import { BigButton } from './BigButton'

/**
 * A compact arrow-only (➡️) Proceed button that sits just outside the bottom-right corner of the picture it's
 * placed in, so it's right next to the clue instead of down in the screen corner. It floats (no room taken, so
 * pictures keep their full size). Place it inside a `relative` box that is centred on the screen and exactly as
 * wide as the picture. If there isn't enough room beside the picture it slides in until it fits on screen
 * (overlapping the corner).
 */
export function BesideProceedButton({ onClick, delay = 1.5 }: { onClick: () => void; delay?: number }) {
  return (
    <div className="absolute bottom-0 z-10" style={{ left: 'min(calc(100% + 1rem), calc(50vw + 50% - 6rem))' }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay }}>
        <BigButton size="md" pulse={false} className="px-5! text-3xl!" onClick={onClick}>
          ➡️
        </BigButton>
      </motion.div>
    </div>
  )
}
