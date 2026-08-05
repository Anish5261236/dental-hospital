import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { contactSchema } from "@/lib/validations";
import { sendEmail, contactNotificationEmail } from "@/lib/email";
import { getSiteSettings } from "@/lib/db/queries";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, phone, message } = parsed.data;

  try {
    const [created] = await db
      .insert(contactMessages)
      .values({
        name,
        email: email || null,
        phone: phone || null,
        message,
      })
      .returning();

    try {
      const settings = await getSiteSettings();
      if (settings.email) {
        await sendEmail({
          to: settings.email,
          subject: `New Contact Message from ${name}`,
          html: contactNotificationEmail({ name, email, phone, message }),
        });
      }
    } catch (notifyErr) {
      console.error("Contact notification failed:", notifyErr);
    }

    return NextResponse.json({ success: true, message: created }, { status: 201 });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
