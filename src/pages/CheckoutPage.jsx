import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, MapPin, Truck, ShieldCheck, ChevronRight, Check, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const STEPS = ['Contact', 'Address', 'Payment'];

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm, BHIM' },
  { id: 'card', label: 'Card', icon: CreditCard, desc: 'Credit or Debit Card' },
  { id: 'netbanking', label: 'Net Banking', icon: ShieldCheck, desc: 'All major Indian banks' },
  { id: 'cod', label: 'Cash on Delivery', icon: Truck, desc: 'Pay when your order arrives' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    email: '', phone: '',
    name: '', address: '', city: '', state: '', pincode: '',
    paymentMethod: 'upi',
    upiId: '', cardNumber: '', cardExpiry: '', cardCvv: '', cardName: '',
    bank: '',
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      navigate('/order-success', {
        state: {
          orderId: `SR${Date.now().toString().slice(-8)}`,
          items,
          total,
          address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        },
      });
    }, 2800);
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    padding: '12px 14px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: '0.72rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    display: 'block',
    marginBottom: '6px',
  };

  if (items.length === 0 && !processing) {
    navigate('/shop');
    return null;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg)' }}
    >
      {/* Processing Overlay */}
      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ background: 'rgba(7,7,7,0.96)', zIndex: 300 }}
          >
            <div className="spinner-gold mb-8" />
            <img src="/sr-logo.png" alt="SR Sports Cricket" style={{ width: 60, marginBottom: '24px', opacity: 0.9 }} />
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '8px' }}>
              Processing Payment
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--muted)' }}>
              Please wait while we confirm your order...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 48px)' }}>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            textTransform: 'uppercase',
            color: 'var(--text)',
            marginBottom: '36px',
          }}
        >
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 px-3 py-2 transition-all ${i < step ? 'cursor-pointer' : i === step ? 'cursor-default' : 'cursor-not-allowed'}`}
                disabled={i > step}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: i === step ? 'var(--gold)' : i < step ? 'var(--text)' : 'var(--muted)',
                }}
              >
                <span
                  style={{
                    width: 22, height: 22,
                    borderRadius: '50%',
                    border: '1.5px solid',
                    borderColor: i === step ? 'var(--gold)' : i < step ? 'var(--gold)' : 'var(--border)',
                    background: i < step ? 'var(--gold)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 800,
                    color: i < step ? 'var(--bg)' : i === step ? 'var(--gold)' : 'var(--muted)',
                    flexShrink: 0,
                  }}
                >
                  {i < step ? <Check size={11} /> : i + 1}
                </span>
                {s}
              </button>
              {i < STEPS.length - 1 && (
                <ChevronRight size={14} style={{ color: 'var(--border)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">

            {/* Step 0: Contact */}
            {step === 0 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} style={{ color: 'var(--gold)' }} /> Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      id="checkout-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    />
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="btn btn-primary py-3.5 px-8" id="checkout-next-1">
                  Continue to Address <ChevronRight size={14} />
                </button>
              </motion.div>
            )}

            {/* Step 1: Address */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={16} style={{ color: 'var(--gold)' }} /> Delivery Address
                </h2>
                <div className="flex flex-col gap-4 mb-6">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input id="checkout-name" type="text" placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Address</label>
                    <input id="checkout-address" type="text" placeholder="House/Flat No, Street, Area" value={form.address} onChange={e => update('address', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label style={labelStyle}>City</label>
                      <input id="checkout-city" type="text" placeholder="City" value={form.city} onChange={e => update('city', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                    </div>
                    <div>
                      <label style={labelStyle}>State</label>
                      <input id="checkout-state" type="text" placeholder="State" value={form.state} onChange={e => update('state', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                    </div>
                    <div>
                      <label style={labelStyle}>PIN Code</label>
                      <input id="checkout-pincode" type="text" placeholder="400001" value={form.pincode} onChange={e => update('pincode', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="btn btn-outline py-3.5 px-6" id="checkout-back-1">Back</button>
                  <button onClick={() => setStep(2)} className="btn btn-primary py-3.5 px-8" id="checkout-next-2">
                    Continue to Payment <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={16} style={{ color: 'var(--gold)' }} /> Payment Method
                </h2>

                <div className="flex flex-col gap-3 mb-6">
                  {paymentMethods.map(method => {
                    const Icon = method.icon;
                    const isActive = form.paymentMethod === method.id;
                    return (
                      <label
                        key={method.id}
                        htmlFor={`payment-${method.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '16px',
                          border: `1.5px solid ${isActive ? 'var(--gold)' : 'var(--border)'}`,
                          background: isActive ? 'rgba(245,169,0,0.04)' : 'var(--surface)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <input
                          id={`payment-${method.id}`}
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={isActive}
                          onChange={() => update('paymentMethod', method.id)}
                          style={{ accentColor: 'var(--gold)', width: 16, height: 16, flexShrink: 0 }}
                        />
                        <Icon size={18} style={{ color: isActive ? 'var(--gold)' : 'var(--muted)', flexShrink: 0 }} />
                        <div>
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: isActive ? 'var(--text)' : 'var(--muted)' }}>
                            {method.label}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--muted)' }}>
                            {method.desc}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* UPI field */}
                {form.paymentMethod === 'upi' && (
                  <div className="mb-6">
                    <label style={labelStyle}>UPI ID</label>
                    <input id="checkout-upi" type="text" placeholder="yourname@upi" value={form.upiId} onChange={e => update('upiId', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                  </div>
                )}

                {/* Card fields */}
                {form.paymentMethod === 'card' && (
                  <div className="flex flex-col gap-4 mb-6">
                    <div>
                      <label style={labelStyle}>Card Number</label>
                      <input id="checkout-card-num" type="text" placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber} onChange={e => update('cardNumber', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label style={labelStyle}>Cardholder Name</label>
                        <input id="checkout-card-name" type="text" placeholder="Your Name" value={form.cardName} onChange={e => update('cardName', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                      </div>
                      <div>
                        <label style={labelStyle}>Expiry</label>
                        <input id="checkout-card-expiry" type="text" placeholder="MM/YY" maxLength={5} value={form.cardExpiry} onChange={e => update('cardExpiry', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                      </div>
                    </div>
                    <div style={{ maxWidth: '120px' }}>
                      <label style={labelStyle}>CVV</label>
                      <input id="checkout-card-cvv" type="password" placeholder="•••" maxLength={4} value={form.cardCvv} onChange={e => update('cardCvv', e.target.value)} style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {form.paymentMethod === 'netbanking' && (
                  <div className="mb-6">
                    <label style={labelStyle}>Select Bank</label>
                    <select
                      id="checkout-bank"
                      value={form.bank}
                      onChange={e => update('bank', e.target.value)}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="">-- Choose your bank --</option>
                      {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank'].map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn btn-outline py-3.5 px-6" id="checkout-back-2">Back</button>
                  <button
                    onClick={handlePay}
                    className="btn btn-primary py-4 px-10 gold-sweep-btn"
                    id="checkout-pay-now-btn"
                    style={{ fontSize: '0.95rem' }}
                  >
                    <ShieldCheck size={16} />
                    Pay Now — {formatPrice(total)}
                  </button>
                </div>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--muted)', marginTop: '16px' }}>
                  This is a demo checkout. No real payment is processed.
                </p>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '20px' }}>
                Order Summary
              </h3>
              <div className="flex flex-col gap-3 mb-5">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div style={{ width: 44, height: 44, flexShrink: 0, overflow: 'hidden', background: 'var(--surface-2)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.3 }}>{item.name}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'var(--muted)' }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--gold)', flexShrink: 0 }}>
                      {formatPrice(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text)' }}>Total</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.3rem', color: 'var(--gold)' }}>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
