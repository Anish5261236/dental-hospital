const STYLES: Record<string, string> = {
  new: "bg-coral/15 text-coral-dark",
  confirmed: "bg-sage/20 text-sage-dark",
  completed: "bg-ink/10 text-ink",
  cancelled: "bg-ink/5 text-ink-soft line-through",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-mono-tag uppercase tracking-wide ${
        STYLES[status] ?? "bg-ink/10 text-ink"
      }`}
    >
      {status}
    </span>
  );
}
