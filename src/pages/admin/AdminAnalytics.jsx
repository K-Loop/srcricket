import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../data/products';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
  Package,
  ShoppingBag,
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function AdminAnalytics() {
  const { products, orders } = useProducts();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalItemsSold = orders.reduce(
    (sum, o) => sum + (o.items?.reduce((iSum, i) => iSum + (i.qty || 1), 0) || 1),
    0
  );
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const inventoryTotalValue = products.reduce((sum, p) => sum + p.price * (p.stock || 0), 0);

  // Category breakdown
  const categoryCountMap = {};
  products.forEach((p) => {
    categoryCountMap[p.category] = (categoryCountMap[p.category] || 0) + 1;
  });

  const categoryArray = Object.entries(categoryCountMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8">
      {/* Header */}
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
          Performance & Financial Analytics
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)' }}>
          Detailed metrics across workshop inventory valuation, sales breakdown, and revenue benchmarks.
        </p>
      </div>

      {/* 4 Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Total Workshop Valuation
          </div>
          <div className="font-black text-2xl text-[var(--gold)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {formatPrice(inventoryTotalValue)}
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1">Across all stock on floor</div>
        </div>

        <div className="p-5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Average Order Value
          </div>
          <div className="font-black text-2xl text-[var(--text)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {formatPrice(avgOrderValue)}
          </div>
          <div className="text-[11px] text-green-400 mt-1 font-semibold">High ticket pro gear</div>
        </div>

        <div className="p-5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Total Items Dispatched
          </div>
          <div className="font-black text-2xl text-[var(--text)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {totalItemsSold} Units
          </div>
          <div className="text-[11px] text-blue-400 mt-1 font-semibold">100% genuine player equipment</div>
        </div>

        <div className="p-5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Player Ping Rating
          </div>
          <div className="font-black text-2xl text-[var(--gold)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            4.88 / 5.0 ★
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1">From verified cricketers</div>
        </div>
      </div>

      {/* Category Breakdown & Best Selling Items */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Category Breakdown (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={18} className="text-[var(--gold)]" />
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text)' }}>
              Catalog Distribution by Category
            </h3>
          </div>

          <div className="space-y-3">
            {categoryArray.map(([cat, count]) => {
              const pct = Math.round((count / products.length) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-[var(--text)] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{cat}</span>
                    <span className="text-[var(--muted)]">{count} products ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, var(--gold), var(--orange))',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highest Rated Gear (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Award size={18} className="text-[var(--gold)]" />
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text)' }}>
              Top Flagship Products
            </h3>
          </div>

          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl flex items-center justify-between"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded overflow-hidden p-1 flex items-center justify-center bg-[var(--bg)]">
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[var(--text)] line-clamp-1">{p.name}</div>
                    <div className="text-[10px] text-[var(--gold)] font-medium">★ {p.rating || 4.8} ({p.reviewCount || 10} reviews)</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs text-[var(--gold)]">{formatPrice(p.price)}</div>
                  <div className="text-[10px] text-[var(--muted)]">{p.stock} in stock</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
