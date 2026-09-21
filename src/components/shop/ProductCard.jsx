import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Star, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../data/products';
import { Badge } from '../ui/UI';

export function ProductCard({ product, index = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { addItem } = useCart();
  const { toggle, isWished } = useWishlist();
  const wished = isWished(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="product-card block group"
        style={{ textDecoration: 'none' }}
        aria-label={`View ${product.name}`}
      >
        {/* Image */}
        <div className="product-image-wrap relative" style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div
            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && <Badge variant="gold">{product.badge}</Badge>}
            {product.discount > 0 && <Badge variant="new">-{product.discount}%</Badge>}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              id={`wishlist-${product.id}`}
              onClick={handleWishlist}
              className="w-8 h-8 flex items-center justify-center transition-all"
              style={{
                background: 'rgba(17,17,17,0.85)',
                border: `1px solid ${wished ? 'var(--gold)' : 'var(--border)'}`,
                color: wished ? 'var(--gold)' : 'var(--muted)',
              }}
              aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              aria-pressed={wished}
            >
              <Heart size={13} fill={wished ? 'currentColor' : 'none'} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="w-8 h-8 flex items-center justify-center transition-all"
              style={{
                background: 'rgba(17,17,17,0.85)',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
              }}
              aria-label={`Quick view ${product.name}`}
              onClick={e => e.stopPropagation()}
            >
              <Eye size={13} />
            </Link>
          </div>

          {/* Add to Cart — appears on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            style={{ background: 'rgba(7,7,7,0.95)' }}
          >
            <button
              id={`add-cart-${product.id}`}
              onClick={handleAddToCart}
              className="btn btn-primary w-full text-sm py-2.5 justify-center"
            >
              <ShoppingCart size={14} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '6px',
            }}
          >
            {product.category}
          </div>
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--text)',
              lineHeight: 1.3,
              marginBottom: '8px',
            }}
          >
            {product.name}
          </h3>

          {/* Stars */}
          <div className="flex items-center gap-1.5 mb-8">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: "'Inter', sans-serif" }}>
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2.5">
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: '1.15rem',
                color: 'var(--gold)',
              }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: 'var(--muted)',
                  textDecoration: 'line-through',
                }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Add to Cart */}
          <button
            id={`mob-add-cart-${product.id}`}
            onClick={handleAddToCart}
            className="btn btn-primary w-full mt-3 py-2.5 text-sm justify-center sm:hidden"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductGrid({ products: productList, columns = 4, title }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-2 lg:grid-cols-4';

  return (
    <div ref={ref}>
      {title && (
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-8"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: '1.4rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text)',
          }}
        >
          {title}
        </motion.h3>
      )}
      <div className={`grid ${gridCols} gap-3 md:gap-4 lg:gap-5 group`}>
        {productList.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
