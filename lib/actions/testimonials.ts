"use server";

import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";

export async function createTestimonial(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const treatment = String(formData.get("treatment") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!name || !message) throw new Error("Name and message are required");

  await db.insert(testimonials).values({
    name,
    treatment: treatment || null,
    message,
    order,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: number, formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const treatment = String(formData.get("treatment") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!name || !message) throw new Error("Name and message are required");

  await db
    .update(testimonials)
    .set({ name, treatment: treatment || null, message, order })
    .where(eq(testimonials.id, id));

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: number) {
  await requireAdmin();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
