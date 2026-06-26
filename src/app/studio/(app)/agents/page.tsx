'use client'
import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Loader2, Sparkles, TrendingUp, PenTool, Palette, Share2, ShoppingCart, DollarSign, Users, Globe, MessageSquare, Target, BarChart2 } from 'lucide-react'

const AGENTS = [
  { id: 'marketing', name: 'Agente de Marketing', emoji: '📊', icon: TrendingUp, color: '#7C3AED', desc: 'Estratégias de marketing, posicionamento e crescimento', examples: ['Crie um plano de marketing para o mês', 'Analise minha estratégia atual', 'Como aumentar meu alcance orgânico?'] },
  { id: 'copywriter', name: 'Agente Copywriter', emoji: '✍️', icon: PenTool, color: '#EC4899', desc: 'Textos, legendas, headlines e copy persuasivo', examples: ['Crie 5 headlines para meu produto', 'Escreva uma legenda criativa', 'Crie um texto para landing page'] },
  { id: 'designer', name: 'Agente Designer', emoji: '🎨', icon: Palette, color: '#F59E0B', desc: 'Diretrizes visuais, paletas, tipografia e branding', examples: ['Sugira uma paleta de cores para minha marca', 'Quais fontes combinariam com meu estilo?', 'Critique meu design'] },
  { id: 'social_media', name: 'Agente Social Media', emoji: '📱', icon: Share2, color: '#06B6D4', desc: 'Estratégia de redes sociais, engajamento e crescimento', examples: ['Qual o melhor horário para postar?', 'Crie um calendário de conteúdo', 'Como aumentar meu engajamento?'] },
  { id: 'sales', name: 'Agente de Vendas', emoji: '💰', icon: ShoppingCart, color: '#10B981', desc: 'Argumentos de venda, scripts e estratégias comerciais', examples: ['Crie um script de vendas', 'Como contornar objeções?', 'Escreva uma proposta comercial'] },
  { id: 'seo', name: 'Agente de SEO', emoji: '🔍', icon: Globe, color: '#8B5CF6', desc: 'Otimização para buscadores, palavras-chave e conteúdo', examples: ['Analise meu SEO', 'Sugira palavras-chave para meu negócio', 'Como melhorar meu ranking?'] },
  { id: 'branding', name: 'Agente de Branding', emoji: '🏆', icon: Target, color: '#F97316', desc: 'Construção de marca, identidade e posicionamento', examples: ['Ajude a definir minha voz de marca', 'Como me diferenciar da concorrência?', 'Defina meu público-alvo'] },
  { id: 'analytics', name: 'Agente Analítico', emoji: '📈', icon: BarChart2, color: '#14B8A6', desc: 'Análise de dados, métricas e relatórios', examples: ['Interprete minhas métricas', 'O que esses números significam?', 'Quais KPIs devo acompanhar?'] },
]

interface Message { role: 'user' | 'assistant'; content: string }

export default function AgentsPage() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const [selectedAgent, setSelectedAgent] = useState(AGENTS.find(a => a.id === params.get('type')) || AGENTS[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)

    const res = await fetch('/api/studio/generate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `[Agente: ${selectedAgent.name}]\n${msg}`, type: 'post' })
    })
    const data = await res.json()
    setMessages(prev => [...prev, { role: 'assistant', content: data.content || data.error || 'Erro ao processar.' }])
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', gap: 20 }}>
      {/* Agents sidebar */}
      <div style={{ width: 280, flexShrink: 0, overflowY: 'auto' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bot size={18} color="var(--auryx-purple-light)" /> Agentes IA
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {AGENTS.map(agent => (
            <button key={agent.id} onClick={() => { setSelectedAgent(agent); setMessages([]) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                background: selectedAgent.id === agent.id ? `${agent.color}18` : 'var(--bg-surface)',
                borderLeft: selectedAgent.id === agent.id ? `3px solid ${agent.color}` : '3px solid transparent',
              }}>
              <span style={{ fontSize: 20 }}>{agent.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: selectedAgent.id === agent.id ? 700 : 500, color: selectedAgent.id === agent.id ? agent.color : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {agent.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="glass-card">
        {/* Agent header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${selectedAgent.color}22`, border: `1px solid ${selectedAgent.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            {selectedAgent.emoji}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{selectedAgent.name}</h3>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{selectedAgent.desc}</p>
          </div>
          <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Online</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {messages.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${selectedAgent.color}22`, border: `2px solid ${selectedAgent.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 16 }}>
                {selectedAgent.emoji}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Como posso ajudar?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24, maxWidth: 400 }}>{selectedAgent.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 500 }}>
                {selectedAgent.examples.map((ex, i) => (
                  <button key={i} onClick={() => handleSend(ex)} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = selectedAgent.color; e.currentTarget.style.color = selectedAgent.color }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  {msg.role === 'assistant' && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${selectedAgent.color}22`, border: `1px solid ${selectedAgent.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                      {selectedAgent.emoji}
                    </div>
                  )}
                  <div style={{ maxWidth: '75%', background: msg.role === 'user' ? 'var(--gradient-brand)' : 'var(--bg-surface)', border: msg.role === 'user' ? 'none' : '1px solid var(--border)', borderRadius: '14px', padding: '12px 16px', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${selectedAgent.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{selectedAgent.emoji}</div>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '12px 16px', display: 'flex', gap: 4 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: selectedAgent.color, opacity: 0.7 }} />)}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={`Pergunte algo ao ${selectedAgent.name}...`} className="studio-input" style={{ flex: 1, height: 44, fontSize: 14 }} />
          <button onClick={() => handleSend()} disabled={!input.trim() || loading} className="btn-primary" style={{ padding: '0 20px', height: 44, flexShrink: 0 }}>
            {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
          </button>
        </div>
      </div>
    </div>
  )
}
