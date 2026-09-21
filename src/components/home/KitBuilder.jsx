import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/UI';

const kitItems = [
  { label: 'Bat', icon: '🏏', desc: 'English Willow', to: '/category/Bats' },
  { label: 'Gloves', icon: null, desc: 'Pro Batting', to: '/category/Gloves' },
  { label: 'Pads', icon: null, desc: 'Elite Guard', to: '/category/Pads' },
  { label: 'Helmet', icon: null, desc: 'Certified', to: '/category/Helmets' },
  { label: 'Kit Bag', icon: null, desc: 'Match Ready', to: '/category/Bags' },
];

// SVG Cricket icons
const CricketBatIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32">
    <rect x="17" y="4" width="6" height="20" rx="3" fill="#F5A900" opacity="0.9"/>
    <rect x="19" y="22" width="2" height="14" rx="1" fill="#929292"/>
  </svg>
);
const GlovesIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32">
    <path d="M10 30V18a4 4 0 014-4h4a4 4 0 014 4v12H10z" stroke="#F5A900" strokeWidth="1.5"/>
    <rect x="14" y="10" width="3" height="8" rx="1.5" stroke="#F5A900" strokeWidth="1.5"/>
    <rect x="18" y="11" width="3" height="7" rx="1.5" stroke="#F5A900" strokeWidth="1.5"/>
    <rect x="22" y="12" width="3" height="6" rx="1.5" stroke="#F5A900" strokeWidth="1.5"/>
  </svg>
);
const PadsIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32">
    <rect x="12" y="8" width="16" height="28" rx="4" stroke="#F5A900" strokeWidth="1.5"/>
    <line x1="12" y1="18" x2="28" y2="18" stroke="#F5A900" strokeWidth="1" opacity="0.5"/>
    <line x1="12" y1="24" x2="28" y2="24" stroke="#F5A900" strokeWidth="1" opacity="0.5"/>
  </svg>
);
const HelmetIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32">
    <path d="M8 22a12 12 0 0124 0v4H8v-4z" stroke="#F5A900" strokeWidth="1.5"/>
    <line x1="8" y1="28" x2="32" y2="28" stroke="#F5A900" strokeWidth="1.5"/>
    <line x1="14" y1="28" x2="14" y2="34" stroke="#929292" strokeWidth="1.5"/>
    <line x1="20" y1="28" x2="20" y2="34" stroke="#929292" strokeWidth="1.5"/>
    <line x1="26" y1="28" x2="26" y2="34" stroke="#929292" strokeWidth="1.5"/>
    <line x1="11" y1="31" x2="29" y2="31" stroke="#929292" strokeWidth="1"/>
  </svg>
);
const BagIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32">
    <rect x="6" y="14" width="28" height="20" rx="3" stroke="#F5A900" strokeWidth="1.5"/>
    <path d="M14 14V10a2 2 0 012-2h8a2 2 0 012 2v4" stroke="#F5A900" strokeWidth="1.5"/>
    <line x1="6" y1="22" x2="34" y2="22" stroke="#F5A900" strokeWidth="1" opacity="0.5"/>
  </svg>
);

const icons = [CricketBatIcon, GlovesIcon, PadsIcon, HelmetIcon, BagIcon];

export default function KitBuilder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--surface-2)',
        padding: 'clamp(64px, 10vw, 120px) clamp(16px, 4vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background SR watermark */}
      <div
        className="sr-watermark absolute select-none pointer-events-none"
        style={{ bottom: '-10%', right: '-8%', opacity: 0.04, fontSize: 'clamp(8rem, 28vw, 24rem)' }}
        aria-hidden="true"
      >
        SR
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionHeading size="xl" className="mb-4">
            ONE GAME.
            <br />
            <span className="text-gradient-gold">ONE COMPLETE KIT.</span>
          </SectionHeading>
          <p style={{ color: 'var(--muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', lineHeight: 1.7 }}>
            Everything you need to step onto the crease — nothing you don't.
          </p>
        </motion.div>

        {/* Kit Items — Horizontal chain */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-14">
          {kitItems.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={item.label} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <Link
                    to={item.to}
                    className="flex flex-col items-center gap-3 transition-all"
                    style={{ textDecoration: 'none' }}
                    aria-label={`Shop ${item.label}`}
                  >
                    <div
                      className="flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        width: 72,
                        height: 72,
                        border: '1px solid var(--border)',
                        background: 'var(--surface)',
                        position: 'relative',
                      }}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ border: '1px solid var(--gold)' }}
                      />
                      <Icon />
                    </div>
                    <div className="text-center">
                      <div
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--text)',
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.7rem',
                          color: 'var(--muted)',
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Connector */}
                {i < kitItems.length - 1 && (
                  <motion.div
                    className="kit-connector mx-4 hidden md:block"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: i * 0.12 + 0.2, duration: 0.4 }}
                    style={{ transformOrigin: 'left', minWidth: '40px', maxWidth: '80px', flex: 1 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex justify-center"
        >
          <Link
            id="kit-builder-btn"
            to="/category/Kits"
            className="btn btn-primary gold-sweep-btn"
            style={{ padding: '16px 40px', fontSize: '0.95rem' }}
          >
            Build Your Kit
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
