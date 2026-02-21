import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
]

export default function FooterSection() {
  return (
    <footer id="contact" className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          aria-label="go home"
          className="mx-auto block size-fit">
          <span className="text-2xl font-bold tracking-tight">A.</span>
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary flex items-center gap-2 duration-150">
              <link.icon className="size-5" />
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </div>
        <span className="text-muted-foreground block text-center text-sm font-mono">
          Built with Next.js, Tailwind CSS & Three.js
        </span>
      </div>
    </footer>
  )
}
