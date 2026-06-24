import Logo from "@/components/ui/logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

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
