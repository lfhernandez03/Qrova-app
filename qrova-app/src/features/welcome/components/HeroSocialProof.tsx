const AVATARS = [
  { initials: "JM", className: "bg-purple-500" },
  { initials: "AM", className: "bg-blue-500" },
  { initials: "CR", className: "bg-emerald-400" },
  { initials: "LP", className: "bg-coral-400" },
] as const;

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B" aria-hidden>
    <path d="M7 1l1.545 3.13 3.455.502-2.5 2.435.59 3.438L7 8.895l-3.09 1.61.59-3.438L2 4.632l3.455-.502L7 1z" />
  </svg>
);

const HeroSocialProof = () => (
  <div className="flex items-center gap-3">
    <div className="flex -space-x-2">
      {AVATARS.map(({ initials, className }) => (
        <div
          key={initials}
          className={`size-8 rounded-full ${className} flex items-center justify-center text-white text-xs font-semibold border-2 border-white`}
        >
          {initials}
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="text-sm text-gray-500">+1,200 negocios en LATAM</p>
    </div>
  </div>
);

export default HeroSocialProof;
