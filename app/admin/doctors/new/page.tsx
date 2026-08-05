import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminTextarea, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import { createDoctor } from "@/lib/actions/doctors";

export default function NewDoctorPage() {
  return (
    <div className="p-8 max-w-2xl">
      <AdminPageHeader title="Add Doctor" />
      <form action={createDoctor} className="bg-white rounded-2xl border border-ink/5 p-8 space-y-5">
        <AdminField label="Name" name="name" required placeholder="e.g. Dr. R Sandeep" />
        <AdminField label="Title" name="title" placeholder="e.g. Oral Medicine Specialist" />
        <AdminField
          label="Qualification"
          name="qualification"
          placeholder="e.g. MDS - Oral Medicine and Radiology"
        />
        <AdminTextarea label="Bio" name="bio" rows={5} placeholder="Short professional bio" />
        <AdminField label="Display Order" name="order" type="number" defaultValue={0} />
        <div className="flex items-center gap-4">
          <AdminSubmitButton label="Add Doctor" />
          <Link href="/admin/doctors" className="text-sm text-ink-soft hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
