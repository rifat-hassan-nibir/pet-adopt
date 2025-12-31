import Image from "next/image";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Avatar({
  src,
  name,
  size = "md",
  className = "",
}: AvatarProps) {
  const sizes = {
    sm: { class: "w-8 h-8 text-xs", px: 32 },
    md: { class: "w-10 h-10 text-sm", px: 40 },
    lg: { class: "w-16 h-16 text-lg", px: 64 },
    xl: { class: "w-24 h-24 text-2xl", px: 96 },
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={sizes[size].px}
        height={sizes[size].px}
        className={`${sizes[size].class} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size].class} rounded-full bg-emerald-100 flex items-center justify-center font-semibold text-emerald-700 ${className}`}
    >
      {initials}
    </div>
  );
}
