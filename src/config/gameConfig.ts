/**
 * Game settings: the questions, words, answers and timings for each activity, all in one place.
 * Edit the values here to change the game; the scenes read from this file.
 * (Story text, pictures and layout live in the scene files under src/scenes.)
 */
import hair from '../assets/evidence-hair.png'
import supermarketCctv from '../assets/supermarket-cctv.png'
import toyshopCctv from '../assets/toyshop-cctv.png'
import type { Clue } from '../components/CluePopup'

// ---------------------------------------------------------------------------------------------------------------------
// Inventory maths (scene: InventoryScene)
// ---------------------------------------------------------------------------------------------------------------------

export interface InventoryQuestion {
  /** Emoji shown for each counted item */
  emoji: string
  a: number
  op: '+' | '-'
  b: number
}

/** Shown one at a time, in order; the host taps "?" to reveal each answer. Any number of questions works. */
export const INVENTORY_QUESTIONS: InventoryQuestion[] = [
  { emoji: '🧸', a: 5, op: '+', b: 4 },
  { emoji: '✈️', a: 20, op: '-', b: 6 },
  { emoji: '🚗', a: 10, op: '+', b: 12 },
  { emoji: '🪆', a: 6, op: '-', b: 4 },
  { emoji: '🍭', a: 15, op: '+', b: 10 },
]

// ---------------------------------------------------------------------------------------------------------------------
// Spelling signs (one scene per word)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * One scene is created for each word, in this order. Letters and spaces only. Use at most two words per entry
 * (e.g. "Cartoon Books"), as each word gets its own line on the sign.
 */
export const SPELLING_WORDS: string[] = ['lollipop', 'Cartoon Books', 'dinosaur', 'unicorn', 'crayons']

// ---------------------------------------------------------------------------------------------------------------------
// Supermarket sorting quiz (scene: SupermarketScene)
// ---------------------------------------------------------------------------------------------------------------------

export interface SectionQuestion {
  items: { emoji: string; label: string }[]
  options: string[]
  /** Must match one of `options` */
  answer: string
}

/** Asked in order. Use 3-4 items and 3 options each. */
export const SECTION_QUESTIONS: SectionQuestion[] = [
  {
    items: [
      { emoji: '🍎', label: 'Apple' },
      { emoji: '🍊', label: 'Orange' },
      { emoji: '🍍', label: 'Pineapple' },
    ],
    options: ['Vegetables', 'Meat', 'Fruits'],
    answer: 'Fruits',
  },
  {
    items: [
      { emoji: '🐟', label: 'Fish' },
      { emoji: '🦐', label: 'Prawns' },
      { emoji: '🦪', label: 'Clams' },
    ],
    options: ['Meat', 'Seafood', 'Vegetables'],
    answer: 'Seafood',
  },
  {
    items: [
      { emoji: '🥕', label: 'Carrot' },
      { emoji: '🥦', label: 'Broccoli' },
      { emoji: '🌽', label: 'Corn' },
    ],
    options: ['Vegetables', 'Dairy', 'Bakery'],
    answer: 'Vegetables',
  },
  {
    items: [
      { emoji: '🥛', label: 'Milk' },
      { emoji: '🧀', label: 'Cheese' },
      { emoji: '🧈', label: 'Butter' },
    ],
    options: ['Bakery', 'Vegetables', 'Dairy'],
    answer: 'Dairy',
  },
]

/** How long the green "correct" button shows before the next sorting question appears. */
export const NEXT_QUESTION_DELAY_MS = 500

// ---------------------------------------------------------------------------------------------------------------------
// Memory game (scene: MemoryScene)
// ---------------------------------------------------------------------------------------------------------------------

/** The cards: each object appears twice in the 4x4 grid, so there must be exactly 8 of them. */
export const MEMORY_OBJECTS: string[] = ['🛒', '🍎', '🥛', '🍞', '🧀', '🥕', '🍌', '🧃']

/** How long a wrong pair stays face-up before flipping back. */
export const MEMORY_MISMATCH_DELAY_MS = 1000

// ---------------------------------------------------------------------------------------------------------------------
// Footprint closeup (scene: ShoeCloseupScene)
// ---------------------------------------------------------------------------------------------------------------------

/** The door (1-5) whose footprints match the burglar's sole. */
export const FOOTPRINT_ANSWER = 3

// ---------------------------------------------------------------------------------------------------------------------
// Suspect line-up (scene: LineupScene)
// ---------------------------------------------------------------------------------------------------------------------

/** The suspect (1-10, as numbered in the picture) who is the burglar. */
export const BURGLAR_SUSPECT = 1

/**
 * The clues, in the order they are revealed by the Clue button. `zoom` is optional: `scale` is how close, `origin`
 * is the point of the picture (left and top, in %) that stays in place when zooming.
 */
export const LINEUP_CLUES: Clue[] = [
  { label: 'CCTV // JOYLAND TOY SHOP', src: toyshopCctv, alt: 'CCTV footage from the toy shop', aspect: 1672 / 941 },
  {
    label: 'CCTV // SUPERMARKET',
    src: supermarketCctv,
    alt: 'CCTV footage from the supermarket',
    aspect: 1670 / 941,
    zoom: { scale: 1.3, origin: '85% 52%' }, // closer on the burglar
  },
  { label: 'EVIDENCE // HAIR', src: hair, alt: 'Strands of hair found on the beanie', aspect: 500 / 495 },
]
