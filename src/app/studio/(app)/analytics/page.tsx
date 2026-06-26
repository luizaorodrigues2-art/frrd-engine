'use client'
import { useState } from 'react'
import { BarChart2, TrendingUp, Users, Heart, MessageCircle, Share2, Eye, MousePointer, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const PERIODS = ['7 dias', '30 dias', '90 dias', '12 meses']

const MOCK_METRICS = {
  followers: { value: 12847, change: 8.4, positive: true },
  reach: { value: 89432, change: 12.1, positive: true },
  impressions: { value: 245890, change: 5.3, positive: true },
  engagements: { value: 6721, change: -2.1, positive: false },
  likes: { value: 5241, change: 9.2, positive: true },
  comments: { value: 892, change: 3.7, positive: true },
  shares: { value: 431, change: -0.5, positive: false },
  clicks: { value: 2847, change: 18.4, positive: true },
}

const PLATFORMS = [
  { name: 'Instagram', color: '#E1306C', followers: 8420, growth: '+5.2%', posts: 47 },
  { name: 'LinkedIn', color: '#0A66C2', followers: 2841, growth: '+12.8%', posts: 23 },
  { name: 'YouTube', color: '#FF0000', followers: 1586, growth: '+3.1%', posts: 8 },
]

const TOP_POSTS = [
  { title: 'Post sobre lançamento de produto', platform: 'Instagram', likes: 892, comments: 67, reach: 12400 },
  { title: 'Dicas de marketing digital', platform: 'LinkedIn', likes: 341, comments: 88, reach: 8900 },
  { title: 'Vídeo tutorial de design', platform: 'YouTube', likes: 241, comments: 45, reach: 6700 },
  { title: 'Campanha de Black Friday', platform: 'Instagram', likes: 712, comments: 34, reach: 9800 },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30 dias')

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <BarChart2 size={24} color="var(--auryx-purple-light)" /> Analytics
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '4px 0 0' }}>Métricas em tempo real de todas as suas redes sociais</p>
        </div>
        <div style={{ display: 'flex', gap: 6, background: 'var(--bg-surface)', borderRadius: 10, padding: 4, border: '1px solid var(--border)' }}>
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              background: period === p ? 'var(--gradient-brand)' : 'transparent', border: 'none',
              borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: period === p ? 600 : 400,
              color: period === p ? 'white' : 'var(--text-secondary)', transition: 'all 0.15s'
            }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
        {Object.entries(MOCK_METRICS).map(([key, m]) => {
          const icons: Record<string, any> = { followers: Users, reach: Eye, impressions: BarChart2, engagements: Heart, likes: Heart, comments: MessageCircle, shares: Share2, clicks: MousePointer }
          const labels: Record<string, string> = { followers: 'Seguidores', reach: 'Alcance', impressions: 'Impressões', engagements: 'Engajamentos', likes: 'Curtidas', comments: 'Comentários', shares: 'Compartilhamentos', clicks: 'Cliques' }
          const Icon = icons[key]
          return (
            <div key={key} className="glass-card" style={{ padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <Icon size={16} color="var(--auryx-purple-light)" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: m.positive ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                  {m.positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {Math.abs(m.change)}%
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{m.value.toLocaleString('pt-BR')}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{labels[key]}</div>
            </div>
          )
        })}
      </div>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Platform breakdown */}
        <div className="glass-card" style={{ padding: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={16} color="var(--auryx-purple-light)" /> Por Plataforma
          </h3>
          {PLATFORMS.map(plat => (
            <div key={plat.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${plat.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: plat.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{plat.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{plat.posts} posts este período</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{plat.followers.toLocaleString('pt-BR')}</div>
                <div style={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>{plat.growth}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Top posts */}
        <div className="glass-card" style={{ padding: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ArrowUpRight size={16} color="var(--auryx-purple-light)" /> Melhores Posts
          </h3>
          {TOP_POSTS.map((post, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-muted)', minWidth: 20 }}>#{i+1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{post.title}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Heart size={11} /> {post.likes}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MessageCircle size={11} /> {post.comments}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Eye size={11} /> {post.reach.toLocaleString('pt-BR')}</span>
                    <span className="badge badge-purple" style={{ fontSize: 9 }}>{post.platform}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement chart placeholder */}
      <div className="glass-card" style={{ padding: 22 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart2 size={16} color="var(--auryx-purple-light)" /> Engajamento por dia
        </h3>
        <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          {Array.from({ length: 30 }, (_, i) => {
            const h = Math.random() * 80 + 20
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: `${h}%`, borderRadius: '4px 4px 2px 2px', background: `linear-gradient(180deg, rgba(124,58,237,0.8) 0%, rgba(168,85,247,0.4) 100%)`, cursor: 'pointer', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                />
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>1 {['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][new Date().getMonth()]}</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Hoje</span>
        </div>
      </div>
    </div>
  )
}
