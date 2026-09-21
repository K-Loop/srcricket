import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { SectionLabel, SectionHeading } from '../ui/UI';

export default function CategoryShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Categories to display
  const cards = [
    { id: 'Bats', label: 'Cricket Bats', tagline: 'English & Kashmir Willow', image: '/images/featured-bat.jpg', cols: 'col-span-1 md:col-span-2' },
    { id: 'Pads', label: 'Batting Pads', tagline: 'Confidence at the crease', image: '/images/pads.jpg', cols: 'col-span-1' },
    { id: 'Gloves', label: 'Batting Gloves', tagline: 'Grip & Impact Shield', image: '/images/gloves.svg', cols: 'col-span-1' },
    { id: 'Kits', label: 'Complete Kits', tagline: 'Everything in one bag', image: '/images/kit.jpg', cols: 'col-span-1 md:col-span-2' },
    { id: 'Helmets', label: 'Helmets', tagline: 'Certified safety guards', image: '/images/helmet.svg', cols: 'col-span-1' },
    { id: 'Bags', label: 'Kit Bags', tagline: 'Heavy-duty wheelies', image: '/images/bag.svg', cols: 'col-span-1' },
    { id: 'Balls', label: 'Cricket Balls', tagline: 'Match leather & practice', image: '/images/ball.svg', cols: 'col-span-1' },
    { id: 'Accessories', label: 'Accessories', tagline: 'Grips, cones & maintenance', image: '/images/accessories.svg', cols: 'col-span-1' },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(60px, 8vw, 100px) 0',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <SectionLabel className="block mb-2.5">Shop By Gear</SectionLabel>
            <SectionHeading>SHOP THE GAME</SectionHeading>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 flex-shrink-0"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              textDecoration: 'none',
            }}
          >
            View All Categories <ArrowUpRight size={15} />
          </Link>
        </motion.div>

        {/* Clean Responsive Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={card.cols}
            >
              <Link
                to={`/category/${card.id}`}
                className="relative block overflow-hidden group rounded-lg"
                style={{
                  height: '240px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
                aria-label={`Shop ${card.label}`}
              >
                {/* Background Image */}
                <img
                  src={card.image}
                  alt={card.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ opacity: 0.45 }}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0.2';
                    e.currentTarget.src = '/images/bat-grain.jpg';
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(180deg, rgba(7,7,7,0.1) 0%, rgba(7,7,7,0.88) 100%)',
                  }}
                />

                {/* Gold border on hover */}
                <div
                  className="absolute inset-0 border-2 pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-lg"
                  style={{ borderColor: 'var(--gold)' }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="transition-transform duration-300 group-hover:-translate-y-1">
                    <h3
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: '1.4rem',
                        textTransform: 'uppercase',
                        color: 'var(--text)',
                        lineHeight: 1.1,
                        marginBottom: '4px',
                      }}
                    >
                      {card.label}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.78rem',
                        color: 'var(--muted)',
                        marginBottom: '12px',
                      }}
                    >
                      {card.tagline}
                    </p>
                    <div
                      className="inline-flex items-center gap-1.5"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                      }}
                    >
                      Browse Gear <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
