'use client'

import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'

export default function AboutMe() {
  return (
    <section id="about" className="py-16 md:py-32 bg-transparent">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <TextEffect
            triggerOnView
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-balance text-4xl font-semibold lg:text-5xl">
            About Me
          </TextEffect>
        </div>
        <AnimatedGroup
          triggerOnView
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.5,
                },
              },
            },
            ...transitionVariants,
          }}
          className="mt-8 space-y-6 md:mt-12"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            {"I'm a developer with a deep interest in quantitative finance, data science, and building software that solves real problems. My projects span algorithmic trading systems, data pipelines, machine learning models, and full-stack web applications."}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {"Currently focused on building practical, production-quality projects that demonstrate strong engineering fundamentals. I'm looking for opportunities in quant development, data science, and software engineering internships or junior roles."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {['Python', 'TypeScript', 'React', 'Next.js', 'SQL', 'Pandas', 'NumPy', 'Machine Learning'].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </AnimatedGroup>
      </div>
    </section>
  )
}
