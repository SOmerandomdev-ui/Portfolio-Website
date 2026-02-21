'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProjectForm from '@/components/ProjectForm'
import { Plus, Pencil, Trash2, LogOut, Eye, EyeOff, Star } from 'lucide-react'
import { toast } from 'sonner'
import type { Project } from '@/types'

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [configured, setConfigured] = useState(true)
  const router = useRouter()

  const getSupabase = () => {
    try {
      return createBrowserSupabaseClient()
    } catch {
      setConfigured(false)
      return null
    }
  }

  const checkAuth = useCallback(async () => {
    const supabase = getSupabase()
    if (!supabase) return false
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return false
    }
    return true
  }, [router])

  const fetchProjects = useCallback(async () => {
    const supabase = getSupabase()
    if (!supabase) return
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch projects')
      return
    }
    setProjects((data as Project[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    checkAuth().then((authed) => {
      if (authed) fetchProjects()
    })
  }, [checkAuth, fetchProjects])

  const handleLogout = async () => {
    const supabase = getSupabase()
    if (supabase) await supabase.auth.signOut()
    router.push('/login')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    const supabase = getSupabase()
    if (!supabase) return

    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete project')
      return
    }
    toast.success('Project deleted')
    fetchProjects()
  }

  const handleSave = async (project: Partial<Project>) => {
    const supabase = getSupabase()
    if (!supabase) return

    if (editingProject) {
      const { error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', editingProject.id)

      if (error) {
        toast.error('Failed to update project')
        return
      }
      toast.success('Project updated')
    } else {
      const { error } = await supabase.from('projects').insert(project)

      if (error) {
        toast.error('Failed to create project')
        return
      }
      toast.success('Project created')
    }

    setShowForm(false)
    setEditingProject(null)
    fetchProjects()
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  if (!configured) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 pt-20">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center space-y-4">
            <h2 className="text-xl font-semibold">Supabase Not Configured</h2>
            <p className="text-muted-foreground text-sm">
              Set <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
              <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your{' '}
              <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> file.
            </p>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </main>
    )
  }

  return (
    <main className="min-h-screen px-6 pb-20 pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Manage your portfolio projects</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => { setEditingProject(null); setShowForm(true) }} size="sm">
              <Plus className="mr-1 size-4" />
              New Project
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="mr-1 size-4" />
              Logout
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{editingProject ? 'Edit Project' : 'New Project'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectForm
                project={editingProject}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </CardContent>
          </Card>
        )}

        <div className="mt-8 space-y-4">
          {projects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No projects yet. Click &quot;New Project&quot; to add your first one.
              </CardContent>
            </Card>
          ) : (
            projects.map((project) => (
              <Card key={project.id} className="transition-colors hover:border-foreground/20">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{project.title}</h3>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {project.category.replace('_', ' ')}
                      </Badge>
                      {project.is_top_project && (
                        <Star className="size-4 text-yellow-500 fill-yellow-500 shrink-0" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground truncate">{project.short_description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {project.is_public ? (
                        <span className="flex items-center gap-1 text-xs text-green-500">
                          <Eye className="size-3" /> Public
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <EyeOff className="size-3" /> Hidden
                        </span>
                      )}
                      {project.tech_stack?.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech_stack && project.tech_stack.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.tech_stack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <Button onClick={() => handleEdit(project)} variant="ghost" size="icon-sm">
                      <Pencil className="size-4" />
                    </Button>
                    <Button onClick={() => handleDelete(project.id)} variant="ghost" size="icon-sm" className="text-destructive-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
