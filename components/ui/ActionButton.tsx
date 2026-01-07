import { ButtonHTMLAttributes, ReactNode } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "danger" | "success";
  size?: "sm" | "md";
}

export default function ActionButton({
  children,
  variant = "default",
  size = "sm",
  className = "",
  ...props
}: ActionButtonProps) {
  const variants = {
    default:
      "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    danger:
      "text-red-600 hover:text-red-700 hover:bg-red-50 focus:ring-red-500",
    success:
      "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500",
  };

  const sizes = {
    sm: "p-1.5",
    md: "p-2",
  };

  return (
    <button
      className={`hover:cursor-pointer inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
