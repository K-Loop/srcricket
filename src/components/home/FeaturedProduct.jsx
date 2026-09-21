import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ShoppingCart, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products, formatPrice } from '../../data/products';
import { SectionLabel } from '../ui/UI';

const featuredProduct = products.find(p => p.id === 'bat-001') || products[0];

const keyFeatures = [
  'Grade 1 English Willow (8-11 Straight Grains)',
  'Semi-oval 12-piece Singapore cane handle',
  'Massive 38-42mm contoured power edges',
  'Mid-to-low sweet spot for attacking strokeplay',
];

export default function FeaturedProduct() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { addItem } = useCart();

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--surface)',
        padding: 'clamp(60px, 8vw, 100px) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left — Image Showcase (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex justify-center order-2 lg:order-1"
          >
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                maxWidth: '520px',
                background: 'var(--bg)',
                border: '1px solid rgba(245, 169, 0, 0.25)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,169,0,0.12) 0%, transparent 70%)',
                }}
              />

              <div className="p-6 md:p-8 flex items-center justify-center">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full object-cover rounded-lg"
                  style={{
                    maxHeight: '420px',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Badges Strip at bottom */}
              <div
                className="grid grid-cols-3 gap-2 p-4 text-center"
                style={{
                  background: 'var(--surface-2)',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem', color: 'var(--gold)' }}>GRADE 1</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'var(--muted)' }}>English Willow</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem', color: 'var(--gold)' }}>2.85 LBS</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'var(--muted)' }}>Match Weight</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem', color: 'var(--gold)' }}>PRO PROFILE</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'var(--muted)' }}>Mid Sweet Spot</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Details & Actions (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <SectionLabel className="block mb-3">Flagship Bat Showcase</SectionLabel>

            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                textTransform: 'uppercase',
                color: 'var(--text)',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              {featuredProduct.name}
            </h2>

            {/* Price block */}
            <div className="flex items-baseline gap-3 mb-5">
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: '2rem',
                  color: 'var(--gold)',
                }}
              >
                {formatPrice(featuredProduct.price)}
              </span>
              {featuredProduct.originalPrice && (
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: 'var(--muted)',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatPrice(featuredProduct.originalPrice)}
                </span>
              )}
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#22c55e',
                  fontWeight: 700,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: '0.08em',
                }}
              >
                IN STOCK · READY TO SHIP
              </span>
            </div>

            <p
              style={{
                color: 'var(--muted)',
                lineHeight: 1.65,
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.92rem',
                marginBottom: '24px',
              }}
            >
              {featuredProduct.description}
            </p>

            {/* Key feature bullets */}
            <div className="flex flex-col gap-2.5 mb-8">
              {keyFeatures.map((feat) => (
                <div key={feat} className="flex items-center gap-2.5">
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: 'rgba(245, 169, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={12} style={{ color: 'var(--gold)' }} />
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.85rem',
                      color: 'var(--text)',
                    }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => addItem(featuredProduct)}
                className="btn btn-primary gold-sweep-btn"
                style={{ padding: '14px 28px' }}
              >
                <ShoppingCart size={17} />
                Add To Cart
              </button>
              <Link
                to={`/product/${featuredProduct.id}`}
                className="btn btn-outline"
                style={{ padding: '13px 24px' }}
              >
                Full Specifications
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
