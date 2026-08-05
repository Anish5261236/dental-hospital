import { db } from "@/lib/db";
import { appointments, services } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AppointmentRow from "@/components/admin/AppointmentRow";

export default async function AdminAppointmentsPage() {
  const rows = await db
    .select({
      id: appointments.id,
      name: appointments.name,
      phone: appointments.phone,
      email: appointments.email,
      serviceName: services.title,
      preferredDate: appointments.preferredDate,
      message: appointments.message,
      status: appointments.status,
      createdAt: appointments.createdAt,
    })
    .from(appointments)
    .leftJoin(services, eq(appointments.serviceId, services.id))
    .orderBy(desc(appointments.createdAt));

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Appointments"
        description={`${rows.length} total requests`}
      />

      {rows.length === 0 ? (
        <p className="text-ink-soft">No appointment requests yet.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-ink/5 overflow-x-auto">
          <table className="w-full text-left px-4">
            <thead>
              <tr className="border-b border-ink/10 text-xs font-mono-tag uppercase tracking-wide text-ink-soft">
                <th className="py-3 pl-4 pr-4">Patient</th>
                <th className="py-3 pr-4">Contact</th>
                <th className="py-3 pr-4">Service</th>
                <th className="py-3 pr-4">Preferred Date</th>
                <th className="py-3 pr-4">Message</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody className="px-4">
              {rows.map((r) => (
                <AppointmentRow key={r.id} appointment={r} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
