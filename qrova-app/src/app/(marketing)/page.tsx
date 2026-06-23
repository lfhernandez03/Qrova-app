import Navbar from "@/components/ui/navbar";
import HeroSection from "@/features/welcome/components/HeroSection";

export default async function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
    </main>
  );
}
