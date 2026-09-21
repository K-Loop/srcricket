import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, Shield, Zap, Target } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="hero-bg relative overflow-hidden"
      style={{
        paddingTop: 'clamp(90px, 12vh, 130px)',
        paddingBottom: '0',
        minHeight: 'auto',
      }}
    >
      {/* Background ambient texture & glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 30%, rgba(245,169,0,0.12) 0%, transparent 50%), radial-gradient(circle at 15% 70%, rgba(255,106,0,0.06) 0%, transparent 40%)',
        }}
      />

      {/* Decorative SR Watermark - positioned safely in background */}
      <div
        className="sr-watermark absolute select-none pointer-events-none"
        style={{
          top: '2%',
          right: '2%',
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          opacity: 0.7,
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        SR
      </div>

      {/* Main Content Container */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 40px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 lg:pb-16">
          {/* Left Column — Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 mb-5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(245, 169, 0, 0.08)',
                border: '1px solid rgba(245, 169, 0, 0.25)',
                width: 'fit-content',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}
              >
                SR Sports Cricket · Pro Grade 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3rem, 7.5vw, 6.2rem)',
                letterSpacing: '-0.01em',
                color: 'var(--text)',
                lineHeight: 0.94,
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              BUILT FOR
              <br />
              <span className="text-gradient-gold">THE NEXT</span>
              <br />
              INNINGS.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                color: 'var(--muted)',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                lineHeight: 1.65,
                maxWidth: '520px',
                marginBottom: '32px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Hand-crafted English & Kashmir Willow bats, pro-tier batting protection, and championship kit bags — engineered for cricketers who demand supreme performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 mb-8"
            >
              <Link
                id="hero-shop-btn"
                to="/shop"
                className="btn btn-primary gold-sweep-btn"
                style={{ padding: '14px 32px', fontSize: '0.95rem' }}
              >
                Shop Cricket Gear
                <ArrowRight size={16} />
              </Link>
              <Link
                id="hero-explore-btn"
                to="/category/Bats"
                className="btn btn-outline"
                style={{ padding: '13px 28px', fontSize: '0.95rem' }}
              >
                Explore Bats
              </Link>
            </motion.div>

            {/* Feature Badges under CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-3 pt-4 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.08)', maxWidth: '480px' }}
            >
              {[
                { title: 'Grade 1 Willow', desc: 'Hand selected' },
                { title: 'Balanced Pickup', desc: 'Massive edges' },
                { title: 'Pan-India', desc: 'Fast delivery' },
              ].map((item) => (
                <div key={item.title}>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text)',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.75rem',
                      color: 'var(--muted)',
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Hero Showcase Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full"
              style={{ maxWidth: '480px' }}
            >
              {/* Glow box behind image */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-40 blur-xl"
                style={{
                  background: 'linear-gradient(135deg, var(--gold), var(--orange), transparent)',
                }}
              />

              {/* Showcase Frame */}
              <div
                className="relative overflow-hidden rounded-xl"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid rgba(245,169,0,0.3)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src="/images/hero.jpg"
                  alt="SR Sports Cricket Equipment — Bat, Gloves, Pads and Bag"
                  className="w-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ aspectRatio: '4/3', width: '100%', display: 'block' }}
                />

                {/* Card Bottom Tag */}
                <div
                  className="p-4 flex items-center justify-between"
                  style={{
                    background: 'linear-gradient(180deg, rgba(17,17,17,0.9) 0%, rgba(7,7,7,0.98) 100%)',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: '1.05rem',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'var(--text)',
                      }}
                    >
                      SR Reserve Edition
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.78rem',
                        color: 'var(--muted)',
                      }}
                    >
                      Grade 1 English Willow Kit
                    </div>
                  </div>
                  <Link
                    to="/shop"
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.78rem' }}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Category Rail Bar */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(12,12,12,0.95)',
        }}
      >
        <div
          style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}
          className="overflow-x-auto category-rail"
        >
          <div className="flex items-center justify-between py-3.5 min-w-max md:min-w-0">
            {['BATS', 'KITS', 'PADS', 'GLOVES', 'BAGS', 'ACCESSORIES'].map((cat, i) => (
              <Link
                key={cat}
                to={`/category/${cat === 'BATS' ? 'Bats' : cat === 'KITS' ? 'Kits' : cat === 'PADS' ? 'Pads' : cat === 'GLOVES' ? 'Gloves' : cat === 'BAGS' ? 'Bags' : 'Accessories'}`}
                className="flex items-center gap-2 px-3 py-1 text-xs transition-colors hover:text-amber-400 group"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                }}
              >
                <span>{cat}</span>
                <ChevronRight size={12} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
