'use client'

import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import ProjectCard from '@/components/project-card'
import type { Project } from '@/types'

interface TopProjectsProps {
  projects: Project[]
}

export default function TopProjects({ projects }: TopProjectsProps) {
  if (projects.length === 0) return null

  return (
    <section id="top-projects" className="py-16 md:py-32 bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <TextEffect
            triggerOnView
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-balance text-4xl font-semibold lg:text-5xl">
            Top Projects
          </TextEffect>
          <TextEffect
            triggerOnView
            preset="fade"
            delay={0.3}
            as="p"
            className="mt-4 text-muted-foreground text-lg">
            My strongest and most impactful work
          </TextEffect>
        </div>
        <AnimatedGroup
          triggerOnView
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
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-16"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}
