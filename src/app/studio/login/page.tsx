'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  Eye, EyeOff, Loader2, Check, ArrowRight, Zap,
  BarChart2, Calendar, Users, Globe, Rss, Megaphone,
  Layers, Lightbulb, TrendingUp, MessageSquare,
} from 'lucide-react'

// ─── Redes sociais suportadas ─────────────────────────────────────────────────

const networks = [
  { name: 'Instagram',  color: '#E1306C', icon: '📸' },
  { name: 'TikTok',     color: '#010101', icon: '🎵' },
  { name: 'Facebook',   color: '#1877F2', icon: '📘' },
  { name: 'LinkedIn',   color: '#0A66C2', icon: '💼' },
  { name: 'YouTube',    color: '#FF0000', icon: '▶️'  },
  { name: 'Twitter / X',color: '#000000', icon: '𝕏'  },
  { name: 'Pinterest',  color: '#E60023', icon: '📌' },
  { name: 'Threads',    color: '#000000', icon: '🧵' },
]

// ─── Planos ───────────────────────────────────────────────────────────────────

const plans = [
  {
    name: 'Lançamento',
    price: '89,99',
    color: '#06B6D4',
    highlight: false,
    badge: null as string | null,
    features: [
      'Até 3 perfis conectados',
      'Calendário editorial',
      'Agendamento automático',
      'Relatórios essenciais',
      '1 usuário',
      'Suporte por e-mail',
    ],
  },
  {
    name: 'Crescimento',
    price: '139,99',
    color: '#A855F7',
    highlight: true,
    badge: 'Mais popular',
    features: [
      'Até 10 perfis conectados',
      'Campanhas ilimitadas',
      'Criação de conteúdo avançada',
      'Analytics detalhado',
      'Banco de ideias ilimitado',
      'Até 5 usuários',
      'Suporte prioritário',
    ],
  },
  {
    name: 'Domínio',
    price: '199,99',
    color: '#F59E0B',
    highlight: false,
    badge: 'Completo',
    features: [
      'Perfis ilimitados',
      'Usuários ilimitados',
      'Painel administrativo',
      'Gestão de equipe e permissões',
      'White-label (marca própria)',
      'Integrações via API',
      'Relatórios personalizados',
      'Suporte 24/7 dedicado',
    ],
  },
]

// ─── Funcionalidades ──────────────────────────────────────────────────────────

const features = [
  { icon: Rss,           label: 'Feed inteligente',         desc: 'Visualize e gerencie todo seu conteúdo em uma única linha do tempo.' },
  { icon: Calendar,      label: 'Agendamento avançado',     desc: 'Programe publicações para qualquer rede e horário com um clique.' },
  { icon: BarChart2,     label: 'Analytics em tempo real',  desc: 'Métricas de alcance, engajamento e crescimento de todos os perfis.' },
  { icon: Megaphone,     label: 'Gestão de campanhas',      desc: 'Organize campanhas completas com datas, criativos e objetivos.' },
  { icon: Lightbulb,     label: 'Banco de ideias',          desc: 'Capture, organize e transforme ideias em conteúdo publicável.' },
  { icon: Users,         label: 'Colaboração em equipe',    desc: 'Fluxos de aprovação, comentários e tarefas para toda a equipe.' },
  { icon: TrendingUp,    label: 'Relatórios completos',     desc: 'Relatórios exportáveis para apresentar resultados aos seus clientes.' },
  { icon: MessageSquare, label: 'Caixa de mensagens',       desc: 'Responda comentários e DMs de todas as redes em um só lugar.' },
]

// ─── Footer ───────────────────────────────────────────────────────────────────

