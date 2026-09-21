import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import MobileMenu from './MobileMenu';

const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Shop',
    to: '/shop',
    children: [
      { label: 'All Gear', to: '/shop' },
      { label: 'Cricket Bats', to: '/category/Bats' },
      { label: 'Batting Pads', to: '/category/Pads' },
      { label: 'Batting Gloves', to: '/category/Gloves' },
      { label: 'Helmets', to: '/category/Helmets' },
      { label: 'Kit Bags', to: '/category/Bags' },
      { label: 'Cricket Balls', to: '/category/Balls' },
      { label: 'Complete Kits', to: '/category/Kits' },
      { label: 'Accessories', to: '/category/Accessories' },
    ],
  },
  { label: 'Bats', to: '/category/Bats' },
  { label: 'Kits', to: '/category/Kits' },
  { label: 'Protection', to: '/category/Pads' },
  { label: 'Accessories', to: '/category/Accessories' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopDropdown, setShopDropdown] = useState(false);
  const { count, setIsOpen: openCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        style={{ padding: scrolled ? '10px 0' : '16px 0' }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 flex-shrink-0"
              aria-label="SR Sports Cricket — Home"
            >
              <img
                src="/sr-logo.svg"
                alt="SR Sports Cricket Logo"
                style={{ width: scrolled ? 36 : 44, height: scrolled ? 36 : 44, transition: 'all 0.3s', objectFit: 'contain', display: 'block' }}
              />
              <div className="hidden sm:block">
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: scrolled ? '1rem' : '1.15rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    lineHeight: 1.1,
                    transition: 'all 0.3s',
                    color: 'var(--text)',
                  }}
                >
                  SR Sports
                  <span style={{ color: 'var(--gold)', display: 'block', fontSize: '0.65em', letterSpacing: '0.18em' }}>
                    Cricket
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setShopDropdown(true)}
                    onMouseLeave={() => setShopDropdown(false)}
                  >
                    <NavLink
                      to={link.to}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium uppercase tracking-widest transition-colors"
                      style={({ isActive }) => ({
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        letterSpacing: '0.12em',
                        color: isActive ? 'var(--gold)' : 'var(--muted)',
                      })}
                    >
                      {link.label}
                      <ChevronDown size={12} />
                    </NavLink>
                    <AnimatePresence>
                      {shopDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 py-2 min-w-[200px]"
                          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                        >
                          {link.children.map(child => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              className="block px-4 py-2.5 text-sm transition-colors"
                              style={({ isActive }) => ({
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                fontSize: '0.82rem',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: isActive ? 'var(--gold)' : 'var(--muted)',
                              })}
                              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                              onMouseLeave={e => e.currentTarget.style.color = ''}
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.to === '/'}
                    className="px-3 py-2 transition-colors"
                    style={({ isActive }) => ({
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--gold)' : 'var(--muted)',
                    })}
                    onMouseEnter={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.color = 'var(--text)'; }}
                    onMouseLeave={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.color = ''; }}
                  >
                    {link.label}
                  </NavLink>
                )
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                id="nav-search-btn"
                onClick={() => setSearchOpen(o => !o)}
                className="p-2.5 transition-colors rounded"
                style={{ color: 'var(--muted)' }}
                aria-label="Search products"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                <Search size={18} />
              </button>

              {/* Account (visual only) */}
              <button
                id="nav-account-btn"
                className="p-2.5 transition-colors rounded hidden sm:flex"
                style={{ color: 'var(--muted)' }}
                aria-label="Account"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                <User size={18} />
              </button>

              {/* Cart */}
              <button
                id="nav-cart-btn"
                onClick={() => openCart(true)}
                className="p-2.5 transition-colors rounded relative"
                style={{ color: 'var(--muted)' }}
                aria-label={`Shopping cart, ${count} items`}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                <ShoppingCart size={18} />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: 'var(--gold)',
                      color: 'var(--bg)',
                      minWidth: '18px',
                      height: '18px',
                      lineHeight: 1,
                      padding: '0 3px',
                    }}
                  >
                    {count}
                  </motion.span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                id="nav-menu-btn"
                onClick={() => setMenuOpen(o => !o)}
                className="p-2.5 transition-colors rounded lg:hidden"
                style={{ color: 'var(--muted)' }}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSearch}
                className="overflow-hidden"
                style={{ marginTop: '12px' }}
              >
                <div className="flex gap-2">
                  <input
                    id="nav-search-input"
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search cricket gear..."
                    className="flex-1 px-4 py-2.5 text-sm outline-none"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    aria-label="Search input"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary px-5 py-2.5 text-sm"
                  >
                    Search
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu onClose={() => setMenuOpen(false)} openCart={() => { openCart(true); setMenuOpen(false); }} />
        )}
      </AnimatePresence>
    </>
  );
}
