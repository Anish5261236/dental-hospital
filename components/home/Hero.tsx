import Link from "next/link";
import SmileArc from "@/components/ui/SmileArc";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-porcelain">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="font-mono-tag text-xs tracking-[0.2em] uppercase text-sage-dark">
            Ongole&apos;s Trusted Multispeciality Clinic
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] mt-4 text-ink">
            Painless dental care,
            <br />
            <span className="italic text-coral">designed around your smile.</span>
          </h1>
          <SmileArc className="mt-6" width={90} />
          <p className="mt-6 text-ink-soft text-base sm:text-lg max-w-lg leading-relaxed">
            From routine check-ups to advanced implants, our seven specialists
            provide gentle, precise care with in-house X-rays &mdash; no
            outside referrals, no unnecessary waiting.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="bg-coral hover:bg-coral-dark transition-colors text-white font-medium px-7 py-3.5 rounded-full"
            >
              Book an Appointment
            </Link>
            <Link
              href="/services"
              className="border border-ink/20 hover:border-ink/40 transition-colors text-ink font-medium px-7 py-3.5 rounded-full"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-10 flex gap-8 font-mono-tag">
            <div>
              <div className="text-2xl text-ink">7+</div>
              <div className="text-xs text-ink-soft uppercase tracking-wide">Specialists</div>
            </div>
            <div>
              <div className="text-2xl text-ink">14</div>
              <div className="text-xs text-ink-soft uppercase tracking-wide">Treatments</div>
            </div>
            <div>
              <div className="text-2xl text-ink">7 Days</div>
              <div className="text-xs text-ink-soft uppercase tracking-wide">Open Weekly</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="relative w-full aspect-[4/5] max-w-md mx-auto overflow-hidden bg-porcelain-2"
            style={{ borderRadius: "50% 50% 48% 48% / 60% 60% 40% 40%" }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-ink-soft/40 font-mono-tag text-sm text-center px-8">
              Patient / clinic photo goes here
              <br />
              (arc-mask frame)
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-ink text-porcelain rounded-full px-6 py-3 font-mono-tag text-xs tracking-wide shadow-lg whitespace-nowrap">
            In-house Digital X-Ray &middot; Same-day Diagnosis
          </div>
        </div>
      </div>
    </section>
  );
}
