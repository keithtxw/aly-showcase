import footage from '../assets/toyshop-cctv.png?webp'
import { CctvView } from '../components/CctvView'
import type { SceneProps } from './index'

/** Clue #1 */
export function CctvScene({ next }: SceneProps) {
  return <CctvView title="Clue #1: The CCTV footage 🔎" src={footage} onProceed={next} />
}
