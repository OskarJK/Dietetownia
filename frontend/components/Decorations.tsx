export function Hearts({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <span className={`tracking-[0.4em] text-base text-blush-deep opacity-70 ${className}`} aria-hidden>
      {"♡".repeat(count)}
    </span>
  );
}

export function GreenBlob({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-[60%_40%_70%_30%/50%_60%_40%_50%] bg-sage-muted opacity-25 blur-[2px] ${className}`}
    />
  );
}

export function LeafLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" aria-hidden className={`pointer-events-none absolute opacity-15 ${className}`}>
      <path d="M60 190 C20 150 0 100 10 50 C30 10 90 0 110 40 C130 80 100 160 60 190Z" fill="var(--color-leaf)" />
      <path d="M60 190 C60 150 55 100 60 50" stroke="var(--color-leaf)" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function AvocadoIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 130" aria-hidden className={`pointer-events-none absolute opacity-20 ${className}`}>
      <ellipse cx="50" cy="75" rx="35" ry="50" fill="var(--color-avocado)" />
      <ellipse cx="50" cy="65" rx="22" ry="32" fill="var(--color-avocado-pale)" />
      <ellipse cx="50" cy="70" rx="13" ry="18" fill="#8B5E3C" opacity="0.7" />
    </svg>
  );
}