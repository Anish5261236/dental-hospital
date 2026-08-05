import { db } from "./index";
import { services, doctors, faqs, testimonials, siteSettings, galleryImages } from "./schema";
import { asc, eq } from "drizzle-orm";

export async function getSiteSettings() {
  const rows = await db.select().from(siteSettings).limit(1);
  return (
    rows[0] ?? {
      id: 0,
      clinicName: "Sri Vasavi Multispeciality Dental Hospital",
      phone: "",
      whatsapp: "",
      email: "",
      address: "",
      hoursWeekday: "",
      hoursSunday: "",
      instagramUrl: "",
    }
  );
}

export async function getServices() {
  return db.select().from(services).orderBy(asc(services.order));
}

export async function getServiceBySlug(slug: string) {
  const rows = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getDoctors() {
  return db.select().from(doctors).orderBy(asc(doctors.order));
}

export async function getDoctorBySlug(slug: string) {
  const rows = await db.select().from(doctors).where(eq(doctors.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getFaqs() {
  return db.select().from(faqs).orderBy(asc(faqs.order));
}

export async function getTestimonials() {
  return db.select().from(testimonials).orderBy(asc(testimonials.order));
}

export async function getGalleryImages() {
  return db.select().from(galleryImages).orderBy(asc(galleryImages.order));
}
