import { services, type Service } from "./services";

export interface HeroPanel {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  glow: string;
  pattern: string;
  service: Service;
}

const accents = [
  { accent: "rgba(255,106,0,0.22)", glow: "rgba(255,106,0,0.35)", pattern: "diagonal" },
  { accent: "rgba(255,140,0,0.20)", glow: "rgba(255,140,0,0.30)", pattern: "grid" },
  { accent: "rgba(255,90,0,0.24)", glow: "rgba(255,90,0,0.38)", pattern: "dots" },
  { accent: "rgba(255,120,40,0.18)", glow: "rgba(255,120,40,0.32)", pattern: "lines" },
  { accent: "rgba(255,106,0,0.26)", glow: "rgba(255,106,0,0.40)", pattern: "hex" },
  { accent: "rgba(255,160,60,0.20)", glow: "rgba(255,160,60,0.34)", pattern: "diagonal" },
  { accent: "rgba(255,100,20,0.22)", glow: "rgba(255,100,20,0.36)", pattern: "grid" },
  { accent: "rgba(255,130,50,0.19)", glow: "rgba(255,130,50,0.33)", pattern: "dots" },
  { accent: "rgba(255,106,0,0.21)", glow: "rgba(255,106,0,0.37)", pattern: "lines" },
  { accent: "rgba(255,150,70,0.17)", glow: "rgba(255,150,70,0.31)", pattern: "hex" },
  { accent: "rgba(255,110,30,0.23)", glow: "rgba(255,110,30,0.39)", pattern: "diagonal" },
  { accent: "rgba(255,125,45,0.20)", glow: "rgba(255,125,45,0.35)", pattern: "grid" },
];

const shortTitles: Record<string, string> = {
  software: "DEV DE SOFTWARE",
  saas: "PLATAFORMAS SAAS",
  ia: "INTELIGÊNCIA ARTIFICIAL",
  automacoes: "AUTOMAÇÕES",
  aplicativos: "APPS MOBILE",
  "sistemas-empresariais": "SISTEMAS ERP/CRM",
  dashboards: "DASHBOARDS & BI",
  sites: "SITES & LANDING PAGES",
  "social-media": "REDES SOCIAIS",
  design: "DESIGN GRÁFICO",
  branding: "IDENTIDADE VISUAL",
  motion: "MOTION DESIGN",
  ecommerce: "LOJAS VIRTUAIS",
};

const allServices = services;

export const heroPanels: HeroPanel[] = allServices.map((service, index) => {
  const style = accents[index % accents.length];
  return {
    id: service.id,
    number: String(index + 1).padStart(2, "0"),
    title: shortTitles[service.id] ?? service.title.toUpperCase(),
    description: service.shortDescription,
    image: service.image,
    accent: style.accent,
    glow: style.glow,
    pattern: style.pattern,
    service,
  };
});
