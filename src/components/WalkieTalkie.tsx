import { motion } from 'motion/react'

/** A police walkie-talkie with radio waves pulsing off its antenna. */
export function WalkieTalkie({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="-20 -60 200 420"
      className={className}
      role="img"
      aria-label="A police walkie-talkie"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Radio waves */}
      {[24, 38, 52].map((r, i) => (
        <motion.path
          key={r}
          d={`M${116 - r} 10 A${r} ${r} 0 0 1 ${116 + r} 10`}
          fill="none"
          stroke="#3bc1ff"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
      {/* Antenna */}
      <rect x="108" y="10" width="16" height="70" rx="6" fill="#1b1b3a" />
      {/* Side button */}
      <rect x="6" y="130" width="16" height="64" rx="6" fill="#ff5d8f" />
      {/* Body */}
      <rect x="20" y="70" width="120" height="280" rx="26" fill="#2d3b8a" stroke="#1b1b3a" strokeWidth="6" />
      <rect x="40" y="82" width="46" height="14" rx="7" fill="#ffd23f" />
      <circle cx="116" cy="90" r="11" fill="#ff5d8f" stroke="#1b1b3a" strokeWidth="3" />
      {/* Speaker grille */}
      <rect x="38" y="116" width="84" height="76" rx="14" fill="#1b1b3a" />
      {[130, 144, 158, 172].map((y) => (
        <line key={y} x1="50" x2="110" y1={y} y2={y} stroke="#4b5a9e" strokeWidth="5" strokeLinecap="round" />
      ))}
      {/* Screen */}
      <rect x="38" y="210" width="84" height="44" rx="8" fill="#5fe3a1" stroke="#1b1b3a" strokeWidth="4" />
      <text
        x="80"
        y="241"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#14452e"
        style={{ fontFamily: 'inherit' }}
      >
        CH 5
      </text>
      {/* Buttons */}
      {[56, 80, 104].map((x) => (
        <circle key={x} cx={x} cy="290" r="9" fill="#ffd23f" stroke="#1b1b3a" strokeWidth="3" />
      ))}
      <rect x="44" y="312" width="72" height="20" rx="10" fill="#1b1b3a" />
    </motion.svg>
  )
}
