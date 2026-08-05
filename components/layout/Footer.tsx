import Link from "next/link";
import SmileArc from "@/components/ui/SmileArc";

type Settings = {
  clinicName: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  hoursWeekday?: string | null;
  hoursSunday?: string | null;
  instagramUrl?: string | null;
};

export default function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="bg-ink text-porcelain mt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-display text-2xl italic">Sri Vasavi</span>
          <SmileArc className="mt-2" color="var(--sage)" />
          <p className="mt-4 text-sm text-porcelain/70 leading-relaxed">
            {settings.clinicName}. Painless, affordable, multispeciality dental
            care.
          </p>
        </div>

        <div>
          <h3 className="font-mono-tag text-xs tracking-[0.2em] uppercase text-sage mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-porcelain/80">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/doctors">Our Doctors</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono-tag text-xs tracking-[0.2em] uppercase text-sage mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-porcelain/80">
            {settings.phone && <li>{settings.phone}</li>}
            {settings.email && <li>{settings.email}</li>}
            {settings.address && <li className="leading-relaxed">{settings.address}</li>}
          </ul>
        </div>

        <div>
          <h3 className="font-mono-tag text-xs tracking-[0.2em] uppercase text-sage mb-4">
            Hours
          </h3>
          <ul className="space-y-2 text-sm text-porcelain/80">
            {settings.hoursWeekday && <li>{settings.hoursWeekday}</li>}
            {settings.hoursSunday && <li>{settings.hoursSunday}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-porcelain/10 py-5">
        <p className="text-center text-xs text-porcelain/50">
          &copy; {new Date().getFullYear()} {settings.clinicName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
