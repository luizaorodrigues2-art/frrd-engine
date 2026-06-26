'use client'
import { Users, Plus, Mail, Crown, Shield, Edit, Trash2, Clock } from 'lucide-react'

const MOCK_MEMBERS = [
  { id: '1', name: 'Luiza Rodrigues', email: 'luizaorodrigues2@gmail.com', role: 'owner', avatar: null, lastSeen: 'Agora' },
]

const roleConfig: Record<string, { label: string; color: string; badge: string }> = {
  owner: { label: 'Proprietário', color: '#F59E0B', badge: 'badge-gold' },
  admin: { label: 'Admin', color: '#EF4444', badge: 'badge-red' },
  editor: { label: 'Editor', color: '#7C3AED', badge: 'badge-purple' },
  viewer: { label: 'Visualizador', color: '#06B6D4', badge: 'badge-cyan' },
}

export default function TeamPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Users size={24} color="var(--auryx-purple-light)" /> Equipe
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '4px 0 0' }}>Gerencie os membros da sua equipe</p>
        </div>
        <button className="btn-primary" style={{ gap: 8, fontSize: 13 }}>
          <Plus size={14} /> Convidar membro
        </button>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{MOCK_MEMBERS.length} membro{MOCK_MEMBERS.length !== 1 ? 's' : ''}</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Plano Basic: máximo 1 usuário</span>
        </div>
        {MOCK_MEMBERS.map(member => {
          const rc = roleConfig[member.role]
          return (
            <div key={member.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: 'white', flexShrink: 0 }}>
                {member.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{member.name}</span>
                  <span className={`badge ${rc.badge}`}>{rc.label}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 12, marginTop: 3 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} /> {member.email}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {member.lastSeen}</span>
                </div>
              </div>
              {member.role !== 'owner' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-secondary" style={{ padding: '7px 10px' }}><Edit size={13} /></button>
                  <button style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: '#EF4444', display: 'flex' }}><Trash2 size={13} /></button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="glass-card" style={{ marginTop: 20, padding: 24, background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(245,158,11,0.05))', borderColor: 'rgba(124,58,237,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Crown size={20} color="#F59E0B" />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Expanda sua equipe com o Plano Plus ou Master</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>
          O Plano Plus permite até 5 usuários. O Plano Master permite usuários ilimitados com controles avançados de permissão.
        </p>
        <button className="btn-primary" style={{ gap: 8 }}><Crown size={15} /> Ver planos</button>
      </div>
    </div>
  )
}
