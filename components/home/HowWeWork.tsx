import SectionLabel from "@/components/ui/SectionLabel";

const STEPS = [
  { step: "01", title: "Book a Visit", desc: "Call, WhatsApp, or book online in under a minute." },
  { step: "02", title: "Get Examined", desc: "Thorough exam with in-house X-ray if needed, same day." },
  { step: "03", title: "Review Your Plan", desc: "We walk you through options, timelines, and costs clearly." },
  { step: "04", title: "Begin Treatment", desc: "Gentle, precise care from a specialist matched to your need." },
];

export default function HowWeWork() {
  return (
    <section className="bg-porcelain-2">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <SectionLabel>The Process</SectionLabel>
        <h2 className="font-display text-3xl sm:text-4xl mt-3 text-ink max-w-xl">
          How your visit works
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STEPS.map((s) => (
            <div key={s.step} className="relative">
              <span className="font-display italic text-4xl text-sage/50">
                {s.step}
              </span>
              <h3 className="font-display text-lg mt-2 text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
