import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/shop/ProductCard';
import { SectionHeading } from '../components/ui/UI';
import TrustStrip from '../components/home/TrustStrip';
import { ArrowRight } from 'lucide-react';

export default function CategoryPage() {
  const { category } = useParams();
  const { getProductsByCategory } = useProducts();
  const products = getProductsByCategory(category);

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg)' }}
    >
      {/* Header */}
      <div
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 48px) 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* SR watermark */}
        <div
          className="sr-watermark absolute select-none pointer-events-none"
          style={{ right: '-4%', top: '-30%', fontSize: 'clamp(6rem, 20vw, 16rem)', opacity: 1 }}
          aria-hidden="true"
        >
          SR
        </div>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
          <div className="flex items-center gap-2 mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            <Link to="/" style={{ color: 'var(--muted)' }}>Home</Link>
            <span>/</span>
            <Link to="/shop" style={{ color: 'var(--muted)' }}>Shop</Link>
            <span>/</span>
            <span style={{ color: 'var(--gold)' }}>{category}</span>
          </div>
          <SectionHeading size="xl">{category}</SectionHeading>
          <p style={{ color: 'var(--muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', marginTop: '12px' }}>
            {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 48px)' }}>
        {products.length > 0 ? (
          <ProductGrid products={products} columns={4} />
        ) : (
          <div className="py-24 text-center">
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.2rem', color: 'var(--muted)' }}>
              No products in this category yet.
            </p>
            <Link to="/shop" className="btn btn-primary mt-6">
              Browse All Gear <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      <TrustStrip />
    </motion.main>
  );
}
