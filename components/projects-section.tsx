'use client'

import { useState } from 'react'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import ProjectCard from '@/components/project-card'
import ProjectFilters from '@/components/project-filters'
import type { Project } from '@/types'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-16 md:py-32 bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <TextEffect
            triggerOnView
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-balance text-4xl font-semibold lg:text-5xl">
            All Projects
          </TextEffect>
          <TextEffect
            triggerOnView
            preset="fade"
            delay={0.3}
            as="p"
            className="mt-4 text-muted-foreground text-lg">
            Browse by category to find relevant work
          </TextEffect>
        </div>

        <div className="mt-8 md:mt-12">
          <ProjectFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">No projects in this category yet.</p>
        ) : (
          <AnimatedGroup
            key={activeFilter}
            triggerOnView
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.25,
                  },
                },
              },
              ...transitionVariants,
            }}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatedGroup>
        )}
      </div>
    </section>
  )
}
