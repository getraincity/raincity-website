type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChevronDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M3.5 6 8 10.5 12.5 6" {...stroke} />
    </svg>
  );
}

export function ChevronUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M3.5 10.5 8 6l4.5 4.5" {...stroke} />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" {...stroke} />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" {...stroke} />
    </svg>
  );
}

export function ArrowUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M8 13.5v-11M3.5 7 8 2.5 12.5 7" {...stroke} />
    </svg>
  );
}

export function Phone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path
        d="M5.2 2.5 6.6 5.4 5.3 6.8a8.4 8.4 0 0 0 3.9 3.9l1.4-1.3 2.9 1.4v2.2c0 .6-.5 1-1.1 1A11.3 11.3 0 0 1 2 3.6c0-.6.4-1.1 1-1.1h2.2Z"
        {...stroke}
      />
    </svg>
  );
}

export function Mail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <rect x="1.75" y="3.25" width="12.5" height="9.5" {...stroke} />
      <path d="m2.5 4.5 5.5 4 5.5-4" {...stroke} />
    </svg>
  );
}

export function Menu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" {...stroke} strokeWidth={2} />
    </svg>
  );
}

export function Close({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className={className}>
      <path d="M5 5l14 14M19 5 5 19" {...stroke} strokeWidth={2} />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="m3 8.5 3.2 3.2L13 4.8" {...stroke} strokeWidth={2} />
    </svg>
  );
}

/* Point icons for the About list. Drawn to the same recipe as the rest of
   this file — 16px box, 1.75 stroke, currentColor — rather than pulled from
   lucide, whose 24px/2px geometry would not sit with these at small sizes. */

export function Users({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <circle cx="6.1" cy="5.2" r="2.35" {...stroke} />
      <path d="M1.9 13.4v-.9a4.2 4.2 0 0 1 8.4 0v.9" {...stroke} />
      <path d="M10.9 3.1a2.35 2.35 0 0 1 0 4.2M11.6 9.6a4.2 4.2 0 0 1 2.5 3.8v.5" {...stroke} />
    </svg>
  );
}

export function Clock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <circle cx="8" cy="8" r="6.1" {...stroke} />
      <path d="M8 4.4V8l2.5 1.8" {...stroke} />
    </svg>
  );
}

export function ShieldCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M8 1.7l5 1.9v4.1c0 3-2.1 5.5-5 6.6-2.9-1.1-5-3.6-5-6.6V3.6l5-1.9Z" {...stroke} />
      <path d="m5.7 7.9 1.6 1.6 3-3.1" {...stroke} />
    </svg>
  );
}

/* Point icons for the Why Choose Us list. Same recipe again — 16px box,
   1.75 stroke, currentColor — so the two lists read as one icon family. */

export function Sparkle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M6.2 1.6Q6.85 5.75 11 6.4 6.85 7.05 6.2 11.2 5.55 7.05 1.4 6.4 5.55 5.75 6.2 1.6Z" {...stroke} />
      <path d="M12.2 9.7Q12.55 11.85 14.7 12.2 12.55 12.55 12.2 14.7 11.85 12.55 9.7 12.2 11.85 11.85 12.2 9.7Z" {...stroke} />
    </svg>
  );
}

export function Leaf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M13.5 2.5c.6 4.7-.8 8.2-3.5 9.9-2.4 1.5-5.3 1.3-6.9-.3-1.6-1.6-1.5-4.2.3-5.9C5.4 4.2 8.9 3.3 13.5 2.5Z" {...stroke} />
      <path d="M2.1 13.9 9.3 6.7" {...stroke} />
    </svg>
  );
}

export function Snowflake({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M8 1.8v12.4M2.6 4.9l10.8 6.2M13.4 4.9 2.6 11.1" {...stroke} />
      <path d="M6.3 3.5 8 1.8l1.7 1.7M6.3 12.5 8 14.2l1.7-1.7" {...stroke} />
    </svg>
  );
}

