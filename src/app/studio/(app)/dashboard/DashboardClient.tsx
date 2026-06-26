'use client'
import Link from 'next/link'
import { Sparkles, TrendingUp, Image, Megaphone, Globe, Plus, ArrowRight, Crown, Zap, Bot, Calendar, BarChart2, Lightbulb } from 'lucide-react'

const PLATFORM_COLORS: Record<string, string> = {
  instagram: '#E1306C', facebook: '#1877F2', tiktok: '#000000',
  linkedin: '#0A66C2', youtube: '#FF0000', twitter: '#1DA1F2',
  pinterest: '#E60023', threads: '#000000'
}

const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok',
  linkedin: 'LinkedIn', youtube: 'YouTube', twitter: 'X/Twitter'
}

const QUICK_ACTIONS = [
  { label: 'Post para Instagram', icon: '📸', prompt: 'Crie um post para Instagram' },
  { label: 'Story Criativo', icon: '✨', prompt: 'Crie um story criativo' },
  { label: 'Logo/Marca', icon: '🎨', prompt: 'Crie um logo profissional' },
  { label: 'Campanha 30 dias', icon: '📅', prompt: 'Crie uma campanha para 30 dias' },
  { label: 'Banner para anúncio', icon: '📢', prompt: 'Crie um banner para anúncio' },
  { label: 'Reels/TikTok', icon: '🎬', prompt: 'Crie um roteiro para reels' },
  { label: 'E-mail marketing', icon: '📧', prompt: 'Crie um e-mail marketing' },
  { label: 'Identidade Visual', icon: '🖌️', prompt: 'Crie uma identidade visual' },
]

export default function DashboardClient({ user, profile, recentContent, recentCampaigns, socialAccounts, stats }: any) {
  const tenant = profile?.tenants
  const planMap: Record<string, string> = { basic: 'Basic', plus: 'Plus', master: 'Master', admin: 'Admin' }
  const planName = planMap[tenant?.plan || 'basic'] || 'Basic'
  const storagePercent = Math.min(100, (stats.storageUsed / stats.storageLimit) * 100)
  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Bom dia'
    if (h < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header greeting */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, marginBottom: 6 }}>
              {greeting()}, <span className="gradient-text">{profile?.full_name?.split(' ')[0] || 'usuário'}</span> 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, margin: 0 }}>
              Pronto para criar conteúdo incrível com IA hoje?
            </p>
          </div>
          <Link href="/studio/create">
            <button className="btn-primary" style={{ gap: 8, fontSize: 14 }}>
              <Sparkles size={16} /> Criar com IA
            </button>
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Conteúdos criados', value: stats.totalContent, icon: Image, color: '#7C3AED', sub: 'este mês' },
          { label: 'Campanhas ativas', value: stats.totalCampaigns, icon: Megaphone, color: '#F59E0B', sub: 'campanhas' },
          { label: 'Redes conectadas', value: stats.connectedAccounts, icon: Globe, color: '#10B981', sub: 'plataformas' },
          { label: 'Engajamento', value: '+12.4%', icon: TrendingUp, color: '#06B6D4', sub: 'vs. mês anterior' },
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${stat.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={18} color={stat.color} />
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{stat.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick create with AI */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 28, background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(168,85,247,0.05) 100%)', borderColor: 'rgba(124,58,237,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={15} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Criação Rápida com IA</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Clique para criar instantaneamente</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
          {QUICK_ACTIONS.map((action, i) => (
            <Link key={i} href={`/studio/create?prompt=${encodeURIComponent(action.prompt)}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10,
                padding: '12px 14px', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 10
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; e.currentTarget.style.background = 'rgba(124,58,237,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-surface)' }}
              >
                <span style={{ fontSize: 20 }}>{action.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{action.label}</span>
              </div>
            </Link>
          ))}
          <Link href="/studio/create" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--gradient-brand)', borderRadius: 10, padding: '12px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Plus size={18} color="white" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Criar livremente</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent content */}
        <div className="glass-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Conteúdos Recentes</h3>
            <Link href="/studio/library" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--auryx-purple-light)', fontSize: 12, textDecoration: 'none' }}>
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          {recentContent.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
              <Image size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
              <p style={{ fontSize: 13 }}>Nenhum conteúdo criado ainda</p>
              <Link href="/studio/create">
                <button className="btn-primary" style={{ marginTop: 12, fontSize: 12, padding: '8px 16px' }}>
                  <Sparkles size={13} /> Criar agora
                </button>
              </Link>
            </div>
          ) : recentContent.map((item: any) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--gradient-card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image size={15} color="var(--auryx-purple-light)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.type} · {new Date(item.created_at).toLocaleDateString('pt-BR')}</div>
              </div>
              <span className={`badge badge-${item.status === 'published' ? 'green' : item.status === 'draft' ? 'cyan' : 'purple'}`} style={{ fontSize: 10 }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Right column: agents + plan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* AI Agents */}
          <div className="glass-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Agentes IA</h3>
              <Link href="/studio/agents" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--auryx-purple-light)', fontSize: 12, textDecoration: 'none' }}>
                Acessar <ArrowRight size={12} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { name: 'Marketing', emoji: '📊', desc: 'Estratégias e planejamento' },
                { name: 'Copywriter', emoji: '✍️', desc: 'Textos e legendas' },
                { name: 'Designer', emoji: '🎨', desc: 'Criação visual' },
                { name: 'Social Media', emoji: '📱', desc: 'Gestão de redes' },
              ].map(agent => (
                <Link key={agent.name} href={`/studio/agents?type=${agent.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{agent.emoji}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{agent.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{agent.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Plan & storage */}
          <div className="glass-card" style={{ padding: 22, background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(245,158,11,0.05) 100%)', borderColor: 'rgba(124,58,237,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Crown size={18} color="#F59E0B" />
                <span style={{ fontWeight: 700, fontSize: 15 }}>Plano {planName}</span>
              </div>
              {tenant?.plan !== 'master' && (
                <Link href="/studio/settings/billing">
                  <button style={{ background: 'var(--gradient-brand)', border: 'none', borderRadius: 8, padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', color: 'white' }}>
                    Upgrade
                  </button>
                </Link>
              )}
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Armazenamento</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {(stats.storageUsed / 1073741824).toFixed(1)} / {(stats.storageLimit / 1073741824).toFixed(0)} GB
                </span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-surface)', borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${storagePercent}%`, background: storagePercent > 80 ? '#EF4444' : 'var(--gradient-brand)', borderRadius: 4, transition: 'width 0.6s ease' }} />
              </div>
            </div>
            {!['plus', 'master', 'admin'].includes(tenant?.plan) && (
              <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, marginTop: 10 }}>
                Faça upgrade para conectar suas redes sociais, criar campanhas ilimitadas e acessar todos os agentes IA.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
