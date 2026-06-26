import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const SYSTEM_PROMPT = `Você é o AURYX AI, um especialista em marketing digital, criação de conteúdo, branding e estratégias de comunicação.

Você cria conteúdo profissional, criativo e otimizado para cada plataforma.

Diretrizes:
- Responda sempre em português brasileiro
- Seja criativo, profissional e estratégico
- Adapte o tom para o tipo de conteúdo e plataforma solicitada
- Inclua legendas, hashtags relevantes, CTAs e dicas de otimização quando pertinente
- Para campanhas, gere um plano completo com cronograma
- Para identidades visuais, descreva em detalhes as diretrizes de marca
- Sempre entregue conteúdo pronto para uso imediato
- Use formatação markdown para organizar melhor o conteúdo
- Para posts de redes sociais, sempre inclua: texto principal, hashtags, horário ideal de publicação, e dicas de design`

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { prompt, type } = await request.json()

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt é obrigatório' }, { status: 400 })
    }

    // Type-specific instructions
    const typeInstructions: Record<string, string> = {
      post: 'Crie um post otimizado para redes sociais. Inclua: texto principal (até 2200 chars para Instagram), legenda curta, 15-30 hashtags relevantes, CTA, horário ideal de publicação e sugestões visuais.',
      story: 'Crie um story impactante. Inclua: texto principal (curto e direto), elementos visuais sugeridos, música/áudio sugerido, enquete ou interação, duração recomendada.',
      reel: 'Crie um roteiro completo para Reels/TikTok/Shorts. Inclua: gancho (primeiros 3 segundos), roteiro com timestamps, texto de overlay, música sugerida, hashtags de tendência.',
      carousel: 'Crie um carrossel completo. Inclua: slide 1 (capa chamativa), slides 2-9 (conteúdo), slide final (CTA), legenda, hashtags e instruções de design para cada slide.',
      banner: 'Crie o conteúdo para um banner profissional. Inclua: headline principal, sub-headline, CTA, elementos visuais sugeridos, paleta de cores, especificações técnicas por plataforma.',
      logo: 'Descreva em detalhes uma identidade visual completa. Inclua: conceito da marca, paleta de cores (com códigos hex), tipografia sugerida, símbolo/ícone (descrição detalhada), variações do logo, usos corretos e incorretos.',
      flyer: 'Crie o conteúdo para um flyer atrativo. Inclua: título, subtítulo, corpo do texto, informações essenciais, CTA, sugestões visuais e diretrizes de layout.',
      email: 'Crie um email marketing completo. Inclua: linha de assunto (com variações A/B), pré-header, header, corpo dividido em seções, CTA principal, CTA secundário, footer e dicas de personalização.',
      ad: 'Crie anúncios para múltiplas plataformas. Inclua: headline (30 chars), headline longo (90 chars), descrição, CTA, público-alvo sugerido, palavras-chave, orçamento sugerido e variações para teste A/B.',
      presentation: 'Crie a estrutura de uma apresentação profissional. Inclua: título, agenda, slides com conteúdo (título + pontos principais), slide de dados/infográfico, slide de depoimento, CTA final.',
      campaign: 'Crie uma campanha de marketing completa. Inclua: brief estratégico, objetivos SMART, público-alvo (persona), cronograma de 30 dias com temas semanais, mix de conteúdo por plataforma, KPIs e métricas de sucesso.',
      calendar: 'Crie um calendário editorial completo para 365 dias (organizado por mês). Para cada mês: 4 semanas de conteúdo com: tipo de post, plataforma, tema/assunto, objetivo, hashtags principais. Organize de forma estratégica considerando datas comemorativas brasileiras.',
    }

    const enhancedPrompt = `${typeInstructions[type] || ''}\n\nSolicitação do usuário: ${prompt}`

    // Try Claude API first, fallback to OpenAI
    const apiKey = process.env.ANTHROPIC_API_KEY
    const openaiKey = process.env.OPENAI_API_KEY

    let content = ''

    if (apiKey && apiKey !== 'your-anthropic-key') {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: enhancedPrompt }]
        })
      })
      const data = await response.json()
      content = data.content?.[0]?.text || ''
    } else if (openaiKey && openaiKey !== 'your-openai-key') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${openaiKey}` },
        body: JSON.stringify({
          model: 'gpt-4o',
          max_tokens: 4096,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: enhancedPrompt }
          ]
        })
      })
      const data = await response.json()
      content = data.choices?.[0]?.message?.content || ''
    } else {
      // Demo mode - no API key configured
      content = generateDemoContent(type, prompt)
    }

    // Save to database
    try {
      const profileData = await (supabase.from('profiles') as any).select('tenant_id').eq('id', user.id).single()
      await (supabase.from('ai_generations') as any).insert({
        tenant_id: profileData.data?.tenant_id,
        user_id: user.id,
        type,
        prompt,
        result: { content },
        model: apiKey ? 'claude-sonnet-4-6' : openaiKey ? 'gpt-4o' : 'demo',
        status: 'completed'
      })
    } catch {}

    return NextResponse.json({ content, type, metadata: {} })

  } catch (error: any) {
    console.error('Generate error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function generateDemoContent(type: string, prompt: string): string {
  return `## ✨ Conteúdo Gerado para: "${prompt}"

> **Modo Demo** — Configure sua API Key (Anthropic ou OpenAI) no arquivo \`.env.local\` para gerar conteúdo real com IA.

---

### 📝 Texto Principal

**${prompt}**

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aqui estaria o conteúdo gerado pela IA com base na sua solicitação. O sistema está funcional e aguardando a configuração das chaves de API.

---

### 🏷️ Hashtags Sugeridas

\`#marketing #conteudo #redessociais #digital #negócios #empreendedorismo #brasil #criativo #branding #auryx\`

---

### ⏰ Melhor Horário de Publicação

- **Instagram:** Terça a quinta, 11h-13h ou 19h-21h
- **LinkedIn:** Segunda a quarta, 8h-10h
- **TikTok:** Diariamente, 19h-22h

---

### 💡 Dicas de Design

1. Use cores vibrantes e contraste alto
2. Inclua texto legível em fontes grandes
3. Adicione seu logo no canto inferior
4. Mantenha espaço em branco suficiente

---

### 🎯 Call to Action

"Saiba mais em nosso site!" | "Mande uma mensagem!" | "Clique no link da bio!"

---

*Para conteúdo real gerado por IA, configure sua chave de API no \`.env.local\`*`
}
