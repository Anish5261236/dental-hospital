import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminField, AdminSubmitButton } from "@/components/admin/AdminFormFields";
import GalleryDeleteButton from "@/components/admin/GalleryDeleteButton";
import { addGalleryImage } from "@/lib/actions/gallery";

export default async function AdminGalleryPage() {
  const images = await db.select().from(galleryImages).orderBy(asc(galleryImages.order));

  return (
    <div className="p-8">
      <AdminPageHeader title="Gallery" description={`${images.length} images`} />

      <form
        action={addGalleryImage}
        className="bg-white rounded-2xl border border-ink/5 p-6 mb-8 flex flex-wrap items-end gap-4"
      >
        <label className="block">
          <span className="text-xs font-mono-tag uppercase tracking-wide text-ink-soft">
            Image File *
          </span>
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            required
            className="mt-1.5 block text-sm"
          />
        </label>
        <div className="w-48">
          <AdminField label="Caption" name="caption" placeholder="Optional" />
        </div>
        <div className="w-48">
          <AdminField label="Category" name="category" placeholder="e.g. Clinic, Equipment" />
        </div>
        <AdminSubmitButton label="Upload" />
      </form>

      {images.length === 0 ? (
        <p className="text-ink-soft">No images yet. Upload one above.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-square bg-porcelain-2 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.caption ?? "Gallery image"}
                className="w-full h-full object-cover"
              />
              <GalleryDeleteButton id={img.id} />
              {img.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-ink/70 text-porcelain text-xs px-2 py-1 truncate">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
