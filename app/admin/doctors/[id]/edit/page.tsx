import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminTextarea, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import { updateDoctor } from "@/lib/actions/doctors";

export default async function EditDoctorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [doctor] = await db
    .select()
    .from(doctors)
    .where(eq(doctors.id, Number(id)))
    .limit(1);

  if (!doctor) notFound();

  const updateWithId = updateDoctor.bind(null, doctor.id);

  return (
    <div className="p-8 max-w-2xl">
      <AdminPageHeader title={`Edit: ${doctor.name}`} />
      <form action={updateWithId} className="bg-white rounded-2xl border border-ink/5 p-8 space-y-5">
        <AdminField label="Name" name="name" required defaultValue={doctor.name} />
        <AdminField label="Title" name="title" defaultValue={doctor.title} />
        <AdminField label="Qualification" name="qualification" defaultValue={doctor.qualification} />
        <AdminTextarea label="Bio" name="bio" rows={5} defaultValue={doctor.bio} />
        <AdminField label="Display Order" name="order" type="number" defaultValue={doctor.order} />
        <div className="flex items-center gap-4">
          <AdminSubmitButton label="Save Changes" />
          <Link href="/admin/doctors" className="text-sm text-ink-soft hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
