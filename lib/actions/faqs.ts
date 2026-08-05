"use server";

import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";

export async function createFaq(formData: FormData) {
  await requireAdmin();

  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!question || !answer) throw new Error("Question and answer are required");

  await db.insert(faqs).values({ question, answer, order });

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function updateFaq(id: number, formData: FormData) {
  await requireAdmin();

  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!question || !answer) throw new Error("Question and answer are required");

  await db.update(faqs).set({ question, answer, order }).where(eq(faqs.id, id));

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: number) {
  await requireAdmin();
  await db.delete(faqs).where(eq(faqs.id, id));
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}
