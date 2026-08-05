"use server";

import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "./require-admin";

const VALID_STATUSES = ["new", "confirmed", "completed", "cancelled"] as const;

export async function updateAppointmentStatus(id: number, status: string) {
  await requireAdmin();
  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    throw new Error("Invalid status");
  }
  await db.update(appointments).set({ status }).where(eq(appointments.id, id));
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
}

export async function deleteAppointment(id: number) {
  await requireAdmin();
  await db.delete(appointments).where(eq(appointments.id, id));
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
}
