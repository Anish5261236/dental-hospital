"use server";

import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
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

export async function createService(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const shortDesc = String(formData.get("shortDesc") ?? "").trim();
  const longDesc = String(formData.get("longDesc") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!title || !shortDesc) {
    throw new Error("Title and short description are required");
  }

  await db.insert(services).values({
    title,
    slug: slugify(title),
    shortDesc,
    longDesc: longDesc || null,
    order,
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: number, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const shortDesc = String(formData.get("shortDesc") ?? "").trim();
  const longDesc = String(formData.get("longDesc") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!title || !shortDesc) {
    throw new Error("Title and short description are required");
  }

  await db
    .update(services)
    .set({
      title,
      shortDesc,
      longDesc: longDesc || null,
      order,
      updatedAt: new Date(),
    })
    .where(eq(services.id, id));

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: number) {
  await requireAdmin();
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}
