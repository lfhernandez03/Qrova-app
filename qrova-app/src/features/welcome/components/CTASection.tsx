import Link from "next/link";

const CTASection = () => (
  <section className="bg-coral-400 py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col gap-3">
        <h2 className="text-4xl font-bold text-white">
          ¿Listo para crear tu primer QR?
        </h2>
        <p className="text-white/80 text-lg">
          Sin registro, sin tarjeta. Solo tu URL y tu QR listo en segundos.
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 bg-white text-coral-500 font-semibold py-3 px-6 rounded-lg hover:bg-coral-50 transition-colors"
        >
          Crear QR gratis ahora <span aria-hidden>→</span>
        </Link>
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 border border-white/50 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors"
        >
          Ya tengo cuenta
        </Link>
      </div>
    </div>
  </section>
);

export default CTASection;
