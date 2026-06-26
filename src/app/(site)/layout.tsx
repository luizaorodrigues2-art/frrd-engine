import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollRevealProvider from "@/components/providers/ScrollRevealProvider";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ScrollRevealProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </ScrollRevealProvider>
    </SmoothScrollProvider>
  );
}