const footerCols = [
  {
    heading: 'Produto',
    links: [
      { label: 'Funcionalidades', href: '#' },
      { label: 'Planos e preços', href: '#planos' },
      { label: 'Novidades',       href: '#' },
      { label: 'Roadmap',         href: '#' },
    ],
  },
  {
    heading: 'Empresa',
    links: [
      { label: 'Sobre a AURYX MEDIA', href: 'https://auryxmedia.com.br' },
      { label: 'Blog',                href: '#' },
      { label: 'Carreiras',           href: '#' },
      { label: 'Contato',             href: '#' },
    ],
  },
  {
    heading: 'Suporte',
    links: [
      { label: 'Central de ajuda', href: '#' },
      { label: 'Documentação',     href: '#' },
      { label: 'Status do sistema',href: '#' },
      { label: 'Comunidade',       href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Termos de uso', href: '#' },
      { label: 'Privacidade',   href: '#' },
      { label: 'Cookies',       href: '#' },
      { label: 'Segurança',     href: '#' },
    ],
  },
]

// ─── Componente principal ─────────────────────────────────────────────────────

export default function LoginPage() {
  const router      = useRouter()
  const params      = useSearchParams()
  const redirect    = params.get('redirect') || '/studio/dashboard'
  const supabase    = createClient()

  const [email,    setEmail]   = useState('')
  const [password, setPass]    = useState('')
  const [showPass, setShow]    = useState(false)
  const [loading,  setLoading] = useState(false)
  const [error,    setError]   = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push(redirect)
  }

  const handleOAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/studio/dashboard` },
    })
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: 'var(--bg-primary)', color: 'var(--text-primary)',
      fontFamily: 'var(--font-inter), -apple-system, sans-serif',
    }}>

      {/* ════════════════════════════════════════════════════════
          LADO ESQUERDO — conteúdo da landing (scrollável)
      ════════════════════════════════════════════════════════ */}
      <main style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>

        {/* ── NAV ── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 50,
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(20px)',
          background: 'rgba(5,5,10,0.88)',
          padding: '0 56px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(124,58,237,0.45)' }}>
                <Zap size={17} color="white" fill="white" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em', lineHeight: 1 }}>Feed Engine</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 1 }}>by AURYX MEDIA</div>
              </div>
            </div>
            <Link href="/studio/register" style={{ background: 'var(--gradient-brand)', borderRadius: 9, padding: '8px 20px', color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }}>
              7 dias grátis
            </Link>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ padding: '72px 56px 56px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 100% 70% at 40% 0%, rgba(124,58,237,0.14) 0%, transparent 65%)' }} />

          <div style={{ position: 'relative', maxWidth: 680 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.22)', borderRadius: 999, padding: '5px 14px', fontSize: 11, color: '#A855F7', fontWeight: 700, marginBottom: 28, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block', boxShadow: '0 0 6px #A855F7' }} />
              Plataforma de gestão de redes sociais
            </div>

            <h1 style={{ fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 900, lineHeight: 1.07, margin: '0 0 22px', letterSpacing: '-0.03em' }}>
              Gerencie todas as suas{' '}
              <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                redes sociais
              </span>{' '}
              em um só lugar.
            </h1>

            <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 40px', maxWidth: 560 }}>
              O Feed Engine centraliza Instagram, TikTok, LinkedIn, YouTube e mais — com agendamento, analytics, campanhas e colaboração de equipe em um painel único e poderoso.
            </p>

            {/* Redes sociais */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
                Redes suportadas
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {networks.map(n => (
                  <div key={n.name} style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8, padding: '6px 12px',
                    fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${n.color}66`; (e.currentTarget as HTMLElement).style.background = `${n.color}11` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: 14 }}>{n.icon}</span>
                    {n.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 480 }}>
              {[
                { v: '+500', l: 'Posts agendados' },
                { v: '8',    l: 'Redes conectadas' },
                { v: '99%',  l: 'Satisfação' },
              ].map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
                  <div style={{ fontSize: 26, fontWeight: 900, background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FUNCIONALIDADES ── */}
        <section style={{ padding: '0 56px 72px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
            O que você pode fazer
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '16px 18px',
                transition: 'border-color 0.15s, background 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.05)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)' }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 9, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color="#A855F7" strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: 'var(--text-primary)' }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PLANOS ── */}
        <section id="planos" style={{ padding: '56px 56px 72px', borderTop: '1px solid var(--border)', background: 'rgba(13,13,26,0.4)' }}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Planos e preços</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>7 dias grátis em qualquer plano. Cancele quando quiser, sem burocracia.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {plans.map(plan => (
              <div key={plan.name} style={{
                position: 'relative',
                background: plan.highlight ? 'linear-gradient(160deg, rgba(124,58,237,0.14) 0%, rgba(168,85,247,0.06) 100%)' : 'rgba(255,255,255,0.025)',
                border: plan.highlight ? '1px solid rgba(168,85,247,0.45)' : '1px solid var(--border-card)',
                borderRadius: 16, padding: '24px 20px',
                boxShadow: plan.highlight ? '0 0 48px rgba(124,58,237,0.15)' : 'none',
              }}>
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: -11, left: 20,
                    background: plan.highlight ? 'var(--gradient-brand)' : plan.color,
                    borderRadius: 999, padding: '3px 12px',
                    fontSize: 9, fontWeight: 800, color: 'white',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    {plan.badge}
                  </div>
                )}

                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>{plan.name}</h3>

                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>R$</span>
                  <span style={{ fontSize: 32, fontWeight: 900, color: plan.highlight ? '#A855F7' : plan.color, letterSpacing: '-0.02em' }}>{' '}{plan.price}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>/mês</span>
                </div>

                <Link href="/studio/register" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  background: plan.highlight ? 'var(--gradient-brand)' : `${plan.color}22`,
                  border: plan.highlight ? 'none' : `1px solid ${plan.color}44`,
                  borderRadius: 9, padding: '10px 14px', marginBottom: 20,
                  color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  boxShadow: plan.highlight ? '0 4px 20px rgba(124,58,237,0.35)' : 'none',
                  transition: 'opacity 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  Começar grátis <ArrowRight size={13} />
                </Link>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      <Check size={12} color={plan.highlight ? '#A855F7' : plan.color} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '56px 56px 36px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr', gap: 36, marginBottom: 48 }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(124,58,237,0.4)' }}>
                  <Zap size={15} color="white" fill="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '-0.01em', lineHeight: 1 }}>Feed Engine</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 2 }}>by AURYX MEDIA</div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7, margin: '0 0 18px', maxWidth: 220 }}>
                A plataforma completa para equipes que levam a gestão de redes sociais a sério.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { label: 'Instagram', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { label: 'LinkedIn',  d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label} style={{ width: 32, height: 32, borderRadius: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.1)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(241,240,255,0.45)"><path d={s.d} /></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {footerCols.map(col => (
              <div key={col.heading}>
                <h4 style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 0 14px' }}>
                  {col.heading}
                </h4>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {col.links.map(lk => (
                    <li key={lk.label}>
                      <a href={lk.href} style={{ fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => ((e.target as HTMLElement).style.color = '#A855F7')}
                        onMouseLeave={e => ((e.target as HTMLElement).style.color = '')}>
                        {lk.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
              © {new Date().getFullYear()} Feed Engine. Todos os direitos reservados. Desenvolvido por{' '}
              <a href="https://auryxmedia.com.br" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 700 }}>
                AURYX MEDIA
              </a>.
            </p>
            <div style={{ display: 'flex', gap: 18 }}>
              {['Privacidade', 'Termos', 'Cookies'].map(t => (
                <a key={t} href="#" style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = '')}>
                  {t}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </main>

      {/* ════════════════════════════════════════════════════════
          LADO DIREITO — Login (fixo, 380 px)
      ════════════════════════════════════════════════════════ */}
      <aside style={{
        width: 380, minWidth: 380,
        position: 'sticky', top: 0, height: '100vh', alignSelf: 'flex-start',
        borderLeft: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        display: 'flex', flexDirection: 'column',
        padding: '40px 40px',
        justifyContent: 'space-between',
        overflowY: 'auto',
      }}>

        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 48 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(124,58,237,0.45)' }}>
              <Zap size={17} color="white" fill="white" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em', lineHeight: 1 }}>Feed Engine</div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 2 }}>by AURYX MEDIA</div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Bem-vindo de volta
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Entre na sua conta para gerenciar seus canais e conteúdos.
            </p>
          </div>

          {/* Google */}
          <button onClick={handleOAuth} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginBottom: 20, padding: '11px 16px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>ou</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6, letterSpacing: '0.03em' }}>
                E-mail
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="voce@empresa.com" required className="studio-input"
                style={{ fontSize: 13 }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.03em' }}>Senha</label>
                <Link href="/studio/forgot-password" style={{ fontSize: 11, color: 'var(--auryx-purple-light)', textDecoration: 'none', fontWeight: 500 }}>
                  Esqueceu?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPass(e.target.value)}
                  placeholder="••••••••" required className="studio-input"
                  style={{ paddingRight: 42, fontSize: 13 }}
                />
                <button type="button" onClick={() => setShow(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, display: 'flex' }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '9px 13px', fontSize: 12, color: '#EF4444' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '12px 18px', marginTop: 4, fontSize: 14, borderRadius: 10 }}>
              {loading ? <Loader2 size={14} className="animate-spin" /> : null}
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-secondary)' }}>
            Não tem conta?{' '}
            <Link href="/studio/register" style={{ color: 'var(--auryx-purple-light)', fontWeight: 700, textDecoration: 'none' }}>
              Crie gratuitamente
            </Link>
          </p>

          {/* Mini trust badges */}
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              '✓  7 dias grátis sem cartão de crédito',
              '✓  Cancele quando quiser',
              '✓  Suporte em português',
            ].map(t => (
              <div key={t} style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p style={{ fontSize: 10, color: 'var(--text-muted)', margin: '24px 0 0', lineHeight: 1.6 }}>
          Ao continuar você concorda com os{' '}
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Termos de uso</a>
          {' '}e a{' '}
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Política de privacidade</a>.
        </p>
      </aside>
    </div>
  )
}
