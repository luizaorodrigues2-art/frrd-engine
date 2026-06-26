'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Settings, User, Bell, Shield, CreditCard, Key, Palette, Globe, LogOut, Camera, Loader2, Check, Trash2, Crown, Users, Eye, EyeOff } from 'lucide-react'

const TABS = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'account', label: 'Conta', icon: Settings },
  { id: 'billing', label: 'Plano & Pagamento', icon: CreditCard },
  { id: 'security', label: 'Segurança', icon: Shield },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'team', label: 'Equipe', icon: Users },
  { id: 'appearance', label: 'Aparência', icon: Palette },
]

const PLANS = [
  { id: 'basic', name: 'Basic', price: 'R$ 39,90/mês', color: '#06B6D4', features: ['50 GB armazenamento', '1 usuário', 'Editor IA', 'Posts ilimitados', 'Templates básicos'] },
  { id: 'plus', name: 'Plus', price: 'R$ 99,90/mês', color: '#A855F7', popular: true, features: ['200 GB armazenamento', '5 usuários', 'Redes sociais', 'Campanhas ilimitadas', 'Analytics avançado', 'Brand Kit completo'] },
  { id: 'master', name: 'Master', price: 'R$ 199,90/mês', color: '#F59E0B', features: ['Armazenamento ilimitado', 'Usuários ilimitados', '12 Agentes IA', 'IA treinável', 'White Label', 'API & Webhooks'] },
]

