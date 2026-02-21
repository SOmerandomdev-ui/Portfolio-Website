'use client'

import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'

const links = [
  { icon: Mail, label: 'Email', href: 'mailto:your@email.com', description: 'Drop me a line' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', description: 'Connect with me' },
  { icon: Github, label: 'GitHub', href: 'https://github.com', description: 'View my code' },
]

export default function ContactLinks() {
  return (
    <section className="py-16 md:py-32 bg-transparent">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <TextEffect
            triggerOnView
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h2"
            className="text-balance text-4xl font-semibold lg:text-5xl">
            {"Let's Connect"}
          </TextEffect>
          <TextEffect
            triggerOnView
            preset="fade"
            delay={0.3}
            as="p"
            className="mt-4 text-muted-foreground text-lg">
            {"Interested in working together? Reach out through any of these channels."}
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
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-12"
        >
          {links.map((link) => (
            <Button
              key={link.label}
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto gap-2"
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <link.icon className="size-4" />
                {link.label}
                <ExternalLink className="size-3 text-muted-foreground" />
              </a>
            </Button>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  )
}
