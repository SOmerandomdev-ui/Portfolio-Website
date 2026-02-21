'use client'

import dynamic from 'next/dynamic'

const Dither = dynamic(() => import('@/components/Dither'), { ssr: false })

export default function DitherBackground() {
  return (
    <Dither
      waveColor={[0.30980392156862746, 0.30980392156862746, 0.30980392156862746]}
      disableAnimation={false}
      enableMouseInteraction
      mouseRadius={0.3}
      colorNum={4}
      pixelSize={2}
      waveAmplitude={0.3}
      waveFrequency={3}
      waveSpeed={0.05}
    />
  )
}
