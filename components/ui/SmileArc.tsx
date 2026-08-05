type SmileArcProps = {
  className?: string;
  color?: string;
  width?: number;
};

/**
 * The site's signature device: a soft curved line evoking a smile.
 * Used as an underline beneath section labels, never as a literal tooth/smiley icon.
 */
export default function SmileArc({
  className = "",
  color = "var(--coral)",
  width = 72,
}: SmileArcProps) {
  return (
    <svg
      width={width}
      height={width * 0.28}
      viewBox="0 0 72 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 3C14 17 58 17 70 3"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
