import Link from "next/link";

const HeroActions = () => (
  <div className="flex items-center gap-5">
    <Link
      href="/sign-up"
      className="inline-flex items-center gap-2 bg-coral-400 hover:bg-coral-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
    >
      Crear mi QR gratis
      <span aria-hidden>→</span>
    </Link>
    <Link
      href="/sign-in"
      className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
    >
      Iniciar sesión <span aria-hidden>›</span>
    </Link>
  </div>
);

export default HeroActions;
