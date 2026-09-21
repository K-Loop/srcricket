import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Hammer,
  BarChart3,
  Settings,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
  Bell,
  Sparkles,
  ChevronRight,
  Store
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import AdminOverview from './AdminOverview';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminManufacturing from './AdminManufacturing';
import AdminAnalytics from './AdminAnalytics';
import AdminSettings from './AdminSettings';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Product Catalog', icon: Package },
  { id: 'orders', label: 'Store Orders', icon: ShoppingBag },
  { id: 'manufacturing', label: 'Workshop Pipeline', icon: Hammer },
  { id: 'analytics', label: 'Analytics & Sales', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { products, orders, customBats } = useProducts();

  const handleSelectTab = (tabId) => {
    setSearchParams({ tab: tabId });
    setMobileNavOpen(false);
  };

  const pendingOrdersCount = orders.filter((o) => o.status === 'Confirmed' || o.status === 'In Factory Production').length;
  const customBatsActive = customBats.filter((cb) => cb.stage !== 'dispatched').length;

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col pt-16">
      {/* Top Admin Bar */}
      <header
        className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6"
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded md:hidden text-[var(--muted)] hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <img src="/sr-logo.svg" alt="SR Sports" className="w-8 h-8 object-contain" />
            <div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  lineHeight: 1,
                }}
              >
                SR Factory Admin
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                }}
              >
                Management Portal
              </div>
            </div>
          </Link>
        </div>

        {/* Right Admin actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/about"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'rgba(245,169,0,0.1)',
              color: 'var(--gold)',
              border: '1px solid rgba(245,169,0,0.25)',
            }}
          >
            <Hammer size={12} />
            Manufacturing Page
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold text-white hover:text-[var(--gold)] transition-colors"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
            }}
          >
            <Store size={13} />
            View Storefront
            <ExternalLink size={11} className="text-[var(--muted)]" />
          </Link>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Desktop Sidebar (Left) */}
        <aside
          className="hidden md:flex flex-col w-64 p-4 flex-shrink-0 border-r border-[var(--border)] min-h-[calc(100vh-4rem)]"
          style={{ background: 'var(--surface)' }}
        >
          {/* Nav Items */}
          <div className="space-y-1.5 flex-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Core Operations
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              let badgeCount = null;
              if (item.id === 'orders' && pendingOrdersCount > 0) badgeCount = pendingOrdersCount;
              if (item.id === 'manufacturing' && customBatsActive > 0) badgeCount = customBatsActive;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[var(--gold)] text-black font-extrabold shadow-lg shadow-[var(--gold)]/20'
                      : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface-2)] font-semibold'
                  }`}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '0.88rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>

                  {badgeCount && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-black text-[var(--gold)]' : 'bg-[var(--gold)] text-black'
                      }`}
                    >
                      {badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick info footer */}
          <div className="p-3 rounded-xl border border-[var(--border)] mt-4" style={{ background: 'var(--surface-2)' }}>
            <div className="text-[10px] uppercase font-bold text-[var(--gold)] tracking-wider mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Active Environment
            </div>
            <div className="text-[11px] text-[var(--text)] font-semibold">
              SR Sports Workshop v2.4
            </div>
            <div className="text-[10px] text-[var(--muted)] mt-0.5">
              Instant LocalStorage Sync
            </div>
          </div>
        </aside>

        {/* Mobile Slide-out Drawer */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileNavOpen(false)}
            >
              <div
                className="w-72 h-full p-4 flex flex-col"
                style={{ background: 'var(--surface)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-4">
                  <span className="font-bold text-sm uppercase text-[var(--gold)]">Admin Navigation</span>
                  <button onClick={() => setMobileNavOpen(false)}>
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-1 flex-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                          isActive ? 'bg-[var(--gold)] text-black font-bold' : 'text-[var(--muted)]'
                        }`}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem', textTransform: 'uppercase' }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentTab === 'overview' && <AdminOverview onNavigateTab={handleSelectTab} />}
          {currentTab === 'products' && <AdminProducts />}
          {currentTab === 'orders' && <AdminOrders />}
          {currentTab === 'manufacturing' && <AdminManufacturing />}
          {currentTab === 'analytics' && <AdminAnalytics />}
          {currentTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
