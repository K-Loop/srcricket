import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel, SectionHeading } from '../ui/UI';

const panels = [
  {
    num: '01',
    label: 'POWER & BALANCE',
    title: 'Cricket Bats',
    desc: 'Hand-selected Grade 1 English & Kashmir Willow with high spine and light balanced pickup.',
    image: '/images/bat-grain.jpg',
    to: '/category/Bats',
  },
  {
    num: '02',
    label: 'MAXIMUM PROTECTION',
    title: 'Batting Armor',
    desc: 'High-density foam pads, split-finger gloves, and titanium-reinforced helmets.',
    image: '/images/pads.jpg',
    to: '/category/Pads',
  },
  {
    num: '03',
    label: 'COMPLETE GEAR',
    title: 'Match Kits',
    desc: 'Full team and individual tournament kits with heavy-duty wheelie and duffle bags.',
    image: '/images/kit.jpg',
    to: '/category/Kits',
  },
];

export default function BrandStandard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--surface)',
        padding: 'clamp(60px, 8vw, 100px) 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <SectionLabel className="block mb-3">The SR Standard</SectionLabel>
          <SectionHeading className="text-gradient-gold" size="xl">
            Made for the game.<br />Built for players.
          </SectionHeading>
          <p
            style={{
              color: 'var(--muted)',
              marginTop: '16px',
              lineHeight: 1.65,
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
            }}
          >
            Every product in the SR Sports range is crafted for performance, durability, and raw power — because serious cricket demands equipment that never lets you down.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {panels.map((panel, i) => (
            <motion.div
              key={panel.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-lg flex flex-col justify-between"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                minHeight: '380px',
                padding: '32px 28px',
              }}
            >
              {/* Background image with overlay */}
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ opacity: 0.3 }}
              />

              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(180deg, rgba(7,7,7,0.4) 0%, rgba(7,7,7,0.92) 100%)',
                }}
              />

              {/* Gold border on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg"
                style={{ border: '2px solid var(--gold)' }}
              />

              {/* Top Tag & Number */}
              <div className="relative z-10 flex items-start justify-between">
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
                  {panel.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: '3rem',
                    color: 'rgba(245,169,0,0.2)',
                    lineHeight: 0.8,
                  }}
                >
                  {panel.num}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-12">
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.85rem',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    lineHeight: 1.1,
                    marginBottom: '10px',
                  }}
                >
                  {panel.title}
                </h3>
                <p
                  style={{
                    color: 'var(--muted)',
                    fontSize: '0.875rem',
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {panel.desc}
                </p>
                <Link
                  to={panel.to}
                  className="inline-flex items-center gap-1.5 transition-all group-hover:text-amber-300"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    textDecoration: 'none',
                  }}
                >
                  Explore Collection
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
