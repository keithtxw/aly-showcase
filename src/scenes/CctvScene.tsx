import footage from '../assets/toyshop-cctv.png?webp'
import { CctvView } from '../components/CctvView'

/** Clue #1 */
export function CctvScene() {
  return <CctvView title="Clue #1: The CCTV footage 🔎" src={footage} />
}
