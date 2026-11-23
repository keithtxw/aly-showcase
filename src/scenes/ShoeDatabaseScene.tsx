import shoeFront from '../assets/shoe-front.png?webp'
import shoeSole from '../assets/shoe-sole.png?webp'
import { DatabasePanel } from '../components/DatabasePanel'
import { DatabaseScreen } from '../components/DatabaseScreen'
import { ProceedButton } from '../components/ProceedButton'
import type { SceneProps } from './index'

/** The sole is the focus, so it gets the most room the screen allows; the shoe is smaller. */
const SOLE_HEIGHT = 'clamp(220px, calc(100vh - 370px), 560px)'
const SHOE_HEIGHT = `calc(${SOLE_HEIGHT} * 0.6)`

/** HQ's shoe database: a picture of the burglar's shoe and its sole. */
export function ShoeDatabaseScene({ next }: SceneProps) {
  return (
    <DatabaseScreen
      title="JOYLAND POLICE HQ // SHOE DATABASE"
      search="BURGLAR'S SHOE"
      status="1 RECORD FOUND"
      footer={<ProceedButton onClick={next} delay={2} />}
    >
      <DatabasePanel
        label="SHOE"
        src={shoeFront}
        aspect={600 / 386}
        height={SHOE_HEIGHT}
        alt="The burglar's shoe"
        delay={0.8}
      />
      <DatabasePanel
        label="SOLE"
        src={shoeSole}
        aspect={300 / 662}
        height={SOLE_HEIGHT}
        alt="The sole of the burglar's shoe"
        delay={1.1}
      />
    </DatabaseScreen>
  )
}
