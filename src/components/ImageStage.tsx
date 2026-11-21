import type { ReactNode } from 'react'

/**
 * A full-screen picture "stage": always covers the screen but keeps the image's aspect
 * ratio, so anything positioned in % inside it stays lined up with the artwork.
 * Anchored to the left so that if the screen is narrower than the picture, the left
 * edge (where the shopper stands) is never cropped out.
 */
export function ImageStage({ src, aspect, children }: { src: string; aspect: number; children?: ReactNode }) {
  return (
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 bg-cover bg-left"
      style={{ width: `max(100%, calc(100vh * ${aspect}))`, aspectRatio: aspect, backgroundImage: `url(${src})` }}
    >
      {children}
    </div>
  )
}
