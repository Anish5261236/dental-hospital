"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/doctors", label: "Doctors" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/settings", label: "Site Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-ink text-porcelain min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-porcelain/10">
        <span className="font-display text-xl italic">Sri Vasavi</span>
        <div className="font-mono-tag text-[10px] tracking-[0.2em] uppercase text-sage mt-1">
          Admin Panel
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-porcelain/10 text-porcelain font-medium"
                  : "text-porcelain/70 hover:bg-porcelain/5 hover:text-porcelain"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-porcelain/10">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-porcelain/70 hover:bg-coral/20 hover:text-porcelain transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
