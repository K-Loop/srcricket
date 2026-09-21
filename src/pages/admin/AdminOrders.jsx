import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  X,
  Printer,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Trash2,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../data/products';

const ORDER_STATUSES = [
  'All',
  'Confirmed',
  'In Factory Production',
  'Dispatched',
  'Delivered',
  'Cancelled',
];

export default function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notesEdit, setNotesEdit] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.customer?.name && o.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (o.customer?.phone && o.customer.phone.includes(searchTerm)) ||
      (o.customer?.city && o.customer.city.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setNotesEdit(order.trackingNotes || '');
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleSaveNotes = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.orderId, selectedOrder.status, notesEdit);
      setSelectedOrder({ ...selectedOrder, trackingNotes: notesEdit });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e', icon: CheckCircle2 };
      case 'Dispatched':
        return { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6', icon: Truck };
      case 'In Factory Production':
        return { bg: 'rgba(245, 169, 0, 0.15)', text: 'var(--gold)', icon: Package };
      case 'Confirmed':
        return { bg: 'rgba(168, 85, 247, 0.15)', text: '#a855f7', icon: Clock };
      case 'Cancelled':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', icon: X };
      default:
        return { bg: 'rgba(156, 163, 175, 0.15)', text: '#9ca3af', icon: Clock };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
            Store Orders & Dispatch Manager
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)' }}>
            Track order fulfillment from customer purchase through workshop crafting, quality check, and courier delivery.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div
        className="p-4 rounded-xl flex flex-col md:flex-row items-center gap-3"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID, customer name, phone, or city..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1">
          {ORDER_STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className="px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: selectedStatus === st ? 'var(--gold)' : 'var(--surface-2)',
                color: selectedStatus === st ? 'var(--bg)' : 'var(--muted)',
                border: '1px solid',
                borderColor: selectedStatus === st ? 'var(--gold)' : 'var(--border)',
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                <th className="p-3.5 uppercase font-bold tracking-wider text-[var(--muted)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Order ID & Date</th>
                <th className="p-3.5 uppercase font-bold tracking-wider text-[var(--muted)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Customer & Location</th>
                <th className="p-3.5 uppercase font-bold tracking-wider text-[var(--muted)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Items Ordered</th>
                <th className="p-3.5 uppercase font-bold tracking-wider text-[var(--muted)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Amount & Payment</th>
                <th className="p-3.5 uppercase font-bold tracking-wider text-[var(--muted)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Fulfillment Status</th>
                <th className="p-3.5 uppercase font-bold tracking-wider text-[var(--muted)] text-right" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  const Icon = badge.icon;
                  const dateStr = order.date ? new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent';

                  return (
                    <tr key={order.orderId} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      {/* ID & Date */}
                      <td className="p-3.5">
                        <div className="font-bold text-[var(--gold)]">{order.orderId}</div>
                        <div className="text-[11px] text-[var(--muted)]">{dateStr}</div>
                      </td>

                      {/* Customer */}
                      <td className="p-3.5">
                        <div className="font-bold text-[var(--text)]">{order.customer?.name || 'Customer'}</div>
                        <div className="text-[11px] text-[var(--muted)]">
                          {order.customer?.city ? `${order.customer.city}, ${order.customer.state || ''}` : 'India'}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="p-3.5">
                        <div className="text-[var(--text)]">
                          {order.items?.length > 1
                            ? `${order.items[0]?.name} + ${order.items.length - 1} more`
                            : order.items?.[0]?.name || 'Cricket Gear Item'}
                        </div>
                        <div className="text-[11px] text-[var(--muted)]">
                          Total Qty: {order.items?.reduce((sum, i) => sum + (i.qty || 1), 0) || 1}
                        </div>
                      </td>

                      {/* Total & Payment */}
                      <td className="p-3.5">
                        <div className="font-bold text-[var(--gold)]">{formatPrice(order.total)}</div>
                        <div className="text-[11px] text-green-400 font-medium">{order.paymentMethod || 'Paid (Online)'}</div>
                      </td>

                      {/* Status Selector Dropdown */}
                      <td className="p-3.5">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          className="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer"
                          style={{
                            background: badge.bg,
                            color: badge.text,
                            border: '1px solid rgba(255,255,255,0.1)',
                            fontFamily: "'Barlow Condensed', sans-serif",
                          }}
                        >
                          <option value="Confirmed" className="bg-[var(--surface-2)] text-[var(--text)]">Confirmed</option>
                          <option value="In Factory Production" className="bg-[var(--surface-2)] text-[var(--text)]">In Factory Production</option>
                          <option value="Dispatched" className="bg-[var(--surface-2)] text-[var(--text)]">Dispatched</option>
                          <option value="Delivered" className="bg-[var(--surface-2)] text-[var(--text)]">Delivered</option>
                          <option value="Cancelled" className="bg-[var(--surface-2)] text-[var(--text)]">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleOpenOrder(order)}
                          className="btn btn-outline py-1.5 px-3 text-[11px] flex items-center gap-1 inline-flex"
                        >
                          <Eye size={12} />
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--muted)]">
                    No orders found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS INSPECTOR DRAWER / MODAL */}
      <AnimatePresence>
        {selectedOrder && (
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
              {/* Header */}
              <div className="p-5 flex items-center justify-between border-b border-[var(--border)]" style={{ background: 'var(--surface-2)' }}>
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.4rem', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      Order #{selectedOrder.orderId}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: getStatusBadge(selectedOrder.status).bg,
                        color: getStatusBadge(selectedOrder.status).text,
                        fontFamily: "'Barlow Condensed', sans-serif",
                      }}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--muted)] mt-0.5">
                    Placed on: {selectedOrder.date ? new Date(selectedOrder.date).toLocaleString('en-IN') : 'Recent'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    title="Print Dispatch Invoice"
                    className="p-2 rounded hover:bg-white/5 text-[var(--muted)] hover:text-white"
                  >
                    <Printer size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 rounded hover:bg-white/5 text-[var(--muted)] hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
                {/* Customer Information Box */}
                <div className="p-4 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <div className="font-bold uppercase tracking-wider text-[var(--gold)] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Customer & Delivery Address
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="font-bold text-sm text-[var(--text)]">{selectedOrder.customer?.name || 'Customer Name'}</div>
                      <div className="flex items-center gap-1.5 text-[var(--muted)] mt-1">
                        <Phone size={12} />
                        <span>{selectedOrder.customer?.phone || 'No phone'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--muted)] mt-0.5">
                        <Mail size={12} />
                        <span>{selectedOrder.customer?.email || 'No email'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start gap-1.5 text-[var(--text)]">
                        <MapPin size={14} className="text-[var(--gold)] flex-shrink-0 mt-0.5" />
                        <span>
                          {selectedOrder.customer?.address
                            ? `${selectedOrder.customer.address}, ${selectedOrder.customer.city || ''}, ${selectedOrder.customer.state || ''} - ${selectedOrder.customer.pincode || ''}`
                            : 'Standard Delivery Address'}
                        </span>
                      </div>
                      <div className="text-[11px] text-[var(--muted)] mt-2">
                        Payment: <strong>{selectedOrder.paymentMethod || 'UPI / Card'}</strong> ({selectedOrder.paymentStatus || 'Verified'})
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div>
                  <div className="font-bold uppercase tracking-wider text-[var(--muted)] mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Order Line Items ({selectedOrder.items?.length || 0})
                  </div>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg flex items-center justify-between"
                        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden p-1 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
                            <img src={item.image || '/images/featured-bat.jpg'} alt={item.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div>
                            <div className="font-bold text-[var(--text)]">{item.name}</div>
                            <div className="text-[11px] text-[var(--muted)]">Qty: {item.qty || 1} × {formatPrice(item.price)}</div>
                          </div>
                        </div>
                        <div className="font-bold text-[var(--gold)]">
                          {formatPrice((item.price || 0) * (item.qty || 1))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary row */}
                  <div className="mt-3 p-3 rounded-lg flex items-center justify-between border-t border-[var(--border)]" style={{ background: 'var(--surface-2)' }}>
                    <span className="font-bold uppercase tracking-wider text-[var(--text)]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Total Grand Amount
                    </span>
                    <span className="font-black text-sm text-[var(--gold)]">
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </div>
                </div>

                {/* Tracking & Workshop Dispatch Notes */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Workshop Crafting & Courier Tracking Note
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={notesEdit}
                      onChange={(e) => setNotesEdit(e.target.value)}
                      placeholder="e.g. Willow cleft selected & pressed. Air AWB #88492019."
                      className="flex-1 px-3 py-2 rounded text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      className="btn btn-primary py-2 px-3 text-xs"
                    >
                      Save Note
                    </button>
                  </div>
                </div>

                {/* Status Update Quick Buttons */}
                <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-[var(--muted)] mr-1">Move Status:</span>
                    {['Confirmed', 'In Factory Production', 'Dispatched', 'Delivered'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedOrder.orderId, st)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          selectedOrder.status === st ? 'bg-[var(--gold)] text-black' : 'bg-[var(--surface-2)] text-[var(--muted)] hover:text-white'
                        }`}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      deleteOrder(selectedOrder.orderId);
                      setSelectedOrder(null);
                    }}
                    className="text-red-400 hover:text-red-300 text-[11px] flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    Delete Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
