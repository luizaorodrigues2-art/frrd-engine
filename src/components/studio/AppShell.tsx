'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Sparkles, Image, Video, Megaphone, Calendar,
  BarChart2, Users, Settings, Library, Lightbulb, Bot, Globe,
  ChevronLeft, ChevronRight, LogOut, Bell, Search, Moon, Sun,
  Zap, Plus, Crown, Shield
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/studio/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/studio/create', icon: Sparkles, label: 'Criar com IA', highlight: true },
  { href: '/studio/editor', icon: Image, label: 'Editor' },
  { href: '/studio/campaigns', icon: Megaphone, label: 'Campanhas' },
  { href: '/studio/calendar', icon: Calendar, label: 'Calendário' },
  { href: '/studio/library', icon: Library, label: 'Biblioteca' },
  { href: '/studio/analytics', icon: BarChart2, label: 'Analytics' },
  { href: '/studio/social', icon: Globe, label: 'Redes Sociais' },
  { href: '/studio/ideas', icon: Lightbulb, label: 'Banco de Ideias' },
  { href: '/studio/agents', icon: Bot, label: 'Agentes IA' },
  { href: '/studio/team', icon: Users, label: 'Equipe' },
]

const ADMIN_ITEMS = [
  { href: '/studio/admin', icon: Shield, label: 'Admin Panel' },
]

interface AppShellProps {
  user: any
  profile: any
  children: React.ReactNode
}

export default function StudioAppShell({ user, profile, children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [notifications, setNotifications] = useState(3)

  const tenant = profile?.tenants
  const plan = tenant?.plan || 'basic'
  const isSuperAdmin = profile?.is_super_admin

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/studio/login')
  }

  const planColors: Record<string, string> = { basic: '#06B6D4', plus: '#A855F7', master: '#F59E0B', admin: '#EF4444' }
  const planLabels: Record<string, string> = { basic: 'Basic', plus: 'Plus', master: 'Master', admin: 'Admin' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 40 }} />
      )}

      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 260, minWidth: collapsed ? 64 : 260,
        background: 'rgba(5,5,15,0.95)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Logo area */}
        <div style={{ padding: collapsed ? '20px 12px' : '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
              <Zap size={18} color="white" fill="white" />
            </div>
            {!collapsed && <div>
              <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.5px' }} className="gradient-text">AURYX</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '2px', marginTop: -2 }}>STUDIO</div>
            </div>}
          </div>
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 6px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Create button */}
        {!collapsed && (
          <div style={{ padding: '12px 16px' }}>
            <Link href="/studio/create">
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13, gap: 8 }}>
                <Plus size={15} /> Criar com IA
              </button>
            </Link>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: collapsed ? '8px 8px' : '8px 10px', overflowY: 'auto', overflowX: 'hidden' }}>
          {NAV_ITEMS.map(item => {
            const active = pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: collapsed ? '10px 10px' : '9px 12px', borderRadius: 10,
                  background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
                  border: active ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                  color: active ? '#A855F7' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.15s ease',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' } }}
                >
                  <item.icon size={17} style={{ flexShrink: 0 }} />
                  {!collapsed && <span style={{ fontSize: 13.5, fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>{item.label}</span>}
                  {!collapsed && item.highlight && <span className="badge badge-purple" style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 7px' }}>IA</span>}
                </div>
              </Link>
            )
          })}

          {isSuperAdmin && (
            <>
              <div style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />
              {ADMIN_ITEMS.map(item => {
                const active = pathname.startsWith(item.href)
                return (
                  <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '10px 10px' : '9px 12px', borderRadius: 10,
                      background: active ? 'rgba(239,68,68,0.1)' : 'transparent', border: active ? '1px solid rgba(239,68,68,0.2)' : '1px solid transparent',
                      color: active ? '#EF4444' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s ease',
                      justifyContent: collapsed ? 'center' : 'flex-start'
                    }}>
                      <item.icon size={17} style={{ flexShrink: 0 }} />
                      {!collapsed && <span style={{ fontSize: 13.5, fontWeight: active ? 600 : 400 }}>{item.label}</span>}
                    </div>
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* Settings & plan */}
        <div style={{ borderTop: '1px solid var(--border)', padding: collapsed ? '12px 8px' : '12px 12px' }}>
          {!collapsed && (
            <div style={{ background: 'var(--gradient-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Plano atual</span>
                <span className="badge" style={{ background: `${planColors[plan]}22`, color: planColors[plan], borderColor: `${planColors[plan]}44`, fontSize: 10 }}>
                  <Crown size={9} /> {planLabels[plan]}
                </span>
              </div>
              {tenant && (
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {((tenant.storage_used_bytes || 0) / 1073741824).toFixed(1)} GB de {((tenant.storage_limit_bytes || 53687091200) / 1073741824).toFixed(0)} GB
                </div>
              )}
              {plan !== 'master' && (
                <Link href="/studio/settings/billing">
                  <button style={{ marginTop: 8, background: 'var(--gradient-brand)', border: 'none', borderRadius: 7, padding: '5px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', color: 'white', width: '100%' }}>
                    Fazer Upgrade
                  </button>
                </Link>
              )}
            </div>
          )}

          <Link href="/studio/settings" style={{ textDecoration: 'none', display: 'block', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s', justifyContent: collapsed ? 'center' : 'flex-start' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Settings size={16} />
              {!collapsed && <span style={{ fontSize: 13 }}>Configurações</span>}
            </div>
          </Link>

          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.15s', justifyContent: collapsed ? 'center' : 'flex-start' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#EF4444' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <LogOut size={16} />
            {!collapsed && <span style={{ fontSize: 13 }}>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: collapsed ? 64 : 260, transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top bar */}
        <header style={{
          height: 64, background: 'rgba(5,5,15,0.9)', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', paddingLeft: 24, paddingRight: 24,
          gap: 16, position: 'sticky', top: 0, zIndex: 30, backdropFilter: 'blur(20px)'
        }}>
          {/* Search */}
          <div style={{ flex: 1, maxWidth: 440, position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input placeholder="Buscar conteúdo, campanhas, projetos..." className="studio-input" style={{ paddingLeft: 36, height: 38, fontSize: 13, background: 'var(--bg-surface)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            {/* Theme toggle */}
            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 9px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Notifications */}
            <button style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 9px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', position: 'relative' }}>
              <Bell size={15} />
              {notifications > 0 && <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: '50%', background: '#EF4444', border: '1.5px solid var(--bg-primary)' }} />}
            </button>

            {/* Avatar */}
            <Link href="/studio/settings/profile">
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: 'white', overflow: 'hidden' }}>
                {profile?.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (profile?.full_name?.[0] || user.email?.[0] || 'A').toUpperCase()}
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
