import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/shop/ProductCard';
import { SectionHeading } from '../components/ui/UI';
import TrustStrip from '../components/home/TrustStrip';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const { products, categories } = useProducts();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'price-asc':  return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating':     return [...list].sort((a, b) => b.rating - a.rating);
      default:           return list;
    }
  }, [activeCategory, sortBy, searchQuery]);

  const currentSort = sortOptions.find(o => o.value === sortBy);

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg)' }}
    >
      {/* Page Header */}
      <div
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 48px) 40px',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <span className="section-label block mb-3">SR Sports Cricket</span>
          <SectionHeading>
            {searchQuery ? `Search: "${searchQuery}"` : 'Shop All Cricket Gear'}
          </SectionHeading>
          <p style={{ color: 'var(--muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', marginTop: '12px' }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div
          style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}
          className="flex flex-col lg:flex-row gap-4 py-4"
        >
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto category-rail flex-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                id={`cat-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className="flex-shrink-0 px-4 py-2 transition-all text-sm"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: activeCategory === cat.id ? 'var(--gold)' : 'transparent',
                  color: activeCategory === cat.id ? 'var(--bg)' : 'var(--muted)',
                  border: '1px solid',
                  borderColor: activeCategory === cat.id ? 'var(--gold)' : 'transparent',
                  whiteSpace: 'nowrap',
                }}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative flex-shrink-0">
            <button
              id="sort-dropdown-btn"
              onClick={() => setSortOpen(o => !o)}
              className="flex items-center gap-2 px-4 py-2 transition-all"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
                background: 'transparent',
                minWidth: '180px',
                justifyContent: 'space-between',
              }}
              aria-expanded={sortOpen}
              aria-haspopup="listbox"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={13} />
                {currentSort.label}
              </span>
              <ChevronDown size={13} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {sortOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-full z-10 py-1"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                role="listbox"
              >
                {sortOptions.map(opt => (
                  <button
                    key={opt.value}
                    role="option"
                    aria-selected={sortBy === opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    className="w-full text-left px-4 py-2.5 transition-colors"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: sortBy === opt.value ? 'var(--gold)' : 'var(--muted)',
                      background: sortBy === opt.value ? 'rgba(245,169,0,0.06)' : 'transparent',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 48px)' }}>
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} columns={4} />
        ) : (
          <div className="py-24 text-center">
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              No products found
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)', marginTop: '8px' }}>
              Try a different category or search term.
            </p>
          </div>
        )}
      </div>

      <TrustStrip />
    </motion.main>
  );
}
