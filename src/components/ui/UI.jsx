// Reusable UI primitives

export function SectionLabel({ children, className = '' }) {
  return (
    <span className={`section-label ${className}`}>{children}</span>
  );
}

export function SectionHeading({ children, className = '', size = 'lg' }) {
  const sizeClass = size === 'xl'
    ? 'text-[clamp(3rem,7vw,6rem)]'
    : size === 'lg'
    ? 'text-[clamp(2.2rem,5vw,4.5rem)]'
    : 'text-[clamp(1.8rem,4vw,3.2rem)]';

  return (
    <h2
      className={`font-display font-black uppercase leading-none tracking-tight ${sizeClass} ${className}`}
      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      {children}
    </h2>
  );
}

export function Badge({ variant = 'gold', children }) {
  return (
    <span className={variant === 'gold' ? 'badge-gold' : 'badge-new'}>
      {children}
    </span>
  );
}

export function Divider({ className = '' }) {
  return (
    <div
      className={`h-px w-full ${className}`}
      style={{ background: 'var(--border)' }}
    />
  );
}
