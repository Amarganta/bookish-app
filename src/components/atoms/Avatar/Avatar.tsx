import { forwardRef, ImgHTMLAttributes } from "react";

interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "className"> {
  src: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallbackSrc?: string;
  border?: boolean;
  className?: string;
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      src,
      alt,
      size = "md",
      fallbackSrc = "https://i.pravatar.cc/150?img=1",
      border = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
    };

    const combinedClasses = [
      "rounded-full object-cover flex-shrink-0",
      sizeClasses[size],
      border && "border-2 border-gray-300",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <img
        ref={ref}
        src={src || fallbackSrc}
        alt={alt}
        className={combinedClasses}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";
