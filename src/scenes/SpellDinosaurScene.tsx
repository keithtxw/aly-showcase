import { SpellingGame } from '../components/SpellingGame'
import type { SceneProps } from './index'

export function SpellDinosaurScene({ next }: SceneProps) {
  return <SpellingGame word="dinosaur" onProceed={next} />
}
