import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import { getSiteSettings, getDoctors } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "About Us | Sri Vasavi Multispeciality Dental Hospital",
  description:
    "Learn about Sri Vasavi Multispeciality Dental Hospital, Ongole's trusted destination for painless, affordable dental care.",
};

export default async function AboutPage() {
  const [settings, doctors] = await Promise.all([getSiteSettings(), getDoctors()]);

  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Dental care built around trust"
        description={`${settings.clinicName} brings together seven specialists under one roof, so patients in Ongole get expert, coordinated care without being sent from clinic to clinic.`}
      />

      <section className="bg-porcelain">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-16">
          <SectionLabel>Our Mission</SectionLabel>
          <h2 className="font-display text-3xl mt-3 text-ink">
            Every patient deserves painless, honest dental care
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">
            We started Sri Vasavi Multispeciality Dental Hospital with a simple
            belief: dental visits shouldn&rsquo;t be something people dread.
            By combining in-house diagnostic imaging with a team of doctors
            each trained in a specific speciality &mdash; from paediatric
            dentistry to oral surgery &mdash; we&rsquo;re able to give every
            patient a precise, gentle treatment plan without the delays of
            referrals to outside clinics.
          </p>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Whether you need a routine cleaning or a complex implant
            procedure, our {doctors.length} specialists work together to make
            sure your care is coordinated, transparent, and as comfortable as
            possible.
          </p>
        </div>
      </section>

      <section className="bg-porcelain-2">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
          <SectionLabel>Our Values</SectionLabel>
          <div className="mt-8 grid sm:grid-cols-3 gap-8">
            {[
              {
                title: "Comfort First",
                desc: "Modern, gentle techniques designed to minimize pain and anxiety at every visit.",
              },
              {
                title: "Honest Pricing",
                desc: "Clear treatment plans and costs, discussed before any procedure begins.",
              },
              {
                title: "Coordinated Care",
                desc: "Specialists who consult with each other, not silos that pass you around.",
              },
            ].map((v) => (
              <div key={v.title}>
                <h3 className="font-display text-xl text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
