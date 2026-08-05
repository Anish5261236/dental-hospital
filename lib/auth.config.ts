import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [], // real providers are added in lib/auth.ts (needs Node runtime)
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;
      const isLoginPage = pathname === "/admin/login";
      const isAdminRoute = pathname.startsWith("/admin");

      if (isAdminRoute && !isLoginPage && !isLoggedIn) {
        return false; // NextAuth redirects to `pages.signIn` automatically
      }
      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", request.nextUrl.origin));
      }
      return true;
    },
  },
};