export default function SettingsPage() {
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ full_name: '', company: '', phone: '', job_title: '', bio: '', website: '' })

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('profiles').select('*, tenants(*)').eq('id', user.id).single()
        const d = data as any
        setProfile(d)
        setForm({ full_name: d?.full_name || '', company: d?.company || '', phone: d?.phone || '', job_title: d?.job_title || '', bio: d?.bio || '', website: d?.website || '' })
      }
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await (supabase.from('profiles') as any).update(form).eq('id', user.id)
    }
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))
  const tenant = profile?.tenants

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Settings size={24} color="var(--auryx-purple-light)" /> Configurações
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
        {/* Sidebar tabs */}
        <div className="glass-card" style={{ padding: 12, height: 'fit-content' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: 'none',
              background: activeTab === tab.id ? 'rgba(124,58,237,0.15)' : 'transparent',
              color: activeTab === tab.id ? '#A855F7' : 'var(--text-secondary)', cursor: 'pointer', fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400, transition: 'all 0.15s', textAlign: 'left'
            }}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="glass-card" style={{ padding: 28 }}>
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 24px' }}>Editar Perfil</h2>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: 'white', overflow: 'hidden' }}>
                    {profile?.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (form.full_name?.[0] || 'A').toUpperCase()}
                  </div>
                  <button style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--gradient-brand)', border: '2px solid var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Camera size={13} color="white" />
                  </button>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>{form.full_name || 'Seu nome'}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Clique no ícone para alterar a foto</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {[
                  { k: 'full_name', label: 'Nome completo', placeholder: 'Seu nome' },
                  { k: 'company', label: 'Empresa', placeholder: 'Sua empresa' },
                  { k: 'phone', label: 'Telefone', placeholder: '+55 (11) 9xxxx-xxxx' },
                  { k: 'job_title', label: 'Cargo', placeholder: 'Seu cargo' },
                  { k: 'website', label: 'Website', placeholder: 'https://seusite.com' },
                ].map(f => (
                  <div key={f.k}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{f.label}</label>
                    <input value={form[f.k as keyof typeof form]} onChange={set(f.k)} placeholder={f.placeholder} className="studio-input" style={{ fontSize: 13 }} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Bio</label>
                <textarea value={form.bio} onChange={set('bio')} placeholder="Uma breve descrição sobre você..." rows={3}
                  className="studio-input" style={{ fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <button onClick={handleSave} disabled={saving} className="btn-primary">
                {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : null}
                {saved ? 'Salvo!' : saving ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === 'billing' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>Plano & Pagamento</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 28 }}>
                Plano atual: <strong>{tenant?.plan || 'basic'}</strong> · {tenant?.subscription_status === 'trialing' ? 'Período gratuito' : 'Assinatura ativa'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {PLANS.map(plan => {
                  const isCurrent = tenant?.plan === plan.id
                  return (
                    <div key={plan.id} style={{
                      background: isCurrent ? `${plan.color}18` : 'var(--bg-surface)',
                      border: `1px solid ${isCurrent ? plan.color + '44' : 'var(--border)'}`,
                      borderRadius: 16, padding: 24, position: 'relative'
                    }}>
                      {plan.popular && <span className="badge badge-purple" style={{ position: 'absolute', top: 14, right: 14 }}>Popular</span>}
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: plan.color, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Crown size={16} /> {plan.name}
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 0' }}>{plan.price}</div>
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                        {plan.features.map(f => (
                          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13 }}>
                            <Check size={13} color="#10B981" /> {f}
                          </li>
                        ))}
                      </ul>
                      <button disabled={isCurrent} style={{
                        width: '100%', padding: '10px', borderRadius: 10, cursor: isCurrent ? 'default' : 'pointer',
                        background: isCurrent ? 'transparent' : `linear-gradient(135deg, ${plan.color}, ${plan.color}BB)`,
                        border: isCurrent ? `1px solid ${plan.color}55` : 'none',
                        color: isCurrent ? plan.color : 'white', fontSize: 14, fontWeight: 700, transition: 'opacity 0.15s'
                      }}>
                        {isCurrent ? '✓ Plano atual' : 'Assinar agora'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 24px' }}>Segurança</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { title: 'Alterar senha', desc: 'Atualize sua senha de acesso', action: 'Alterar' },
                  { title: 'Trocar email', desc: 'Altere o email associado à sua conta', action: 'Alterar' },
                  { title: 'Autenticação em dois fatores', desc: 'Adicione uma camada extra de segurança', action: 'Ativar' },
                  { title: 'Sessões ativas', desc: 'Veja e gerencie seus dispositivos conectados', action: 'Gerenciar' },
                  { title: 'Logout de todos os dispositivos', desc: 'Encerre todas as sessões ativas imediatamente', action: 'Desconectar tudo', danger: true },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                    <button className={item.danger ? '' : 'btn-secondary'} style={item.danger ? { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', color: '#EF4444', fontSize: 13, fontWeight: 500 } : { fontSize: 13 }}>
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, padding: 20, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#EF4444', margin: '0 0 8px' }}>Zona de Perigo</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Esta ação é irreversível. Todos os seus dados serão permanentemente deletados.</p>
                <button style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', color: '#EF4444', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Trash2 size={14} /> Excluir minha conta
                </button>
              </div>
            </div>
          )}

          {/* API KEYS TAB */}
          {activeTab === 'api' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>API Keys</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>Crie chaves de API para integrar o Feed Engine com seus sistemas</p>
              <button className="btn-primary" style={{ marginBottom: 24 }}><Key size={15} /> Criar nova API Key</button>
              <div style={{ padding: '32px', background: 'var(--bg-surface)', borderRadius: 12, textAlign: 'center' }}>
                <Key size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Nenhuma API key criada. Crie uma para integrar com sistemas externos.</p>
              </div>
            </div>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 24px' }}>Aparência</h2>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 14 }}>Tema</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[{ id: 'dark', label: '🌙 Escuro', desc: 'Ideal para trabalhar' }, { id: 'light', label: '☀️ Claro', desc: 'Para ambientes iluminados' }].map(t => (
                    <div key={t.id} style={{ flex: 1, padding: 16, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{t.label.split(' ')[0]}</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{t.label.split(' ').slice(1).join(' ')}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 14 }}>Idioma</label>
                <select className="studio-input" style={{ fontSize: 13 }}>
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          )}

          {/* OTHER TABS PLACEHOLDER */}
          {!['profile', 'billing', 'security', 'api', 'appearance'].includes(activeTab) && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Settings size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>Em desenvolvimento</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Esta seção estará disponível em breve.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
