import { db } from "@/lib/db";
import { appointments, contactMessages } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function AdminDashboardPage() {
  const [newAppointments] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(appointments)
    .where(eq(appointments.status, "new"));

  const [totalAppointments] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(appointments);

  const [unreadMessages] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(contactMessages)
    .where(eq(contactMessages.isRead, false));

  const stats = [
    { label: "New Appointment Requests", value: newAppointments?.count ?? 0 },
    { label: "Total Appointments", value: totalAppointments?.count ?? 0 },
    { label: "Unread Messages", value: unreadMessages?.count ?? 0 },
  ];

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl text-ink">Dashboard</h1>
      <p className="text-ink-soft mt-1">Welcome back. Here&rsquo;s what&rsquo;s new.</p>

      <div className="mt-8 grid sm:grid-cols-3 gap-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-6 border border-ink/5"
          >
            <div className="font-mono-tag text-3xl text-ink">{s.value}</div>
            <div className="text-sm text-ink-soft mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
