import Navbar from "@/components/ui/navbar";
import FeaturesSection from "@/features/welcome/components/FeaturesSection";
import HeroSection from "@/features/welcome/components/HeroSection";
import HowItWorksSection from "@/features/welcome/components/HowItWorksSection";
import SocialProofBar from "@/features/welcome/components/SocialProofBar";

export default async function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <FeaturesSection />
      <HowItWorksSection />
    </main>
  );
}
