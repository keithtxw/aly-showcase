import { motion } from 'motion/react'
import { BigButton } from './BigButton'

interface ProceedButtonProps {
  onClick: () => void
  delay?: number
  customLabel?: string
}

/** Shared "Proceed" button for moving on to the next scene. Pops in when it first appears (after `delay` seconds). */
export function ProceedButton({ onClick, delay = 0.5, customLabel = 'Proceed' }: ProceedButtonProps) {
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay }} className="mt-5">
      <BigButton onClick={onClick}>{customLabel}</BigButton>
    </motion.div>
  )
}
