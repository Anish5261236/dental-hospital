import Link from "next/link";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteFaq } from "@/lib/actions/faqs";

export default async function AdminFaqsPage() {
  const rows = await db.select().from(faqs).orderBy(asc(faqs.order));

  return (
    <div className="p-8">
      <AdminPageHeader
        title="FAQs"
        description={`${rows.length} questions`}
        action={
          <Link
            href="/admin/faqs/new"
            className="bg-coral hover:bg-coral-dark transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full"
          >
            + Add FAQ
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-ink/5 divide-y divide-ink/5">
        {rows.map((f) => (
          <div key={f.id} className="flex items-center justify-between px-6 py-4 gap-4">
            <div className="min-w-0">
              <div className="font-medium text-ink">{f.question}</div>
              <div className="text-sm text-ink-soft mt-1 truncate">{f.answer}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href={`/admin/faqs/${f.id}/edit`}
                className="text-xs font-medium text-sage-dark hover:underline"
              >
                Edit
              </Link>
              <DeleteButton
                confirmText="Delete this FAQ?"
                action={deleteFaq.bind(null, f.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
