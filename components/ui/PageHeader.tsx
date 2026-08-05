import SmileArc from "./SmileArc";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-ink text-porcelain">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <span className="font-mono-tag text-xs tracking-[0.2em] uppercase text-sage">
          {eyebrow}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl mt-3 max-w-2xl">
          {title}
        </h1>
        <SmileArc className="mt-5" color="var(--coral)" />
        {description && (
          <p className="mt-5 text-porcelain/70 max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
