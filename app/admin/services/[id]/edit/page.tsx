import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminTextarea, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import { updateService } from "@/lib/actions/services";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, Number(id)))
    .limit(1);

  if (!service) notFound();

  const updateWithId = updateService.bind(null, service.id);

  return (
    <div className="p-8 max-w-2xl">
      <AdminPageHeader title={`Edit: ${service.title}`} />
      <form action={updateWithId} className="bg-white rounded-2xl border border-ink/5 p-8 space-y-5">
        <AdminField label="Title" name="title" required defaultValue={service.title} />
        <AdminTextarea
          label="Short Description"
          name="shortDesc"
          required
          rows={2}
          defaultValue={service.shortDesc}
        />
        <AdminTextarea
          label="Long Description"
          name="longDesc"
          rows={5}
          defaultValue={service.longDesc}
        />
        <AdminField label="Display Order" name="order" type="number" defaultValue={service.order} />
        <div className="flex items-center gap-4">
          <AdminSubmitButton label="Save Changes" />
          <Link href="/admin/services" className="text-sm text-ink-soft hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
