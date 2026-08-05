import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { getGalleryImages } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Gallery | Sri Vasavi Multispeciality Dental Hospital",
  description: "A look inside our clinic, equipment, and patient care.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHeader
        eyebrow="Take a Look"
        title="Our Clinic Gallery"
        description="A look inside our facility, equipment, and the care we provide every day."
      />

      <section className="bg-porcelain">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
          {images.length === 0 ? (
            <div className="text-center py-20 text-ink-soft">
              <p className="font-mono-tag text-sm">
                No gallery images yet &mdash; add some from the admin panel.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="aspect-square bg-porcelain-2 rounded-2xl overflow-hidden relative border border-ink/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.caption ?? "Clinic photo"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
