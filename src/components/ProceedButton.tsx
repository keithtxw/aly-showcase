import { motion } from 'motion/react'
import { BigButton } from './BigButton'

/** Shared "Proceed" button for moving on to the next scene. Pops in when it first appears. */
export function ProceedButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 0.5 }}
      className="mt-5"
    >
      <BigButton onClick={onClick}>Proceed</BigButton>
    </motion.div>
  )
}
