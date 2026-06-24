import SectionHeader from "@/components/ui/section-header";
import { Check } from "lucide-react";

const CheckMark = () => (
  <Check className="size-4 text-emerald-500 mx-auto" strokeWidth={2.5} />
);

const Dash = () => (
  <span className="block text-center text-gray-300 select-none">—</span>
);

const ROWS = [
  { feature: "Crear y descargar QR",    guest: true,  free: true  },
  { feature: "Personalización completa", guest: true,  free: true  },
  { feature: "Guardar QRs",             guest: false, free: true  },
  { feature: "Analytics básico",        guest: false, free: true  },
] as const;

const ComparisonSection = () => (
  <section className="bg-white py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
      <SectionHeader
        title="Invitado vs. Con cuenta"
        subtitle="Sin sorpresas. Aquí está todo lo que puedes hacer en cada modo."
      />

      {/* Table */}
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_120px_120px] bg-white border-b border-gray-200">
          <div className="px-5 py-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Funcionalidad
          </div>
          <div className="px-5 py-4 text-xs font-semibold tracking-widest text-gray-500 uppercase text-center">
            Invitado
          </div>
          <div className="px-5 py-4 text-xs font-semibold tracking-widest text-gray-500 uppercase text-center">
            Gratis
          </div>
        </div>

        {/* Rows */}
        {ROWS.map(({ feature, guest, free }, i) => (
          <div
            key={feature}
            className={`grid grid-cols-[1fr_120px_120px] border-b border-gray-100 last:border-0 ${
              i % 2 === 1 ? "bg-gray-50/50" : "bg-white"
            }`}
          >
            <div className="px-5 py-4 text-sm text-gray-600">{feature}</div>
            <div className="px-5 py-4">{guest ? <CheckMark /> : <Dash />}</div>
            <div className="px-5 py-4">{free ? <CheckMark /> : <Dash />}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ComparisonSection;
