import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SceneTransition } from './components/SceneTransition'
import { scenes } from './scenes'

export default function App() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const go = (to: number) => {
    if (to < 0 || to >= scenes.length) return
    setDirection(to > index ? 1 : -1)
    setIndex(to)
  }

  const advanceHandler = useRef<(() => boolean) | null>(null)
  const registerAdvance = useCallback((handler: () => boolean) => {
    advanceHandler.current = handler
    // Only clear if still ours (an exiting scene must not clobber the new scene's handler)
    return () => {
      if (advanceHandler.current === handler) advanceHandler.current = null
    }
  }, [])

  const advance = () => {
    if (advanceHandler.current?.()) return
    go(index + 1)
  }

  // Host controls: → / PageDown advance, ← / PageUp go back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') advance()
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const { id, Component } = scenes[index]

  return (
    <main className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="popLayout" custom={direction}>
        <SceneTransition key={id} direction={direction}>
          <Component next={advance} back={() => go(index - 1)} registerAdvance={registerAdvance} />
        </SceneTransition>
      </AnimatePresence>
      {/* Faint host control for mouse users */}
      <button
        onClick={advance}
        aria-label="Next"
        className={`
          fixed bottom-4 right-4 z-50 cursor-pointer rounded-full bg-white/20 px-4 py-2 text-2xl opacity-30
          transition-opacity hover:opacity-100
        `}
      >
        ➡️
      </button>
    </main>
  )
}
