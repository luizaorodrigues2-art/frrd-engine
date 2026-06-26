/**
 * ============================================================
 *  EDITE DEPOIMENTOS AQUI
 * ============================================================
 */

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    text: "Meu faturamento aumentou após o novo site.",
    author: "Cliente Satisfeito",
    role: "Empresário",
    rating: 5,
  },
  {
    id: "2",
    text: "As artes ficaram muito acima do esperado.",
    author: "Cliente Satisfeito",
    role: "Gestor de Marketing",
    rating: 5,
  },
  {
    id: "3",
    text: "Profissionais rápidos e extremamente criativos.",
    author: "Cliente Satisfeito",
    role: "CEO",
    rating: 5,
  },
  {
    id: "4",
    text: "A AURYX transformou nossa presença digital completamente.",
    author: "Cliente Satisfeito",
    role: "Diretor Comercial",
    rating: 5,
  },
  {
    id: "5",
    text: "Resultados que superaram todas as expectativas.",
    author: "Cliente Satisfeito",
    role: "Empreendedor",
    rating: 5,
  },
];
