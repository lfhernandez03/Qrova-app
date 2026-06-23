import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-coral-400 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="6" height="6" rx="1" fill="white" />
              <rect x="10" y="2" width="6" height="6" rx="1" fill="white" />
              <rect x="2" y="10" width="6" height="6" rx="1" fill="white" />
              <rect x="12" y="12" width="2" height="2" rx="0.5" fill="white" />
              <rect x="10" y="10" width="2" height="2" rx="0.5" fill="white" />
              <rect x="14" y="10" width="2" height="2" rx="0.5" fill="white" />
              <rect x="10" y="14" width="2" height="2" rx="0.5" fill="white" />
            </svg>
          </div>
          <span className="text-coral-400 font-semibold text-lg tracking-tight">
            QRova
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-medium bg-coral-400 hover:bg-coral-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Crear QR gratis
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
