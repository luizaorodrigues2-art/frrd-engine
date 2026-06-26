import type { Metadata } from 'next'
import './studio.css'

export const metadata: Metadata = {
  title: { default: 'Feed Engine', template: '%s | Feed Engine' },
  description: 'Plataforma de criação de conteúdo com IA',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="studio-app" data-theme="dark" style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {children}
    </div>
  )
}
