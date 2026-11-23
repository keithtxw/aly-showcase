import type { ReactNode } from 'react'
import { BesideProceedButton } from './BesideProceedButton'
import { DatabaseWindow } from './DatabaseWindow'

const GRID_LINE = 'rgba(59,193,255,0.06)'
const GRID_IMAGE = [
  `linear-gradient(${GRID_LINE} 1px, transparent 1px)`,
  `linear-gradient(90deg, ${GRID_LINE} 1px, transparent 1px)`,
].join(', ')

/**
 * A full "HQ computer" page: dark grid background and a database window with a title bar and search status.
 * Put `DatabasePanel`s in `children`; anything in `footer` (e.g. a Proceed button) sits below the window.
 */
export function DatabaseScreen({
  title,
  search,
  status,
  children,
  footer,
  onProceed,
}: {
  title: string
  search: string
  status: string
  children: ReactNode
  footer?: ReactNode
  /** Adds a compact Proceed button beside the window's bottom-right corner (floats, so no room is taken) */
  onProceed?: () => void
}) {
  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-5 px-6 py-8">
      {/* Dark "computer screen" background with a faint grid */}
      <div
        className="absolute inset-0 bg-[#050a14] [background-size:40px_40px]"
        style={{ backgroundImage: GRID_IMAGE }}
      />

      {/* Same size as the window, so the Proceed button can sit right beside its bottom-right corner */}
      <div className="relative w-full max-w-6xl">
        <DatabaseWindow title={title} search={search} status={status}>
          {children}
        </DatabaseWindow>
        {onProceed && <BesideProceedButton onClick={onProceed} />}
      </div>

      {footer}
    </div>
  )
}
