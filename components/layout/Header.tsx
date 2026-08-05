import Link from "next/link";
import MobileNav from "./MobileNav";

type Settings = {
  clinicName: string;
  phone?: string | null;
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ settings }: { settings: Settings }) {
  return (
    <header className="sticky top-0 z-50 bg-ink text-porcelain">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 flex items-center justify-between h-18 py-3">
        <Link href="/" className="flex flex-col leading-tight shrink-0">
          <span className="font-display text-xl sm:text-2xl italic">Sri Vasavi</span>
          <span className="font-mono-tag text-[10px] tracking-[0.25em] uppercase text-sage">
            Multispeciality Dental
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-porcelain/85 hover:text-porcelain transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {settings.phone && (
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="font-mono-tag text-sm text-porcelain/85 hover:text-porcelain"
            >
              {settings.phone}
            </a>
          )}
          <Link
            href="/book-appointment"
            className="bg-coral hover:bg-coral-dark transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full"
          >
            Book Appointment
          </Link>
        </div>

        <MobileNav links={NAV_LINKS} phone={settings.phone ?? undefined} />
      </div>
    </header>
  );
}
