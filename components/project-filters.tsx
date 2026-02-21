'use client'

import { cn } from '@/lib/utils'

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Quant', value: 'quant' },
  { label: 'Data Science', value: 'data_science' },
  { label: 'General', value: 'general' },
] as const

interface ProjectFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function ProjectFilters({ activeFilter, onFilterChange }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onFilterChange(cat.value)}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
            activeFilter === cat.value
              ? 'border-foreground bg-foreground text-background'
              : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
