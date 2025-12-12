import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SpecialistsSection } from "@/components/home/SpecialistsSection";
import { FAQSection } from "@/components/home/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SpecialistsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
