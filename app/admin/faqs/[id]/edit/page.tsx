import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminTextarea, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import { updateFaq } from "@/lib/actions/faqs";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [faq] = await db
    .select()
    .from(faqs)
    .where(eq(faqs.id, Number(id)))
    .limit(1);

  if (!faq) notFound();

  const updateWithId = updateFaq.bind(null, faq.id);

  return (
    <div className="p-8 max-w-2xl">
      <AdminPageHeader title="Edit FAQ" />
      <form action={updateWithId} className="bg-white rounded-2xl border border-ink/5 p-8 space-y-5">
        <AdminField label="Question" name="question" required defaultValue={faq.question} />
        <AdminTextarea label="Answer" name="answer" required rows={4} defaultValue={faq.answer} />
        <AdminField label="Display Order" name="order" type="number" defaultValue={faq.order} />
        <div className="flex items-center gap-4">
          <AdminSubmitButton label="Save Changes" />
          <Link href="/admin/faqs" className="text-sm text-ink-soft hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
