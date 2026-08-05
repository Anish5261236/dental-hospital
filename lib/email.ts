/**
 * Email notifications are STUBBED for now (no real provider configured yet).
 * Every call is logged to the console so you can see exactly what would be
 * sent. To go live:
 *
 *   1. Pick a provider (Gmail SMTP, Resend, SendGrid, etc.)
 *   2. Add credentials to .env (e.g. SMTP_HOST, SMTP_USER, SMTP_PASS)
 *   3. Uncomment the nodemailer block below and remove the stub branch
 *
 * Nothing else in the app needs to change — every call site just imports
 * `sendEmail` from here.
 */

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

const EMAIL_PROVIDER_CONFIGURED = false;

export async function sendEmail({ to, subject, html }: SendEmailInput) {
  if (!EMAIL_PROVIDER_CONFIGURED) {
    console.log("\n[email:stub] Would send email");
    console.log(`  to:      ${to}`);
    console.log(`  subject: ${subject}`);
    console.log(`  html:    ${html.slice(0, 200)}${html.length > 200 ? "..." : ""}\n`);
    return { success: true, stubbed: true };
  }

  // --- Real implementation (uncomment once SMTP creds are in .env) ---
  //
  // import nodemailer from "nodemailer";
  //
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: Number(process.env.SMTP_PORT ?? 587),
  //   secure: false,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });
  //
  // await transporter.sendMail({
  //   from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
  //   to,
  //   subject,
  //   html,
  // });
  //
  // return { success: true, stubbed: false };

  return { success: false, stubbed: false };
}

export function appointmentNotificationEmail(data: {
  name: string;
  phone: string;
  email?: string | null;
  serviceName?: string | null;
  preferredDate?: string | null;
  message?: string | null;
}) {
  return `
    <h2>New Appointment Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ""}
    ${data.serviceName ? `<p><strong>Service:</strong> ${data.serviceName}</p>` : ""}
    ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>` : ""}
    ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}
  `;
}

export function contactNotificationEmail(data: {
  name: string;
  email?: string | null;
  phone?: string | null;
  message: string;
}) {
  return `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ""}
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
    <p><strong>Message:</strong> ${data.message}</p>
  `;
}
