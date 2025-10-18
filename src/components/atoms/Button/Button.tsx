"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  ...props
}: ButtonProps) => {
  const base =
    "rounded-lg px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-primary text-white hover:brightness-105 focus:ring-primary"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300";

  return (
    <button
      {...props}
      disabled={isLoading}
      className={`${base} ${styles} ${className}`}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
};
