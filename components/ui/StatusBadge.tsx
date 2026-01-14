interface StatusBadgeProps {
  status: "AVAILABLE" | "ADOPTED";
  className?: string;
}

export default function StatusBadge({
  status,
  className = "",
}: StatusBadgeProps) {
  const styles = {
    AVAILABLE: "bg-emerald-100 text-emerald-700 border-emerald-200",
    ADOPTED: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const labels = {
    AVAILABLE: "Available",
    ADOPTED: "Adopted",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === "AVAILABLE"
            ? "bg-emerald-500"
            : status === "ADOPTED"
            ? "bg-blue-500"
            : "bg-amber-500"
        }`}
      />
      {labels[status]}
    </span>
  );
}
