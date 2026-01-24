import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glassmorphism" | "outline" | "link";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles = "px-6 py-3 font-bold text-sm md:text-base transition-all duration-300 cursor-pointer rounded-xl shadow-lg";
  
  const variants = {
    primary: "bg-[#8B5A2B] text-white hover:bg-[#6B4423] hover:scale-105 hover:shadow-xl hover:shadow-[#8B5A2B]/50 active:scale-100",
    secondary: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black hover:shadow-xl hover:shadow-white/30 hover:scale-105 active:scale-100",
    glassmorphism: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:shadow-xl hover:shadow-white/20 active:scale-100",
    outline: "bg-transparent border-2 border-gray-300 text-gray-700 hover:border-[#8B5A2B] hover:text-[#8B5A2B] hover:scale-105 active:scale-100",
    link: "bg-transparent border-none shadow-none text-[#8B5A2B] hover:text-[#A67C52] underline-offset-4 hover:underline px-0 py-0",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
