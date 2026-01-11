import { getUserSession } from "@/database/session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  if (session?.user) {
    return redirect("/profile");
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
