import { getUserSession } from "@/database/session";
import { redirect } from "next/navigation";

export default async function ProtectedRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  if (!session?.user) {
    return redirect("/login");
  }
  return <>{children}</>;
}
