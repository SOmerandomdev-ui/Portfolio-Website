import HeroSection from '@/components/hero-section'
import TopProjects from '@/components/top-projects'
import ProjectsSection from '@/components/projects-section'
import AboutMe from '@/components/about-me'
import ContactLinks from '@/components/contact-links'
import { createServerSupabaseClient } from '@/lib/supabase'
import type { Project } from '@/types'

async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createServerSupabaseClient()
    if (!supabase) return getSampleProjects()

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as Project[]) || []
  } catch {
    return getSampleProjects()
  }
}

function getSampleProjects(): Project[] {
  return [
    {
      id: '1',
      title: 'Algorithmic Trading Engine',
      short_description: 'A high-frequency trading system with backtesting capabilities and real-time market data integration.',
      tech_stack: ['Python', 'NumPy', 'Pandas', 'WebSocket'],
      category: 'quant',
      is_public: true,
      is_top_project: true,
      github_url: 'https://github.com',
      demo_url: null,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'ML Price Predictor',
      short_description: 'Machine learning model for stock price prediction using LSTM networks and sentiment analysis.',
      tech_stack: ['Python', 'TensorFlow', 'scikit-learn', 'NLP'],
      category: 'data_science',
      is_public: true,
      is_top_project: true,
      github_url: 'https://github.com',
      demo_url: 'https://example.com',
      image_url: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Portfolio Risk Analyzer',
      short_description: 'Real-time portfolio risk analysis tool with VaR calculations and Monte Carlo simulations.',
      tech_stack: ['Python', 'React', 'D3.js', 'FastAPI'],
      category: 'quant',
      is_public: true,
      is_top_project: true,
      github_url: 'https://github.com',
      demo_url: null,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Data Pipeline Framework',
      short_description: 'ETL pipeline for processing and analyzing large financial datasets with automated scheduling.',
      tech_stack: ['Python', 'Apache Airflow', 'PostgreSQL', 'Docker'],
      category: 'data_science',
      is_public: true,
      is_top_project: false,
      github_url: 'https://github.com',
      demo_url: null,
      image_url: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Full-Stack Dashboard',
      short_description: 'Real-time analytics dashboard built with Next.js, featuring interactive charts and data visualization.',
      tech_stack: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts'],
      category: 'general',
      is_public: true,
      is_top_project: false,
      github_url: 'https://github.com',
      demo_url: 'https://example.com',
      image_url: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Options Pricing Calculator',
      short_description: 'Black-Scholes and binomial model calculator with Greeks visualization and volatility surfaces.',
      tech_stack: ['Python', 'NumPy', 'Matplotlib', 'Streamlit'],
      category: 'quant',
      is_public: true,
      is_top_project: false,
      github_url: 'https://github.com',
      demo_url: null,
      image_url: null,
      created_at: new Date().toISOString(),
    },
  ]
}

export default async function Home() {
  const projects = await getProjects()
  const topProjects = projects.filter((p) => p.is_top_project)

  return (
    <>
      <HeroSection />
      <TopProjects projects={topProjects} />
      <ProjectsSection projects={projects} />
      <AboutMe />
      <ContactLinks />
    </>
  )
}
