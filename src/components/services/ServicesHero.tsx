import Image from "next/image";
import Logo from "@/components/ui/Logo";
import { brandFeatures } from "@/data/features";

export default function ServicesHero() {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 animated-gradient opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,106,0,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Logo size="lg" className="mx-auto" />
        <h1 className="mt-8 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          Nossos <span className="gradient-text">Serviços</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-metallic">
          Soluções completas em tecnologia, design e marketing digital para
          impulsionar o crescimento do seu negócio.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {brandFeatures.slice(0, 6).map((f) => (
            <span
              key={f.id}
              className="rounded-full border border-orange-auryx/25 bg-black-fosco/50 px-4 py-2 text-xs font-medium text-gray-metallic"
            >
              <span className="text-orange-auryx">{f.highlight}</span>{" "}
              {f.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
