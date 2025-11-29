import { ArrowRight, Sparkles, Heart, Leaf, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Product, Collection } from '../types';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  featuredProducts: Product[];
  collections: Collection[];
  onNavigate: (page: string) => void;
  onViewProduct: (product: Product) => void;
  onSelectCollection: (collection: Collection) => void;
  onLike: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  likedProducts: Set<string>;
}

export function HomePage({
  featuredProducts,
  collections,
  onNavigate,
  onViewProduct,
  onSelectCollection,
  onLike,
  onAddToCart,
  likedProducts
}: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  const categories = [
    { name: 'Outerwear', icon: '🧥', color: 'from-blue-500 to-cyan-500' },
    { name: 'Footwear', icon: '👟', color: 'from-purple-500 to-pink-500' },
    { name: 'Accessories', icon: '👜', color: 'from-orange-500 to-red-500' },
    { name: 'Tops', icon: '👕', color: 'from-green-500 to-emerald-500' },
  ];

  const stats = [
    { value: '10K+', label: 'Items Sold', icon: TrendingUp },
    { value: '8K+', label: 'Happy Customers', icon: Heart },
    { value: '95%', label: 'CO2 Reduced', icon: Leaf },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1713261749235-901031087be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBoZXJvfGVufDF8fHx8MTc2NDQwNzkxMnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Sustainable Fashion Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--color-charcoal)]" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative h-full flex items-center justify-center text-center px-4"
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[var(--color-neon-blue)]" />
                <span className="text-sm">Sustainable Fashion Reimagined</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl text-white mb-6"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              Thrift Meets
              <br />
              <span className="bg-gradient-to-r from-[var(--color-neon-blue)] via-[var(--color-neon-purple)] to-[var(--color-neon-pink)] bg-clip-text text-transparent">
                Tomorrow
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Discover premium pre-loved fashion. Every piece tells a story, saves the planet, and elevates your style.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('shop')}
                className="px-8 py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('about')}
                className="px-8 py-4 glass-card-neon rounded-lg hover:bg-white/10 transition-colors"
              >
                Our Story
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white" />
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-card-neon p-8 text-center liquid-surface"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-[var(--color-neon-blue)]" />
              <div className="text-4xl bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-white mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -8 }}
                onClick={() => onNavigate('shop')}
                className="glass-card-neon p-8 text-center liquid-surface group"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-white mb-2">{category.name}</h3>
                <div className={`h-1 w-0 group-hover:w-full transition-all duration-300 mx-auto bg-gradient-to-r ${category.color} rounded-full`} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white">Trending Now</h2>
            <button
              onClick={() => onNavigate('shop')}
              className="text-[var(--color-neon-blue)] hover:underline flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product, index) => (
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

        {/* Featured Collections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-white mb-8 text-center">Curated Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                onClick={() => onSelectCollection(collection)}
                className="glass-card-neon cursor-pointer overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={collection.heroImage}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white mb-2">{collection.name}</h3>
                    <p className="text-gray-300 text-sm mb-3">{collection.subtitle}</p>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-neon-blue)]">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-neon p-12 text-center liquid-surface"
        >
          <h2 className="text-white mb-6">Why Choose Trift?</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            We're not just selling clothes — we're building a movement. Every purchase supports sustainable fashion, 
            reduces waste, and gives quality pieces a second life. Join thousands who are redefining style with purpose.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)]/20 to-[var(--color-neon-purple)]/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-[var(--color-neon-blue)]" />
              </div>
              <h3 className="text-white mb-2">Quality Verified</h3>
              <p className="text-sm text-gray-400">
                Every item is inspected and authenticated for quality
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-white mb-2">Eco-Friendly</h3>
              <p className="text-sm text-gray-400">
                Reducing fashion waste one item at a time
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-neon-purple)]/20 to-[var(--color-neon-pink)]/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[var(--color-neon-purple)]" />
              </div>
              <h3 className="text-white mb-2">Unique Finds</h3>
              <p className="text-sm text-gray-400">
                Discover one-of-a-kind pieces with character
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('about')}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg hover:opacity-90 transition-opacity"
          >
            Learn More About Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
