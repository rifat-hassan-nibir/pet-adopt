interface StatusBadgeProps {
  status: "available" | "adopted" | "pending";
  className?: string;
}

export default function StatusBadge({
  status,
  className = "",
}: StatusBadgeProps) {
  const styles = {
    available: "bg-emerald-100 text-emerald-700 border-emerald-200",
    adopted: "bg-blue-100 text-blue-700 border-blue-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
  };

  const labels = {
    available: "Available",
    adopted: "Adopted",
    pending: "Pending",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === "available"
            ? "bg-emerald-500"
            : status === "adopted"
            ? "bg-blue-500"
            : "bg-amber-500"
        }`}
      />
      {labels[status]}
    </span>
  );
}
