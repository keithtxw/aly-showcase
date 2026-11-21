import { SpellingGame } from '../components/SpellingGame'
import type { SceneProps } from './index'

export function SpellCrayonsScene({ next }: SceneProps) {
  return <SpellingGame word="crayons" onProceed={next} />
}
