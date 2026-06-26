/**
 * ============================================================
 *  EDITE CASES (botao VISITAR SITE) AQUI
 * ============================================================
 * link: URL do site do cliente quando tiver
 */

export interface CaseItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string; // Adicionar link posteriormente
}

export const cases: CaseItem[] = [
  {
    id: "case-1",
    title: "Projeto Exemplo 1",
    description:
      "Case de sucesso com resultados impressionantes. Adicione a descrição e link do projeto aqui.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "", // Adicionar link posteriormente
  },
  {
    id: "case-2",
    title: "Projeto Exemplo 2",
    description:
      "Transformação digital completa para cliente do segmento corporativo.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    link: "",
  },
  {
    id: "case-3",
    title: "Projeto Exemplo 3",
    description:
      "Estratégia de marketing digital com foco em conversão e ROI.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    link: "",
  },
];
