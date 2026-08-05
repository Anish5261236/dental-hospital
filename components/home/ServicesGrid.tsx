import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

type Service = {
  id: number;
  title: string;
  slug: string;
  shortDesc: string;
};

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="bg-porcelain">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <SectionLabel>What We Treat</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl mt-3 text-ink">
              Comprehensive dental services
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-medium text-coral hover:text-coral-dark shrink-0"
          >
            View all services &rarr;
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative bg-white/60 hover:bg-white transition-colors rounded-2xl p-7 border border-ink/5"
            >
              <div className="absolute top-0 left-7 -translate-y-1/2 w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-sage-dark" />
              </div>
              <h3 className="font-display text-xl text-ink mt-3 group-hover:text-coral transition-colors">
                {service.title}
              </h3>
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
  );
}
