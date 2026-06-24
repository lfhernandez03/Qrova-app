import { Check, Globe, RotateCw, Zap } from "lucide-react";

const ITEMS = [
  { icon: RotateCw, label: "+52,000 escaneos este mes" },
  { icon: Globe,    label: "12 países" },
  { icon: Check,    label: "WCAG AA accesible" },
  { icon: Zap,      label: "Sin registro para empezar" },
] as const;

const SocialProofBar = () => (
  <div className="border-y border-gray-100 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-sm text-gray-500">
            <Icon className="size-4 text-gray-400" strokeWidth={1.5} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default SocialProofBar;
