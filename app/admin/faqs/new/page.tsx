import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminTextarea, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import { createFaq } from "@/lib/actions/faqs";

export default function NewFaqPage() {
  return (
    <div className="p-8 max-w-2xl">
      <AdminPageHeader title="Add FAQ" />
      <form action={createFaq} className="bg-white rounded-2xl border border-ink/5 p-8 space-y-5">
        <AdminField label="Question" name="question" required />
        <AdminTextarea label="Answer" name="answer" required rows={4} />
        <AdminField label="Display Order" name="order" type="number" defaultValue={0} />
        <div className="flex items-center gap-4">
          <AdminSubmitButton label="Add FAQ" />
          <Link href="/admin/faqs" className="text-sm text-ink-soft hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
