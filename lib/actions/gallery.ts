"use server";

import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "./require-admin";
import { writeFile, unlink } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export async function addGalleryImage(formData: FormData) {
  await requireAdmin();

  const file = formData.get("file") as File | null;
  const caption = String(formData.get("caption") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();

  if (!file || file.size === 0) {
    throw new Error("Please choose an image file");
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, WEBP, or GIF images are allowed");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Image must be under 8MB");
  }

  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  await db.insert(galleryImages).values({
    url: `/uploads/${filename}`,
    caption: caption || null,
    category: category || null,
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(id: number) {
  await requireAdmin();

  const [img] = await db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.id, id))
    .limit(1);

  if (img) {
    const filepath = path.join(process.cwd(), "public", img.url);
    try {
      await unlink(filepath);
    } catch {
      // file already gone — not fatal
    }
  }

  await db.delete(galleryImages).where(eq(galleryImages.id, id));
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
