import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-4">
      <h1 className="text-4xl font-bold text-gray-900">Qrova</h1>
      <p className="text-gray-500">
        Sin planes premium. Sin funciones bloqueadas. Sin sorpresas.
      </p>
      <div className="flex gap-4">
        <Link
          href="/sign-in"
          className="rounded-lg bg-coral-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-coral-500 transition-colors"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Crear cuenta
        </Link>
      </div>
    </main>
  );
}
