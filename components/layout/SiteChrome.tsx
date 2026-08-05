"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

type Settings = {
  clinicName: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  hoursWeekday?: string | null;
  hoursSunday?: string | null;
  instagramUrl?: string | null;
};

export default function SiteChrome({
  settings,
  children,
}: {
  settings: Settings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
