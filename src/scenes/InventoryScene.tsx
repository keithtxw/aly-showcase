import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import toyPile from '../assets/toy-pile.png'
import { BigButton } from '../components/BigButton'
import { ProceedButton } from '../components/ProceedButton'
import { Stars } from '../components/Stars'
import type { SceneProps } from './index'

interface Question {
  /** Emoji shown for each counted item */
  emoji: string
  a: number
  op: '+' | '-'
  b: number
}

/** Add the remaining questions here, in order. */
const QUESTIONS: Question[] = [
  { emoji: '🧸', a: 5, op: '+', b: 4 },
  { emoji: '✈️', a: 20, op: '-', b: 6 },
  { emoji: '🚗', a: 10, op: '+', b: 12 },
  { emoji: '🪆', a: 6, op: '-', b: 4 },
  { emoji: '🍭', a: 15, op: '+', b: 10 },
]

const answerOf = ({ a, op, b }: Question) => (op === '+' ? a + b : a - b)

/** A big number with a single item icon beside it, e.g. "5 🧸". */
function Group({ count, emoji }: { count: number; emoji: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-5xl font-bold text-sunny lg:text-6xl">{count}</span>
      <span className="text-5xl lg:text-6xl" aria-hidden>
        {emoji}
      </span>
    </div>
  )
}

function Answer({ q, revealed, onReveal }: { q: Question; revealed: boolean; onReveal: () => void }) {
  return (
    <div className="flex w-28 items-center justify-center">
      {revealed ? (
        <motion.span
          className="text-6xl font-bold text-candy drop-shadow-lg lg:text-7xl"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 11 }}
        >
          {answerOf(q)}
        </motion.span>
      ) : (
        <motion.button
          onClick={onReveal}
          aria-label="Reveal the answer"
          className={`
            flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl border-b-6 border-orange-500 bg-sunny
            text-5xl font-bold text-night shadow-xl
          `}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          whileHover={{ scale: 1.15, rotate: -4, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
          whileTap={{ scale: 0.9, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
        >
          ?
        </motion.button>
      )}
    </div>
  )
}

export function InventoryScene({ next }: SceneProps) {
  const [started, setStarted] = useState(false)
  // Which questions the host has revealed so far (by index)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const reveal = (i: number) => setRevealed((prev) => new Set(prev).add(i))

  return (
    <div className="relative flex min-h-full flex-col items-center gap-4 px-6 py-5">
      {/* Backgrounds: gradient underneath, toy-pile picture on top until the host presses Help */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b1055] via-[#4a2a8a] to-[#1b1b3a]" />
      {started && <Stars count={30} />}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="toy-pile-bg"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${toyPile})` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <motion.h2
        className={`relative text-center text-3xl font-bold text-sunny drop-shadow-lg lg:text-5xl mt-5 ${
          started ? '' : 'rounded-3xl bg-night/70 px-8 py-3 backdrop-blur-sm'
        }`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring' }}
      >
        Oh no! The robber messed up the toys! 🧸
      </motion.h2>
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="intro"
            className="relative flex w-full flex-1 flex-col items-center justify-end pb-4"
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <BigButton onClick={() => setStarted(true)}>Help! 🦸</BigButton>
          </motion.div>
        ) : (
          <motion.div
            key="questions"
            className="relative flex w-full flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="relative text-center text-2xl text-sky lg:text-3xl">
              Help count what&apos;s left in the shop!
            </p>

            <div className="relative flex w-full max-w-6xl flex-col gap-9 mt-10">
              {/* Each question appears once the previous one has been revealed */}
              {QUESTIONS.slice(0, revealed.size + 1).map((q, i) => (
                <motion.div
                  key={i}
                  className={`
                    flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-3xl bg-white/10 px-6 py-3
                    text-4xl font-bold shadow-xl backdrop-blur-sm
                  `}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.15 }}
                >
                  <Group count={q.a} emoji={q.emoji} />
                  <span className="text-6xl font-bold leading-none text-candy lg:text-7xl">
                    {q.op === '+' ? '+' : '−'}
                  </span>
                  <Group count={q.b} emoji={q.emoji} />
                  <span className="text-5xl leading-none lg:text-6xl">=</span>
                  <Answer q={q} revealed={revealed.has(i)} onReveal={() => reveal(i)} />
                </motion.div>
              ))}
            </div>

            {/* Once every answer is revealed, the host can move on */}
            {revealed.size === QUESTIONS.length && <ProceedButton onClick={next} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
