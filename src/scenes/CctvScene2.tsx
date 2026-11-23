import footage from '../assets/supermarket-cctv.png?webp'
import { CctvView } from '../components/CctvView'
import type { SceneProps } from './index'

/** Second CCTV clue: the burglar in the supermarket storage room. */
export function CctvScene2({ next }: SceneProps) {
  return (
    <CctvView
      title="Clue #2: The CCTV footage 🔎"
      camera="CAM 02"
      location="Joyland Supermarket"
      time="10:20:32PM"
      src={footage}
      onProceed={next}
    />
  )
}
