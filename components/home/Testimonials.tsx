import SectionLabel from "@/components/ui/SectionLabel";

type Testimonial = {
  id: number;
  name: string;
  treatment: string | null;
  message: string;
};

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="bg-porcelain-2">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <SectionLabel align="center">Patient Stories</SectionLabel>
        <h2 className="font-display text-3xl sm:text-4xl mt-3 text-ink text-center">
          What our patients say
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((t) => (
            <div
              key={t.id}
              className="bg-white/70 rounded-2xl p-6 border border-ink/5 flex flex-col"
            >
              <span className="font-display italic text-3xl text-coral leading-none">
                &ldquo;
              </span>
              <p className="text-sm text-ink-soft leading-relaxed mt-2 flex-1">
                {t.message}
              </p>
              <div className="mt-4 pt-4 border-t border-ink/10">
                <div className="text-sm font-medium text-ink">{t.name}</div>
                {t.treatment && (
                  <div className="text-xs text-sage-dark font-mono-tag mt-0.5">
                    {t.treatment}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
