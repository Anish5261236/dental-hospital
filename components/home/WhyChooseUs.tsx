import SectionLabel from "@/components/ui/SectionLabel";

const REASONS = [
  {
    title: "Painless, Modern Technique",
    desc: "Rotary endodontics and gentle sedation options mean minimal discomfort at every visit.",
  },
  {
    title: "In-house Digital X-Ray",
    desc: "No referrals or delays &mdash; diagnostic imaging and treatment happen under one roof.",
  },
  {
    title: "Seven Specialists, One Roof",
    desc: "Orthodontics, periodontics, surgery, and pediatric care &mdash; all coordinated together.",
  },
  {
    title: "Transparent, Affordable Pricing",
    desc: "Clear treatment plans and costs discussed upfront, no surprise charges.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-ink text-porcelain">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <SectionLabel onDark>Why Sri Vasavi</SectionLabel>
        <h2 className="font-display text-3xl sm:text-4xl mt-3 max-w-xl">
          Care that puts your comfort first
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((reason, i) => (
            <div key={reason.title}>
              <span className="font-mono-tag text-sage text-sm">
                0{i + 1}
              </span>
              <h3 className="font-display text-lg mt-3 italic">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-porcelain/70 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
