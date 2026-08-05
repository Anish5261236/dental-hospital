import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import SmileArc from "@/components/ui/SmileArc";
import { getServiceBySlug, getServices } from "@/lib/db/queries";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Sri Vasavi Multispeciality Dental Hospital`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
  ]);

  if (!service) notFound();

  const otherServices = allServices.filter((s) => s.id !== service.id).slice(0, 4);

  return (
    <>
      <PageHeader eyebrow="Treatment" title={service.title} />

      <section className="bg-porcelain">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-ink-soft text-lg leading-relaxed">
              {service.longDesc ?? service.shortDesc}
            </p>

            <div className="mt-10 bg-white/60 border border-ink/5 rounded-2xl p-8">
              <span className="font-mono-tag text-xs tracking-[0.2em] uppercase text-sage-dark">
                Why patients choose us for this
              </span>
              <SmileArc className="mt-2" />
              <ul className="mt-5 space-y-3 text-sm text-ink-soft">
                <li>&bull; Specialist-led care, not general practice guesswork</li>
                <li>&bull; In-house digital X-ray for same-day diagnosis</li>
                <li>&bull; Transparent pricing discussed before treatment begins</li>
                <li>&bull; Gentle, modern techniques focused on minimizing discomfort</li>
              </ul>
            </div>

            <Link
              href="/book-appointment"
              className="inline-block mt-8 bg-coral hover:bg-coral-dark transition-colors text-white font-medium px-7 py-3.5 rounded-full"
            >
              Book This Treatment
            </Link>
          </div>

          <aside>
            <span className="font-mono-tag text-xs tracking-[0.2em] uppercase text-sage-dark">
              Other Services
            </span>
            <div className="mt-4 flex flex-col gap-3">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="block bg-white/60 hover:bg-white transition-colors border border-ink/5 rounded-xl px-5 py-4 text-sm text-ink font-medium"
                >
                  {s.title}
                </Link>
              ))}
            </div>
            <Link
              href="/services"
              className="inline-block mt-4 text-sm text-coral hover:text-coral-dark font-medium"
            >
              View all services &rarr;
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
