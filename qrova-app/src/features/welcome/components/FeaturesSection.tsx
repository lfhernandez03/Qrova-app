import SectionHeader from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { BarChart3, Palette, Zap } from "lucide-react";

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
  icon: React.ElementType;
  iconClassName: string;
  iconBg: string;
  title: string;
  description: string;
  badge: BadgeVariant;
}

const FeatureCard = ({
  icon: Icon,
  iconClassName,
  iconBg,
  title,
  description,
  badge,
}: FeatureCardProps) => (
  <article className="flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
        <Icon className={cn("size-5", iconClassName)} strokeWidth={1.5} />
      </div>
      <span className={cn("text-xs font-medium rounded-full px-2.5 py-1 shrink-0", BADGE_STYLES[badge])}>
        {BADGE_LABELS[badge]}
      </span>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="text-gray-900 font-bold text-lg leading-snug">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  </article>
);

const FEATURES: FeatureCardProps[] = [
  {
    icon: Zap,
    iconClassName: "text-coral-400",
    iconBg: "bg-coral-50",
    title: "Sin registro requerido",
    description:
      "Crea, personaliza y descarga tu QR en segundos. Sin formularios, sin esperas. El valor primero.",
    badge: "gratis",
  },
  {
    icon: BarChart3,
    iconClassName: "text-indigo-500",
    iconBg: "bg-indigo-50",
    title: "Analytics en tiempo real",
    description:
      "Ve quién escanea tus QRs, desde dónde y con qué dispositivo. Toma decisiones con datos reales.",
    badge: "con-cuenta",
  },
  {
    icon: Palette,
    iconClassName: "text-purple-500",
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
      <SectionHeader
        title="Todo lo que necesitas, nada de lo que no"
        subtitle="Empieza gratis y sin fricción. Activa más funciones cuando las necesites."
        className="max-w-xl"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
