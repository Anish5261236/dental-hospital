export function AdminField({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-mono-tag uppercase tracking-wide text-ink-soft">
        {label}
        {required && <span className="text-coral"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full bg-white border border-ink/12 rounded-xl px-4 py-2.5 text-sm text-ink"
      />
    </label>
  );
}

export function AdminTextarea({
  label,
  name,
  defaultValue,
  required,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-mono-tag uppercase tracking-wide text-ink-soft">
        {label}
        {required && <span className="text-coral"> *</span>}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="mt-1.5 w-full bg-white border border-ink/12 rounded-xl px-4 py-2.5 text-sm text-ink resize-none"
      />
    </label>
  );
}

export function AdminSubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="bg-coral hover:bg-coral-dark transition-colors text-white font-medium px-7 py-3 rounded-full"
    >
      {label}
    </button>
  );
}
