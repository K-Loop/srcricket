import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ProductProvider, useProducts } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPageView from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AboutManufacturingPage from './pages/AboutManufacturingPage';
import AdminLayout from './pages/admin/AdminLayout';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function TopAnnouncementBar() {
  const { settings } = useProducts();
  const { pathname } = useLocation();

  if (pathname.startsWith('/admin') || !settings.announcementActive || !settings.announcementText) {
    return null;
  }

  return (
    <div
      className="text-center py-2 px-4 text-xs font-semibold select-none fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2"
      style={{
        background: 'linear-gradient(90deg, #d97706 0%, #b45309 50%, #d97706 100%)',
        color: '#070707',
        fontFamily: "'Barlow Condensed', sans-serif",
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        height: '32px',
        fontWeight: 800,
      }}
    >
      <span>{settings.announcementText}</span>
    </div>
  );
}

function MainAppShell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      <ScrollToTop />
      <TopAnnouncementBar />
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartDrawer />}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPageView />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/about" element={<AboutManufacturingPage />} />
          <Route path="/manufacturing" element={<AboutManufacturingPage />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </div>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <MainAppShell />
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}
