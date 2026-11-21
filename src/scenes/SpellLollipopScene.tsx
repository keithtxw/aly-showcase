import { SpellingGame } from '../components/SpellingGame'
import type { SceneProps } from './index'

export function SpellLollipopScene({ next }: SceneProps) {
  return <SpellingGame word="lollipop" onProceed={next} />
}
