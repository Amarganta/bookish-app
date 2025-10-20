import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "icon";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      isLoading = false,
      disabled = false,
      children,
      className = "",
      ...restProps
    },
    ref
  ) => {
    // Estilos base
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 rounded-lg border";

    // Variantes de color
    const variantClasses = {
      primary: {
        normal:
          "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        disabled:
          "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed",
        loading: "bg-blue-500 text-white border-blue-500 cursor-wait",
      },
      secondary: {
        normal:
          "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 focus:ring-gray-400",
        disabled: "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed",
        loading: "bg-gray-100 text-gray-600 border-gray-300 cursor-wait",
      },
      outline: {
        normal:
          "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-gray-400",
        disabled: "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed",
        loading: "bg-white text-gray-600 border-gray-300 cursor-wait",
      },
      ghost: {
        normal:
          "bg-transparent text-gray-700 border-transparent hover:bg-gray-100 focus:ring-gray-400",
        disabled:
          "bg-transparent text-gray-400 border-transparent cursor-not-allowed",
        loading: "bg-transparent text-gray-600 border-transparent cursor-wait",
      },
      danger: {
        normal:
          "bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-red-500",
        disabled:
          "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed",
        loading: "bg-red-500 text-white border-red-500 cursor-wait",
      },
      icon: {
        normal: "bg-none",
        disabled: "text-gray-400",
        loading: "bg-transparent text-gray-600 border-transparent cursor-wait",
      },
    };

    // Tamaños
    const sizeClasses = {
      small: "px-3 py-1.5 text-sm min-h-[32px]",
      medium: "px-4 py-2 text-sm min-h-[40px]",
      large: "px-6 py-3 text-base min-h-[48px]",
    };

    // Determinar estado actual
    const currentState = disabled
      ? "disabled"
      : isLoading
      ? "loading"
      : "normal";

    // Combinar clases
    const buttonClasses = [
      baseClasses,
      variantClasses[variant][currentState],
      sizeClasses[size],
      className,
    ].join(" ");

    // Spinner de carga
    const LoadingIcon = () => (
      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...restProps}
      >
        {isLoading && <LoadingIcon />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
