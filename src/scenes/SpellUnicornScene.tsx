import { SpellingGame } from '../components/SpellingGame'
import type { SceneProps } from './index'

export function SpellUnicornScene({ next }: SceneProps) {
  return <SpellingGame word="unicorn" onProceed={next} />
}
