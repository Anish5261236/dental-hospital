import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmileArc from "@/components/ui/SmileArc";
import { getDoctorBySlug, getDoctors } from "@/lib/db/queries";

export async function generateStaticParams() {
  const doctors = await getDoctors();
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return {};
  return {
    title: `${doctor.name} | Sri Vasavi Multispeciality Dental Hospital`,
    description: doctor.bio ?? undefined,
  };
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();

  return (
    <section className="bg-porcelain">
      <div className="mx-auto max-w-5xl px-5 lg:px-8 py-16 grid md:grid-cols-[280px_1fr] gap-12">
        <div>
          <div
            className="aspect-[4/5] bg-porcelain-2 flex items-center justify-center text-ink-soft/40 font-mono-tag text-xs text-center px-6"
            style={{ borderRadius: "50% 50% 48% 48% / 60% 60% 40% 40%" }}
          >
            {doctor.name} photo
          </div>
        </div>

        <div>
          <span className="font-mono-tag text-xs tracking-[0.2em] uppercase text-sage-dark">
            {doctor.title}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl mt-2 text-ink">
            {doctor.name}
          </h1>
          <SmileArc className="mt-4" />
          <p className="mt-4 text-sm font-medium text-ink-soft">
            {doctor.qualification}
          </p>
          <p className="mt-6 text-ink-soft leading-relaxed">{doctor.bio}</p>

          <Link
            href="/book-appointment"
            className="inline-block mt-8 bg-coral hover:bg-coral-dark transition-colors text-white font-medium px-7 py-3.5 rounded-full"
          >
            Book with {doctor.name.replace(/^Dr\.\s*/, "Dr. ")}
          </Link>
        </div>
      </div>
    </section>
  );
}
