export default function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-3xl text-ink">{title}</h1>
        {description && <p className="text-ink-soft mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}
