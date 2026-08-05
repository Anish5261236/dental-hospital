import AuthProvider from "@/components/admin/AuthProvider";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-porcelain-2">
        {session && <AdminSidebar />}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </AuthProvider>
  );
}
