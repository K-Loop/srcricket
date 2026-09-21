import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import {
  Save,
  RotateCcw,
  Bell,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function AdminSettings() {
  const { settings, updateSettings, resetProducts } = useProducts();

  const [form, setForm] = useState({
    storeName: settings.storeName || 'SR Sports Cricket',
    tagline: settings.tagline || 'Direct Workshop Bat Manufacturing & Pro Gear',
    announcementText: settings.announcementText || '🏏 Factory Direct Dispatch: Free Knocking-in & Oiling on all English Willow Bats!',
    announcementActive: settings.announcementActive !== undefined ? settings.announcementActive : true,
    contactPhone: settings.contactPhone || '+91 98765 43210',
    whatsappNumber: settings.whatsappNumber || '919876543210',
    factoryAddress: settings.factoryAddress || 'SR Sports Manufacturing Unit, Industrial Area Phase II, Meerut / Jalandhar Highway, India',
    lowStockThreshold: settings.lowStockThreshold || 5,
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset all products and orders to original factory demo data? Any custom products you added will be refreshed.')) {
      resetProducts();
      alert('Catalog has been reset to factory defaults.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
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
          Store & Factory Workshop Settings
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)' }}>
          Configure live store announcements, factory hotline numbers, and low inventory alert thresholds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Storefront Announcement Banner Block */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-[var(--gold)]" />
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text)' }}>
              Top Announcement Banner
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="announcementActive"
                checked={form.announcementActive}
                onChange={(e) => setForm({ ...form, announcementActive: e.target.checked })}
                className="w-4 h-4 accent-[var(--gold)] rounded cursor-pointer"
              />
              <label htmlFor="announcementActive" className="font-bold text-[var(--text)] uppercase cursor-pointer" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Enable Announcement Bar on Storefront
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Banner Message</label>
              <input
                type="text"
                value={form.announcementText}
                onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
              />
            </div>
          </div>
        </div>

        {/* Contact & Workshop Hotline */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Phone size={18} className="text-[var(--gold)]" />
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text)' }}>
              Factory & WhatsApp Direct Contact
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Factory Phone</label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">WhatsApp Business ID</label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Factory Workshop Address</label>
              <input
                type="text"
                value={form.factoryAddress}
                onChange={(e) => setForm({ ...form, factoryAddress: e.target.value })}
                className="w-full px-3.5 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Inventory Thresholds */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-[var(--gold)]" />
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text)' }}>
              Inventory Stock Control
            </h3>
          </div>

          <div className="text-xs">
            <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Low Stock Warning Threshold (Units)</label>
            <input
              type="number"
              min="1"
              max="50"
              value={form.lowStockThreshold}
              onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) || 5 })}
              className="w-48 px-3.5 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={handleResetCatalog}
            className="btn btn-outline text-xs flex items-center gap-1.5 text-amber-400 border-amber-400/30 hover:bg-amber-400/10"
          >
            <RotateCcw size={13} />
            Reset Factory Defaults
          </button>

          <button
            type="submit"
            className="btn btn-primary gold-sweep-btn py-3 px-6 text-xs flex items-center gap-2"
          >
            {saved ? (
              <>
                <CheckCircle2 size={16} className="text-black" />
                Settings Saved!
              </>
            ) : (
              <>
                <Save size={16} />
                Save Store Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
