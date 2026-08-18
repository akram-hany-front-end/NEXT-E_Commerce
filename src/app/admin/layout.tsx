import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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