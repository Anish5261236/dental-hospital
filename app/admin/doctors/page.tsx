import Link from "next/link";
import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteDoctor } from "@/lib/actions/doctors";

export default async function AdminDoctorsPage() {
  const rows = await db.select().from(doctors).orderBy(asc(doctors.order));

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Doctors"
        description={`${rows.length} specialists`}
        action={
          <Link
            href="/admin/doctors/new"
            className="bg-coral hover:bg-coral-dark transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full"
          >
            + Add Doctor
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-ink/5 divide-y divide-ink/5">
        {rows.map((d) => (
          <div key={d.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="font-medium text-ink">{d.name}</div>
              <div className="text-xs text-ink-soft mt-0.5">{d.title}</div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/doctors/${d.id}/edit`}
                className="text-xs font-medium text-sage-dark hover:underline"
              >
                Edit
              </Link>
              <DeleteButton
                confirmText={`Delete "${d.name}"? This can't be undone.`}
                action={deleteDoctor.bind(null, d.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
