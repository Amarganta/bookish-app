"use client";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

export const Avatar = ({ src, alt, size = "md" }: AvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <img
      src={src}
      alt={alt || "avatar"}
      className={`${sizeClasses[size]} rounded-full object-cover border border-gray-200`}
    />
  );
};
