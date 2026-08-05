import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminTextarea, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import { updateTestimonial } from "@/lib/actions/testimonials";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [t] = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, Number(id)))
    .limit(1);

  if (!t) notFound();

  const updateWithId = updateTestimonial.bind(null, t.id);

  return (
    <div className="p-8 max-w-2xl">
      <AdminPageHeader title={`Edit Testimonial: ${t.name}`} />
      <form action={updateWithId} className="bg-white rounded-2xl border border-ink/5 p-8 space-y-5">
        <AdminField label="Patient Name" name="name" required defaultValue={t.name} />
        <AdminField label="Treatment" name="treatment" defaultValue={t.treatment} />
        <AdminTextarea label="Message" name="message" required rows={4} defaultValue={t.message} />
        <AdminField label="Display Order" name="order" type="number" defaultValue={t.order} />
        <div className="flex items-center gap-4">
          <AdminSubmitButton label="Save Changes" />
          <Link href="/admin/testimonials" className="text-sm text-ink-soft hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
