import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ballX = useTransform(scrollYProgress, [0, 1], ['-20%', '120%']);

  return (
    <section
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #0a0700 0%, #1a0e00 50%, #0a0700 100%)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gold background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245,169,0,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Animated cricket ball */}
      <motion.div
        style={{
          x: ballX,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.12,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 120 120" width="120" height="120" fill="none">
          <circle cx="60" cy="60" r="58" stroke="#F5A900" strokeWidth="2"/>
          <path d="M60 2C60 2 40 30 40 60s20 58 20 58" stroke="#FF6A00" strokeWidth="1.5" fill="none"/>
          <path d="M60 2C60 2 80 30 80 60s-20 58-20 58" stroke="#FF6A00" strokeWidth="1.5" fill="none"/>
          <path d="M2 60h116" stroke="#F5A900" strokeWidth="1" opacity="0.5"/>
          <path d="M8 35h104M8 85h104" stroke="#F5A900" strokeWidth="0.5" opacity="0.3"/>
        </svg>
      </motion.div>

      {/* Content */}
      <div
        className="relative text-center"
        style={{ maxWidth: '700px', margin: '0 auto' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              color: 'var(--text)',
              marginBottom: '20px',
              letterSpacing: '-0.01em',
            }}
          >
            READY FOR YOUR
            <br />
            <span className="text-gradient-gold">NEXT INNINGS?</span>
          </h2>

          <p
            style={{
              color: 'var(--muted)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '36px',
            }}
          >
            Choose your gear. Step onto the crease. Play your game.
          </p>

          <Link
            id="cta-shop-btn"
            to="/shop"
            className="btn btn-primary gold-sweep-btn"
            style={{ padding: '18px 48px', fontSize: '1rem' }}
          >
            Shop All Gear
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
