import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hammer,
  Plus,
  Flame,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  MessageCircle,
  Phone,
  Trash2,
  Scale,
  Gauge,
  Layers,
  Wrench
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

const PIPELINE_STAGES = [
  { id: 'selected', label: '1. Cleft Selection', icon: Flame, color: '#f59e0b' },
  { id: 'pressed', label: '2. Hydraulic Pressing', icon: Gauge, color: '#3b82f6' },
  { id: 'shaped', label: '3. Hand Carving', icon: Hammer, color: '#a855f7' },
  { id: 'handled', label: '4. Cane Splicing', icon: Wrench, color: '#ec4899' },
  { id: 'tested', label: '5. Ping & Polishing', icon: Sparkles, color: 'var(--gold)' },
  { id: 'dispatched', label: '6. Ready / Dispatched', icon: CheckCircle2, color: '#22c55e' },
];

export default function AdminManufacturing() {
  const { customBats, addCustomBatRequest, updateCustomBatStage, deleteCustomBat } = useProducts();

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    contact: '',
    playerRole: 'Top Order Batsman',
    willowType: 'Grade 1+ English Willow',
    weightRequirement: '2.85 lbs',
    sweetSpot: 'Mid-to-Low',
    handle: '12-Piece Sarawak Cane (Semi-Oval)',
    edgeThickness: '40mm',
    customEngraving: '',
    specialNotes: '',
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addCustomBatRequest(formData);
    setShowAddModal(false);
    setFormData({
      customerName: '',
      contact: '',
      playerRole: 'Top Order Batsman',
      willowType: 'Grade 1+ English Willow',
      weightRequirement: '2.85 lbs',
      sweetSpot: 'Mid-to-Low',
      handle: '12-Piece Sarawak Cane (Semi-Oval)',
      edgeThickness: '40mm',
      customEngraving: '',
      specialNotes: '',
    });
  };

  const getNextStageId = (currentStage) => {
    const idx = PIPELINE_STAGES.findIndex((s) => s.id === currentStage);
    if (idx !== -1 && idx < PIPELINE_STAGES.length - 1) {
      return PIPELINE_STAGES[idx + 1].id;
    }
    return null;
  };

  const getPrevStageId = (currentStage) => {
    const idx = PIPELINE_STAGES.findIndex((s) => s.id === currentStage);
    if (idx > 0) {
      return PIPELINE_STAGES[idx - 1].id;
    }
    return null;
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
            Custom Bat Manufacturing Pipeline
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)' }}>
            Track customized bat crafting across all 6 workshop stations in real-time.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary gold-sweep-btn py-2.5 px-4 text-xs flex items-center gap-2"
        >
          <Plus size={16} />
          Add Custom Bat Order
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {PIPELINE_STAGES.map((stage) => {
          const Icon = stage.icon;
          const stageBats = customBats.filter((cb) => cb.stage === stage.id);

          return (
            <div
              key={stage.id}
              className="flex flex-col rounded-2xl overflow-hidden min-h-[500px]"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {/* Column Header */}
              <div
                className="p-3.5 border-b border-[var(--border)] flex items-center justify-between"
                style={{ background: 'var(--surface-2)' }}
              >
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: stage.color }} />
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text)',
                    }}
                  >
                    {stage.label}
                  </span>
                </div>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--gold)' }}
                >
                  {stageBats.length}
                </span>
              </div>

              {/* Bat Cards */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                {stageBats.length > 0 ? (
                  stageBats.map((bat) => (
                    <motion.div
                      key={bat.id}
                      layout
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-3.5 rounded-xl space-y-2.5"
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }}
                    >
                      {/* Player Name & Role */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-xs text-[var(--text)]">{bat.customerName}</div>
                          <div className="text-[10px] text-[var(--gold)] font-medium">{bat.playerRole}</div>
                        </div>
                        <button
                          onClick={() => deleteCustomBat(bat.id)}
                          className="text-[var(--muted)] hover:text-red-400 p-1"
                          title="Delete card"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      {/* Specs */}
                      <div className="space-y-1 text-[11px] text-[var(--muted)] border-t border-[var(--border)] pt-2">
                        <div className="flex items-center justify-between">
                          <span>Willow:</span>
                          <strong className="text-[var(--text)]">{bat.willowType?.split(' ')[0]} {bat.willowType?.split(' ')[1]}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Target Weight:</span>
                          <strong className="text-[var(--gold)]">{bat.weightRequirement}</strong>
                        </div>
                        {bat.customEngraving && bat.customEngraving !== 'None' && (
                          <div className="flex items-center justify-between">
                            <span>Engraving:</span>
                            <span className="font-mono text-[10px] bg-white/5 px-1 rounded text-white">{bat.customEngraving}</span>
                          </div>
                        )}
                        {bat.specialNotes && (
                          <div className="text-[10px] text-zinc-400 italic line-clamp-2 mt-1">
                            "{bat.specialNotes}"
                          </div>
                        )}
                      </div>

                      {/* Contact and Stage controls */}
                      <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                        {bat.contact && (
                          <a
                            href={`https://wa.me/?text=Hello%20${encodeURIComponent(bat.customerName)},%20your%20custom%20SR%20Sports%20bat%20is%20now%20in%20${stage.label}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25"
                            title="Chat with cricketer on WhatsApp"
                          >
                            <MessageCircle size={13} />
                          </a>
                        )}

                        <div className="flex items-center gap-1">
                          {getPrevStageId(bat.stage) && (
                            <button
                              onClick={() => updateCustomBatStage(bat.id, getPrevStageId(bat.stage))}
                              className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 hover:bg-white/10 text-[var(--muted)]"
                              title="Move to previous workshop station"
                            >
                              ←
                            </button>
                          )}
                          {getNextStageId(bat.stage) && (
                            <button
                              onClick={() => updateCustomBatStage(bat.id, getNextStageId(bat.stage))}
                              className="px-2 py-0.5 rounded text-[10px] bg-[var(--gold)]/20 hover:bg-[var(--gold)]/30 text-[var(--gold)] font-bold flex items-center gap-0.5"
                              title="Advance to next workshop station"
                            >
                              Next →
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-28 flex items-center justify-center text-[11px] text-[var(--muted)] text-center p-2">
                    Station idle. No bats currently in this stage.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD CUSTOM BAT MODAL */}
      <AnimatePresence>
        {showAddModal && (
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
              className="w-full max-w-lg rounded-2xl overflow-hidden my-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="p-5 border-b border-[var(--border)] flex items-center justify-between" style={{ background: 'var(--surface-2)' }}>
                <div className="flex items-center gap-2">
                  <Hammer size={18} className="text-[var(--gold)]" />
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text)' }}>
                    Add Custom Bat Order to Workshop
                  </h3>
                </div>
                <button onClick={() => setShowAddModal(false)} className="text-[var(--muted)] hover:text-white">
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Cricketer Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Jasprit Bumrah"
                      className="w-full px-3 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full px-3 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Willow Type</label>
                    <select
                      value={formData.willowType}
                      onChange={(e) => setFormData({ ...formData, willowType: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
                    >
                      <option value="Grade 1+ English Willow">Grade 1+ English Willow</option>
                      <option value="Grade 1 English Willow">Grade 1 English Willow</option>
                      <option value="Grade 2 English Willow">Grade 2 English Willow</option>
                      <option value="Grade A Kashmir Willow">Grade A Kashmir Willow</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Target Weight</label>
                    <input
                      type="text"
                      value={formData.weightRequirement}
                      onChange={(e) => setFormData({ ...formData, weightRequirement: e.target.value })}
                      placeholder="e.g. 2.85 lbs (1160g)"
                      className="w-full px-3 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Laser Engraving</label>
                  <input
                    type="text"
                    value={formData.customEngraving}
                    onChange={(e) => setFormData({ ...formData, customEngraving: e.target.value })}
                    placeholder="e.g. JB-BOOM #93"
                    className="w-full px-3 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[var(--muted)] mb-1">Special Workshop Notes</label>
                  <textarea
                    rows={2}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="e.g. Duckbill profile with 42mm monster edges."
                    className="w-full px-3 py-2 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline py-2 px-3 text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary py-2 px-4 text-xs">
                    Queue In Workshop
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
