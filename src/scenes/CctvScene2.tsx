import footage from '../assets/supermarket-cctv.png?webp'
import { CctvView } from '../components/CctvView'

/** Second CCTV clue: the burglar in the supermarket storage room. */
export function CctvScene2() {
  return (
    <CctvView
      title="Clue #2: The CCTV footage 🔎"
      camera="CAM 02"
      location="Joyland Supermarket"
      time="10:20:32PM"
      src={footage}
    />
  )
}
