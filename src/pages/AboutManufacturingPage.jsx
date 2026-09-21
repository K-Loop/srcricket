import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Hammer,
  ShieldCheck,
  Flame,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Check,
  Layers,
  Wrench,
  Gauge,
  Send,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Sliders,
  Scale,
  Zap,
  Info
} from 'lucide-react';
import { SectionHeading, SectionLabel } from '../components/ui/UI';
import TrustStrip from '../components/home/TrustStrip';
import { useProducts } from '../context/ProductContext';

const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Cleft Sourcing & Natural Seasoning',
    subtitle: 'From English & Kashmir Forests to the Workshop',
    icon: Flame,
    badge: 'STAGE 01',
    description:
      'Every SR Sports bat begins with hand-selected willow clefts. Our master wood scouts inspect harvest batches in England (Salix Alba Caerulea) and Kashmir. Clefts undergo natural air seasoning for 6–12 months in controlled humidity to achieve the golden 10–12% moisture content.',
    specs: [
      { label: 'Wood Origin', val: 'Suffolk (UK) & Anantnag (Kashmir)' },
      { label: 'Moisture Target', val: '10.5% – 11.8% Calibrated' },
      { label: 'Seasoning Time', val: '6 to 12 Months Slow Air-Cure' },
      { label: 'Inspection Rate', val: 'Only top 15% clefts selected' },
    ],
    highlight: 'No artificial kiln drying that weakens timber resilience.',
    image: '/images/bat-grain.jpg',
  },
  {
    id: 2,
    title: 'Hand Grading & Grain Mapping',
    subtitle: 'Acoustic Tap & Grain Density Analysis',
    icon: Layers,
    badge: 'STAGE 02',
    description:
      'Our senior batmakers conduct acoustic tap resonance tests on each unpressed cleft. We measure grain straightness, count, and heartwood-to-sapwood ratio to classify clefts into Grade 1+, Grade 1, Grade 2, and Kashmir Pro editions.',
    specs: [
      { label: 'Grade 1+ Grains', val: '8 – 14 Straight & Parallel' },
      { label: 'Acoustic Ping', val: 'High-frequency bell resonance' },
      { label: 'Density Map', val: 'Optimal power-to-weight balance' },
      { label: 'Defect Tolerance', val: 'Zero pin-knot in hitting zone' },
    ],
    highlight: 'Each cleft is laser-scanned for internal node integrity.',
    image: '/images/featured-bat.jpg',
  },
  {
    id: 3,
    title: 'Hydraulic Multi-Roller Compression',
    subtitle: 'Calibrated Compaction Without Dead Spots',
    icon: Gauge,
    badge: 'STAGE 03',
    description:
      'Pressing is where art meets engineering. Using a custom multi-roller hydraulic press, we apply precision pressure calibrated to the willow density. This hardens the outer wood fibres to resist leather ball impact while preserving the sponge-like trampoline sweet spot.',
    specs: [
      { label: 'Pressure Range', val: '2.5 to 3.8 Bar Calibrated' },
      { label: 'Roller Passes', val: '4 progressive gradient passes' },
      { label: 'Surface Hardness', val: 'Janka Rating 480–520' },
      { label: 'Rebound Coefficient', val: '0.88 COR High Spring' },
    ],
    highlight: 'Individually pressed based on wood softness, never mass-compressed.',
    image: '/images/workshop.jpg',
  },
  {
    id: 4,
    title: 'Master Carver Shaping & Profiling',
    subtitle: 'Hand-Sculpted Using Traditional Drawknives',
    icon: Hammer,
    badge: 'STAGE 04',
    description:
      'With traditional hand drawknives, spokeshaves, and wooden planes, our master craftsmen carve the spine, edges, and concave profile according to player specifications. The weight distribution is balanced to the milligram for a featherlight pick-up.',
    specs: [
      { label: 'Edge Thickness', val: '38mm to 43mm Monster Edges' },
      { label: 'Spine Height', val: '64mm to 68mm High Spine' },
      { label: 'Profile Options', val: 'Full, Duckbill, Mid-Low, Scalloped' },
      { label: 'Weight Precision', val: '± 5 grams exact match' },
    ],
    highlight: 'Featherlight pick-up achieved through master hollow-ground shaping.',
    image: '/images/bat2.jpg',
  },
  {
    id: 5,
    title: 'Sarawak Cane Handle & Spring Dampening',
    subtitle: '12-Piece Cane Construction with Rubber Shock Absorbers',
    icon: Wrench,
    badge: 'STAGE 05',
    description:
      'We splice a premium 12-piece Sarawak cane handle with 3 high-rebound rubber shock-absorbing springs into the blade using aerospace-grade adhesive. The handle is then tightly bound with high-tensile nylon-twine for zero sting on miss-hits.',
    specs: [
      { label: 'Cane Material', val: 'Imported Sarawak / Singapore Cane' },
      { label: 'Construction', val: '12-Piece Multi-laminate' },
      { label: 'Shock Dampeners', val: '3 High-elasticity rubber inserts' },
      { label: 'Splice Geometry', val: 'Deep V-Splice for torque transfer' },
    ],
    highlight: 'Zero hand vibration even on 145km/h fast bowling impacts.',
    image: '/images/workshop.jpg',
  },
  {
    id: 6,
    title: 'Velvet Sanding, Bone Polishing & Ping Certification',
    subtitle: 'Hand-Buffed Finish & Professional Soundwave Verification',
    icon: Sparkles,
    badge: 'STAGE 06',
    description:
      'The bat is smoothed across 5 grades of fine sandpaper down to 600-grit velvet texture, rubbed with authentic natural cow bone to compress surface wood cells, and finished with organic linseed wax. Every bat passes a mallet rebound test before getting its serial certificate.',
    specs: [
      { label: 'Grit Progression', val: '120 → 240 → 320 → 400 → 600 Grit' },
      { label: 'Surface Treatment', val: 'Natural Bone Burnish & Linseed Wax' },
      { label: 'Mallet Test', val: '30-point acoustic sweet-spot grid' },
      { label: 'Certification', val: 'Serialized SR Hologram & Spec Card' },
    ],
    highlight: 'Every finished bat is hand-signed and ping-tested by our chief maker.',
    image: '/images/featured-bat.jpg',
  },
];

