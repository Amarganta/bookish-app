"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Input } from "@atoms/Input/Input";
import { Button } from "@atoms/Button/Button";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@features/authSlice";
import { useRouter } from "next/navigation";
import type { AppDispatch } from "@lib/store";

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || (isRegister && !form.fullName)) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Por favor ingresa un correo válido.");
      return;
    }

    setIsLoading(true);
    dispatch(loginStart());

    try {
      // 🔹 Simulación del registro
      if (isRegister) {
        // En un backend real harías una llamada a la API aquí.
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newUser = {
          id: Date.now().toString(),
          name: form.fullName,
          email: form.email,
          avatar: `https://api.dicebear.com/8.x/thumbs/svg?seed=${form.fullName}`,
        };

        dispatch(loginSuccess(newUser));
        localStorage.setItem("mockUser", JSON.stringify(newUser));
        router.push("/feed");
      } else {
        // 🔹 Simulación del login
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Simulamos un usuario guardado (en una app real verificarías credenciales)
        const storedUser = localStorage.getItem("mockUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.email === form.email) {
            dispatch(loginSuccess(userData));
            router.push("/feed");
          } else {
            throw new Error("Credenciales inválidas.");
          }
        } else {
          throw new Error("No existe un usuario registrado con ese correo.");
        }
      }
    } catch (err: any) {
      dispatch(loginFailure(err.message));
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 w-full max-w-sm animate-fade-in overflow-hidden"
    >
      <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
        {isRegister ? "Crea tu cuenta" : "Inicia sesión"}
      </h1>

      {/* Campo nombre solo para registro */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isRegister ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Input
          label="Nombre completo"
          name="fullName"
          type="text"
          placeholder="Tu nombre"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>

      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="tu@correo.com"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        label="Contraseña"
        name="password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
      />

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <Button type="submit" isLoading={isLoading} className="mt-2">
        {isRegister ? "Registrarse" : "Iniciar sesión"}
      </Button>
      <div className="flex items-center gap-2 my-3">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-500 text-sm">o</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google")}
        className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
      >
        <Image
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        <span className="text-sm font-medium text-gray-700">
          Continuar con Google
        </span>
      </button>

      <p className="text-sm text-center text-gray-600 mt-2">
        {isRegister ? (
          <>
            ¿Ya tienes cuenta?{" "}
            <span
              onClick={() => setIsRegister(false)}
              className="text-primary font-medium cursor-pointer hover:underline"
            >
              Inicia sesión
            </span>
          </>
        ) : (
          <>
            ¿No tienes cuenta?{" "}
            <span
              onClick={() => setIsRegister(true)}
              className="text-primary font-medium cursor-pointer hover:underline"
            >
              Regístrate
            </span>
          </>
        )}
      </p>
    </form>
  );
};
