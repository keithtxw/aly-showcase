import { SpellingGame } from '../components/SpellingGame'
import type { SceneProps } from './index'

export function SpellCartoonBooksScene({ next }: SceneProps) {
  return <SpellingGame word="Cartoon Books" onProceed={next} />
}
