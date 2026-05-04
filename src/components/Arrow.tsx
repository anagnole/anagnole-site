type ArrowProps = {
  direction?: "right" | "left" | "up-right";
  className?: string;
  size?: number;
};

export function Arrow({ direction = "right", className = "", size = 14 }: ArrowProps) {
  const rotation = {
    right: 0,
    left: 180,
    "up-right": -45,
  }[direction];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)` }}
      className={className}
    >
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
