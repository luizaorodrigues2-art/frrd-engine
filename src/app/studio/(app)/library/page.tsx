'use client'
import { useState } from 'react'
import { Library, Upload, Search, Grid, List, Filter, Image, Video, FileText, Music, Folder, Star, Trash2, Download, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  { id: 'all', label: 'Tudo', icon: Grid },
  { id: 'image', label: 'Imagens', icon: Image },
  { id: 'video', label: 'Vídeos', icon: Video },
  { id: 'template', label: 'Templates', icon: FileText },
  { id: 'audio', label: 'Áudios', icon: Music },
]

const MOCK_ASSETS = [
  { id: '1', name: 'Banner Instagram.png', type: 'image', size: '2.4 MB', thumb: null, created: '2026-06-20', favorite: true },
  { id: '2', name: 'Post Produto.jpg', type: 'image', size: '1.8 MB', thumb: null, created: '2026-06-18', favorite: false },
  { id: '3', name: 'Story Promo.mp4', type: 'video', size: '12 MB', thumb: null, created: '2026-06-15', favorite: false },
  { id: '4', name: 'Template Carrossel.png', type: 'template', size: '0.8 MB', thumb: null, created: '2026-06-12', favorite: true },
  { id: '5', name: 'Logo Principal.svg', type: 'image', size: '0.1 MB', thumb: null, created: '2026-06-10', favorite: true },
  { id: '6', name: 'Vídeo Produto.mp4', type: 'video', size: '45 MB', thumb: null, created: '2026-06-08', favorite: false },
]

export default function LibraryPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = MOCK_ASSETS.filter(a =>
    (category === 'all' || a.type === category) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  const typeColors: Record<string, string> = { image: '#7C3AED', video: '#EF4444', template: '#F59E0B', audio: '#10B981' }
  const typeIcons: Record<string, any> = { image: Image, video: Video, template: FileText, audio: Music }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Library size={24} color="var(--auryx-purple-light)" /> Biblioteca
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '4px 0 0' }}>Todos os seus assets, imagens, vídeos e templates</p>
        </div>
        <button className="btn-primary" style={{ gap: 8 }}>
          <Upload size={15} /> Upload
        </button>
      </div>

      {/* Filters bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar arquivos..." className="studio-input" style={{ paddingLeft: 36, height: 40, fontSize: 13 }} />
        </div>
        <div style={{ display: 'flex', gap: 6, background: 'var(--bg-surface)', borderRadius: 10, padding: 4, border: '1px solid var(--border)' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
              background: category === cat.id ? 'var(--gradient-brand)' : 'transparent', border: 'none', borderRadius: 7,
              padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: category === cat.id ? 600 : 400,
              color: category === cat.id ? 'white' : 'var(--text-secondary)', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 5
            }}>
              <cat.icon size={12} /> {cat.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          <button onClick={() => setView('grid')} style={{ background: view === 'grid' ? 'var(--gradient-brand)' : 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px', cursor: 'pointer', color: view === 'grid' ? 'white' : 'var(--text-muted)', display: 'flex' }}>
            <Grid size={15} />
          </button>
          <button onClick={() => setView('list')} style={{ background: view === 'list' ? 'var(--gradient-brand)' : 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px', cursor: 'pointer', color: view === 'list' ? 'white' : 'var(--text-muted)', display: 'flex' }}>
            <List size={15} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {/* Upload card */}
          <div style={{ border: '2px dashed var(--border)', borderRadius: 12, padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <Upload size={28} color="var(--text-muted)" />
            <span style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>Arrastar ou clicar para enviar</span>
          </div>
          {filtered.map(asset => {
            const Icon = typeIcons[asset.type] || FileText
            return (
              <div key={asset.id} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Thumbnail */}
                <div style={{ height: 130, background: `${typeColors[asset.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Icon size={36} color={typeColors[asset.type]} style={{ opacity: 0.6 }} />
                  {asset.favorite && <Star size={14} style={{ position: 'absolute', top: 8, right: 8 }} color="#F59E0B" fill="#F59E0B" />}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>{asset.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{asset.size}</span>
                    <span>{asset.created}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Nome', 'Tipo', 'Tamanho', 'Data', 'Ações'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(asset => {
                const Icon = typeIcons[asset.type] || FileText
                return (
                  <tr key={asset.id} style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${typeColors[asset.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={14} color={typeColors[asset.type]} />
                      </div>
                      {asset.name}
                    </td>
                    <td style={{ padding: '12px 16px' }}><span className={`badge badge-${asset.type === 'image' ? 'purple' : asset.type === 'video' ? 'red' : 'gold'}`} style={{ fontSize: 10 }}>{asset.type}</span></td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{asset.size}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{asset.created}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 7px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><Download size={13} /></button>
                        <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 7px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
