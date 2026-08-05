"use server";

import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "./require-admin";

export async function updateSiteSettings(id: number, formData: FormData) {
  await requireAdmin();

  const clinicName = String(formData.get("clinicName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const hoursWeekday = String(formData.get("hoursWeekday") ?? "").trim();
  const hoursSunday = String(formData.get("hoursSunday") ?? "").trim();
  const instagramUrl = String(formData.get("instagramUrl") ?? "").trim();

  if (!clinicName) throw new Error("Clinic name is required");

  await db
    .update(siteSettings)
    .set({
      clinicName,
      phone: phone || null,
      whatsapp: whatsapp || null,
      email: email || null,
      address: address || null,
      hoursWeekday: hoursWeekday || null,
      hoursSunday: hoursSunday || null,
      instagramUrl: instagramUrl || null,
    })
    .where(eq(siteSettings.id, id));

  // Settings affect nearly every page (header/footer/contact/booking)
  revalidatePath("/", "layout");
}
