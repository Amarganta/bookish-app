"use client";
import { LoginForm } from "@/components/organisms/LoginForm";

export default function LoginTemplate() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <LoginForm />
    </main>
  );
}
