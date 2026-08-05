import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import MessageRow from "@/components/admin/MessageRow";

export default async function AdminMessagesPage() {
  const rows = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Messages"
        description={`${rows.length} total, ${rows.filter((r) => !r.isRead).length} unread`}
      />

      {rows.length === 0 ? (
        <p className="text-ink-soft">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((m) => (
            <MessageRow key={m.id} message={m} />
          ))}
        </div>
      )}
    </div>
  );
}
