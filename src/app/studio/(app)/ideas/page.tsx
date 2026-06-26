'use client'
import { useState } from 'react'
import { Lightbulb, Plus, Sparkles, Search, Star, ArrowRight, Flame, Clock, Tag } from 'lucide-react'
import Link from 'next/link'

const MOCK_IDEAS = [
  { id: '1', title: 'Série de Bastidores', desc: 'Mostrar o processo de criação dos produtos/serviços', platforms: ['instagram', 'tiktok'], priority: 'high', status: 'new', tags: ['autenticidade', 'bastidores'] },
  { id: '2', title: 'Tutorial Semana', desc: 'Tutorial educativo semanal relacionado ao nicho', platforms: ['youtube', 'instagram'], priority: 'medium', status: 'in_progress', tags: ['educação', 'tutorial'] },
  { id: '3', title: 'Depoimentos de Clientes', desc: 'Série de posts com histórias de sucesso de clientes', platforms: ['instagram', 'linkedin'], priority: 'high', status: 'new', tags: ['social proof', 'depoimentos'] },
  { id: '4', title: 'Conteúdo Sazonal Julho', desc: 'Aproveitar as datas comemorativas de julho', platforms: ['instagram', 'facebook'], priority: 'low', status: 'new', tags: ['sazonal', 'julho'] },
  { id: '5', title: 'FAQ em Carrossel', desc: 'Responder as perguntas frequentes em formato carrossel', platforms: ['instagram', 'linkedin'], priority: 'medium', status: 'done', tags: ['educação', 'faq'] },
]

const priorityConfig: Record<string, { label: string; color: string; badge: string }> = {
  high: { label: 'Alta', color: '#EF4444', badge: 'badge-red' },
  medium: { label: 'Média', color: '#F59E0B', badge: 'badge-gold' },
  low: { label: 'Baixa', color: '#10B981', badge: 'badge-green' },
}

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'Nova', color: '#7C3AED' },
  in_progress: { label: 'Em andamento', color: '#F59E0B' },
  done: { label: 'Concluída', color: '#10B981' },
}

export default function IdeasPage() {
  const [search, setSearch] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [newIdea, setNewIdea] = useState({ title: '', desc: '' })

  const filtered = MOCK_IDEAS.filter(i => i.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Lightbulb size={24} color="var(--auryx-purple-light)" /> Banco de Ideias
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '4px 0 0' }}>Capture e organize suas ideias de conteúdo</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/studio/create?prompt=Gere 10 ideias de conteúdo criativas para redes sociais">
            <button className="btn-secondary" style={{ gap: 8, fontSize: 13 }}><Sparkles size={14} /> Gerar com IA</button>
          </Link>
          <button onClick={() => setShowNew(!showNew)} className="btn-primary" style={{ gap: 8, fontSize: 13 }}><Plus size={14} /> Nova Ideia</button>
        </div>
      </div>

      {showNew && (
        <div className="glass-card" style={{ padding: 24, marginBottom: 20, borderColor: 'rgba(124,58,237,0.3)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>Nova ideia</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input value={newIdea.title} onChange={e => setNewIdea(f => ({ ...f, title: e.target.value }))} placeholder="Título da ideia" className="studio-input" style={{ fontSize: 13 }} />
            <textarea value={newIdea.desc} onChange={e => setNewIdea(f => ({ ...f, desc: e.target.value }))} placeholder="Descreva a ideia..." rows={2} className="studio-input" style={{ fontSize: 13, resize: 'none', fontFamily: 'inherit' }} />
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-primary" style={{ fontSize: 13 }}>Salvar ideia</button>
              <button onClick={() => setShowNew(false)} className="btn-secondary" style={{ fontSize: 13 }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 360, marginBottom: 20 }}>
        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar ideias..." className="studio-input" style={{ paddingLeft: 36, height: 40, fontSize: 13 }} />
      </div>

      {/* Ideas grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {filtered.map(idea => {
          const pri = priorityConfig[idea.priority]
          const sta = statusConfig[idea.status]
          return (
            <div key={idea.id} className="glass-card" style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className={`badge ${pri.badge}`}>{pri.label}</span>
                  <span className="badge" style={{ background: `${sta.color}22`, color: sta.color, borderColor: `${sta.color}44` }}>{sta.label}</span>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}>
                  <Star size={15} />
                </button>
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>{idea.title}</h3>
              <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{idea.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {idea.tags.map(tag => (
                  <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '2px 8px', fontSize: 11, color: 'var(--text-muted)' }}>
                    <Tag size={9} /> {tag}
                  </span>
                ))}
              </div>
              <Link href={`/studio/create?prompt=Crie conteúdo baseado nesta ideia: ${idea.title} - ${idea.desc}`}>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '8px' }}>
                  <Sparkles size={13} /> Criar conteúdo <ArrowRight size={13} />
                </button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
