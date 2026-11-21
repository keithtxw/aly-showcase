const CX = 100
const CY = 104

// 5-pointed star polygon points
const starPoints = Array.from({ length: 10 }, (_, i) => {
  const r = i % 2 === 0 ? 34 : 14
  const a = (-90 + i * 36) * (Math.PI / 180)
  return `${(CX + r * Math.cos(a)).toFixed(1)},${(CY + r * Math.sin(a)).toFixed(1)}`
}).join(' ')

const SHIELD = 'M100 6 L186 34 V120 C186 180 146 218 100 236 C54 218 14 180 14 120 V34 Z'
const INNER = 'M100 18 L174 42 V120 C174 172 140 205 100 222 C60 205 26 172 26 120 V42 Z'

/** Joyland Police Department badge. */
export function PoliceBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 244" className={className} role="img" aria-label="Joyland Police Department badge">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3a0" />
          <stop offset="0.5" stopColor="#ffc928" />
          <stop offset="1" stopColor="#d58a00" />
        </linearGradient>
        <path id="badge-arc" d="M44 78 Q100 34 156 78" fill="none" />
      </defs>
      <path d={SHIELD} fill="url(#gold)" stroke="#a96500" strokeWidth="4" strokeLinejoin="round" />
      <path d={INNER} fill="#1d4ed8" stroke="#a96500" strokeWidth="3" strokeLinejoin="round" />
      <text fontSize="20" fontWeight="700" fill="#ffe27a" letterSpacing="2" style={{ fontFamily: 'inherit' }}>
        <textPath href="#badge-arc" startOffset="50%" textAnchor="middle">
          JOYLAND
        </textPath>
      </text>
      <polygon points={starPoints} fill="url(#gold)" stroke="#a96500" strokeWidth="2" strokeLinejoin="round" />
      <rect x="34" y="150" width="132" height="30" rx="6" fill="#ffe27a" stroke="#a96500" strokeWidth="2.5" />
      <text
        x="100"
        y="170"
        fontSize="13.5"
        fontWeight="700"
        fill="#1b1b3a"
        textAnchor="middle"
        style={{ fontFamily: 'inherit' }}
      >
        POLICE DEPARTMENT
      </text>
    </svg>
  )
}
