import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glassmorphism" | "outline" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "font-bold transition-all duration-300 cursor-pointer rounded-xl shadow-lg";

  const variants = {
    primary: "bg-[#4A3728] text-white hover:bg-[#3D2E21] hover:scale-102 hover:shadow-xl hover:shadow-[#4A3728]/30 active:scale-100",
    secondary: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black hover:shadow-xl hover:shadow-white/20 hover:scale-102 active:scale-100",
    glassmorphism: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-102 hover:shadow-xl hover:shadow-white/10 active:scale-100",
    outline: "bg-transparent border-2 border-gray-200 text-gray-600 hover:border-[#4A3728] hover:text-[#4A3728] hover:scale-102 active:scale-100",
    link: "bg-transparent border-none shadow-none text-[#4A3728] hover:text-[#6F4E37] underline-offset-4 hover:underline",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs md:text-sm",
    md: "px-6 py-3 text-sm md:text-base",
    lg: "px-8 py-4 text-base md:text-lg",
    icon: "p-2 aspect-square flex items-center justify-center",
  };

  // Special case for link variant to remove padding/shadow
  const finalVariantStyles = variant === "link" ? variants.link : variants[variant];
  const finalSizeStyles = variant === "link" ? "px-0 py-0" : sizes[size];

  return (
    <button
      className={`${baseStyles} ${finalVariantStyles} ${finalSizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

