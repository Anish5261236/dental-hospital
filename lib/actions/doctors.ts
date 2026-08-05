"use server";

import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createDoctor(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const qualification = String(formData.get("qualification") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!name) throw new Error("Name is required");

  await db.insert(doctors).values({
    name,
    slug: slugify(name),
    title: title || null,
    qualification: qualification || null,
    bio: bio || null,
    order,
  });

  revalidatePath("/admin/doctors");
  revalidatePath("/doctors");
  revalidatePath("/about");
  redirect("/admin/doctors");
}

export async function updateDoctor(id: number, formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const qualification = String(formData.get("qualification") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!name) throw new Error("Name is required");

  await db
    .update(doctors)
    .set({
      name,
      title: title || null,
      qualification: qualification || null,
      bio: bio || null,
      order,
      updatedAt: new Date(),
    })
    .where(eq(doctors.id, id));

  revalidatePath("/admin/doctors");
  revalidatePath("/doctors");
  revalidatePath("/about");
  redirect("/admin/doctors");
}

export async function deleteDoctor(id: number) {
  await requireAdmin();
  await db.delete(doctors).where(eq(doctors.id, id));
  revalidatePath("/admin/doctors");
  revalidatePath("/doctors");
  revalidatePath("/about");
}
