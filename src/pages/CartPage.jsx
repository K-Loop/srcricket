import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartPageView() {
  const { items, removeItem, updateQty, total, savings, count } = useCart();

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 48px)' }}>

        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            textTransform: 'uppercase',
            color: 'var(--text)',
            marginBottom: '40px',
            letterSpacing: '-0.01em',
          }}
        >
          Your Bag
          {count > 0 && (
            <span style={{ color: 'var(--gold)', marginLeft: '12px', fontSize: '0.6em' }}>({count} items)</span>
          )}
        </h1>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingCart size={60} style={{ color: 'var(--border)', margin: '0 auto 20px' }} />
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '12px' }}>
              Your bag is empty
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '32px' }}>
              Start shopping for premium cricket gear.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Shop All Gear <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Items */}
            <div className="lg:col-span-2">
              <div style={{ borderTop: '1px solid var(--border)' }}>
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ borderBottom: '1px solid var(--border)', padding: '24px 0' }}
                    >
                      <div className="flex gap-4">
                        <div style={{ width: 100, height: 120, flexShrink: 0, overflow: 'hidden', background: 'var(--surface)' }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>
                            {item.category}
                          </div>
                          <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.3, marginBottom: '8px' }}>
                            {item.name}
                          </h3>
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '16px' }}>
                            {formatPrice(item.price)}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <button onClick={() => updateQty(item.id, item.qty - 1)} className="qty-btn" aria-label="Decrease quantity"><Minus size={13} /></button>
                              <span style={{ minWidth: '44px', textAlign: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>{item.qty}</span>
                              <button onClick={() => updateQty(item.id, item.qty + 1)} className="qty-btn" aria-label="Increase quantity"><Plus size={13} /></button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--muted)' }}>
                                {formatPrice(item.price * item.qty)}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                style={{ color: 'var(--muted)', padding: '4px', transition: 'color 0.2s' }}
                                aria-label={`Remove ${item.name}`}
                                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '28px', position: 'sticky', top: '100px' }}>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '24px' }}>
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 mb-5">
                  <div className="flex justify-between">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--muted)' }}>Subtotal ({count} items)</span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--muted)' }}>Shipping</span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#22c55e' }}>Free</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#22c55e' }}>You save</span>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#22c55e' }}>-{formatPrice(savings)}</span>
                    </div>
                  )}
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '24px' }}>
                  <div className="flex justify-between">
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)' }}>Total</span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.5rem', color: 'var(--gold)' }}>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-primary w-full justify-center py-4 gold-sweep-btn mb-3"
                  id="cart-checkout-btn"
                  style={{ fontSize: '0.9rem' }}
                >
                  Proceed to Checkout
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/shop"
                  className="btn btn-ghost w-full justify-center text-sm"
                  style={{ fontSize: '0.8rem' }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.main>
  );
}
