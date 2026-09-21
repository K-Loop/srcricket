import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronRight, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { formatPrice } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/shop/ProductCard';
import { Badge } from '../components/ui/UI';
import TrustStrip from '../components/home/TrustStrip';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts } = useProducts();
  const product = getProductById(id);
  const { addItem } = useCart();
  const { toggle, isWished } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState('details');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div className="text-center">
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.2rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Product not found
          </p>
          <Link to="/shop" className="btn btn-primary mt-5">Browse All Gear</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate('/checkout');
  };

  const specs = product.specifications || {};

  const accordions = [
    {
      id: 'details',
      label: 'Product Details',
      content: product.description,
    },
    {
      id: 'specs',
      label: 'Specifications',
      content: Object.entries(specs).map(([k, v]) => `${k}: ${v}`).join('\n'),
    },
    {
      id: 'shipping',
      label: 'Shipping',
      content: 'We offer pan-India delivery. Standard delivery takes 4–7 business days. Express delivery is available at checkout.',
    },
    {
      id: 'returns',
      label: 'Returns',
      content: 'We accept returns within 7 days of delivery for unused products in original packaging. Contact our support team to initiate a return.',
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg)' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 48px)' }}>

        {/* Breadcrumb */}
        <div
          className="flex items-center gap-1.5 mb-8 text-xs flex-wrap"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}
        >
          <Link to="/" style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >Shop</Link>
          <ChevronRight size={10} />
          <Link to={`/category/${product.category}`} style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >{product.category}</Link>
          <ChevronRight size={10} />
          <span style={{ color: 'var(--text)' }}>{product.shortName || product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left — Images */}
          <div>
            {/* Main image */}
            <div
              style={{
                aspectRatio: '4/5',
                overflow: 'hidden',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                marginBottom: '12px',
              }}
            >
              <img
                src={images[activeImage]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      width: 72,
                      height: 72,
                      overflow: 'hidden',
                      border: `2px solid ${activeImage === i ? 'var(--gold)' : 'var(--border)'}`,
                      flexShrink: 0,
                      padding: 0,
                    }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.badge && <Badge variant="gold">{product.badge}</Badge>}
              {product.discount > 0 && <Badge variant="new">SAVE {product.discount}%</Badge>}
            </div>

            {/* Category */}
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>
              {product.category}
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                textTransform: 'uppercase',
                color: 'var(--text)',
                lineHeight: 1.05,
                marginBottom: '16px',
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--muted)' }}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '2.2rem', color: 'var(--gold)', lineHeight: 1 }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: 'var(--muted)', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ color: 'var(--muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '28px' }}>
              {product.description}
            </p>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Quantity
              </span>
              <div className="flex items-center">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="qty-btn" aria-label="Decrease quantity"><Minus size={14} /></button>
                <span style={{ minWidth: '44px', textAlign: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="qty-btn" aria-label="Increase quantity"><Plus size={14} /></button>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: product.stock < 10 ? '#f59e0b' : 'var(--muted)' }}>
                {product.stock < 10 ? `Only ${product.stock} left` : 'In stock'}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                id={`product-add-cart-${product.id}`}
                onClick={handleAddToCart}
                className="btn btn-primary gold-sweep-btn flex-1 py-4 justify-center"
                style={{ fontSize: '0.9rem' }}
              >
                {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                id={`product-buy-now-${product.id}`}
                onClick={handleBuyNow}
                className="btn btn-outline flex-1 py-4 justify-center"
                style={{ fontSize: '0.9rem' }}
              >
                Buy Now
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => toggle(product.id)}
              className="flex items-center gap-2 mb-8 transition-colors"
              style={{ color: isWished(product.id) ? 'var(--gold)' : 'var(--muted)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              aria-label={isWished(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={isWished(product.id)}
            >
              <Heart size={14} fill={isWished(product.id) ? 'currentColor' : 'none'} />
              {isWished(product.id) ? 'Wishlisted' : 'Add to Wishlist'}
            </button>

            {/* Accordions */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {accordions.map(acc => (
                <div key={acc.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <button
                    id={`accordion-${acc.id}`}
                    onClick={() => setOpenAccordion(o => o === acc.id ? null : acc.id)}
                    className="w-full flex items-center justify-between py-4 text-left transition-colors"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: openAccordion === acc.id ? 'var(--gold)' : 'var(--text)',
                    }}
                    aria-expanded={openAccordion === acc.id}
                  >
                    {acc.label}
                    <ChevronRight
                      size={14}
                      style={{
                        transform: openAccordion === acc.id ? 'rotate(90deg)' : 'none',
                        transition: 'transform 0.25s',
                        color: 'var(--muted)',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openAccordion === acc.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingBottom: '16px' }}>
                          {acc.id === 'specs' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {Object.entries(specs).map(([k, v]) => (
                                <div key={k} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem' }}>
                                  <span style={{ color: 'var(--muted)', textTransform: 'capitalize' }}>{k}: </span>
                                  <span style={{ color: 'var(--text)' }}>{v}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                              {acc.content}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 'clamp(48px, 8vw, 96px)' }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                textTransform: 'uppercase',
                color: 'var(--text)',
                marginBottom: '32px',
              }}
            >
              You May Also Like
            </h2>
            <ProductGrid products={related} columns={4} />
          </div>
        )}
      </div>

      <TrustStrip />
    </motion.main>
  );
}
