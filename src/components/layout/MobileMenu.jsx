import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const mobileLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop All Gear', to: '/shop' },
  { label: 'Cricket Bats', to: '/category/Bats' },
  { label: 'Batting Pads', to: '/category/Pads' },
  { label: 'Batting Gloves', to: '/category/Gloves' },
  { label: 'Helmets', to: '/category/Helmets' },
  { label: 'Kit Bags', to: '/category/Bags' },
  { label: 'Cricket Balls', to: '/category/Balls' },
  { label: 'Complete Kits', to: '/category/Kits' },
  { label: 'Accessories', to: '/category/Accessories' },
];

export default function MobileMenu({ onClose, openCart }) {
  return (
    <motion.div
      className="mobile-menu"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
          <img src="/sr-logo.svg" alt="SR Sports Cricket" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: '1rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text)',
            }}
          >
            SR Sports Cricket
          </span>
        </Link>
        <button
          onClick={onClose}
          className="p-2"
          style={{ color: 'var(--muted)' }}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col px-4 py-6 gap-1" aria-label="Mobile navigation">
        {mobileLinks.map((link, i) => (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.25 }}
          >
            <Link
              to={link.to}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-3.5 transition-colors group"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                borderBottom: '1px solid var(--border)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              {link.label}
              <ArrowRight size={14} style={{ color: 'var(--border)' }} />
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 mt-auto" style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
        <Link
          to="/shop"
          onClick={onClose}
          className="btn btn-primary w-full text-center justify-center"
          style={{ fontSize: '0.9rem', padding: '14px 20px' }}
        >
          Shop All Gear
          <ArrowRight size={16} />
        </Link>
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://www.instagram.com/sr_sports_cricket"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: 'var(--muted)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
          >
            Instagram
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: 'var(--muted)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
