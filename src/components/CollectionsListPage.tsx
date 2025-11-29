import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Collection } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CollectionsListPageProps {
  collections: Collection[];
  onSelectCollection: (collection: Collection) => void;
}

export function CollectionsListPage({ collections, onSelectCollection }: CollectionsListPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-white mb-2">Collections</h1>
        <p className="text-gray-400">Curated selections for every style</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
            onClick={() => onSelectCollection(collection)}
            className="glass-card-neon cursor-pointer overflow-hidden group"
          >
            {/* Hero Image */}
            <div className="relative h-80 overflow-hidden">
              <ImageWithFallback
                src={collection.heroImage}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Collection Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-white mb-2">{collection.name}</h2>
                <p className="text-gray-300 mb-4">{collection.subtitle}</p>
                <div className="flex items-center gap-2 text-sm text-[var(--color-neon-blue)]">
                  <span>View Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Product Preview */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-2">
                {collection.products.slice(0, 4).map((product) => (
                  <div key={product.id} className="aspect-square rounded-lg overflow-hidden glass-card">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-4">
                {collection.products.length} items in this collection
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-12 glass-card p-8 text-center liquid-surface"
      >
        <h3 className="text-white mb-2">Can't find what you're looking for?</h3>
        <p className="text-gray-400 mb-6">
          Explore our full catalog of sustainable fashion pieces
        </p>
      </motion.div>
    </div>
  );
}
