import HeroActions from "./HeroActions";
import HeroBadge from "./HeroBadge";
import HeroDescription from "./HeroDescription";
import HeroHeadline from "./HeroHeadline";
import HeroQRPreview from "./HeroQRPreview";
import HeroSocialProof from "./HeroSocialProof";
import HeroTrustSignals from "./HeroTrustSignals";

const HeroSection = () => (
  <section className="bg-white py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
      {/* Left — copy */}
      <div className="flex-1 flex flex-col gap-6">
        <HeroBadge />
        <HeroHeadline />
        <HeroDescription />
        <HeroActions />
        <HeroTrustSignals />
        <HeroSocialProof />
      </div>

      {/* Right — preview */}
      <div className="flex-1 flex justify-center lg:justify-end">
        <HeroQRPreview />
      </div>
    </div>
  </section>
);

export default HeroSection;
