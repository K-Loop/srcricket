import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShoppingBag, ArrowRight, Package, Truck } from 'lucide-react';
import { formatPrice } from '../data/products';

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const orderId = state?.orderId || `SR${Date.now().toString().slice(-8)}`;
  const items = state?.items || [];
  const total = state?.total || 0;
  const address = state?.address || 'Address on file';

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(80px,12vw,140px) clamp(16px,4vw,48px)' }}
    >
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          style={{
            width: 96, height: 96,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--gold), var(--orange))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px',
          }}
        >
          <Check size={44} strokeWidth={3} style={{ color: 'var(--bg)' }} />
        </motion.div>

        {/* Logo */}
        <motion.img
          src="/sr-logo.svg"
          alt="SR Sports Cricket"
          style={{ width: 64, height: 64, objectFit: 'contain', margin: '0 auto 20px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            marginBottom: '12px',
          }}
        >
          <span className="text-gradient-gold">Order</span>
          <br />
          Confirmed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '36px' }}
        >
          Your SR Sports Cricket order has been placed successfully. We'll send a confirmation to your email shortly.
        </motion.p>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '28px',
            textAlign: 'left',
            marginBottom: '28px',
          }}
        >
          {/* Order ID */}
          <div className="flex items-center justify-between mb-5" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Order ID
            </span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1rem', color: 'var(--gold)', letterSpacing: '0.06em' }}>
              #{orderId}
            </span>
          </div>

          {/* Items */}
          {items.length > 0 && (
            <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '12px' }}>
                Items Ordered
              </span>
              <div className="flex flex-col gap-3">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div style={{ width: 44, height: 44, overflow: 'hidden', background: 'var(--surface-2)', flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.3 }}>{item.name}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'var(--muted)' }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--gold)', flexShrink: 0 }}>
                      {formatPrice(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center mb-4">
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)' }}>
              Total Paid
            </span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.4rem', color: 'var(--gold)' }}>
              {formatPrice(total)}
            </span>
          </div>

          {/* Delivery info */}
          <div className="flex items-start gap-3 mt-4" style={{ padding: '14px', background: 'rgba(245,169,0,0.04)', border: '1px solid rgba(245,169,0,0.15)' }}>
            <Truck size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>
                Delivery Address
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                {address}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--muted)', marginTop: '6px' }}>
                Estimated delivery: 4–7 business days
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          {[
            { icon: Check, label: 'Order Placed', done: true },
            { icon: Package, label: 'Processing', done: false },
            { icon: Truck, label: 'Dispatched', done: false },
          ].map(({ icon: Icon, label, done }, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1.5">
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: done ? 'var(--gold)' : 'var(--surface)',
                  border: `1.5px solid ${done ? 'var(--gold)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={15} style={{ color: done ? 'var(--bg)' : 'var(--muted)' }} />
                </div>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: done ? 'var(--gold)' : 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div style={{ width: 32, height: 1, background: 'var(--border)', flexShrink: 0, marginBottom: '18px' }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/shop"
            id="order-success-continue-btn"
            className="btn btn-primary gold-sweep-btn py-4 px-10"
            style={{ fontSize: '0.9rem' }}
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="btn btn-outline py-4 px-8"
            style={{ fontSize: '0.9rem' }}
          >
            Back to Home
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </motion.main>
  );
}
