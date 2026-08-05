import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import SectionLabel from "@/components/ui/SectionLabel";
import { getSiteSettings } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Contact Us | Sri Vasavi Multispeciality Dental Hospital",
  description: "Get in touch with Sri Vasavi Multispeciality Dental Hospital, Ongole.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Questions about a treatment, insurance, or your visit? Send us a message or call directly."
      />

      <section className="bg-porcelain">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-[1fr_1.3fr] gap-12">
          <div>
            <SectionLabel>Reach Us</SectionLabel>
            <div className="mt-6 space-y-6">
              {settings.phone && (
                <InfoBlock label="Phone">
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                    {settings.phone}
                  </a>
                </InfoBlock>
              )}
              {settings.email && (
                <InfoBlock label="Email">
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </InfoBlock>
              )}
              {settings.address && (
                <InfoBlock label="Address">{settings.address}</InfoBlock>
              )}
              {(settings.hoursWeekday || settings.hoursSunday) && (
                <InfoBlock label="Hours">
                  {settings.hoursWeekday && <div>{settings.hoursWeekday}</div>}
                  {settings.hoursSunday && <div>{settings.hoursSunday}</div>}
                </InfoBlock>
              )}
            </div>
          </div>

          <div className="bg-white/60 border border-ink/5 rounded-2xl p-6 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="text-xs font-mono-tag uppercase tracking-wide text-sage-dark">
        {label}
      </span>
      <div className="mt-1 text-ink-soft leading-relaxed">{children}</div>
    </div>
  );
}
