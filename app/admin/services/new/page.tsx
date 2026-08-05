import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminTextarea, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import { createService } from "@/lib/actions/services";

export default function NewServicePage() {
  return (
    <div className="p-8 max-w-2xl">
      <AdminPageHeader title="Add Service" />
      <form action={createService} className="bg-white rounded-2xl border border-ink/5 p-8 space-y-5">
        <AdminField label="Title" name="title" required placeholder="e.g. Root Canal Treatment" />
        <AdminTextarea
          label="Short Description"
          name="shortDesc"
          required
          rows={2}
          placeholder="One or two sentences shown on the services grid"
        />
        <AdminTextarea
          label="Long Description"
          name="longDesc"
          rows={5}
          placeholder="Full description shown on the service's detail page"
        />
        <AdminField label="Display Order" name="order" type="number" defaultValue={0} />
        <div className="flex items-center gap-4">
          <AdminSubmitButton label="Create Service" />
          <Link href="/admin/services" className="text-sm text-ink-soft hover:text-ink">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
