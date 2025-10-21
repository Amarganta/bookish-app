import { forwardRef, ImgHTMLAttributes } from "react";

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "className"> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  border?: boolean;
  shadow?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fallbackSrc,
      aspectRatio = "auto",
      objectFit = "cover",
      rounded = "none",
      border = false,
      shadow = "none",
      className = "",
      ...props
    },
    ref
  ) => {
    // Clases CSS estáticas
    const aspectRatioClasses = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      auto: "",
    };

    const objectFitClasses = {
      cover: "object-cover",
      contain: "object-contain",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    };

    const roundedClasses = {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    const shadowClasses = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    };

    const combinedClasses = [
      "block w-full h-full transition-opacity duration-300",
      aspectRatioClasses[aspectRatio],
      objectFitClasses[objectFit],
      roundedClasses[rounded],
      shadowClasses[shadow],
      border && "border border-gray-200",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={combinedClasses}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";
