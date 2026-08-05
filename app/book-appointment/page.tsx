import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getServices, getSiteSettings } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Book an Appointment | Sri Vasavi Multispeciality Dental Hospital",
  description: "Request an appointment with our dental specialists in Ongole.",
};

export default async function BookAppointmentPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);

  return (
    <>
      <PageHeader
        eyebrow="Get Started"
        title="Book an Appointment"
        description="Fill out the form below and our team will call to confirm your slot. Prefer to talk now?"
      />

      <section className="bg-porcelain">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16">
          {settings.phone && (
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 mb-10 font-mono-tag text-ink border border-ink/15 rounded-full px-5 py-2.5"
            >
              Call {settings.phone}
            </a>
          )}
          <div className="bg-white/60 border border-ink/5 rounded-2xl p-6 sm:p-10">
            <AppointmentForm services={services} />
          </div>
        </div>
      </section>
    </>
  );
}
