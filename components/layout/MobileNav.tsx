"use client";

import { useState } from "react";
import Link from "next/link";

type Link_ = { href: string; label: string };

export default function MobileNav({
  links,
  phone,
}: {
  links: Link_[];
  phone?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="p-2 -mr-2 text-porcelain"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          {open ? (
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-ink border-t border-porcelain/10 px-5 py-6 flex flex-col gap-4 shadow-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-porcelain/90 text-base"
            >
              {link.label}
            </Link>
          ))}
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-mono-tag text-sage">
              {phone}
            </a>
          )}
          <Link
            href="/book-appointment"
            onClick={() => setOpen(false)}
            className="bg-coral text-white text-center font-medium px-5 py-3 rounded-full mt-2"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </div>
  );
}
