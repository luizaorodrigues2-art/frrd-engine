import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Shield, Users, Database, Activity, Crown, Zap } from 'lucide-react'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from('profiles').select('is_super_admin').eq('id', user!.id).single()

  if (!(profile as any)?.is_super_admin) redirect('/studio/dashboard')

  const [tenantsRes, usersRes, contentRes, generationsRes] = await Promise.all([
    supabase.from('tenants').select('id, name, plan, created_at', { count: 'exact' }),
    supabase.from('profiles').select('id', { count: 'exact' }),
    supabase.from('content_items').select('id', { count: 'exact' }),
    supabase.from('ai_generations').select('id, tokens_used', { count: 'exact' }),
  ])

  const stats = [
    { label: 'Total de Tenants', value: tenantsRes.count || 0, icon: Database, color: '#7C3AED' },
    { label: 'Total de Usuários', value: usersRes.count || 0, icon: Users, color: '#10B981' },
    { label: 'Conteúdos Criados', value: contentRes.count || 0, icon: Activity, color: '#F59E0B' },
    { label: 'Gerações de IA', value: generationsRes.count || 0, icon: Zap, color: '#EC4899' },
  ]

  const planColors: Record<string, string> = { basic: '#06B6D4', plus: '#A855F7', master: '#F59E0B', admin: '#EF4444' }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={20} color="#EF4444" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Admin Panel</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>Super Administrador — Acesso total ao sistema</p>
          </div>
          <span className="badge badge-red" style={{ marginLeft: 8 }}>Super Admin</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map(stat => (
          <div key={stat.label} className="glass-card" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${stat.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={18} color={stat.color} />
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{stat.value.toLocaleString('pt-BR')}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tenants list */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Tenants ({tenantsRes.count || 0})</h2>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Nome', 'Plano', 'Criado em'].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(tenantsRes.data || []).map((tenant: any) => (
              <tr key={tenant.id} style={{ borderBottom: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px 20px', fontWeight: 500 }}>{tenant.name}</td>
                <td style={{ padding: '12px 20px' }}>
                  <span className="badge" style={{ background: `${planColors[tenant.plan] || '#7C3AED'}22`, color: planColors[tenant.plan] || '#7C3AED', borderColor: `${planColors[tenant.plan] || '#7C3AED'}44`, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Crown size={9} /> {tenant.plan}
                  </span>
                </td>
                <td style={{ padding: '12px 20px', color: 'var(--text-muted)' }}>{new Date(tenant.created_at).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
