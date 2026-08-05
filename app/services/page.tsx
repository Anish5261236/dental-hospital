import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { getServices } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Our Services | Sri Vasavi Multispeciality Dental Hospital",
  description:
    "Explore our full range of dental treatments, from routine check-ups to implants and orthodontics.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        eyebrow="What We Treat"
        title="Our Dental Services"
        description="Fourteen specialities, one roof. Every treatment is delivered by a doctor trained specifically in that area of care."
      />

      <section className="bg-porcelain">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative bg-white/60 hover:bg-white transition-colors rounded-2xl p-7 border border-ink/5"
              >
                <div className="absolute top-0 left-7 -translate-y-1/2 w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sage-dark" />
                </div>
                <h2 className="font-display text-xl text-ink mt-3 group-hover:text-coral transition-colors">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  {service.shortDesc}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-sage-dark">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
