"use client";

import { useTransition } from "react";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/actions/appointments";
import StatusBadge from "@/components/admin/StatusBadge";

type Appointment = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  serviceName: string | null;
  preferredDate: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
};

export default function AppointmentRow({ appointment }: { appointment: Appointment }) {
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    startTransition(() => {
      updateAppointmentStatus(appointment.id, newStatus);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete appointment request from ${appointment.name}?`)) return;
    startTransition(() => {
      deleteAppointment(appointment.id);
    });
  }

  return (
    <tr className={`border-b border-ink/5 ${isPending ? "opacity-50" : ""}`}>
      <td className="py-4 pr-4">
        <div className="font-medium text-ink">{appointment.name}</div>
        <div className="text-xs text-ink-soft mt-0.5">
          {new Date(appointment.createdAt).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      </td>
      <td className="py-4 pr-4 text-sm text-ink-soft">
        <div>{appointment.phone}</div>
        {appointment.email && <div>{appointment.email}</div>}
      </td>
      <td className="py-4 pr-4 text-sm text-ink-soft">
        {appointment.serviceName ?? "—"}
      </td>
      <td className="py-4 pr-4 text-sm text-ink-soft">
        {appointment.preferredDate || "—"}
      </td>
      <td className="py-4 pr-4 text-sm text-ink-soft max-w-xs truncate">
        {appointment.message || "—"}
      </td>
      <td className="py-4 pr-4">
        <select
          value={appointment.status}
          onChange={handleStatusChange}
          disabled={isPending}
          className="text-sm border border-ink/15 rounded-lg px-2 py-1.5 bg-white"
        >
          <option value="new">New</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div className="mt-1.5">
          <StatusBadge status={appointment.status} />
        </div>
      </td>
      <td className="py-4">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-xs text-coral-dark hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
