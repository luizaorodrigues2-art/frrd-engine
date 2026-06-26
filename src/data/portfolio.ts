/**
 * ============================================================
 *  EDITE PORTFOLIO (carrossel da home) AQUI
 * ============================================================
 * Para adicionar projeto: copie um bloco { ... } inteiro
 */

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  objective: string;
  result: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "bruno-breno",
    title: "Bruno Breno",
    category: "Landing Pages",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    description: "Landing page premium para personal brand com foco em conversão.",
    objective: "Captar leads qualificados e fortalecer presença digital.",
    result: "Aumento significativo em conversões e engajamento.",
  },
  {
    id: "chef-vaudeci",
    title: "Chef Vaudeci",
    category: "Sites",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
    description: "Site institucional gastronômico com design sofisticado.",
    objective: "Apresentar serviços culinários e facilitar reservas.",
    result: "Marca fortalecida e maior visibilidade online.",
  },
  {
    id: "hamburguerias",
    title: "Hamburguerias",
    category: "Sites",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    description: "Sites e sistemas para redes de hamburguerias.",
    objective: "Digitalizar pedidos e fortalecer marca local.",
    result: "Aumento de pedidos online e fidelização de clientes.",
  },
  {
    id: "pet-shops",
    title: "Pet Shops",
    category: "Sites",
    image:
      "https://images.unsplash.com/photo-1450778869188-41d0601e046e?w=600&q=80",
    description: "Presença digital completa para pet shops.",
    objective: "Vender produtos e serviços pet online.",
    result: "Novos clientes e maior alcance regional.",
  },
  {
    id: "pizzarias",
    title: "Pizzarias",
    category: "Sites",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
    description: "Sites com cardápio digital e pedidos online.",
    objective: "Facilitar pedidos e delivery.",
    result: "Crescimento nas vendas digitais.",
  },
  {
    id: "supermercados",
    title: "Supermercados",
    category: "Sistemas",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80",
    description: "Sistemas de gestão e presença digital para supermercados.",
    objective: "Automatizar processos e ampliar vendas.",
    result: "Eficiência operacional e novos canais de venda.",
  },
  {
    id: "igrejas",
    title: "Igrejas",
    category: "Sites",
    image:
      "https://images.unsplash.com/photo-1438032888760-3edf10b78e71?w=600&q=80",
    description: "Sites institucionais para comunidades religiosas.",
    objective: "Conectar comunidade e facilitar informações.",
    result: "Maior engajamento da comunidade online.",
  },
  {
    id: "empresas",
    title: "Empresas",
    category: "Sites",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    description: "Sites corporativos de alto impacto para empresas.",
    objective: "Transmitir autoridade e captar clientes B2B.",
    result: "Posicionamento premium no mercado.",
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    category: "Landing Pages",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    description: "Landing pages otimizadas para campanhas de conversão.",
    objective: "Maximizar ROI em campanhas de marketing.",
    result: "Taxas de conversão superiores à média do mercado.",
  },
  {
    id: "sites",
    title: "Sites",
    category: "Sites",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    description: "Sites institucionais modernos e responsivos.",
    objective: "Presença digital profissional e memorável.",
    result: "Marcas fortalecidas e maior credibilidade.",
  },
  {
    id: "sistemas",
    title: "Sistemas",
    category: "Sistemas",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    description: "Sistemas web personalizados para negócios.",
    objective: "Automatizar e escalar operações.",
    result: "Redução de custos e aumento de produtividade.",
  },
];
