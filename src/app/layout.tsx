import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollRevealProvider from "@/components/providers/ScrollRevealProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://auryxmedia.com.br"),
  title: {
    default: "AURYX MEDIA | Software House • Desenvolvimento de Sistemas e SaaS",
    template: "%s | AURYX MEDIA",
  },
  description:
    "Empresa de tecnologia especializada em desenvolvimento de software, sistemas web, SaaS, aplicativos, inteligência artificial e automações empresariais.",
  keywords: [
    "AURYX MEDIA",
    "software house",
    "desenvolvimento de software",
    "sistemas web",
    "desenvolvimento SaaS",
    "inteligência artificial",
    "automações empresariais",
    "criação de aplicativos",
    "ERP",
    "CRM",
    "dashboards",
    "integração de sistemas",
    "São Paulo",
  ],
  authors: [{ name: "AURYX MEDIA" }],
  creator: "AURYX MEDIA",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://auryxmedia.com.br",
    siteName: "AURYX MEDIA",
    title: "AURYX MEDIA | Software House • Desenvolvimento de Sistemas e SaaS",
    description:
      "Softwares, Sistemas Web, SaaS, Aplicativos, IA e Automações para Empresas que Querem Escalar.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AURYX MEDIA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AURYX MEDIA | Software House • Desenvolvimento de Sistemas e SaaS",
    description:
      "Softwares, Sistemas Web, SaaS, Aplicativos, IA e Automações para Empresas que Querem Escalar.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/branding/logo-icon.png",
    apple: "/branding/logo-icon.png",
  },
  alternates: {
    canonical: "https://auryxmedia.com.br",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AURYX MEDIA",
  url: "https://auryxmedia.com.br",
  logo: "https://auryxmedia.com.br/branding/logo-full.png",
  description:
    "Empresa de tecnologia especializada em desenvolvimento de software, sistemas web, SaaS, aplicativos e automações empresariais.",
  telephone: "+55-11-97396-2102",
  sameAs: [],
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-11-97396-2102",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
  areaServed: "BR",
  serviceType: [
    "Desenvolvimento de Software",
    "Sistemas Web",
    "Plataformas SaaS",
    "Inteligência Artificial",
    "Automações Empresariais",
    "Aplicativos Mobile",
    "ERP e CRM",
    "Dashboards e BI",
    "Criação de Sites",
    "Marketing Digital",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black-fosco text-white antialiased">
        <SmoothScrollProvider>
          <ScrollRevealProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingButtons />
          </ScrollRevealProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
