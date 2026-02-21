export interface IconProps extends React.ComponentProps<'svg'> {
  size?: number;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  short_description: string;
  full_description?: string | null;
  tech_stack: string[];
  category: 'quant' | 'data_science' | 'general';
  is_public: boolean;
  is_top_project: boolean;
  github_url?: string | null;
  demo_url?: string | null;
  image_url?: string | null;
  created_at: string;
}
