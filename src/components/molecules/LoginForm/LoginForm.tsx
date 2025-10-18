"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@features/authSlice";
import { useRouter } from "next/navigation";
import type { AppDispatch } from "@lib/store";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Por favor completa todos los campos.");
      return;
    }

    dispatch(
      login({
        id: Date.now().toString(),
        name: form.name,
        email: form.email,
      })
    );

    router.push("/feed");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 w-80"
    >
      <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
        📚 Bookish
      </h1>

      <Input
        label="Nombre"
        name="name"
        type="text"
        placeholder="Tu nombre"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="tu@correo.com"
        value={form.email}
        onChange={handleChange}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="mt-2">
        Iniciar sesión
      </Button>
    </form>
  );
};
