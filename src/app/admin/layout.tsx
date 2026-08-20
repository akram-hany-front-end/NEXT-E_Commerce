import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../../../auth";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "ADMIN") {
        redirect("/products");
    }
  return (
    <div className="flex min-h-screen w-full bg-[var(--background)]">
      {/* Main Content */}
      <main className="min-w-0 flex-1">
        {children}
      </main>

      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 md:block">
        <Sidebar />
      </aside>
    </div>
  );
}