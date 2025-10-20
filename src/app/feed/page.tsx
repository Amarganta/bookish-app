"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FeedTemplate } from "@/components/templates/FeedTemplate";

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

  return <FeedTemplate />;
}
