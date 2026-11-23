import beanie from '../assets/evidence-beanie.png?webp'
import hair from '../assets/evidence-hair.png?webp'
import { DatabasePanel } from '../components/DatabasePanel'
import { DatabaseScreen } from '../components/DatabaseScreen'

/**
 * Both pictures share one frame size (both photos are almost exactly square). The size is the
 * smallest of: what the screen height allows, what half the window width allows (window is at most 72rem wide,
 * minus screen padding, window padding and the gap between the two), and a maximum.
 */
const PHOTO_ASPECT = 1
const PHOTO_HEIGHT = `min(calc(100vh - 300px), calc((min(100vw - 48px, 72rem) - 104px) / 2 / ${PHOTO_ASPECT}), 560px)`

/** Clue #3: the dropped beanie, and the strands of hair found on it. */
export function Clue3Scene() {
  return (
    <DatabaseScreen title="JOYLAND POLICE HQ // CLUE #3 EVIDENCE" search="DROPPED BEANIE" status="2 ITEMS FOUND">
      <DatabasePanel
        label="BEANIE"
        tag="● EVIDENCE"
        src={beanie}
        aspect={PHOTO_ASPECT}
        height={PHOTO_HEIGHT}
        alt="The beanie the burglar dropped"
        delay={0.8}
      />
      <DatabasePanel
        label="HAIR"
        tag="● EVIDENCE"
        src={hair}
        aspect={PHOTO_ASPECT}
        height={PHOTO_HEIGHT}
        alt="Strands of hair found on the beanie"
        delay={1.1}
      />
    </DatabaseScreen>
  )
}
