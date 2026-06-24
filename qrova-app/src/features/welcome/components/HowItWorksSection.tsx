import SectionHeader from "@/components/ui/section-header";
import { Download, Globe, Palette } from "lucide-react";

const STEPS = [
  {
    number: 1,
    icon: Globe,
    title: "Ingresa tu URL",
    description:
      "Pega el enlace al que quieres que apunte tu QR — web, menú, catálogo o lo que necesites.",
  },
  {
    number: 2,
    icon: Palette,
    title: "Personaliza",
    description:
      "Elige colores, forma y estilo. Ve cómo queda en tiempo real sin recargar nada.",
  },
  {
    number: 3,
    icon: Download,
    title: "Descarga y comparte",
    description:
      "Exporta tu QR en alta resolución y empieza a rastrear escaneos al instante.",
  },
] as const;

const HowItWorksSection = () => (
  <section className="bg-gray-50 py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
      <SectionHeader
        title="Así de fácil"
        subtitle="Tres pasos para tener tu QR listo"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-3xl">
        {STEPS.map(({ number, icon: Icon, title, description }) => (
          <div key={number} className="flex flex-col items-center text-center gap-4">
            <div className="relative">
              <div className="size-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <Icon className="size-7 text-gray-400" strokeWidth={1.5} />
              </div>
              <span className="absolute -top-2 -right-2 size-6 rounded-full bg-coral-400 text-white text-xs font-bold flex items-center justify-center">
                {number}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-gray-900">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
