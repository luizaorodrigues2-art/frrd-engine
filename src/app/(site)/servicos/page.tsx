import type { Metadata } from "next";
import ServiceDetail from "@/components/services/ServiceDetail";
import ServicesHero from "@/components/services/ServicesHero";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Conheça todos os serviços da AURYX MEDIA: Criação de Sites, Desenvolvimento de Software, Marketing Digital, Design Gráfico, Gestão de Redes Sociais e muito mais.",
  openGraph: {
    title: "Serviços | AURYX MEDIA",
    description:
      "Sites, Sistemas, Design, Marketing e Conteúdo de Alto Impacto para Empresas que Querem Crescer.",
  },
};

export default function ServicosPage() {
  return (
    <>
      <ServicesHero />
      {services.map((service, index) => (
        <div
          key={service.id}
          className={index % 2 === 1 ? "bg-black-carbon/50" : ""}
        >
          <ServiceDetail service={service} />
        </div>
      ))}
    </>
  );
}
