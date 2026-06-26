'use client'
import { useState } from 'react'
import { Globe, Plus, Check, AlertCircle, RefreshCw, Settings, Trash2, ExternalLink, Zap } from 'lucide-react'

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', color: '#E1306C', icon: '📸', desc: 'Conecte sua conta do Instagram Business ou Creator', available: true },
  { id: 'facebook', name: 'Facebook', color: '#1877F2', icon: '👥', desc: 'Páginas do Facebook e grupos', available: true },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', icon: '💼', desc: 'Perfil pessoal e páginas de empresa', available: true },
  { id: 'tiktok', name: 'TikTok', color: '#000000', icon: '🎵', desc: 'Conta criadora do TikTok', available: true },
  { id: 'youtube', name: 'YouTube', color: '#FF0000', icon: '▶️', desc: 'Canal do YouTube', available: true },
  { id: 'twitter', name: 'X / Twitter', color: '#1DA1F2', icon: '🐦', desc: 'Conta do Twitter/X', available: true },
  { id: 'pinterest', name: 'Pinterest', color: '#E60023', icon: '📌', desc: 'Conta do Pinterest Business', available: true },
  { id: 'threads', name: 'Threads', color: '#000000', icon: '🧵', desc: 'Conta do Threads (Meta)', available: true },
  { id: 'google_business', name: 'Google Business', color: '#4285F4', icon: '🏢', desc: 'Google Meu Negócio', available: true },
  { id: 'discord', name: 'Discord', color: '#5865F2', icon: '🎮', desc: 'Servidor do Discord', available: false },
  { id: 'telegram', name: 'Telegram', color: '#26A5E4', icon: '✈️', desc: 'Canal ou grupo do Telegram', available: false },
  { id: 'whatsapp', name: 'WhatsApp Business', color: '#25D366', icon: '💬', desc: 'WhatsApp Business API', available: false },
]

export default function SocialPage() {
  const [connected, setConnected] = useState<string[]>([])
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId)
    // Simulated connection - would trigger OAuth in production
    await new Promise(r => setTimeout(r, 1500))
    setConnected(prev => [...prev, platformId])
    setConnecting(null)
  }

  const handleDisconnect = (platformId: string) => {
    setConnected(prev => prev.filter(p => p !== platformId))
  }

  const isConnected = (id: string) => connected.includes(id)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Globe size={24} color="var(--auryx-purple-light)" /> Redes Sociais
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '6px 0 0' }}>
          Conecte suas redes para publicar, agendar e analisar conteúdo diretamente pelo Feed Engine
        </p>
      </div>

      {/* Stats bar */}
      <div className="glass-card" style={{ padding: '16px 22px', marginBottom: 24, background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.05) 100%)', borderColor: 'rgba(124,58,237,0.2)', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{connected.length}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Contas conectadas</div>
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>0</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Posts agendados</div>
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>0</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Publicados este mês</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <div style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={16} color="#F59E0B" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#F59E0B' }}>Plano Plus ou Master</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>necessário para conectar redes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {PLATFORMS.map(platform => {
          const conn = isConnected(platform.id)
          const loading = connecting === platform.id
          return (
            <div key={platform.id} className="glass-card" style={{ padding: '20px 22px', opacity: !platform.available ? 0.6 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${platform.color}22`, border: `1px solid ${platform.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                    {platform.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{platform.name}</div>
                    {!platform.available && <span className="badge badge-gold" style={{ fontSize: 9, marginTop: 3 }}>Em breve</span>}
                    {conn && <span className="badge badge-green" style={{ fontSize: 9, marginTop: 3 }}>Conectado</span>}
                  </div>
                </div>
                {conn && (
                  <button onClick={() => handleDisconnect(platform.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: '#EF4444', display: 'flex' }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>{platform.desc}</p>
              {conn ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-secondary" style={{ flex: 1, fontSize: 12, padding: '8px', justifyContent: 'center' }}>
                    <RefreshCw size={13} /> Sincronizar
                  </button>
                  <button className="btn-secondary" style={{ padding: '8px 10px' }}>
                    <Settings size={13} />
                  </button>
                </div>
              ) : (
                <button onClick={() => platform.available && handleConnect(platform.id)} disabled={!platform.available || loading}
                  className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '10px', opacity: !platform.available ? 0.5 : 1 }}>
                  {loading ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
                  {loading ? 'Conectando...' : platform.available ? 'Conectar' : 'Em breve'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
