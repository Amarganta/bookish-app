"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className = "",
  ...props
}: InputProps) => (
  <div className="flex flex-col gap-1 w-full">
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <input
      {...props}
      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40 transition ${className}`}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