const GEAR_MANUFACTURING = [
  {
    title: 'Batting Pads & Guards',
    desc: 'Thermo-formed high-density Plastazote foam with carbon-fibre shin bolsters and ergonomic knee cups for lightweight 360° protection.',
    tag: 'PADS & PROTECTION',
    img: '/images/pads.jpg',
    features: ['High-density molded foam', 'Breathable mesh air-channels', 'Quick-release secure Velcro straps'],
  },
  {
    title: 'Pro Batting Gloves',
    desc: 'Supple Pittards leather palms with split-finger sausage casing, fiber-shield inserts on leading fingers, and sweat-wicking towelling cuffs.',
    tag: 'GLOVES & IMPACT',
    img: '/images/gloves.svg',
    features: ['Pittards English leather palm', 'High-impact fiber shields', '3D air-mesh airflow vents'],
  },
  {
    title: 'Titanium Helmets & Bags',
    desc: 'High-tensile ABS shell with titanium lightweight visor alongside heavy-duty 1680D Cordura kit bags built for rigorous national tour travels.',
    tag: 'HELMETS & LUGGAGE',
    img: '/images/kit.jpg',
    features: ['Titanium alloy grille', 'Heavy-duty 1680D Cordura', 'Reinforced dual tractor wheels'],
  },
];

const COMPARISON = [
  { feature: 'Manufacturing Source', sr: 'Own Factory Workshop (Meerut & Jalandhar)', retail: 'Third-party outsourced factories' },
  { feature: 'Pricing Mechanism', sr: 'Direct Factory Price (0 Middlemen markups)', retail: '50%–100% distributor & retailer margins' },
  { feature: 'Custom Weight & Balance', sr: 'Custom made to exact gram and handle shape', retail: 'Fixed off-the-shelf inventory only' },
  { feature: 'Willow Inspection', sr: '100% hand-graded clefts with acoustic tap test', retail: 'Bulk machine grading by external vendors' },
  { feature: 'Free Factory Knocking-in', sr: 'Included: 10,000 mallet presses + linseed oiling', retail: 'Extra ₹1,500 – ₹2,500 charge or none' },
  { feature: 'Direct Maker Consultation', sr: 'Speak directly with our master batmakers', retail: 'Shop floor sales staff with generic knowledge' },
];

