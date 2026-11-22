import type { ComponentType } from 'react'
import { SpellingGame } from '../components/SpellingGame'
import type { SceneProps } from './index'

/** Makes a spelling-sign scene for one word (see SPELLING_WORDS in config/gameConfig.ts). */
export function makeSpellingScene(word: string): ComponentType<SceneProps> {
  return function SpellingScene({ next }: SceneProps) {
    return <SpellingGame word={word} onProceed={next} />
  }
}