const socialPaths: Record<string, string> = {
  facebook:
    "M13.5 8.05a5.5 5.5 0 1 0-6.36 5.43V9.64H5.74V8.05h1.4V6.83c0-1.38.82-2.14 2.08-2.14.6 0 1.23.1 1.23.1v1.36h-.7c-.68 0-.9.43-.9.87v1.03h1.53l-.24 1.59H8.85v3.84a5.5 5.5 0 0 0 4.65-5.43Z",
  instagram:
    "M8 3.44c1.49 0 1.66.01 2.25.03.54.03.84.12 1.03.2.26.1.45.22.64.42.2.19.32.38.42.64.08.2.17.49.2 1.03.02.59.03.76.03 2.24s-.01 1.66-.03 2.25c-.03.54-.12.83-.2 1.03-.1.26-.22.45-.42.64-.19.2-.38.32-.64.42-.2.08-.49.17-1.03.2-.59.02-.76.03-2.25.03s-1.65-.01-2.24-.03c-.54-.03-.84-.12-1.03-.2a1.73 1.73 0 0 1-.64-.42 1.73 1.73 0 0 1-.42-.64c-.08-.2-.17-.49-.2-1.03-.02-.59-.03-.77-.03-2.25s.01-1.65.03-2.24c.03-.54.12-.84.2-1.03.1-.26.22-.45.42-.64.19-.2.38-.32.64-.42.2-.08.49-.17 1.03-.2.59-.02.76-.03 2.24-.03M8 2.44c-1.51 0-1.7.01-2.29.03-.6.03-1 .12-1.36.26-.37.15-.68.34-1 .65-.31.32-.5.63-.65 1-.14.36-.23.76-.26 1.36-.02.6-.03.79-.03 2.3s.01 1.69.03 2.29c.03.6.12 1 .26 1.36.15.37.34.68.65 1 .32.31.63.5 1 .65.36.14.76.23 1.36.26.6.02.78.03 2.29.03s1.7-.01 2.3-.03c.6-.03 1-.12 1.36-.26.37-.15.68-.34.99-.65.32-.32.5-.63.65-1 .14-.36.23-.76.26-1.36.02-.6.03-.78.03-2.29s-.01-1.7-.03-2.3c-.03-.6-.12-1-.26-1.36a2.73 2.73 0 0 0-.65-.99 2.73 2.73 0 0 0-1-.65c-.35-.14-.75-.23-1.35-.26-.6-.02-.79-.03-2.3-.03Zm0 2.7a2.85 2.85 0 1 0 0 5.71 2.85 2.85 0 0 0 0-5.7Zm0 4.71a1.85 1.85 0 1 1 0-3.7 1.85 1.85 0 0 1 0 3.7Zm3.63-4.82a.67.67 0 1 1-1.33 0 .67.67 0 0 1 1.33 0Z",
  x: "M9.53 7.16 13.4 2.7h-.92L9.12 6.57 6.44 2.7H3.35l4.06 5.9-4.06 4.7h.92l3.55-4.1 2.84 4.1h3.09L9.53 7.16Zm-1.26 1.45-.41-.58-3.27-4.68h1.4l2.64 3.78.41.59 3.43 4.9h-1.4L8.27 8.61Z",
  linkedin:
    "M5.2 13.1H3V6.3h2.2v6.8ZM4.1 5.4a1.28 1.28 0 1 1 0-2.56 1.28 1.28 0 0 1 0 2.56ZM13.5 13.1h-2.19V9.8c0-.79-.02-1.8-1.1-1.8-1.1 0-1.27.86-1.27 1.75v3.35H6.75V6.3h2.1v.93h.03c.3-.55 1-1.14 2.07-1.14 2.21 0 2.62 1.46 2.62 3.35v3.66Z",
};

export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const d = socialPaths[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d={d} fill="currentColor" />
    </svg>
  );
}