export default function AboutManufacturingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [customForm, setCustomForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    playerRole: 'Top Order Batsman',
    willowType: 'Grade 1 English Willow',
    weightRequirement: '2.85 lbs',
    sweetSpot: 'Mid-to-Low',
    handle: '12-Piece Sarawak Cane (Semi-Oval)',
    edgeThickness: '40mm',
    customEngraving: '',
    specialNotes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { addCustomBatRequest } = useProducts();

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      addCustomBatRequest({
        customerName: customForm.customerName,
        contact: `${customForm.phone} | ${customForm.email}`,
        playerRole: customForm.playerRole,
        willowType: customForm.willowType,
        weightRequirement: customForm.weightRequirement,
        sweetSpot: customForm.sweetSpot,
        handle: customForm.handle,
        edgeThickness: customForm.edgeThickness,
        customEngraving: customForm.customEngraving || 'None',
        specialNotes: customForm.specialNotes || 'Direct custom order from Manufacturing page.',
      });
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello SR Sports Workshop! I am interested in a Custom Bat order:\n• Name: ${customForm.customerName || 'Cricket Player'}\n• Willow: ${customForm.willowType}\n• Weight: ${customForm.weightRequirement}\n• Profile: ${customForm.sweetSpot}\n• Handle: ${customForm.handle}`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  const currentStepData = PROCESS_STEPS[activeStep];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg)' }}
    >
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(60px, 8vw, 110px) clamp(16px, 4vw, 48px)',
        }}
      >
        {/* Subtle decorative glow */}
        <div
          className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(245,169,0,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
          {/* Top Pill */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs"
              style={{
                background: 'rgba(245, 169, 0, 0.12)',
                border: '1px solid rgba(245, 169, 0, 0.3)',
                color: 'var(--gold)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <Flame size={13} />
              OWN MANUFACTURING & DIRECT WORKSHOP
            </span>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                color: '#22c55e',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Workshop Active • 40+ Bats Crafted Daily
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left text */}
            <div className="lg:col-span-7">
              <h1
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
                  lineHeight: 0.96,
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  marginBottom: '24px',
                  letterSpacing: '-0.02em',
                }}
              >
                CRAFTED FROM THE CLEFT.{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--orange) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'block',
                  }}
                >
                  ENGINEERED FOR POWER.
                </span>
              </h1>

              <p
                style={{
                  color: 'var(--muted)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                  lineHeight: 1.7,
                  maxWidth: '620px',
                  marginBottom: '32px',
                }}
              >
                SR Sports operates our own dedicated batmaking workshops in Meerut and Jalandhar.
                From sourcing timber directly in the UK and Kashmir to hand-carving custom shapes, we cut out middlemen
                to give you test-match quality at honest, direct-from-factory prices.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#six-stage-process"
                  className="btn btn-primary gold-sweep-btn"
                  style={{ padding: '14px 28px' }}
                >
                  <Hammer size={16} />
                  See Manufacturing Process
                </a>
                <a
                  href="#custom-bat-builder"
                  className="btn btn-outline"
                  style={{ padding: '13px 24px' }}
                >
                  <Sliders size={16} />
                  Build Custom Bat
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5">
              <div
                className="p-6 sm:p-8 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
                }}
              >
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full"
                  style={{ background: 'rgba(245,169,0,0.1)', filter: 'blur(30px)' }}
                />

                <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-6">
                  <div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: '1.2rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--text)',
                      }}
                    >
                      SR Factory Heritage
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'var(--gold)' }}>
                      EST. 2011 • ZERO MIDDLEMEN GUARANTEE
                    </div>
                  </div>
                  <Award size={32} style={{ color: 'var(--gold)' }} />
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Raw Material Selection', detail: 'Grade 1+ English & Grade A Kashmir Willow clefts only' },
                    { label: 'Pressing Method', detail: 'Hydraulic multi-roller progressive compaction (No dead spots)' },
                    { label: 'Handle Construction', detail: '12-piece Sarawak cane with triple rubber dampeners' },
                    { label: 'Knocking & Oiling', detail: 'Complimentary 10,000 mallet presses included' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(245,169,0,0.15)', color: 'var(--gold)' }}
                      >
                        <Check size={12} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', textTransform: 'uppercase' }}>
                          {item.label}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--muted)' }}>
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.85rem', color: 'var(--muted)' }}
                >
                  <span>Inspection Standard: <strong>ISO 9001:2015</strong></span>
                  <span className="text-[var(--gold)] font-bold">100% PING TESTED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '36px clamp(16px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '25,000+', lbl: 'BATS CRAFTED TO DATE', sub: 'Tested in competitive match play' },
              { val: '100%', lbl: 'HAND-GRADED TIMBER', sub: 'Every single cleft sound-tested' },
              { val: '15+', lbl: 'MASTER BATMAKERS', sub: 'Averaging 20+ years craftsmanship' },
              { val: '0%', lbl: 'MIDDLEMEN MARKUPS', sub: 'Factory direct savings for players' },
            ].map((st, i) => (
              <div key={i} className="p-4">
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}
                >
                  {st.val}
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    marginBottom: '4px',
                  }}
                >
                  {st.lbl}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--muted)' }}>
                  {st.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-STAGE MANUFACTURING PROCESS DEEP DIVE */}
      <section
        id="six-stage-process"
        style={{
          padding: 'clamp(70px, 9vw, 120px) clamp(16px, 4vw, 48px)',
          background: 'var(--bg)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel className="block mb-3">Master Craftsmanship</SectionLabel>
            <SectionHeading>THE 6-STAGE BATMAKING JOURNEY</SectionHeading>
            <p style={{ color: 'var(--muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', marginTop: '14px', lineHeight: 1.6 }}>
              From a raw timber block in the seasoned cleft yard to a laser-balanced, soundwave-tested match bat.
              Click through the stages below to explore our proprietary workshop methods.
            </p>
          </div>

          {/* Interactive Steps Navigation Rail */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className="p-3.5 text-left rounded-xl transition-all relative overflow-hidden"
                  style={{
                    background: isActive ? 'var(--surface-2)' : 'var(--surface)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--gold)' : 'var(--border)',
                    boxShadow: isActive ? '0 8px 24px rgba(245,169,0,0.15)' : 'none',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        letterSpacing: '0.15em',
                        color: isActive ? 'var(--gold)' : 'var(--muted)',
                      }}
                    >
                      {step.badge}
                    </span>
                    <Icon size={16} style={{ color: isActive ? 'var(--gold)' : 'var(--muted)' }} />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      lineHeight: 1.2,
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--text)' : 'var(--muted)',
                    }}
                  >
                    {step.title.split('&')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Display Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepData.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              <div className="grid lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                {/* Visual side */}
                <div className="lg:col-span-5 relative">
                  <div
                    className="rounded-xl overflow-hidden relative"
                    style={{
                      aspectRatio: '4/3',
                      background: 'var(--surface-2)',
                      border: '1px solid rgba(245,169,0,0.2)',
                    }}
                  >
                    <img
                      src={currentStepData.image}
                      alt={currentStepData.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(7,7,7,0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(245,169,0,0.3)',
                      }}
                    >
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>
                        SR FACTORY STAGE #{currentStepData.id}
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-4 p-3.5 rounded-lg flex items-center gap-3"
                    style={{ background: 'rgba(245,169,0,0.06)', border: '1px solid rgba(245,169,0,0.2)' }}
                  >
                    <Zap size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--text)' }}>
                      <strong>Craftsman Secret:</strong> {currentStepData.highlight}
                    </span>
                  </div>
                </div>

                {/* Info side */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {currentStepData.badge} • MASTER PROTOCOL
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                      textTransform: 'uppercase',
                      lineHeight: 1.1,
                      color: 'var(--text)',
                      marginBottom: '8px',
                    }}
                  >
                    {currentStepData.title}
                  </h3>

                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '18px' }}>
                    {currentStepData.subtitle}
                  </div>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      color: 'var(--muted)',
                      marginBottom: '24px',
                    }}
                  >
                    {currentStepData.description}
                  </p>

                  {/* Specifications Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {currentStepData.specs.map((sp, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg"
                        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                      >
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                          {sp.label}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', marginTop: '2px' }}>
                          {sp.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Step navigation buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <button
                      onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1))}
                      className="text-xs uppercase font-bold tracking-wider text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      ← Previous Stage
                    </button>
                    <button
                      onClick={() => setActiveStep((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0))}
                      className="text-xs uppercase font-bold tracking-wider text-[var(--gold)] hover:text-[var(--gold-bright)] transition-colors flex items-center gap-1"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Next Stage →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* PROTECTION GEAR & KIT MANUFACTURING SHOWCASE */}
      <section
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel className="block mb-3">Complete Player Protection</SectionLabel>
            <SectionHeading>OUR PROTECTIVE GEAR & KIT FACILITY</SectionHeading>
            <p style={{ color: 'var(--muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', marginTop: '12px' }}>
              We don't just craft bats. Our stitching and impact laboratory produces test-grade batting pads, gloves, helmets, and heavy-duty tour bags.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {GEAR_MANUFACTURING.map((gear, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden flex flex-col justify-between"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="p-6">
                  <div className="h-44 rounded-lg overflow-hidden mb-6 flex items-center justify-center p-4" style={{ background: 'var(--bg)' }}>
                    <img src={gear.img} alt={gear.title} className="max-h-full max-w-full object-contain" />
                  </div>

                  <span
                    className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider mb-2"
                    style={{
                      background: 'rgba(245,169,0,0.12)',
                      color: 'var(--gold)',
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    {gear.tag}
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.4rem',
                      textTransform: 'uppercase',
                      color: 'var(--text)',
                      marginBottom: '8px',
                    }}
                  >
                    {gear.title}
                  </h3>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {gear.desc}
                  </p>

                  <div className="space-y-2 border-t border-[var(--border)] pt-4">
                    {gear.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text)' }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--gold)' }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACTORY DIRECT VS RETAILERS COMPARISON */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 48px)',
          background: 'var(--bg)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel className="block mb-3">Transparency</SectionLabel>
            <SectionHeading>WHY OWN MANUFACTURING MATTERS</SectionHeading>
            <p style={{ color: 'var(--muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', marginTop: '12px' }}>
              When you purchase directly from the SR Sports factory workshop, you bypass retail markups and get custom specifications crafted specifically for your playing style.
            </p>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                    <th className="p-4 sm:p-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                      CRITERIA / BENEFIT
                    </th>
                    <th className="p-4 sm:p-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      SR SPORTS FACTORY DIRECT
                    </th>
                    <th className="p-4 sm:p-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                      TYPICAL CRICKET RETAILERS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {COMPARISON.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-sm" style={{ color: 'var(--text)' }}>
                        {row.feature}
                      </td>
                      <td className="p-4 sm:p-5 text-sm" style={{ color: 'var(--gold-bright)' }}>
                        <div className="flex items-center gap-2">
                          <Check size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                          <span>{row.sr}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-sm" style={{ color: 'var(--muted)' }}>
                        {row.retail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CUSTOM BAT CONFIGURATOR & WORKSHOP INQUIRY */}
      <section
        id="custom-bat-builder"
        style={{
          padding: 'clamp(60px, 8vw, 110px) clamp(16px, 4vw, 48px)',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left intro */}
            <div className="lg:col-span-5">
              <SectionLabel className="block mb-3">Custom Workshop Queue</SectionLabel>
              <SectionHeading>HAVE YOUR BAT CRAFTED BY MASTER HANDS</SectionHeading>

              <p
                style={{
                  color: 'var(--muted)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  marginTop: '16px',
                  marginBottom: '24px',
                }}
              >
                Specify your exact requirements: willow type, preferred weight down to the gram, sweet-spot placement, and custom name laser engraving.
                Your request enters our master batmaker queue directly.
              </p>

              <div className="space-y-3 mb-8">
                <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <Scale size={20} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--text)' }}>
                      Precision Weight Matching
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--muted)' }}>
                      Weights customized from 2.7 lbs (featherlight) to 3.0+ lbs (monster cannon).
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <Sparkles size={20} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--text)' }}>
                      Free Custom Laser Engraving
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--muted)' }}>
                      Personalize your bat with your name and jersey number on the back spine.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp trigger */}
              <div className="p-5 rounded-xl border border-[rgba(245,169,0,0.3)]" style={{ background: 'rgba(245,169,0,0.05)' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.05rem', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '6px' }}>
                  Prefer Direct Batmaker WhatsApp Chat?
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '14px' }}>
                  Send videos of your batting stance or discuss custom specifications with our workshop head.
                </p>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="btn w-full flex items-center justify-center gap-2"
                  style={{ background: '#25D366', color: '#000', fontWeight: 800 }}
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp: +91 98765 43210
                </button>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div
                className="p-6 sm:p-8 rounded-2xl"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}
                    >
                      <CheckCircle2 size={36} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: '1.8rem',
                        textTransform: 'uppercase',
                        color: 'var(--text)',
                        marginBottom: '8px',
                      }}
                    >
                      Custom Specification Queued!
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--muted)', maxWidth: '420px', margin: '0 auto 24px' }}>
                      Thank you, <strong>{customForm.customerName}</strong>. Your custom bat request has been logged into our factory master craftsman dashboard. We will call/WhatsApp you within 24 hours with wood cleft photos.
                    </p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setCustomForm({
                            customerName: '',
                            phone: '',
                            email: '',
                            playerRole: 'Top Order Batsman',
                            willowType: 'Grade 1 English Willow',
                            weightRequirement: '2.85 lbs',
                            sweetSpot: 'Mid-to-Low',
                            handle: '12-Piece Sarawak Cane (Semi-Oval)',
                            edgeThickness: '40mm',
                            customEngraving: '',
                            specialNotes: '',
                          });
                        }}
                        className="btn btn-outline"
                      >
                        Submit Another Request
                      </button>
                      <button onClick={handleWhatsAppInquiry} className="btn btn-primary">
                        Follow up on WhatsApp
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCustomSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Your Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={customForm.customerName}
                          onChange={(e) => setCustomForm({ ...customForm, customerName: e.target.value })}
                          placeholder="e.g., Rohit Sharma"
                          className="w-full px-3.5 py-2.5 rounded text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Phone / WhatsApp *
                        </label>
                        <input
                          required
                          type="tel"
                          value={customForm.phone}
                          onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={customForm.email}
                          onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                          placeholder="player@cricket.com"
                          className="w-full px-3.5 py-2.5 rounded text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Player Style / Role
                        </label>
                        <select
                          value={customForm.playerRole}
                          onChange={(e) => setCustomForm({ ...customForm, playerRole: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                        >
                          <option value="Top Order Batsman (Technique & Timing)">Top Order Batsman (Technique & Timing)</option>
                          <option value="Middle Order Attacker (Aggressive strokeplay)">Middle Order Attacker (Aggressive strokeplay)</option>
                          <option value="Power Finisher (T20 / Hard Hitter)">Power Finisher (T20 / Hard Hitter)</option>
                          <option value="All-Rounder (Balanced pick-up)">All-Rounder (Balanced pick-up)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Willow Choice
                        </label>
                        <select
                          value={customForm.willowType}
                          onChange={(e) => setCustomForm({ ...customForm, willowType: e.target.value })}
                          className="w-full px-3 py-2.5 rounded text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                        >
                          <option value="Grade 1+ English Willow">Grade 1+ English Willow</option>
                          <option value="Grade 1 English Willow">Grade 1 English Willow</option>
                          <option value="Grade 2 English Willow">Grade 2 English Willow</option>
                          <option value="Grade A Kashmir Willow">Grade A Kashmir Willow</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Desired Weight
                        </label>
                        <select
                          value={customForm.weightRequirement}
                          onChange={(e) => setCustomForm({ ...customForm, weightRequirement: e.target.value })}
                          className="w-full px-3 py-2.5 rounded text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                        >
                          <option value="2.70 – 2.78 lbs (Ultra Light)">2.70 – 2.78 lbs (Ultra Light)</option>
                          <option value="2.80 – 2.85 lbs (Balanced Match)">2.80 – 2.85 lbs (Balanced Match)</option>
                          <option value="2.88 – 2.95 lbs (Power Blade)">2.88 – 2.95 lbs (Power Blade)</option>
                          <option value="3.00+ lbs (Heavy Artillery)">3.00+ lbs (Heavy Artillery)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Sweet Spot Profile
                        </label>
                        <select
                          value={customForm.sweetSpot}
                          onChange={(e) => setCustomForm({ ...customForm, sweetSpot: e.target.value })}
                          className="w-full px-3 py-2.5 rounded text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                        >
                          <option value="Mid-to-Low (Indian Pitches)">Mid-to-Low (Indian Pitches)</option>
                          <option value="Mid Sweet Spot (All-Round)">Mid Sweet Spot (All-Round)</option>
                          <option value="Mid-to-High (Bouncy Tracks)">Mid-to-High (Bouncy Tracks)</option>
                          <option value="Full Extended Spine">Full Extended Spine</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Handle & Edge Specs
                        </label>
                        <select
                          value={customForm.handle}
                          onChange={(e) => setCustomForm({ ...customForm, handle: e.target.value })}
                          className="w-full px-3 py-2.5 rounded text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                        >
                          <option value="12-Piece Cane (Semi-Oval)">12-Piece Cane (Semi-Oval)</option>
                          <option value="12-Piece Cane (Round)">12-Piece Cane (Round)</option>
                          <option value="12-Piece Cane (Full Oval - Extra Control)">12-Piece Cane (Full Oval)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Custom Laser Engraving Name
                        </label>
                        <input
                          type="text"
                          value={customForm.customEngraving}
                          onChange={(e) => setCustomForm({ ...customForm, customEngraving: e.target.value })}
                          placeholder="e.g. VIRAT #18"
                          className="w-full px-3.5 py-2.5 rounded text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold tracking-wider text-[var(--muted)] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Additional Notes / Specific Requests
                      </label>
                      <textarea
                        rows={2}
                        value={customForm.specialNotes}
                        onChange={(e) => setCustomForm({ ...customForm, specialNotes: e.target.value })}
                        placeholder="e.g., Duckbill toe tapering, pre-knocked with extra linseed oil, or specific edge thickness."
                        className="w-full px-3.5 py-2 rounded text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--gold)]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary w-full py-3.5 flex items-center justify-center gap-2 gold-sweep-btn text-sm"
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-gold w-4 h-4 inline-block" />
                          Logging Custom Request with Factory Queue...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Submit Custom Bat Order to Workshop
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACTORY LOCATION & WORKSHOP CONTACT */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 90px) clamp(16px, 4vw, 48px)',
          background: 'var(--bg)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <MapPin size={24} style={{ color: 'var(--gold)', marginBottom: '12px' }} />
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '6px' }}>
                Workshop & Factory
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                SR Sports Manufacturing Unit 1 & Cleft Seasoning Yard,<br />
                Industrial Area Phase II, Meerut / Jalandhar Highway,<br />
                India
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <Clock size={24} style={{ color: 'var(--gold)', marginBottom: '12px' }} />
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '6px' }}>
                Working Hours
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Monday to Saturday: 9:00 AM – 7:30 PM<br />
                Master Batmaker Consultations: 10:00 AM – 5:00 PM<br />
                Sunday: Closed for Wood Seasoning
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <Phone size={24} style={{ color: 'var(--gold)', marginBottom: '12px' }} />
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '6px' }}>
                Direct Contact
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Factory Desk: +91 98765 43210<br />
                WhatsApp Bat Specialist: +91 91987 65432<br />
                Email: workshop@srsportscricket.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />
    </motion.main>
  );
}
