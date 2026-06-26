export interface BrandFeature {
  id: string;
  number: string;
  highlight: string;
  title: string;
  description: string;
  icon: string;
  size?: "normal" | "large";
}

export const brandFeatures: BrandFeature[] = [
  {
    id: "software",
    number: "01",
    highlight: "SOFTWARE",
    title: "SOB MEDIDA",
    description: "Sistemas criados para o seu negócio, do zero à produção.",
    icon: "code",
    size: "large",
  },
  {
    id: "saas",
    number: "02",
    highlight: "SAAS",
    title: "ESCALÁVEL",
    description: "Plataformas SaaS com multi-tenant, assinaturas e painel admin.",
    icon: "cloud",
  },
  {
    id: "ai",
    number: "03",
    highlight: "INTELIGÊNCIA",
    title: "ARTIFICIAL",
    description: "IA integrada ao seu sistema para automatizar e gerar insights.",
    icon: "robot",
    size: "large",
  },
  {
    id: "automation",
    number: "04",
    highlight: "AUTOMAÇÕES",
    title: "INTELIGENTES",
    description: "Eliminamos processos manuais e conectamos seus sistemas.",
    icon: "cogs",
  },
  {
    id: "apps",
    number: "05",
    highlight: "APPS",
    title: "ANDROID E iOS",
    description: "Aplicativos mobile com design premium e performance nativa.",
    icon: "mobile",
  },
  {
    id: "erp",
    number: "06",
    highlight: "ERP e CRM",
    title: "COMPLETOS",
    description: "Gestão total da empresa em uma única plataforma integrada.",
    icon: "building",
    size: "large",
  },
  {
    id: "dashboards",
    number: "07",
    highlight: "DASHBOARDS",
    title: "E ANALYTICS",
    description: "KPIs em tempo real para decisões mais rápidas e precisas.",
    icon: "chart",
  },
  {
    id: "api",
    number: "08",
    highlight: "INTEGRAÇÕES",
    title: "VIA API",
    description: "Conectamos qualquer sistema via APIs REST e webhooks.",
    icon: "api",
  },
  {
    id: "cloud",
    number: "09",
    highlight: "INFRAESTRUTURA",
    title: "CLOUD",
    description: "Deploy seguro, escalável e com alta disponibilidade.",
    icon: "server",
    size: "large",
  },
  {
    id: "security",
    number: "10",
    highlight: "SEGURANÇA",
    title: "EM 1º LUGAR",
    description: "Código auditado, criptografia e proteção de dados.",
    icon: "shield",
  },
  {
    id: "sites",
    number: "11",
    highlight: "SITES",
    title: "E LANDING PAGES",
    description: "Presença digital premium com foco em conversão.",
    icon: "globe",
    size: "large",
  },
  {
    id: "results",
    number: "12",
    highlight: "RESULTADOS",
    title: "REAIS",
    description: "Tecnologia que gera eficiência, escala e crescimento.",
    icon: "rocket",
  },
  {
    id: "db",
    number: "13",
    highlight: "BANCO DE",
    title: "DADOS",
    description: "Modelagem e otimização para alta performance.",
    icon: "database",
    size: "large",
  },
  {
    id: "support",
    number: "14",
    highlight: "SUPORTE",
    title: "ESPECIALIZADO",
    description: "Time técnico dedicado para sua solução evoluir.",
    icon: "tools",
  },
  {
    id: "excellence",
    number: "15",
    highlight: "SUA EMPRESA",
    title: "TRANSFORMADA",
    description: "Auryx Media: Soluções Tecnológicas que fazem a diferença.",
    icon: "star",
    size: "large",
  },
];

export const brandPillars = [
  {
    title: "Software de alto padrão",
    text: "Sistemas, SaaS e aplicativos desenvolvidos com arquitetura moderna.",
  },
  {
    title: "Inteligência Artificial",
    text: "IA integrada para automatizar, prever e gerar vantagem competitiva.",
  },
  {
    title: "Escalabilidade real",
    text: "Infraestrutura cloud que cresce junto com o seu negócio.",
  },
  {
    title: "Resultados mensuráveis",
    text: "Tecnologia com foco em eficiência operacional e crescimento.",
  },
];
