import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/UI';
import { bestsellers } from '../../data/products';
import ProductGrid from '../shop/ProductCard';

export default function Bestsellers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(64px, 10vw, 120px) clamp(16px, 4vw, 48px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="section-label block mb-3">Most Popular</span>
            <SectionHeading>PLAYERS' PICKS</SectionHeading>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 flex-shrink-0"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-bright)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--gold)'}
          >
            Shop All Products <ArrowRight size={14} />
          </Link>
        </motion.div>

        <ProductGrid products={bestsellers} columns={4} />
      </div>
    </section>
  );
}
