'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectFormProps {
  project?: Project | null
  onSave: (data: Partial<Project>) => void
  onCancel: () => void
}

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '')
  const [shortDescription, setShortDescription] = useState(project?.short_description || '')
  const [fullDescription, setFullDescription] = useState(project?.full_description || '')
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState<string[]>(project?.tech_stack || [])
  const [category, setCategory] = useState<Project['category']>(project?.category || 'general')
  const [isPublic, setIsPublic] = useState(project?.is_public ?? true)
  const [isTopProject, setIsTopProject] = useState(project?.is_top_project ?? false)
  const [githubUrl, setGithubUrl] = useState(project?.github_url || '')
  const [demoUrl, setDemoUrl] = useState(project?.demo_url || '')
  const [imageUrl, setImageUrl] = useState(project?.image_url || '')
  const [saving, setSaving] = useState(false)

  const addTech = () => {
    const trimmed = techInput.trim()
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed])
      setTechInput('')
    }
  }

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech))
  }

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTech()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setSaving(true)
    await onSave({
      title: title.trim(),
      short_description: shortDescription.trim(),
      full_description: fullDescription.trim() || null,
      tech_stack: techStack,
      category,
      is_public: isPublic,
      is_top_project: isTopProject,
      github_url: githubUrl.trim() || null,
      demo_url: demoUrl.trim() || null,
      image_url: imageUrl.trim() || null,
    })
    setSaving(false)
  }

  const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  const labelClassName = "text-sm font-medium"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className={labelClassName}>Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Project"
            required
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className={labelClassName}>Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Project['category'])}
            className={inputClassName}
          >
            <option value="general">General</option>
            <option value="quant">Quant</option>
            <option value="data_science">Data Science</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="short_description" className={labelClassName}>Short Description</label>
        <input
          id="short_description"
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="A brief one-line description of what it does"
          className={inputClassName}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="full_description" className={labelClassName}>Full Description (optional)</label>
        <textarea
          id="full_description"
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          placeholder="More detailed description..."
          rows={3}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <label className={labelClassName}>Tech Stack</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleTechKeyDown}
            placeholder="Add a technology and press Enter"
            className={inputClassName}
          />
          <Button type="button" onClick={addTech} variant="outline" size="default">
            Add
          </Button>
        </div>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="gap-1">
                {tech}
                <button type="button" onClick={() => removeTech(tech)} className="hover:text-destructive">
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="github_url" className={labelClassName}>GitHub URL (optional)</label>
          <input
            id="github_url"
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
            className={inputClassName}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="demo_url" className={labelClassName}>Demo URL (optional)</label>
          <input
            id="demo_url"
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://..."
            className={inputClassName}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="image_url" className={labelClassName}>Image URL (optional)</label>
        <input
          id="image_url"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className={inputClassName}
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="size-4 rounded border-input accent-primary"
          />
          <span className="text-sm">Public</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isTopProject}
            onChange={(e) => setIsTopProject(e.target.checked)}
            className="size-4 rounded border-input accent-primary"
          />
          <span className="text-sm">Top Project</span>
        </label>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving || !title.trim()}>
          {saving ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
        </Button>
      </div>
    </form>
  )
}
