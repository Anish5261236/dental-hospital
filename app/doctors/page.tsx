import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { getDoctors } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Our Doctors | Sri Vasavi Multispeciality Dental Hospital",
  description:
    "Meet our team of seven dental specialists across orthodontics, periodontics, surgery, and more.",
};

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Meet Our Specialists"
        description="Seven dentists, each trained in a distinct speciality, working together under one roof."
      />

      <section className="bg-porcelain">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <Link
                key={doc.id}
                href={`/doctors/${doc.slug}`}
                className="group bg-white/60 hover:bg-white transition-colors rounded-2xl overflow-hidden border border-ink/5"
              >
                <div
                  className="aspect-[4/3] bg-porcelain-2 flex items-center justify-center text-ink-soft/40 font-mono-tag text-xs text-center px-6"
                  style={{ borderRadius: "0" }}
                >
                  {doc.name} photo
                </div>
                <div className="p-6">
                  <h2 className="font-display text-lg text-ink group-hover:text-coral transition-colors">
                    {doc.name}
                  </h2>
                  <p className="text-xs text-sage-dark font-mono-tag mt-1 uppercase tracking-wide">
                    {doc.title}
                  </p>
                  <p className="text-sm text-ink-soft mt-3">{doc.qualification}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
