/**
 * ============================================================
 *  EDITE SERVICOS, FOTOS E TEXTOS DOS CARDS AQUI
 * ============================================================
 * image: link da internet OU "/images/nome-da-foto.jpg"
 * Para adicionar servico: copie um bloco { ... } inteiro
 */

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  fullDescription: string;
  benefits: string[];
  differentials: string[];
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    id: "software",
    title: "Desenvolvimento de Software",
    shortDescription:
      "Sistemas sob medida para qualquer segmento — do ERP ao SaaS.",
    image:
      "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=80",
    fullDescription:
      "Criamos sistemas web, ERPs, CRMs e plataformas completas sob medida para resolver os problemas reais do seu negócio. Arquitetura robusta, escalável e segura do início ao fim.",
    benefits: [
      "Automação de processos repetitivos",
      "Redução de custos operacionais",
      "Dados centralizados e seguros",
      "Integração com APIs e sistemas existentes",
      "Escalabilidade conforme o negócio cresce",
    ],
    differentials: [
      "Arquitetura moderna e segura",
      "Documentação completa do sistema",
      "Treinamento para equipe",
      "Manutenção e evolução contínua",
    ],
    faq: [
      {
        question: "Posso integrar com meu sistema atual?",
        answer:
          "Sim, desenvolvemos integrações com ERPs, CRMs, gateways de pagamento e outras plataformas.",
      },
    ],
  },
  {
    id: "saas",
    title: "Plataformas SaaS",
    shortDescription:
      "Transformamos sua ideia em um SaaS escalável e lucrativo.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    fullDescription:
      "Desenvolvemos plataformas SaaS completas com autenticação, planos de assinatura, painel administrativo, onboarding e infraestrutura cloud escalável. Da MVP ao produto maduro.",
    benefits: [
      "MVP rápido e funcional",
      "Autenticação e multi-tenant",
      "Planos de assinatura e pagamentos",
      "Painel administrativo completo",
      "Infraestrutura cloud escalável",
    ],
    differentials: [
      "Experiência em produtos SaaS B2B e B2C",
      "Design de UX focado em retenção",
      "Monitoramento e analytics integrado",
      "Suporte à escala",
    ],
    faq: [
      {
        question: "Quanto tempo para lançar um SaaS?",
        answer:
          "Um MVP funcional pode ser lançado em 6 a 12 semanas, dependendo da complexidade.",
      },
    ],
  },
  {
    id: "ia",
    title: "Inteligência Artificial",
    shortDescription:
      "Automatize processos e tome decisões melhores com IA integrada.",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    fullDescription:
      "Integramos modelos de IA (LLMs, visão computacional, NLP) em seus sistemas para automatizar tarefas, gerar insights e criar experiências inteligentes para seus usuários.",
    benefits: [
      "Automação de tarefas cognitivas",
      "Análise preditiva e insights",
      "Chatbots e assistentes inteligentes",
      "Processamento de documentos com IA",
      "Integração com APIs de IA (OpenAI, Anthropic, etc.)",
    ],
    differentials: [
      "Experiência com modelos de linguagem avançados",
      "Soluções prontas para produção",
      "Customização para o seu domínio",
      "Conformidade com privacidade de dados",
    ],
    faq: [
      {
        question: "Posso usar IA sem trocar meu sistema atual?",
        answer:
          "Sim, integramos IA ao seu sistema existente via APIs, sem necessidade de reescrita.",
      },
    ],
  },
  {
    id: "automacoes",
    title: "Automações Empresariais",
    shortDescription:
      "Integramos APIs e eliminamos processos manuais e repetitivos.",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
    fullDescription:
      "Automatizamos fluxos de trabalho conectando sistemas, APIs e plataformas. Desde notificações automáticas até pipelines completos de dados — eliminamos o retrabalho e aumentamos a eficiência.",
    benefits: [
      "Fluxos automatizados 24/7",
      "Eliminação de erros humanos",
      "Integração entre múltiplos sistemas",
      "Notificações e relatórios automáticos",
      "Redução de custos operacionais",
    ],
    differentials: [
      "n8n, Zapier, Make e automações customizadas",
      "Webhooks e integrações em tempo real",
      "Monitoramento e alertas",
      "Documentação completa dos fluxos",
    ],
    faq: [
      {
        question: "Quais sistemas vocês conseguem integrar?",
        answer:
          "Qualquer sistema com API: CRMs, ERPs, e-commerce, redes sociais, WhatsApp, e-mail, planilhas e muito mais.",
      },
    ],
  },
  {
    id: "aplicativos",
    title: "Aplicativos Mobile",
    shortDescription:
      "Apps Android e iOS com design premium e performance nativa.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    fullDescription:
      "Desenvolvemos aplicativos mobile para Android e iOS com React Native ou nativo. Design intuitivo, performance alta e integração total com o seu sistema de gestão.",
    benefits: [
      "App para Android e iOS",
      "Design UX/UI de alto padrão",
      "Notificações push",
      "Integração com sistemas existentes",
      "Publicação nas lojas App Store e Google Play",
    ],
    differentials: [
      "React Native para custo-benefício máximo",
      "Performance próxima ao nativo",
      "Atualizações over-the-air",
      "Suporte pós-lançamento",
    ],
    faq: [
      {
        question: "Vocês publicam o app nas lojas?",
        answer:
          "Sim, cuidamos de todo o processo de publicação na App Store e Google Play.",
      },
    ],
  },
  {
    id: "sistemas-empresariais",
    title: "Sistemas Empresariais",
    shortDescription:
      "ERP, CRM, PDV e gestão completa em uma única plataforma.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    fullDescription:
      "Centralize toda a operação da sua empresa: vendas, estoque, financeiro, RH, clientes e muito mais. Sistemas robustos para clínicas, restaurantes, academias, comércio e indústria.",
    benefits: [
      "Gestão financeira e fluxo de caixa",
      "Controle de estoque e logística",
      "CRM de clientes integrado",
      "Relatórios e dashboards em tempo real",
      "Acesso por equipe com permissões",
    ],
    differentials: [
      "Customização total para o seu segmento",
      "Importação de dados do sistema atual",
      "Treinamento da equipe incluso",
      "Suporte técnico dedicado",
    ],
    faq: [
      {
        question: "O sistema funciona para meu segmento específico?",
        answer:
          "Sim, desenvolvemos para clínicas, restaurantes, academias, comércio, indústria e outros segmentos.",
      },
    ],
  },
  {
    id: "dashboards",
    title: "Dashboards e BI",
    shortDescription:
      "Visualize dados estratégicos em tempo real e tome decisões mais inteligentes.",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    fullDescription:
      "Criamos painéis de Business Intelligence e dashboards executivos que consolidam dados de múltiplas fontes em uma visualização clara e acionável para sua tomada de decisão.",
    benefits: [
      "KPIs em tempo real",
      "Gráficos interativos e filtros dinâmicos",
      "Integração com planilhas, APIs e bancos de dados",
      "Relatórios automáticos por e-mail",
      "Acesso por diferentes perfis de usuário",
    ],
    differentials: [
      "Design focado em clareza de dados",
      "Conexão com qualquer fonte de dados",
      "Alertas automáticos por metas",
      "Exportação em PDF e Excel",
    ],
    faq: [
      {
        question: "Posso conectar com meu banco de dados existente?",
        answer:
          "Sim, conectamos com MySQL, PostgreSQL, MongoDB, BigQuery, planilhas e APIs REST.",
      },
    ],
  },
  {
    id: "sites",
    title: "Sites e Landing Pages",
    shortDescription:
      "Sites institucionais e landing pages que convertem e representam sua marca.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    fullDescription:
      "Desenvolvemos sites institucionais e landing pages com foco em performance, conversão e experiência do usuário. Cada projeto é pensado para gerar resultados mensuráveis.",
    benefits: [
      "Design responsivo e moderno",
      "Otimização para SEO",
      "Velocidade de carregamento superior",
      "Integração com ferramentas de marketing",
      "Painel administrativo intuitivo",
    ],
    differentials: [
      "Código limpo e escalável",
      "Animações premium sem comprometer performance",
      "Suporte técnico dedicado",
      "Hospedagem e domínio inclusos na proposta",
    ],
    faq: [
      {
        question: "Quanto tempo leva para criar um site?",
        answer:
          "O prazo varia de 2 a 6 semanas, dependendo da complexidade e funcionalidades do projeto.",
      },
    ],
  },
  {
    id: "social-media",
    title: "Gestão de Redes Sociais",
    shortDescription:
      "Conteúdo estratégico para fortalecer sua marca diariamente.",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    fullDescription:
      "Gerenciamos suas redes sociais com estratégia, criatividade e consistência. Planejamento editorial, criação de conteúdo, interação com audiência e relatórios de performance.",
    benefits: [
      "Presença digital consistente",
      "Aumento de engajamento",
      "Fortalecimento da marca",
      "Relatórios mensais de performance",
      "Estratégia alinhada aos objetivos do negócio",
    ],
    differentials: [
      "Conteúdo exclusivo e personalizado",
      "Calendário editorial mensal",
      "Monitoramento de tendências",
      "Gestão de comunidade ativa",
    ],
    faq: [
      {
        question: "Quais redes sociais vocês gerenciam?",
        answer:
          "Instagram, Facebook, LinkedIn, TikTok e YouTube, conforme a estratégia do seu negócio.",
      },
    ],
  },
  {
    id: "design",
    title: "Design Gráfico",
    shortDescription:
      "Design profissional que transmite autoridade e gera impacto.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    fullDescription:
      "Criamos materiais visuais que comunicam a essência da sua marca. Logos, banners, apresentações, materiais impressos e digitais com design de alto padrão.",
    benefits: [
      "Identidade visual coesa",
      "Materiais profissionais",
      "Diferenciação no mercado",
      "Arquivos em formatos editáveis",
      "Versões para todos os canais",
    ],
    differentials: [
      "Design exclusivo, sem templates genéricos",
      "Processo colaborativo com o cliente",
      "Entrega rápida e revisões inclusas",
    ],
    faq: [
      {
        question: "Vocês criam identidade visual completa?",
        answer:
          "Sim, oferecemos pacotes completos de branding incluindo logo, paleta de cores, tipografia e manual da marca.",
      },
    ],
  },
  {
    id: "branding",
    title: "Identidade Visual",
    shortDescription: "Construímos marcas memoráveis e consistentes.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    fullDescription:
      "Desenvolvemos identidades visuais completas que definem a personalidade da sua marca. Logo, paleta de cores, tipografia, iconografia e manual de marca.",
    benefits: [
      "Marca reconhecível e memorável",
      "Consistência em todos os materiais",
      "Diferenciação no mercado",
      "Manual de marca completo",
      "Arquivos em todos os formatos",
    ],
    differentials: [
      "Processo de branding estratégico",
      "Pesquisa de mercado e concorrência",
      "Múltiplas propostas de logo",
      "Aplicações em mockups reais",
    ],
    faq: [
      {
        question: "O que inclui um pacote de identidade visual?",
        answer:
          "Logo principal e variações, paleta de cores, tipografia, iconografia, manual da marca e mockups de aplicação.",
      },
    ],
  },
  {
    id: "motion",
    title: "Motion Design",
    shortDescription:
      "Vídeos e animações que prendem atenção e aumentam o engajamento.",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    fullDescription:
      "Produzimos animações, motion graphics e vídeos promocionais que capturam a atenção e comunicam mensagens complexas de forma visual e impactante.",
    benefits: [
      "Conteúdo visual dinâmico",
      "Maior retenção de audiência",
      "Fortalecimento da marca",
      "Versões para múltiplas plataformas",
      "Storytelling visual memorável",
    ],
    differentials: [
      "Animações 2D e 3D",
      "Roteiro e storyboard inclusos",
      "Música e sound design",
      "Formatos otimizados para redes sociais",
    ],
    faq: [
      {
        question: "Qual a duração ideal de um vídeo promocional?",
        answer:
          "Depende do canal: 15-60s para redes sociais, 1-3 minutos para site e apresentações.",
      },
    ],
  },
];
