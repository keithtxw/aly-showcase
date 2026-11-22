import type { ComponentType } from 'react'
import { CctvScene } from './CctvScene'
import { CctvScene2 } from './CctvScene2'
import { DoorLockScene } from './DoorLockScene'
import { HomeScene } from './HomeScene'
import { InventoryScene } from './InventoryScene'
import { MemoryScene } from './MemoryScene'
import { NightStreetScene } from './NightStreetScene'
import { StartScene } from './StartScene'
import { WarehouseInsideScene } from './WarehouseInsideScene'
import { FindExitScene } from './FindExitScene'
import { BeanieDropScene } from './BeanieDropScene'
import { Clue3Scene } from './Clue3Scene'
import { LineupScene } from './LineupScene'
import { PoliceStationScene } from './PoliceStationScene'
import { RoundUpScene } from './RoundUpScene'
import { ShoeCloseupScene } from './ShoeCloseupScene'
import { ShoeDatabaseScene } from './ShoeDatabaseScene'
import { WarehouseTrailScene } from './WarehouseTrailScene'
import { RadioScene } from './RadioScene'
import { SupermarketScene } from './SupermarketScene'
import { BurglarRouteScene } from './BurglarRouteScene'
import { SpellCartoonBooksScene } from './SpellCartoonBooksScene'
import { SpellCrayonsScene } from './SpellCrayonsScene'
import { SpellDinosaurScene } from './SpellDinosaurScene'
import { SpellLollipopScene } from './SpellLollipopScene'
import { SpellUnicornScene } from './SpellUnicornScene'

export interface SceneProps {
  /** Go to the next scene */
  next: () => void
  /** Go to the previous scene */
  back: () => void
  /**
   * Let a scene use the host's "advance" (→ key / ➡️ button) for its own step, e.g. to reveal
   * something. The handler returns true if it used the input, or false to move on to the next
   * scene. Returns an unregister function (use it as an effect cleanup).
   */
  registerAdvance: (handler: () => boolean) => () => void
}

export interface Scene {
  id: string
  Component: ComponentType<SceneProps>
}

/** Add new scenes here, in play order. */
export const scenes: Scene[] = [
  { id: 'start', Component: StartScene },
  { id: 'night-street', Component: NightStreetScene },
  { id: 'home', Component: HomeScene },
  { id: 'inventory', Component: InventoryScene },
  { id: 'spell-lollipop', Component: SpellLollipopScene },
  { id: 'spell-cartoon-books', Component: SpellCartoonBooksScene },
  { id: 'spell-dinosaur', Component: SpellDinosaurScene },
  { id: 'spell-unicorn', Component: SpellUnicornScene },
  { id: 'spell-crayons', Component: SpellCrayonsScene },
  { id: 'cctv', Component: CctvScene },
  { id: 'radio', Component: RadioScene },
  { id: 'supermarket', Component: SupermarketScene },
  { id: 'burglar-route', Component: BurglarRouteScene },
  { id: 'door-lock', Component: DoorLockScene },
  { id: 'memory', Component: MemoryScene },
  { id: 'cctv-2', Component: CctvScene2 },
  { id: 'warehouse-trail', Component: WarehouseTrailScene },
  { id: 'shoe-database', Component: ShoeDatabaseScene },
  { id: 'shoe-closeup', Component: ShoeCloseupScene },
  { id: 'warehouse-inside', Component: WarehouseInsideScene },
  { id: 'find-exit', Component: FindExitScene },
  { id: 'beanie-drop', Component: BeanieDropScene },
  { id: 'clue-3', Component: Clue3Scene },
  { id: 'round-up', Component: RoundUpScene },
  { id: 'police-station', Component: PoliceStationScene },
  { id: 'lineup', Component: LineupScene },
]
