'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import DecryptedText from '@/components/DecryptedText'
import { transitionVariants } from '@/lib/utils'

export default function HeroSection() {
  return (
    <main className="overflow-x-hidden">
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
          <div className="text-left max-w-3xl">
            <div className='mt-8 lg:mt-16'>
              <DecryptedText
                text="Aspiring Quant & Data Science Developer"
                animateOn="view"
                revealDirection="start"
                sequential
                useOriginalCharsOnly={false}
                speed={70}
                className='font-mono text-muted-foreground bg-black rounded-md uppercase'
              />
            </div>
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="text-balance text-6xl font-semibold md:text-7xl xl:text-8xl">
              {"Dion Machado"}
            </TextEffect>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mt-8 text-pretty text-lg text-muted-foreground">
              I build projects at the intersection of quantitative finance, data science, and software engineering. Explore my work below.
            </TextEffect>
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-12 flex flex-col items-start gap-2 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="px-5 text-base">
                <Link href="#top-projects">
                  <span className="text-nowrap">View Top Projects</span>
                </Link>
              </Button>
              <Button
                key={2}
                asChild
                size="lg"
                variant="ghost"
                className="px-5 text-base bg-black/30 backdrop-blur-sm hover:bg-black/40">
                <Link href="#contact">
                  <span className="text-nowrap">Get in Touch</span>
                </Link>
              </Button>
            </AnimatedGroup>
          </div>
        </div>
      </section>
    </main>
  )
}
