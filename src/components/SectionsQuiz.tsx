import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { QUESTIONS } from '../data/sectionQuestions'
import { BigButton } from './BigButton'
import { SpeechBubble } from './SpeechBubble'

/** How long the green "correct" button shows before moving to the next question. */
const NEXT_QUESTION_DELAY_MS = 500

/**
 * Categorisation round: items to sort, then category buttons to pick from.
 * Rendered on top of the (faded) supermarket picture by SupermarketScene.
 */
export function SectionsQuiz({ next }: { next: () => void }) {
  const [index, setIndex] = useState(0)
  const [wrong, setWrong] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState(false)

  const question = QUESTIONS[index]

  // Timing: items pop in one by one, then the category buttons. The first question waits
  // for the speech bubble to finish popping in.
  const itemsStart = index === 0 ? 0.9 : 0.3
  const buttonsStart = itemsStart + question.items.length * 0.2 + 0.2

  // After a correct answer, pause briefly on the green button, then move on.
  useEffect(() => {
    if (!solved) return
    const timer = setTimeout(() => {
      if (index + 1 < QUESTIONS.length) {
        setIndex(index + 1)
        setWrong(new Set())
        setSolved(false)
      } else {
        next() // all questions done: straight on to the next scene
      }
    }, NEXT_QUESTION_DELAY_MS)
    return () => clearTimeout(timer)
  }, [solved, index, next])

  const choose = (option: string) => {
    if (option === question.answer) setSolved(true)
    else setWrong((prev) => new Set(prev).add(option))
  }

  return (
    <div className="relative flex min-h-full flex-col items-center gap-6 px-8 pb-6 pt-[3%]">
      <SpeechBubble className="relative max-w-4xl" tail="left-24" origin="left bottom" delay={0.6}>
        I saw the person running through a section with...
      </SpeechBubble>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        >
          {/* Items to sort */}
          <div className="flex flex-wrap justify-center gap-6">
            {question.items.map((item, i) => (
              <motion.div
                key={item.label}
                className={`
                  flex w-60 flex-col items-center gap-1 rounded-3xl border-4 border-night/10 bg-white px-6 py-4
                  shadow-xl
                `}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: itemsStart + i * 0.2 }}
              >
                <span className="text-8xl">{item.emoji}</span>
                <span className="text-4xl font-bold text-night">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Category choices, stacked */}
          <div className="flex flex-col items-center gap-5 mt-16">
            {question.options.map((option, i) => {
              const isWrong = wrong.has(option)
              const isRight = solved && option === question.answer
              return (
                <motion.div
                  key={option}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: buttonsStart + i * 0.15 }}
                >
                  <BigButton
                    size="xl"
                    pulse={false}
                    className="w-[28rem]"
                    state={isRight ? 'right' : isWrong ? 'wrong' : 'idle'}
                    disabled={isWrong || solved}
                    onClick={() => choose(option)}
                  >
                    {option}
                  </BigButton>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
