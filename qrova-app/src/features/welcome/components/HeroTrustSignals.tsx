const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path
      d="M2.5 7L5.5 10L11.5 4"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeroTrustSignals = () => (
  <div className="flex items-center gap-1.5 text-sm text-gray-500">
    <CheckIcon />
    <span>Sin tarjeta de crédito · Sin watermark · Descarga ilimitada</span>
  </div>
);

export default HeroTrustSignals;
