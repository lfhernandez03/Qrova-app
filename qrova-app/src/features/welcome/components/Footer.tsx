import Link from "next/link";

const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <div className="size-7 rounded-lg bg-coral-400 flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="2" y="2" width="6" height="6" rx="1" fill="white" />
        <rect x="10" y="2" width="6" height="6" rx="1" fill="white" />
        <rect x="2" y="10" width="6" height="6" rx="1" fill="white" />
        <rect x="12" y="12" width="2" height="2" rx="0.5" fill="white" />
        <rect x="10" y="10" width="2" height="2" rx="0.5" fill="white" />
        <rect x="14" y="10" width="2" height="2" rx="0.5" fill="white" />
        <rect x="10" y="14" width="2" height="2" rx="0.5" fill="white" />
      </svg>
    </div>
    <span className="text-coral-400 font-semibold text-base tracking-tight">
      Qrova
    </span>
  </Link>
);

const LINKS = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos",   href: "/terminos" },
  { label: "Contacto",   href: "/contacto" },
] as const;

const Footer = () => (
  <footer className="bg-gray-900 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <Logo />

      <p className="text-gray-500 text-sm text-center">
        © 2025 Qrova. Herramienta de QR con analítica para negocios en LATAM.
      </p>

      <nav className="flex items-center gap-5">
        {LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
