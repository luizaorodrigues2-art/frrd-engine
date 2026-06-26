'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Loader2, Zap, Check } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [form, setForm] = useState({ full_name: '', email: '', company: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const passwordStrength = (p: string) => {
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^a-zA-Z0-9]/.test(p)) score++
    return score
  }

  const strength = passwordStrength(form.password)
  const strengthColors = ['#EF4444', '#F97316', '#F59E0B', '#10B981']
  const strengthLabels = ['Fraca', 'Regular', 'Boa', 'Forte']

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Senhas não coincidem'); return }
    if (strength < 2) { setError('Use uma senha mais forte (mín. 8 caracteres, letras e números)'); return }
    setLoading(true); setError('')
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.full_name, company: form.company } }
    })
    if (error) { setError(error.message); setLoading(false) }
    else { setSuccess(true); setLoading(false) }
  }

  if (success) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="glass-card animate-fade-in" style={{ maxWidth: 420, width: '100%', padding: 40, textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check size={36} color="#10B981" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Conta criada!</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
          Enviamos um email de confirmação para <strong>{form.email}</strong>. Verifique sua caixa de entrada para ativar sua conta.
        </p>
        <Link href="/studio/login">
          <button className="btn-primary" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>Ir para o Login</button>
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: 460, padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, margin: '0 auto 14px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(124,58,237,0.4)' }}>
            <Zap size={24} color="white" fill="white" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }} className="gradient-text">Criar conta gratuita</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 13 }}>14 dias grátis, sem cartão de crédito</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>Nome completo</label>
              <input value={form.full_name} onChange={set('full_name')} placeholder="Seu nome" required className="studio-input" style={{ fontSize: 13, padding: '10px 12px' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>Empresa</label>
              <input value={form.company} onChange={set('company')} placeholder="Sua empresa" className="studio-input" style={{ fontSize: 13, padding: '10px 12px' }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>Email</label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="seu@email.com" required className="studio-input" style={{ fontSize: 13 }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>Senha</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Mínimo 8 caracteres" required className="studio-input" style={{ paddingRight: 44, fontSize: 13 }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {form.password && (
              <div style={{ marginTop: 8, display: 'flex', gap: 4, alignItems: 'center' }}>
                {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthColors[strength-1] : 'var(--border)', transition: 'background 0.3s' }} />)}
                <span style={{ fontSize: 11, color: strengthColors[strength-1] || 'var(--text-muted)', marginLeft: 6, minWidth: 40 }}>{strengthLabels[strength-1] || ''}</span>
              </div>
            )}
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>Confirmar senha</label>
            <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repita a senha" required className="studio-input" style={{ fontSize: 13 }} />
          </div>

          {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#EF4444' }}>{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? 'Criando conta...' : 'Criar conta grátis'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Ao criar uma conta, você concorda com os{' '}
          <a href="#" style={{ color: 'var(--auryx-purple-light)', textDecoration: 'none' }}>Termos de Uso</a>
          {' '}e{' '}
          <a href="#" style={{ color: 'var(--auryx-purple-light)', textDecoration: 'none' }}>Política de Privacidade</a>
        </p>
        <p style={{ textAlign: 'center', marginTop: 12, fontSize: 14, color: 'var(--text-secondary)' }}>
          Já tem conta?{' '}
          <Link href="/studio/login" style={{ color: 'var(--auryx-purple-light)', fontWeight: 600, textDecoration: 'none' }}>Entrar</Link>
        </p>
      </div>
    </div>
  )
}
