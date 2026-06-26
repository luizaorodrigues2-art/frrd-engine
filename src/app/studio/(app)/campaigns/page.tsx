'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Megaphone, Plus, Search, Filter, BarChart2, Calendar, Globe, ChevronRight, Play, Pause, Archive, Trash2, Sparkles } from 'lucide-react'

const MOCK_CAMPAIGNS = [
  { id: '1', name: 'Lançamento de Produto - Julho', status: 'active', platforms: ['instagram', 'facebook'], start: '2026-07-01', end: '2026-07-31', posts: 24, budget: 2500, reach: 48200 },
  { id: '2', name: 'Black Friday 2026', status: 'draft', platforms: ['instagram', 'facebook', 'tiktok'], start: '2026-11-20', end: '2026-11-30', posts: 0, budget: 5000, reach: 0 },
  { id: '3', name: 'Campanha de Verão', status: 'completed', platforms: ['instagram', 'youtube'], start: '2026-01-01', end: '2026-03-01', posts: 60, budget: 3200, reach: 124800 },
  { id: '4', name: 'Branding Institucional', status: 'paused', platforms: ['linkedin'], start: '2026-06-01', end: '2026-08-01', posts: 12, budget: 0, reach: 8900 },
]

const STATUS_CONFIG: Record<string, { label: string; badge: string; color: string }> = {
  active: { label: 'Ativa', badge: 'badge-green', color: '#10B981' },
  draft: { label: 'Rascunho', badge: 'badge-cyan', color: '#06B6D4' },
  completed: { label: 'Concluída', badge: 'badge-purple', color: '#A855F7' },
  paused: { label: 'Pausada', badge: 'badge-gold', color: '#F59E0B' },
  archived: { label: 'Arquivada', badge: 'badge-red', color: '#EF4444' },
}

export default function CampaignsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = MOCK_CAMPAIGNS.filter(c =>
    (filter === 'all' || c.status === filter) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Megaphone size={24} color="var(--auryx-purple-light)" /> Campanhas
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '4px 0 0' }}>Gerencie todas as suas campanhas de marketing</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/studio/create?prompt=Crie uma campanha completa de marketing">
            <button className="btn-secondary" style={{ gap: 8, fontSize: 13 }}>
              <Sparkles size={14} /> Criar com IA
            </button>
          </Link>
          <button className="btn-primary" style={{ gap: 8, fontSize: 13 }}>
            <Plus size={14} /> Nova Campanha
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar campanhas..." className="studio-input" style={{ paddingLeft: 36, height: 40, fontSize: 13 }} />
        </div>
        <div style={{ display: 'flex', gap: 6, background: 'var(--bg-surface)', borderRadius: 10, padding: 4, border: '1px solid var(--border)' }}>
          {['all', 'active', 'draft', 'paused', 'completed'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              background: filter === s ? 'var(--gradient-brand)' : 'transparent', border: 'none', borderRadius: 7,
              padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: filter === s ? 600 : 400,
              color: filter === s ? 'white' : 'var(--text-secondary)', transition: 'all 0.15s', whiteSpace: 'nowrap'
            }}>
              {{ all: 'Todas', active: 'Ativas', draft: 'Rascunho', paused: 'Pausadas', completed: 'Concluídas' }[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns list */}
      {filtered.length === 0 ? (
        <div className="glass-card" style={{ padding: '60px 24px', textAlign: 'center' }}>
          <Megaphone size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Nenhuma campanha encontrada</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Crie sua primeira campanha com IA ou manualmente</p>
          <button className="btn-primary" style={{ marginTop: 20 }}><Plus size={15} /> Nova Campanha</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(campaign => {
            const config = STATUS_CONFIG[campaign.status]
            return (
              <div key={campaign.id} className="glass-card" style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: `${config.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Megaphone size={22} color={config.color} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{campaign.name}</h3>
                        <span className={`badge ${config.badge}`}>{config.label}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} /> {campaign.start} – {campaign.end}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><BarChart2 size={11} /> {campaign.posts} posts</span>
                        {campaign.reach > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Globe size={11} /> {campaign.reach.toLocaleString('pt-BR')} alcance</span>}
                        {campaign.budget > 0 && <span>💰 R$ {campaign.budget.toLocaleString('pt-BR')}</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {campaign.status === 'active' && (
                      <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: 12 }}><Pause size={13} /> Pausar</button>
                    )}
                    {campaign.status === 'paused' && (
                      <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: 12 }}><Play size={13} /> Retomar</button>
                    )}
                    {campaign.status === 'draft' && (
                      <button className="btn-primary" style={{ padding: '8px 12px', fontSize: 12 }}><Play size={13} /> Ativar</button>
                    )}
                    <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: 12 }}>
                      <BarChart2 size={13} /> Métricas
                    </button>
                    <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '8px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', transition: 'all 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
