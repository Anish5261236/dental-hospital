"use client";

import { useTransition } from "react";
import { markMessageRead, deleteMessage } from "@/lib/actions/messages";

type Message = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

export default function MessageRow({ message }: { message: Message }) {
  const [isPending, startTransition] = useTransition();

  function toggleRead() {
    startTransition(() => {
      markMessageRead(message.id, !message.isRead);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete message from ${message.name}?`)) return;
    startTransition(() => {
      deleteMessage(message.id);
    });
  }

  return (
    <div
      className={`bg-white rounded-2xl border p-6 transition-opacity ${
        isPending ? "opacity-50" : ""
      } ${message.isRead ? "border-ink/5" : "border-coral/30"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-ink">{message.name}</h3>
            {!message.isRead && (
              <span className="w-2 h-2 rounded-full bg-coral inline-block" />
            )}
          </div>
          <div className="text-xs text-ink-soft mt-0.5">
            {message.email}
            {message.email && message.phone && " · "}
            {message.phone}
          </div>
        </div>
        <span className="text-xs text-ink-soft shrink-0">
          {new Date(message.createdAt).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      </div>

      <p className="mt-4 text-sm text-ink-soft leading-relaxed">{message.message}</p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={toggleRead}
          disabled={isPending}
          className="text-xs font-medium text-sage-dark hover:underline"
        >
          Mark as {message.isRead ? "Unread" : "Read"}
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-xs font-medium text-coral-dark hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
