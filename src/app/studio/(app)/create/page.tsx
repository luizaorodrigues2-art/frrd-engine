'use client'
export const dynamic = 'force-dynamic'
import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Sparkles, Send, Loader2, Image, Video, FileText, Megaphone,
  Palette, Globe, Layout, Mail, Smartphone, Monitor, Zap, Copy,
  Download, Edit, RefreshCw, ChevronDown, ChevronRight, X
} from 'lucide-react'

const CONTENT_TYPES = [
  { id: 'post', label: 'Post', icon: '📸', desc: 'Instagram, Facebook, LinkedIn' },
  { id: 'story', label: 'Story', icon: '📱', desc: 'Instagram, Facebook' },
  { id: 'reel', label: 'Reels/Shorts', icon: '🎬', desc: 'Instagram, TikTok, YouTube' },
  { id: 'carousel', label: 'Carrossel', icon: '🎠', desc: 'Instagram, LinkedIn' },
  { id: 'banner', label: 'Banner', icon: '🖼️', desc: 'Anúncios, Sites' },
  { id: 'logo', label: 'Logo/Marca', icon: '🎨', desc: 'Identidade visual' },
  { id: 'flyer', label: 'Flyer', icon: '📄', desc: 'Promoções, eventos' },
  { id: 'email', label: 'E-mail', icon: '📧', desc: 'Marketing por email' },
  { id: 'ad', label: 'Anúncio', icon: '📢', desc: 'Meta Ads, Google Ads' },
  { id: 'presentation', label: 'Apresentação', icon: '🎯', desc: 'Slides, pitch' },
  { id: 'campaign', label: 'Campanha', icon: '🚀', desc: 'Campanha completa' },
  { id: 'calendar', label: '365 Posts', icon: '📅', desc: 'Um ano de conteúdo' },
]

const EXAMPLE_PROMPTS = [
  'Crie um post premium para Instagram sobre lançamento de produto de skincare vegano com um visual sofisticado e elegante',
  'Crie uma campanha completa de 30 dias para um restaurante italiano com foco em delivery',
  'Gere uma identidade visual completa para uma startup de tecnologia financeira',
  'Crie 10 stories criativos para promover uma academia fitness',
  'Desenvolva um carrossel educativo sobre marketing digital para LinkedIn',
  'Crie um banner para anúncio no Google Ads para uma imobiliária de luxo',
]

interface Message {
  role: 'user' | 'assistant'
  content: string
  type?: 'text' | 'image' | 'design' | 'campaign'
  data?: any
}

export default function CreatePage() {
  const params = useSearchParams()
  const [prompt, setPrompt] = useState(params.get('prompt') || '')
  const [selectedType, setSelectedType] = useState('post')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  useEffect(() => {
    if (params.get('prompt')) handleSubmit()
  }, [])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!prompt.trim() || loading) return

    const userMessage = prompt.trim()
    setPrompt('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage, type: selectedType }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erro ao gerar conteúdo')

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.content,
        type: data.type || 'text',
        data: data.metadata
      }])
    } catch (err: any) {
      setError(err.message)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Desculpe, houve um erro: ${err.message}. Verifique se a API key está configurada.`,
        type: 'text'
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ marginBottom: 20, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
            <Sparkles size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Criador IA</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>Descreva o que quer criar e a IA fará o resto</p>
          </div>
        </div>
      </div>

      {/* Content type selector */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, flexShrink: 0, scrollbarWidth: 'none' }}>
        {CONTENT_TYPES.map(type => (
          <button key={type.id} onClick={() => setSelectedType(type.id)}
            style={{
              background: selectedType === type.id ? 'rgba(124,58,237,0.2)' : 'var(--bg-surface)',
              border: `1px solid ${selectedType === type.id ? 'rgba(124,58,237,0.5)' : 'var(--border)'}`,
              borderRadius: 10, padding: '8px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s',
              color: selectedType === type.id ? '#A855F7' : 'var(--text-secondary)'
            }}>
            <span style={{ fontSize: 14 }}>{type.icon}</span>
            <span style={{ fontSize: 13, fontWeight: selectedType === type.id ? 600 : 400 }}>{type.label}</span>
          </button>
        ))}
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16, paddingRight: 4 }}>
        {messages.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(124,58,237,0.4)', animation: 'pulse-glow 3s infinite' }}>
              <Sparkles size={36} color="white" />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>O que você quer criar hoje?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32, maxWidth: 500, lineHeight: 1.6 }}>
              Descreva sua ideia em português. A IA irá criar textos, legendas, hashtags, estratégias e muito mais para você.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10, width: '100%', maxWidth: 720 }}>
              {EXAMPLE_PROMPTS.map((ex, i) => (
                <button key={i} onClick={() => { setPrompt(ex); textareaRef.current?.focus() }}
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: 13, color: 'var(--text-secondary)', transition: 'all 0.15s', lineHeight: 1.4 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  <Zap size={13} style={{ display: 'inline', marginRight: 6, color: 'var(--auryx-purple-light)' }} />
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                    <Sparkles size={16} color="white" />
                  </div>
                )}
                <div style={{
                  maxWidth: msg.role === 'user' ? '70%' : '85%',
                  background: msg.role === 'user' ? 'var(--gradient-brand)' : 'var(--bg-card)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--border-card)',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                  padding: '14px 18px',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>{msg.content}</div>
                  {msg.role === 'assistant' && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                      <button className="btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>
                        <Copy size={13} /> Copiar
                      </button>
                      <button className="btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>
                        <Edit size={13} /> Editar
                      </button>
                      <button className="btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>
                        <RefreshCw size={13} /> Regenerar
                      </button>
                      <button className="btn-primary" style={{ fontSize: 12, padding: '6px 12px' }}>
                        <Download size={13} /> Salvar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Loader2 size={16} color="white" className="animate-spin" />
                </div>
                <div className="glass-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--auryx-purple-light)', animation: `bounce 1s ${i * 0.15}s infinite` }} />)}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Gerando conteúdo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="glass-card" style={{ padding: '16px 20px', flexShrink: 0, borderColor: 'rgba(124,58,237,0.2)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Descreva o que você quer criar... Ex: "Crie um post para Instagram sobre pizza artesanal com um visual italiano sofisticado"`}
            rows={2}
            style={{
              flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12,
              padding: '12px 16px', color: 'var(--text-primary)', fontSize: 14, resize: 'none', outline: 'none',
              lineHeight: 1.5, transition: 'border-color 0.15s', fontFamily: 'inherit'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--auryx-purple)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button type="submit" disabled={!prompt.trim() || loading} className="btn-primary"
            style={{ padding: '12px 20px', flexShrink: 0, height: 48, opacity: !prompt.trim() ? 0.5 : 1 }}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center' }}>
          Pressione Enter para enviar · Shift+Enter para nova linha · Criação ilimitada
        </p>
      </div>
    </div>
  )
}
