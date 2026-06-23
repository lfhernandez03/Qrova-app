import { cn } from "@/lib/utils";

type BadgeVariant = "gratis" | "con-cuenta" | "todas";

const BADGE_STYLES: Record<BadgeVariant, string> = {
  gratis: "bg-emerald-50 text-emerald-800",
  "con-cuenta": "bg-coral-50 text-coral-600",
  todas: "bg-gray-100 text-gray-500",
};

const BADGE_LABELS: Record<BadgeVariant, string> = {
  gratis: "Gratis",
  "con-cuenta": "Con cuenta",
  todas: "Todas las cuentas",
};

interface FeatureCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  badge: BadgeVariant;
}

const FeatureCard = ({
  icon,
  iconBg,
  title,
  description,
  badge,
}: FeatureCardProps) => (
  <article className="flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
        {icon}
      </div>
      <span className={cn("text-xs font-medium rounded-full px-2.5 py-1", BADGE_STYLES[badge])}>
        {BADGE_LABELS[badge]}
      </span>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="text-gray-900 font-bold text-lg leading-snug">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  </article>
);

const LightningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M11 2L4 11h6l-1 7 7-9h-6l1-7z"
      stroke="#F4623A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BarChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="3" y="10" width="3" height="7" rx="1" fill="#6366F1" />
    <rect x="8.5" y="6" width="3" height="11" rx="1" fill="#6366F1" />
    <rect x="14" y="3" width="3" height="14" rx="1" fill="#6366F1" />
  </svg>
);

const PaletteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M10 2a8 8 0 1 0 4.47 14.68A2 2 0 0 0 13 13h-1a2 2 0 0 1-2-2V9"
      stroke="#A855F7"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="6.5" cy="7.5" r="1" fill="#A855F7" />
    <circle cx="10" cy="5" r="1" fill="#A855F7" />
    <circle cx="13.5" cy="7.5" r="1" fill="#A855F7" />
  </svg>
);

const FEATURES: FeatureCardProps[] = [
  {
    icon: <LightningIcon />,
    iconBg: "bg-coral-50",
    title: "Sin registro requerido",
    description:
      "Crea, personaliza y descarga tu QR en segundos. Sin formularios, sin esperas. El valor primero.",
    badge: "gratis",
  },
  {
    icon: <BarChartIcon />,
    iconBg: "bg-indigo-50",
    title: "Analytics en tiempo real",
    description:
      "Ve quién escanea tus QRs, desde dónde y con qué dispositivo. Toma decisiones con datos reales.",
    badge: "con-cuenta",
  },
  {
    icon: <PaletteIcon />,
    iconBg: "bg-purple-50",
    title: "100% personalizable",
    description:
      "Colores, formas de módulos, logos y estilos que reflejan tu marca. Exporta en PNG, SVG o PDF.",
    badge: "todas",
  },
];

const FeaturesSection = () => (
  <section className="bg-white py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
      {/* Header */}
      <div className="text-center max-w-xl flex flex-col gap-3">
        <h2 className="text-3xl font-bold text-gray-900">
          Todo lo que necesitas, nada de lo que no
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed">
          Empieza gratis y sin fricción. Activa más funciones cuando las
          necesites.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
