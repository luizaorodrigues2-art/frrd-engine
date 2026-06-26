'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Mail, ArrowLeft, Zap } from 'lucide-react'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/studio/reset-password`
    })
    if (error) { setError(error.message); setLoading(false) }
    else { setSent(true); setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: 400, padding: 40 }}>
        <Link href="/studio/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, marginBottom: 24 }}>
          <ArrowLeft size={15} /> Voltar ao login
        </Link>

        <div style={{ marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 8px 24px rgba(124,58,237,0.4)' }}>
            <Zap size={24} color="white" fill="white" />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Recuperar senha</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            {sent ? `Enviamos as instruções para ${email}` : 'Digite seu email para receber o link de recuperação'}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required className="studio-input" />
            </div>
            {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#EF4444' }}>{error}</div>}
            <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center' }}>
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} />}
              {loading ? 'Enviando...' : 'Enviar instruções'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Mail size={28} color="#10B981" />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>Verifique sua caixa de entrada e siga as instruções no email.</p>
            <button onClick={() => setSent(false)} className="btn-secondary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
              Reenviar email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
