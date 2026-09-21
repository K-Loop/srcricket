import { Link } from 'react-router-dom';
import { MessageCircle, Play, ArrowUpRight, ShieldCheck, Truck, Package, Star } from 'lucide-react';

const InstagramIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const shopLinks = [
  { label: 'Cricket Bats', to: '/category/Bats' },
  { label: 'Batting Pads', to: '/category/Pads' },
  { label: 'Batting Gloves', to: '/category/Gloves' },
  { label: 'Helmets', to: '/category/Helmets' },
  { label: 'Kit Bags', to: '/category/Bags' },
  { label: 'Cricket Balls', to: '/category/Balls' },
  { label: 'Complete Kits', to: '/category/Kits' },
  { label: 'Accessories', to: '/category/Accessories' },
];

const helpLinks = [
  { label: 'Contact Us', href: '#' },
  { label: 'Shipping Info', href: '#' },
  { label: 'Returns', href: '#' },
  { label: 'FAQ', href: '#' },
];

const companyLinks = [
  { label: 'About SR Sports', href: '#' },
  { label: 'Our Story', href: '#' },
  { label: 'Manufacturing', href: '#' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      {/* Top section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px clamp(16px,4vw,48px) 48px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand Block */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/sr-logo.svg" alt="SR Sports Cricket Logo" style={{ width: 52, height: 52, objectFit: 'contain' }} />
              <div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.4rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    lineHeight: 1,
                  }}
                >
                  SR Sports
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                  }}
                >
                  Cricket
                </div>
              </div>
            </Link>

            <p
              className="mb-4"
              style={{
                color: 'var(--muted)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                maxWidth: '340px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Premium cricket bats, protective gear and complete cricket kits. Built for players who take every ball seriously.
            </p>

            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: 'var(--muted)',
                marginBottom: '24px',
              }}
            >
              BATS · KITS · PADS · GLOVES · BAGS · ACCESSORIES
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/sr_sports_cricket' },
                { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/' },
                { icon: Play, label: 'YouTube', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center transition-all"
                  style={{
                    width: 40,
                    height: 40,
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--gold)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                marginBottom: '20px',
              }}
            >
              Shop
            </h3>
            <ul className="flex flex-col gap-2.5">
              {shopLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      color: 'var(--muted)',
                      fontSize: '0.875rem',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                marginBottom: '20px',
              }}
            >
              Help
            </h3>
            <ul className="flex flex-col gap-2.5">
              {helpLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--muted)',
                      fontSize: '0.875rem',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                marginBottom: '20px',
              }}
            >
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--muted)',
                      fontSize: '0.875rem',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://www.instagram.com/sr_sports_cricket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors"
                  style={{ color: 'var(--muted)', fontSize: '0.875rem', fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                >
                  Instagram <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div
          style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px clamp(16px,4vw,48px)' }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p
            style={{
              color: 'var(--muted)',
              fontSize: '0.75rem',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            © 2026 SR Sports Cricket. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: ShieldCheck, label: 'Secure Checkout' },
              { icon: Truck, label: 'Pan-India Delivery' },
              { icon: Package, label: 'Genuine Products' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5"
                style={{ color: 'var(--muted)', fontSize: '0.7rem', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                <Icon size={12} style={{ color: 'var(--gold)' }} />
                <span className="hidden sm:inline">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
