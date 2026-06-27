import SectionHeader from "@/components/ui/section-header";
import { Check } from "lucide-react";

const CheckMark = () => (
  <Check className="size-4 text-emerald-500 mx-auto" strokeWidth={2.5} />
);

const Dash = () => (
  <span className="block text-center text-stroke select-none">—</span>
);

const ROWS = [
  { feature: "Crear y descargar QR",    guest: true,  free: true  },
  { feature: "Personalización completa", guest: true,  free: true  },
  { feature: "Guardar QRs",             guest: false, free: true  },
  { feature: "Analytics básico",        guest: false, free: true  },
] as const;

const ComparisonSection = () => (
  <section className="bg-surface py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
      <SectionHeader
        title="Invitado vs. Con cuenta"
        subtitle="Sin sorpresas. Aquí está todo lo que puedes hacer en cada modo."
      />

      {/* Table */}
      <div className="w-full max-w-2xl rounded-xl border border-stroke overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_120px_120px] bg-surface-raised border-b border-stroke">
          <div className="px-5 py-4 text-xs font-semibold tracking-widest text-fg-muted uppercase">
            Funcionalidad
          </div>
          <div className="px-5 py-4 text-xs font-semibold tracking-widest text-fg-muted uppercase text-center">
            Invitado
          </div>
          <div className="px-5 py-4 text-xs font-semibold tracking-widest text-fg-muted uppercase text-center">
            Gratis
          </div>
        </div>

        {/* Rows */}
        {ROWS.map(({ feature, guest, free }, i) => (
          <div
            key={feature}
            className={`grid grid-cols-[1fr_120px_120px] border-b border-stroke-subtle last:border-0 ${
              i % 2 === 1 ? "bg-surface-subtle" : "bg-surface-raised"
            }`}
          >
            <div className="px-5 py-4 text-sm text-fg-secondary">{feature}</div>
            <div className="px-5 py-4">{guest ? <CheckMark /> : <Dash />}</div>
            <div className="px-5 py-4">{free ? <CheckMark /> : <Dash />}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ComparisonSection;
