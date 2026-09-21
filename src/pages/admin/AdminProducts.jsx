import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  AlertCircle,
  Package,
  Sparkles,
  Tag,
  DollarSign,
  RefreshCw,
  Layers,
  CheckCircle2,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../data/products';
import { Link } from 'react-router-dom';

const PRESET_IMAGES = [
  { label: 'English Willow Bat (Featured)', url: '/images/featured-bat.jpg' },
  { label: 'Kashmir Willow Bat', url: '/images/bat2.jpg' },
  { label: 'Bat Grain Close-up', url: '/images/bat-grain.jpg' },
  { label: 'Batting Pads', url: '/images/pads.jpg' },
  { label: 'Batting Gloves', url: '/images/gloves.svg' },
  { label: 'Cricket Helmet', url: '/images/helmet.svg' },
  { label: 'Kit Bag', url: '/images/bag.svg' },
  { label: 'Cricket Ball', url: '/images/ball.svg' },
  { label: 'Complete Kit', url: '/images/kit.jpg' },
  { label: 'Accessories', url: '/images/accessories.svg' },
];

const CATEGORIES = ['Bats', 'Pads', 'Gloves', 'Helmets', 'Bags', 'Balls', 'Kits', 'Accessories'];

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, resetProducts } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'in_stock' | 'low_stock' | 'out_of_stock'

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    category: 'Bats',
    price: '',
    originalPrice: '',
    discount: '',
    stock: 25,
    badge: 'NEW',
    image: '/images/featured-bat.jpg',
    description: '',
    specs: {
      material: 'Grade 1 English Willow',
      weight: '2.8 – 2.9 lb',
      bladeProfile: 'Mid Blade Sweet Spot',
      handle: '12-Piece Sarawak Cane Handle',
      edges: '38–40mm Power Edges',
      spine: 'High Spine',
      usage: 'Professional Match Play',
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      shortName: '',
      category: 'Bats',
      price: '',
      originalPrice: '',
      discount: '',
      stock: 25,
      badge: 'NEW',
      image: '/images/featured-bat.jpg',
      description: '',
      specs: {
        material: 'Grade 1 English Willow',
        weight: '2.8 – 2.9 lb',
        bladeProfile: 'Mid Blade Sweet Spot',
        handle: '12-Piece Sarawak Cane Handle',
        edges: '38–40mm Power Edges',
        spine: 'High Spine',
        usage: 'Professional Match Play',
      },
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name || '',
      shortName: p.shortName || p.name || '',
      category: p.category || 'Bats',
      price: p.price || '',
      originalPrice: p.originalPrice || '',
      discount: p.discount || '',
      stock: p.stock !== undefined ? p.stock : 20,
      badge: p.badge || '',
      image: p.image || '/images/featured-bat.jpg',
      description: p.description || '',
      specs: {
        material: p.specifications?.material || '',
        weight: p.specifications?.weight || '',
        bladeProfile: p.specifications?.bladeProfile || '',
        handle: p.specifications?.handle || '',
        edges: p.specifications?.edges || '',
        spine: p.specifications?.spine || '',
        usage: p.specifications?.usage || '',
      },
    });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const priceNum = Number(formData.price) || 0;
    const origPriceNum = Number(formData.originalPrice) || priceNum;
    const discountCalc = origPriceNum > priceNum ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : 0;

    const productPayload = {
      name: formData.name,
      shortName: formData.shortName || formData.name,
      category: formData.category,
      price: priceNum,
      originalPrice: origPriceNum,
      discount: discountCalc,
      stock: Number(formData.stock) || 0,
      badge: formData.badge,
      image: formData.image,
      images: [formData.image],
      description: formData.description || 'Premium cricket gear handcrafted at SR Sports workshops.',
      specifications: {
        material: formData.specs.material,
        weight: formData.specs.weight,
        bladeProfile: formData.specs.bladeProfile,
        handle: formData.specs.handle,
        edges: formData.specs.edges,
        spine: formData.specs.spine,
        usage: formData.specs.usage,
      },
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
      setEditingProduct(null);
    } else {
      addProduct(productPayload);
      setShowAddModal(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  // Filtered product listing
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    let matchesStock = true;
    if (stockFilter === 'in_stock') matchesStock = p.stock > 5;
    else if (stockFilter === 'low_stock') matchesStock = p.stock > 0 && p.stock <= 5;
    else if (stockFilter === 'out_of_stock') matchesStock = p.stock === 0;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
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
            Product Catalog Management
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)' }}>
            Manage bats, protective equipment, and cricket kits. Changes reflect live on the storefront immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProducts}
            title="Reset catalog to factory defaults"
            className="btn btn-outline py-2.5 px-3 text-xs flex items-center gap-1.5"
            style={{ borderColor: 'var(--border)' }}
          >
            <RefreshCw size={13} />
            Reset Defaults
          </button>

          <button
            onClick={handleOpenAdd}
            className="btn btn-primary gold-sweep-btn py-2.5 px-4 text-xs flex items-center gap-2"
          >
            <Plus size={16} />
            Add New Product
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="p-4 rounded-xl flex flex-col md:flex-row items-center gap-3"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, ID, or category..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
          />
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1">
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: selectedCategory === cat ? 'var(--gold)' : 'var(--surface-2)',
                color: selectedCategory === cat ? 'var(--bg)' : 'var(--muted)',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--gold)' : 'var(--border)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stock Filter */}
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="px-3 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
        >
          <option value="all">All Stock Status</option>
          <option value="in_stock">In Stock (&gt;5)</option>
          <option value="low_stock">Low Stock (1-5)</option>
          <option value="out_of_stock">Out of Stock (0)</option>
        </select>
      </div>

      {/* Catalog Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                <th className="p-3.5 text-xs font-bold tracking-wider text-[var(--muted)] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Product</th>
                <th className="p-3.5 text-xs font-bold tracking-wider text-[var(--muted)] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Category</th>
                <th className="p-3.5 text-xs font-bold tracking-wider text-[var(--muted)] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Price</th>
                <th className="p-3.5 text-xs font-bold tracking-wider text-[var(--muted)] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Stock Level</th>
                <th className="p-3.5 text-xs font-bold tracking-wider text-[var(--muted)] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Badge</th>
                <th className="p-3.5 text-xs font-bold tracking-wider text-[var(--muted)] uppercase text-right" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-xs">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isOutOfStock = product.stock === 0;
                  const isLowStock = product.stock > 0 && product.stock <= 5;
                  return (
                    <tr key={product.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      {/* Product details */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded overflow-hidden flex-shrink-0 flex items-center justify-center p-1"
                            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                          >
                            <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                            <div className="font-bold text-[var(--text)] line-clamp-1">{product.name}</div>
                            <div className="text-[var(--muted)] text-[11px] flex items-center gap-2">
                              <span>ID: {product.id}</span>
                              {product.rating && (
                                <span className="text-[var(--gold)]">★ {product.rating}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3.5">
                        <span
                          className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider"
                          style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text)', fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-3.5">
                        <div className="font-bold text-[var(--gold)]">{formatPrice(product.price)}</div>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div className="text-[var(--muted)] text-[10px] line-through">{formatPrice(product.originalPrice)}</div>
                        )}
                      </td>

                      {/* Stock Level with toggle */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStock(product.id)}
                            title="Click to toggle stock status"
                            className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase transition-colors"
                            style={{
                              background: isOutOfStock
                                ? 'rgba(239, 68, 68, 0.15)'
                                : isLowStock
                                ? 'rgba(245, 158, 11, 0.15)'
                                : 'rgba(34, 197, 94, 0.15)',
                              color: isOutOfStock ? '#ef4444' : isLowStock ? '#f59e0b' : '#22c55e',
                              fontFamily: "'Barlow Condensed', sans-serif",
                            }}
                          >
                            {isOutOfStock ? 'Out of Stock' : isLowStock ? `Low (${product.stock})` : `In Stock (${product.stock})`}
                          </button>
                        </div>
                      </td>

                      {/* Badge */}
                      <td className="p-3.5">
                        {product.badge ? (
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase"
                            style={{ background: 'rgba(245,169,0,0.15)', color: 'var(--gold)', fontFamily: "'Barlow Condensed', sans-serif" }}
                          >
                            {product.badge}
                          </span>
                        ) : (
                          <span className="text-[var(--muted)]">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/product/${product.id}`}
                            target="_blank"
                            title="View on live store"
                            className="p-1.5 rounded hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
                          >
                            <Eye size={14} />
                          </Link>

                          <button
                            onClick={() => handleOpenEdit(product)}
                            title="Edit product"
                            className="p-1.5 rounded hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>

                          <button
                            onClick={() => setDeletingProductId(product.id)}
                            title="Delete product"
                            className="p-1.5 rounded hover:bg-red-500/10 text-[var(--muted)] hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--muted)]">
                    No products found matching your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      <AnimatePresence>
        {(showAddModal || editingProduct) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl rounded-2xl overflow-hidden my-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {/* Modal Header */}
              <div className="p-5 flex items-center justify-between border-b border-[var(--border)]" style={{ background: 'var(--surface-2)' }}>
                <div className="flex items-center gap-2">
                  <Package size={20} className="text-[var(--gold)]" />
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.3rem', textTransform: 'uppercase', color: 'var(--text)' }}>
                    {editingProduct ? `Edit Product — ${editingProduct.name}` : 'Add New Product to Workshop Catalog'}
                  </h3>
                </div>
                <button
                  onClick={() => { setShowAddModal(false); setEditingProduct(null); }}
                  className="p-1.5 rounded hover:bg-white/5 text-[var(--muted)] hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Product Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. SR Super Match English Willow Bat"
                      className="w-full px-3.5 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Short Name (For Card Display)
                    </label>
                    <input
                      type="text"
                      value={formData.shortName}
                      onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                      placeholder="e.g. SR Super Match Bat"
                      className="w-full px-3.5 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Selling Price (₹) *
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g. 7499"
                      className="w-full px-3.5 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Original / MRP Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="e.g. 8999"
                      className="w-full px-3.5 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Stock Quantity Units *
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-3.5 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Badge Tag
                    </label>
                    <select
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full px-3 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    >
                      <option value="">No Badge</option>
                      <option value="BESTSELLER">BESTSELLER</option>
                      <option value="NEW">NEW ARRIVAL</option>
                      <option value="LIMITED">LIMITED EDITION</option>
                      <option value="VALUE PICK">VALUE PICK</option>
                      <option value="PRO GRADE">PRO GRADE</option>
                    </select>
                  </div>
                </div>

                {/* Image Selection */}
                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Image Preset / Custom URL
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2 mb-2">
                    <select
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    >
                      {PRESET_IMAGES.map((img) => (
                        <option key={img.label} value={img.url}>{img.label}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Or enter custom image path/URL"
                      className="w-full px-3 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the grain count, pick-up, blade profile, balance and target player level..."
                    className="w-full px-3.5 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                  />
                </div>

                {/* Specifications accordion block */}
                <div className="p-3.5 rounded-xl border border-[var(--border)]" style={{ background: 'var(--surface-2)' }}>
                  <div className="font-bold text-xs uppercase tracking-wider text-[var(--gold)] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Technical Specifications
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[var(--muted)] mb-0.5">Material / Grade</label>
                      <input
                        type="text"
                        value={formData.specs.material}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, material: e.target.value } })}
                        placeholder="e.g. Grade 1 English Willow"
                        className="w-full px-2.5 py-1.5 rounded text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[var(--muted)] mb-0.5">Weight / Pick-up</label>
                      <input
                        type="text"
                        value={formData.specs.weight}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, weight: e.target.value } })}
                        placeholder="e.g. 2.8 – 2.9 lb"
                        className="w-full px-2.5 py-1.5 rounded text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[var(--muted)] mb-0.5">Blade Profile</label>
                      <input
                        type="text"
                        value={formData.specs.bladeProfile}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, bladeProfile: e.target.value } })}
                        placeholder="e.g. Mid-to-Low Power Sweet Spot"
                        className="w-full px-2.5 py-1.5 rounded text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[var(--muted)] mb-0.5">Handle Construction</label>
                      <input
                        type="text"
                        value={formData.specs.handle}
                        onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, handle: e.target.value } })}
                        placeholder="e.g. 12-Piece Sarawak Cane Handle"
                        className="w-full px-2.5 py-1.5 rounded text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end gap-3 pt-3 border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); setEditingProduct(null); }}
                    className="btn btn-outline py-2 px-4 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary gold-sweep-btn py-2 px-5 text-xs flex items-center gap-1.5"
                  >
                    <Check size={14} />
                    {editingProduct ? 'Update Product' : 'Save & Publish Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingProductId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-6 rounded-2xl max-w-sm w-full text-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="w-12 h-12 rounded-full bg-red-500/15 text-red-500 flex items-center justify-center mx-auto mb-3">
                <AlertCircle size={24} />
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.3rem', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '6px' }}>
                Delete Product?
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '20px' }}>
                Are you sure you want to remove this item from the catalog? It will no longer be visible on the store.
              </p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setDeletingProductId(null)} className="btn btn-outline py-2 px-4 text-xs">
                  Cancel
                </button>
                <button onClick={handleDeleteConfirm} className="btn py-2 px-4 text-xs bg-red-600 hover:bg-red-700 text-white font-bold">
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
