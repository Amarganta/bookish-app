"use client";
import { useSelector } from "react-redux";
import { RootState } from "@lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@organisms/Header/Header";

export default function FeedPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Si no está logueado, redirigimos al login
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen bg-bg-custom">
      <Header />
      <section className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          ¡Hola, {user?.name.split(" ")[0]}!
        </h2>
        <p className="text-gray-600">
          Este será tu <strong>feed de libros</strong>. ✨
        </p>
      </section>
    </main>
  );
}
