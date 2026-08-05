import { auth } from "@/lib/auth";

/**
 * Every admin server action calls this first. Middleware already protects
 * the /admin pages, but server actions can in principle be invoked directly,
 * so each mutation double-checks the session itself.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
