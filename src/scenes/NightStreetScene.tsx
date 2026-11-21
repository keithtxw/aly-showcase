import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import toyshopBg from '../assets/toyshop-bg.png'
import { ExclamationBurst } from '../components/ExclamationBurst'
import { SpeechBubble } from '../components/SpeechBubble'
import { playAlarm } from '../lib/sound'

/** Steps: 0 quiet street · 1 "Bang! Smash!" · 2 "Help!" · 3 "Joyland Police!" */
const BEAT_TIMES = [500, 1000, 1500] // ms after the scene appears
const ALARM_DELAY = 500 // ms after "Bang! Smash!" appears

const IMAGE_ASPECT = 1754 / 897

export function NightStreetScene() {
  const [step, setStep] = useState(0)

  // Beats play automatically, 500ms apart, as soon as the scene appears.
  useEffect(() => {
    const timers = BEAT_TIMES.map((ms, i) => setTimeout(() => setStep(i + 1), ms))
    timers.push(setTimeout(playAlarm, BEAT_TIMES[0] + ALARM_DELAY))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#0c1a4e]">
      {/*
        "Stage": always covers the screen but keeps the image's aspect ratio, so anything
        positioned in % inside it stays lined up with the artwork at any window size.
      */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-cover bg-center"
        style={{
          width: `max(100%, calc(100vh * ${IMAGE_ASPECT}))`,
          aspectRatio: IMAGE_ASPECT,
          backgroundImage: `url(${toyshopBg})`,
        }}
        animate={step >= 1 ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Smashed right-hand shop window */}
        {step >= 1 && (
          <motion.svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute"
            style={{ left: '57.6%', top: '53.5%', width: '15.7%', height: '26.5%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <path
              d={[
                'M50 0 L46 30 L20 45 L46 52 L30 100',
                'M46 30 L72 22 L100 30',
                'M46 52 L78 62 L100 80',
                'M72 22 L80 0 M20 45 L0 38',
              ].join(' ')}
              fill="none"
              stroke="#e8f4ff"
              strokeWidth="1.8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>
        )}

        {/* Bang! Smash! bursts out of the shop door */}
        {step >= 1 && (
          <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2">
            <ExclamationBurst className="h-52 w-60 text-3xl lg:h-60 lg:w-72 lg:text-5xl">
              Bang!
              <br />
              Smash!
            </ExclamationBurst>
          </div>
        )}
      </motion.div>

      {/* Speech bubbles, one each side of the shop, tails pointing in towards it */}
      {step >= 2 && (
        <SpeechBubble className="absolute left-[20%] top-[22%] w-max" tail="right-10" origin="right bottom">
          Help! A robber!
        </SpeechBubble>
      )}
      {step >= 3 && (
        <SpeechBubble className="absolute right-[5%] top-[22%] w-80 lg:w-96" tail="left-10" origin="left bottom">
          Joyland Police! Please come to help me!
        </SpeechBubble>
      )}

      {/* Alarm flash */}
      {step >= 1 && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-red-600"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  )
}
