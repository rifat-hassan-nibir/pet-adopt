import { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function DashboardCard({
  children,
  className = "",
  padding = "md",
}: DashboardCardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
