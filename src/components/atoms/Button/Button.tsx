"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const base =
    "rounded-md px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1";

  const styles =
    variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300";

  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
};
