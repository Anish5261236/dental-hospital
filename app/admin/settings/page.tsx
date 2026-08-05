import { getSiteSettings } from "@/lib/db/queries";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminTextarea, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import { updateSiteSettings } from "@/lib/actions/settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  const updateWithId = updateSiteSettings.bind(null, settings.id);

  return (
    <div className="p-8 max-w-2xl">
      <AdminPageHeader
        title="Site Settings"
        description="Shown in the header, footer, contact page, and booking page."
      />

      <form action={updateWithId} className="bg-white rounded-2xl border border-ink/5 p-8 space-y-5">
        <AdminField label="Clinic Name" name="clinicName" required defaultValue={settings.clinicName} />
        <div className="grid sm:grid-cols-2 gap-5">
          <AdminField label="Phone" name="phone" defaultValue={settings.phone} />
          <AdminField label="WhatsApp" name="whatsapp" defaultValue={settings.whatsapp} />
        </div>
        <AdminField label="Email" name="email" type="email" defaultValue={settings.email} />
        <AdminTextarea label="Address" name="address" rows={2} defaultValue={settings.address} />
        <div className="grid sm:grid-cols-2 gap-5">
          <AdminField
            label="Weekday Hours"
            name="hoursWeekday"
            defaultValue={settings.hoursWeekday}
            placeholder="Mon to Sun 09:00 AM - 08:30 PM"
          />
          <AdminField
            label="Sunday Hours"
            name="hoursSunday"
            defaultValue={settings.hoursSunday}
            placeholder="Sunday 09:00 AM - 01:00 PM"
          />
        </div>
        <AdminField label="Instagram URL" name="instagramUrl" defaultValue={settings.instagramUrl} />

        <AdminSubmitButton label="Save Settings" />
      </form>
    </div>
  );
}
