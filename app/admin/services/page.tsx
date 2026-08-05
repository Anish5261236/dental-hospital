import Link from "next/link";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteService } from "@/lib/actions/services";

export default async function AdminServicesPage() {
  const rows = await db.select().from(services).orderBy(asc(services.order));

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Services"
        description={`${rows.length} treatments`}
        action={
          <Link
            href="/admin/services/new"
            className="bg-coral hover:bg-coral-dark transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full"
          >
            + Add Service
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-ink/5 divide-y divide-ink/5">
        {rows.map((s) => (
          <div key={s.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="font-medium text-ink">{s.title}</div>
              <div className="text-xs text-ink-soft mt-0.5">/{s.slug}</div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/services/${s.id}/edit`}
                className="text-xs font-medium text-sage-dark hover:underline"
              >
                Edit
              </Link>
              <DeleteButton
                confirmText={`Delete "${s.title}"? This can't be undone.`}
                action={deleteService.bind(null, s.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
