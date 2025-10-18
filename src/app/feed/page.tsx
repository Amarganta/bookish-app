"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@organisms/Header/Header";
import { useAuth } from "@/hooks/useAuth";

export default function FeedPage() {
  const { isAuthenticated, currentUser, loading, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Solo redirigir después de hidratación
    if (isHydrated && !loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, isHydrated, router]);

  // Mostrar loading mientras se hidrata
  if (!isHydrated || loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <main className="min-h-screen bg-bg-custom">
      <Header />
      <section className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          ¡Hola, {currentUser?.name}!
        </h2>
        <p className="text-gray-600">
          Este será tu <strong>feed de libros</strong>. ✨
        </p>
      </section>
    </main>
  );
}
