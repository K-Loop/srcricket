import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, savings, count, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            aria-label="Shopping cart"
            aria-modal="true"
            role="dialog"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 sticky top-0"
              style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', zIndex: 1 }}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} style={{ color: 'var(--gold)' }} />
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: '1rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                  }}
                >
                  Your Bag ({count})
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ color: 'var(--muted)', padding: '4px' }}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Empty state */}
            {items.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
                <ShoppingCart size={48} style={{ color: 'var(--border)', marginBottom: '16px' }} />
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  Your bag is empty
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)', marginTop: '8px', marginBottom: '24px' }}>
                  Add cricket gear to get started.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline text-sm py-2.5"
                >
                  Shop Gear
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {/* Items */}
            {items.length > 0 && (
              <div className="flex flex-col h-full" style={{ paddingBottom: '200px' }}>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div
                          className="flex gap-3"
                          style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}
                        >
                          {/* Image */}
                          <div style={{ width: 72, height: 72, flexShrink: 0, overflow: 'hidden', background: 'var(--surface-2)' }}>
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              loading="lazy"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.3, marginBottom: '4px' }}>
                              {item.name}
                            </div>
                            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold)' }}>
                              {formatPrice(item.price)}
                            </div>

                            {/* Qty + Remove */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center">
                                <button
                                  onClick={() => updateQty(item.id, item.qty - 1)}
                                  className="qty-btn"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={12} />
                                </button>
                                <span
                                  style={{
                                    minWidth: '36px',
                                    textAlign: 'center',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    color: 'var(--text)',
                                  }}
                                >
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(item.id, item.qty + 1)}
                                  className="qty-btn"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                style={{ color: 'var(--muted)', padding: '4px', transition: 'color 0.2s' }}
                                aria-label={`Remove ${item.name}`}
                                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Summary */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 py-5"
                  style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
                >
                  {savings > 0 && (
                    <div className="flex justify-between mb-2">
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#22c55e' }}>
                        You're saving
                      </span>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#22c55e' }}>
                        {formatPrice(savings)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between mb-4">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--muted)' }}>
                      Subtotal
                    </span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.2rem', color: 'var(--gold)' }}>
                      {formatPrice(total)}
                    </span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-primary w-full justify-center py-3.5 gold-sweep-btn"
                    style={{ fontSize: '0.88rem' }}
                    id="checkout-btn-drawer"
                  >
                    Proceed to Checkout
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-ghost w-full justify-center mt-2 text-sm"
                    style={{ fontSize: '0.8rem' }}
                    id="view-cart-btn"
                  >
                    View Full Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
