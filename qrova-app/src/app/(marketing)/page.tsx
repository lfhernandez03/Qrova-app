import Navbar from "@/components/ui/navbar";
import ComparisonSection from "@/features/welcome/components/ComparisonSection";
import CTASection from "@/features/welcome/components/CTASection";
import FeaturesSection from "@/features/welcome/components/FeaturesSection";
import Footer from "@/features/welcome/components/Footer";
import HeroSection from "@/features/welcome/components/HeroSection";
import HowItWorksSection from "@/features/welcome/components/HowItWorksSection";
import SocialProofBar from "@/features/welcome/components/SocialProofBar";

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofBar />
        <FeaturesSection />
        <HowItWorksSection />
        <ComparisonSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
