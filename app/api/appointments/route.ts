import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, services } from "@/lib/db/schema";
import { appointmentSchema } from "@/lib/validations";
import { sendEmail, appointmentNotificationEmail } from "@/lib/email";
import { eq } from "drizzle-orm";
import { getSiteSettings } from "@/lib/db/queries";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, phone, email, serviceId, preferredDate, message } = parsed.data;
  const serviceIdNum = serviceId ? parseInt(serviceId, 10) : null;

  try {
    const [created] = await db
      .insert(appointments)
      .values({
        name,
        phone,
        email: email || null,
        serviceId: serviceIdNum,
        preferredDate: preferredDate || null,
        message: message || null,
        status: "new",
      })
      .returning();

    // Look up service name + clinic email for the notification (best-effort;
    // booking still succeeds even if this part fails)
    try {
      const settings = await getSiteSettings();
      let serviceName: string | null = null;
      if (serviceIdNum) {
        const [svc] = await db
          .select({ title: services.title })
          .from(services)
          .where(eq(services.id, serviceIdNum))
          .limit(1);
        serviceName = svc?.title ?? null;
      }

      if (settings.email) {
        await sendEmail({
          to: settings.email,
          subject: `New Appointment Request from ${name}`,
          html: appointmentNotificationEmail({
            name,
            phone,
            email,
            serviceName,
            preferredDate,
            message,
          }),
        });
      }
    } catch (notifyErr) {
      console.error("Appointment notification failed:", notifyErr);
    }

    return NextResponse.json({ success: true, appointment: created }, { status: 201 });
  } catch (err) {
    console.error("Failed to create appointment:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
