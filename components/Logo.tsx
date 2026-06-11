export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        className="fill-primary"
      />
      <path
        d="M10 22V10L22 22V10"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2" fill="white" />
      <circle cx="22" cy="22" r="2" fill="white" />
    </svg>
  );
}
