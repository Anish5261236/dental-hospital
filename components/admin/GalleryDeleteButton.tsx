"use client";

import { useTransition } from "react";
import { deleteGalleryImage } from "@/lib/actions/gallery";

export default function GalleryDeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (!confirm("Delete this image?")) return;
        startTransition(() => {
          deleteGalleryImage(id);
        });
      }}
      disabled={isPending}
      className="absolute top-2 right-2 bg-ink/80 hover:bg-coral text-white text-xs rounded-full w-7 h-7 flex items-center justify-center disabled:opacity-50"
      aria-label="Delete image"
    >
      &times;
    </button>
  );
}
