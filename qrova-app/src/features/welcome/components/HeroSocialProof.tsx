import { Star } from "lucide-react";

const AVATARS = [
  { initials: "JM", className: "bg-purple-500" },
  { initials: "AM", className: "bg-blue-500" },
  { initials: "CR", className: "bg-emerald-400" },
  { initials: "LP", className: "bg-coral-400" },
] as const;

const HeroSocialProof = () => (
  <div className="flex items-center gap-3">
    <div className="flex -space-x-2">
      {AVATARS.map(({ initials, className }) => (
        <div
          key={initials}
          className={`size-8 rounded-full ${className} flex items-center justify-center text-white text-xs font-semibold border-2 border-surface`}
        >
          {initials}
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-fg-muted">+1,200 negocios en LATAM</p>
    </div>
  </div>
);

export default HeroSocialProof;
