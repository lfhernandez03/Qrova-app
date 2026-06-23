import { Check } from "lucide-react";

const HeroTrustSignals = () => (
  <div className="flex items-center gap-1.5 text-sm text-gray-500">
    <Check className="size-3.5 text-emerald-400 shrink-0" strokeWidth={2.5} />
    <span>Sin tarjeta de crédito · Sin watermark · Descarga ilimitada</span>
  </div>
);

export default HeroTrustSignals;
