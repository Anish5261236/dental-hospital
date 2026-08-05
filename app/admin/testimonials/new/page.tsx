import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminTextarea, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import { createTestimonial } from "@/lib/actions/testimonials";

export default function NewTestimonialPage() {
  return (
    <div className="p-8 max-w-2xl">
      <AdminPageHeader title="Add Testimonial" />
      <form action={createTestimonial} className="bg-white rounded-2xl border border-ink/5 p-8 space-y-5">
        <AdminField label="Patient Name" name="name" required />
        <AdminField label="Treatment" name="treatment" placeholder="e.g. Root Canal Treatment" />
        <AdminTextarea label="Message" name="message" required rows={4} />
        <AdminField label="Display Order" name="order" type="number" defaultValue={0} />
        <div className="flex items-center gap-4">
          <AdminSubmitButton label="Add Testimonial" />
          <Link href="/admin/testimonials" className="text-sm text-ink-soft hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
