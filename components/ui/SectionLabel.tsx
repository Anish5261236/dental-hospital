import SmileArc from "./SmileArc";

export default function SectionLabel({
  children,
  align = "left",
  onDark = false,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  return (
    <div className={`flex flex-col ${align === "center" ? "items-center" : "items-start"}`}>
      <span
        className={`font-mono-tag text-xs tracking-[0.2em] uppercase ${
          onDark ? "text-sage" : "text-sage-dark"
        }`}
      >
        {children}
      </span>
      <SmileArc className="mt-1" />
    </div>
  );
}
