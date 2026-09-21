import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import BrandStandard from '../components/home/BrandStandard';
import CategoryShowcase from '../components/home/CategoryShowcase';
import FeaturedProduct from '../components/home/FeaturedProduct';
import KitBuilder from '../components/home/KitBuilder';
import Bestsellers from '../components/home/Bestsellers';
import CtaSection from '../components/home/CtaSection';
import BrandStory from '../components/home/BrandStory';
import TrustStrip from '../components/home/TrustStrip';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <TrustStrip />
      <BrandStandard />
      <CategoryShowcase />
      <FeaturedProduct />
      <KitBuilder />
      <Bestsellers />
      <CtaSection />
      <BrandStory />
    </motion.main>
  );
}
