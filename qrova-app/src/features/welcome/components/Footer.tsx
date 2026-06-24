import Logo from "@/components/ui/logo";
import Link from "next/link";

const LINKS = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos",   href: "/terminos" },
  { label: "Contacto",   href: "/contacto" },
] as const;

const Footer = () => (
  <footer className="bg-gray-900 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <Logo size="sm" />

      <p className="text-gray-500 text-sm text-center">
        © 2026 Qrova. Herramienta de QR con analítica para negocios en LATAM.
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
