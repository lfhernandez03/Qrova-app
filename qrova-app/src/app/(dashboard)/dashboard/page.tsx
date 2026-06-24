import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Sesión activa como{" "}
          <span className="font-mono text-coral-400">{user.emailAddresses[0]?.emailAddress}</span>
        </p>
        <pre className="bg-white border border-gray-200 rounded-lg p-4 text-xs font-mono overflow-auto text-gray-700 leading-relaxed">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </main>
  );
}
