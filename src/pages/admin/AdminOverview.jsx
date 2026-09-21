import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../data/products';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Hammer,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminOverview({ onNavigateTab }) {
  const { products, orders, customBats, settings } = useProducts();

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = products.length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const customBatsInQueue = customBats.filter((cb) => cb.stage !== 'dispatched').length;

  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e' };
      case 'Dispatched':
        return { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6' };
      case 'In Factory Production':
        return { bg: 'rgba(245, 169, 0, 0.15)', text: 'var(--gold)' };
      case 'Confirmed':
        return { bg: 'rgba(168, 85, 247, 0.15)', text: '#a855f7' };
      default:
        return { bg: 'rgba(156, 163, 175, 0.15)', text: '#9ca3af' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: '2rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--text)',
            }}
          >
            Factory Executive Dashboard
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)' }}>
            Real-time overview of SR Sports workshop production, storefront revenue, and order statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Live Sync Active
          </span>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div
          className="p-5 rounded-2xl relative overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              STORE REVENUE
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,169,0,0.15)', color: 'var(--gold)' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.9rem', color: 'var(--text)' }}>
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-[11px] text-[var(--gold)] mt-1 flex items-center gap-1 font-semibold">
            <span>From {totalOrdersCount} verified orders</span>
          </div>
        </div>

        {/* Total Orders */}
        <div
          className="p-5 rounded-2xl relative overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              TOTAL ORDERS
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>
              <ShoppingBag size={16} />
            </div>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.9rem', color: 'var(--text)' }}>
            {totalOrdersCount}
          </div>
          <div className="text-[11px] text-[#3b82f6] mt-1 font-semibold">
            <span>Direct pan-India dispatches</span>
          </div>
        </div>

        {/* Custom Bat Queue */}
        <div
          className="p-5 rounded-2xl relative overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              CUSTOM BATS QUEUE
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>
              <Hammer size={16} />
            </div>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.9rem', color: 'var(--text)' }}>
            {customBatsInQueue} In Workshop
          </div>
          <div className="text-[11px] text-[#a855f7] mt-1 font-semibold">
            <span>Master craftsman hand-shaping</span>
          </div>
        </div>

        {/* Catalog & Stock Status */}
        <div
          className="p-5 rounded-2xl relative overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              CATALOG / INVENTORY
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>
              <Package size={16} />
            </div>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.9rem', color: 'var(--text)' }}>
            {activeProductsCount} Items
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1 flex items-center gap-1 font-semibold">
            {lowStockCount > 0 ? (
              <span className="text-amber-400">⚠️ {lowStockCount} items low stock</span>
            ) : (
              <span className="text-green-400">✓ All stock healthy</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Split: Recent Orders & Quick Workshop Status */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Recent Orders (8 cols) */}
        <div
          className="lg:col-span-8 rounded-2xl p-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                }}
              >
                Recent Store Orders
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--muted)' }}>
                Latest orders received from the checkout mechanism
              </p>
            </div>

            <button
              onClick={() => onNavigateTab && onNavigateTab('orders')}
              className="text-xs uppercase font-bold text-[var(--gold)] hover:underline flex items-center gap-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              View All Orders <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--muted)]" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase' }}>
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {recentOrders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  return (
                    <tr key={order.orderId} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="py-3 font-bold text-[var(--gold)]">
                        {order.orderId}
                      </td>
                      <td className="py-3">
                        <div className="font-semibold text-[var(--text)]">{order.customer?.name || 'Customer'}</div>
                        <div className="text-[11px] text-[var(--muted)]">{order.customer?.city || 'India'}</div>
                      </td>
                      <td className="py-3 text-[var(--muted)]">
                        {order.items?.length || 1} item(s)
                      </td>
                      <td className="py-3 font-bold text-[var(--text)]">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase"
                          style={{
                            background: badge.bg,
                            color: badge.text,
                            fontFamily: "'Barlow Condensed', sans-serif",
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fast Action & Workshop Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Card */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: '1.2rem',
                textTransform: 'uppercase',
                color: 'var(--text)',
                marginBottom: '14px',
              }}
            >
              Factory Quick Actions
            </h2>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigateTab && onNavigateTab('products')}
                className="w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  <Package size={16} className="text-[var(--gold)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Add / Edit Products
                  </span>
                </div>
                <ChevronRight size={14} className="text-[var(--muted)]" />
              </button>

              <button
                onClick={() => onNavigateTab && onNavigateTab('manufacturing')}
                className="w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  <Hammer size={16} className="text-[var(--gold)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Manage Custom Bat Pipeline
                  </span>
                </div>
                <ChevronRight size={14} className="text-[var(--muted)]" />
              </button>

              <button
                onClick={() => onNavigateTab && onNavigateTab('settings')}
                className="w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-[var(--gold)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Store & Announcement Config
                  </span>
                </div>
                <ChevronRight size={14} className="text-[var(--muted)]" />
              </button>
            </div>
          </div>

          {/* Workshop Live Status Banner */}
          <div
            className="p-5 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(245,169,0,0.1) 0%, rgba(7,7,7,0.9) 100%)',
              border: '1px solid rgba(245,169,0,0.3)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                Workshop Station #01
              </span>
            </div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.15rem', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '4px' }}>
              Seasoned Cleft Curing Yard
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>
              450+ Grade 1 English Willow clefts currently curing at 11.2% moisture index.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
