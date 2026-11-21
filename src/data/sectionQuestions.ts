/** The supermarket sorting questions. Also used to recap the robber's route in the next scene. */
export interface Question {
  items: { emoji: string; label: string }[]
  options: string[]
  /** Must match one of `options` */
  answer: string
}

/** Add the remaining questions here, in order. */
export const QUESTIONS: Question[] = [
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
