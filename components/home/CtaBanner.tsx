import Link from "next/link";
import SmileArc from "@/components/ui/SmileArc";

export default function CtaBanner() {
  return (
    <section className="bg-ink text-porcelain">
      <div className="mx-auto max-w-4xl px-5 lg:px-8 py-20 text-center flex flex-col items-center">
        <h2 className="font-display text-3xl sm:text-4xl leading-tight">
          Ready for a healthier,
          <br />
          <span className="italic text-coral">more confident smile?</span>
        </h2>
        <SmileArc className="mt-5" color="var(--sage)" width={90} />
        <p className="mt-6 text-porcelain/70 max-w-md">
          Book your appointment today and let our specialists take care of the
          rest.
        </p>
        <Link
          href="/book-appointment"
          className="mt-8 bg-coral hover:bg-coral-dark transition-colors text-white font-medium px-8 py-3.5 rounded-full"
        >
          Book an Appointment
        </Link>
      </div>
    </section>
  );
}
