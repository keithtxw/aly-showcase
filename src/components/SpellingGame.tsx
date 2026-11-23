import { motion } from 'motion/react'
import { useState } from 'react'
import { BigButton } from './BigButton'
import { Stars } from './Stars'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

interface SpellingGameProps {
  /** The word(s) to spell — letters and spaces; each space-separated word gets its own line */
  word: string
  /** Go to the next scene */
  onProceed: () => void
}

/**
 * Hangman-style sign: the word is shown as blank tiles and the host taps letters
 * (as the kids call them out). Right letters fill in every matching tile; wrong
 * letters are greyed out. When the word is complete, a Proceed button appears.
 */
export function SpellingGame({ word, onProceed }: SpellingGameProps) {
  // Each space-separated word gets its own line of tiles
  const words = word.toUpperCase().split(' ')
  const letters = words.join('').split('')
  const compact = words.length > 1
  const [guessed, setGuessed] = useState<Set<string>>(new Set())
  const complete = letters.every((l) => guessed.has(l))

  const guess = (letter: string) => setGuessed((prev) => new Set(prev).add(letter))

  /** Host shortcut for when the kids already know the word: fill in every letter at once. */
  const reveal = () => setGuessed((prev) => new Set([...prev, ...letters]))

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-6 px-6 py-5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1b4d] via-[#2b1055] to-[#1b1b3a]" />
      <Stars count={30} />

      <motion.h2
        className="relative text-center text-3xl font-bold text-sunny drop-shadow-lg lg:text-5xl"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring' }}
      >
        The burglar broke my signs! Can you fix them?
      </motion.h2>

      {/* The shop sign */}
      <motion.div
        className="relative mt-12"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
      >
        {/* Chains */}
        <div className="absolute -top-12 left-12 h-12 w-2 rounded bg-slate-400" />
        <div className="absolute -top-12 right-12 h-12 w-2 rounded bg-slate-400" />

        <div
          className={`
            flex flex-col items-center gap-4 rounded-3xl border-8 border-[#b9ad94] bg-[#f6f0e1] px-10 py-8 shadow-2xl
          `}
        >
          {words.map((w, wi) => (
            <div key={wi} className="flex gap-2 lg:gap-4" role="img" aria-label={`A word with ${w.length} letters`}>
              {w.split('').map((letter, i) => {
                const shown = guessed.has(letter)
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-center rounded-xl border-b-8 font-bold ${
                      compact
                        ? 'h-20 w-16 text-6xl lg:h-28 lg:w-22 lg:text-7xl'
                        : 'h-24 w-16 text-7xl lg:h-32 lg:w-24 lg:text-8xl'
                    } ${shown ? 'border-orange-500 bg-white text-night shadow-md' : 'border-[#b9ad94] bg-[#e6dec9]'}`}
                  >
                    {shown && (
                      <motion.span
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                      >
                        {letter}
                      </motion.span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Alphabet */}
      <div className="relative flex max-w-[1200px] flex-wrap justify-center gap-2 lg:gap-3 mt-10">
        {ALPHABET.map((letter) => {
          const used = guessed.has(letter)
          const right = used && letters.includes(letter)
          return (
            <motion.button
              key={letter}
              disabled={used}
              onClick={() => guess(letter)}
              className={`h-14 w-14 rounded-xl border-b-4 text-3xl font-bold shadow-lg lg:h-20 lg:w-20 lg:text-5xl ${
                !used
                  ? 'cursor-pointer border-orange-500 bg-sunny text-night'
                  : right
                    ? 'border-green-700 bg-green-400 text-night'
                    : 'border-red-800 bg-red-500 text-white'
              }`}
              whileHover={
                used
                  ? undefined
                  : { scale: 1.15, rotate: -3, transition: { type: 'spring', stiffness: 500, damping: 25 } }
              }
              whileTap={used ? undefined : { scale: 0.9, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
              animate={used && !right ? { x: [0, -6, 6, -6, 0] } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {letter}
            </motion.button>
          )
        })}
      </div>

      {/* Space is always reserved so the layout doesn't jump. Reveal until the word is complete, then Next. */}
      <div className="relative flex min-h-32 items-center">
        <motion.div
          key={complete ? 'next' : 'reveal'}
          className="mt-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: complete ? 0.5 : 0.8 }}
        >
          {complete ? (
            <BigButton onClick={onProceed}>Next ➡️</BigButton>
          ) : (
            <BigButton size="md" color="blue" pulse={false} onClick={reveal}>
              Reveal
            </BigButton>
          )}
        </motion.div>
      </div>
    </div>
  )
}
