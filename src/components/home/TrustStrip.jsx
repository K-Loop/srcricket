import { ShieldCheck, Truck, Package, Star, MessageCircle } from 'lucide-react';

const items = [
  { icon: Package, label: 'Genuine Products' },
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: Star, label: 'Quality Checked' },
  { icon: Truck, label: 'Pan-India Delivery' },
  { icon: MessageCircle, label: 'Customer Support' },
];

export default function TrustStrip() {
  return (
    <div
      style={{
        background: 'var(--surface-2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '20px clamp(16px, 4vw, 48px)',
        overflowX: 'auto',
      }}
      className="category-rail"
    >
      <div
        style={{ maxWidth: '1400px', margin: '0 auto' }}
        className="flex items-center justify-center gap-8 md:gap-12 min-w-max lg:min-w-0"
      >
        {items.map(({ icon: Icon, label }, i) => (
          <div key={label} className="trust-item flex-shrink-0">
            <Icon size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
            <span>{label}</span>
            {i < items.length - 1 && (
              <span style={{ marginLeft: '12px', color: 'var(--border)' }}>|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
