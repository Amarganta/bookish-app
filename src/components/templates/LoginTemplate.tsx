"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "../molecules/LoginForm/LoginForm";
// ... tus otros componentes de login

export default function LoginTemplate() {
  const { isAuthenticated, loading, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Solo redirigir después de hidratación completa
    if (isHydrated && !loading && isAuthenticated) {
      console.log("🔄 Redirecting to feed...");
      router.push("/feed");
    }
  }, [isAuthenticated, loading, isHydrated, router]);

  // Mostrar loading mientras se hidrata
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[--color-bg] to-[--color-accent]/10">
      {isAuthenticated ? <div>Redirigiendo al feed...</div> : <LoginForm />}
    </main>
  );
}
