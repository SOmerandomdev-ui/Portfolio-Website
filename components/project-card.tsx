'use client'

import { ExternalLink, Github } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:border-foreground/20 ${featured ? 'border-foreground/10' : ''}`}>
      {project.image_url && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={project.image_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold ${featured ? 'text-xl' : 'text-lg'}`}>{project.title}</h3>
          {project.is_top_project && (
            <Badge variant="secondary" className="shrink-0 text-xs">Top</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{project.short_description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          {project.github_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 size-3.5" />
                Code
              </a>
            </Button>
          )}
          {project.demo_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 size-3.5" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
