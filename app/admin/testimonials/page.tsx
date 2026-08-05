import Link from "next/link";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTestimonial } from "@/lib/actions/testimonials";

export default async function AdminTestimonialsPage() {
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.order));

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Testimonials"
        description={`${rows.length} patient reviews`}
        action={
          <Link
            href="/admin/testimonials/new"
            className="bg-coral hover:bg-coral-dark transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full"
          >
            + Add Testimonial
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-ink/5 divide-y divide-ink/5">
        {rows.map((t) => (
          <div key={t.id} className="flex items-center justify-between px-6 py-4 gap-4">
            <div className="min-w-0">
              <div className="font-medium text-ink">{t.name}</div>
              <div className="text-xs text-sage-dark mt-0.5">{t.treatment}</div>
              <div className="text-sm text-ink-soft mt-1 truncate">{t.message}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href={`/admin/testimonials/${t.id}/edit`}
                className="text-xs font-medium text-sage-dark hover:underline"
              >
                Edit
              </Link>
              <DeleteButton
                confirmText={`Delete testimonial from "${t.name}"?`}
                action={deleteTestimonial.bind(null, t.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
