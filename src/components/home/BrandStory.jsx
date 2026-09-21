import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/UI';

const stats = [
  { label: 'Own Manufacturing', icon: '◈' },
  { label: 'Cricket Specialists', icon: '◈' },
  { label: 'Player Focused', icon: '◈' },
];

export default function BrandStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--surface)',
        padding: 'clamp(64px, 10vw, 120px) clamp(16px, 4vw, 48px)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src="/images/workshop.jpg"
              alt="SR Sports Cricket bat manufacturing workshop"
              className="w-full object-cover"
              style={{ aspectRatio: '4/3', maxHeight: '480px' }}
              loading="lazy"
            />

            {/* Gold border accent */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: '16px',
                left: '16px',
                right: '-16px',
                bottom: '-16px',
                border: '1px solid rgba(245,169,0,0.3)',
                zIndex: -1,
              }}
            />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="section-label block mb-5">The SR Story</span>

            <SectionHeading className="mb-6">
              FROM THE WORKSHOP
              <br />
              <span className="text-gradient-gold">TO YOUR CREASE.</span>
            </SectionHeading>

            <p
              style={{
                color: 'var(--muted)',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                marginBottom: '16px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              SR Sports Cricket was built around a simple belief: cricket players deserve equipment that performs as hard as they train.
            </p>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                marginBottom: '40px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              From raw willow to finished bat, every product in our range reflects a commitment to cricket — developed through experience, built for players who demand dependable equipment every innings.
            </p>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-4 mb-10"
              style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: '1.6rem',
                      color: 'var(--gold)',
                      lineHeight: 1,
                      marginBottom: '8px',
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              id="brand-story-btn"
              to="/shop"
              className="btn btn-outline"
            >
              Our Story
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
