"use client";

import { useTransition } from "react";

export default function DeleteButton({
  confirmText,
  action,
}: {
  confirmText: string;
  action: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (!confirm(confirmText)) return;
        startTransition(() => {
          action();
        });
      }}
      disabled={isPending}
      className="text-xs font-medium text-coral-dark hover:underline disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
