import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Collection } from '../types';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CollectionPageProps {
  collection: Collection;
  onViewProduct: (product: any) => void;
  onLike: (productId: string) => void;
  onAddToCart: (product: any) => void;
  likedProducts: Set<string>;
  onNavigateToShop: () => void;
}

export function CollectionPage({
  collection,
  onViewProduct,
  onLike,
  onAddToCart,
  likedProducts,
  onNavigateToShop
}: CollectionPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={collection.heroImage}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[var(--color-charcoal)]" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative h-full flex items-center justify-center text-center px-4"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="glass-card-neon p-8 md:p-12 liquid-surface"
            >
              <h1 className="text-white mb-4">{collection.name}</h1>
              <p className="text-xl text-gray-300">{collection.subtitle}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Moodboard Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-3 gap-4 mb-8">
            {collection.moodboardImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-2xl overflow-hidden glass-card"
              >
                <ImageWithFallback
                  src={img}
                  alt={`Moodboard ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Editorial Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 mb-12 liquid-surface"
        >
          <h2 className="text-white mb-6">About This Collection</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            {collection.description}
          </p>
        </motion.div>

        {/* Curated Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-white mb-8">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collection.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard
                  product={product}
                  onViewDetails={onViewProduct}
                  onLike={onLike}
                  onAddToCart={onAddToCart}
                  isLiked={likedProducts.has(product.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center glass-card p-12 liquid-surface"
        >
          <h2 className="text-white mb-4">Discover More</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our full collection of sustainable fashion pieces and find your perfect match.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNavigateToShop}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg hover:opacity-90 transition-opacity"
          >
            Shop the Collection
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
