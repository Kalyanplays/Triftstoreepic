import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { FilterPanel } from './FilterPanel';
import { motion, AnimatePresence } from 'motion/react';

interface ShopPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onLike: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  likedProducts: Set<string>;
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

export function ShopPage({ products, onViewProduct, onLike, onAddToCart, likedProducts }: ShopPageProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    sizes: [],
    conditions: [],
    priceRange: [0, 200],
    sustainabilityTags: [],
  });

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Size filter
      if (filters.sizes.length > 0 && !product.size.some(size => filters.sizes.includes(size))) {
        return false;
      }

      // Condition filter
      if (filters.conditions.length > 0 && !filters.conditions.includes(product.condition)) {
        return false;
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Sustainability filter
      if (filters.sustainabilityTags.length > 0) {
        if (!product.sustainabilityTag || !filters.sustainabilityTags.includes(product.sustainabilityTag)) {
          return false;
        }
      }

      return true;
    });
  }, [products, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.reverse();
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const activeFiltersCount = 
    filters.categories.length +
    filters.sizes.length +
    filters.conditions.length +
    filters.sustainabilityTags.length +
    (filters.priceRange[1] < 200 ? 1 : 0);

  const clearFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      conditions: [],
      priceRange: [0, 200],
      sustainabilityTags: [],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white mb-2">Shop</h1>
        <p className="text-gray-400">Discover sustainable fashion treasures</p>
      </div>

      {/* Top Bar - Sort & Filter Toggle */}
      <div className="flex items-center justify-between mb-6 glass-card p-4">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-sm text-gray-400">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'}
          </span>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-400">{activeFiltersCount} active filters</span>
              <button
                onClick={clearFilters}
                className="text-sm text-[var(--color-neon-blue)] hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="glass-card px-4 py-2 rounded-lg text-sm text-white bg-transparent border-none focus:ring-2 focus:ring-[var(--color-neon-blue)] outline-none"
          >
            <option value="featured" className="bg-[var(--color-charcoal)]">Featured</option>
            <option value="price-low" className="bg-[var(--color-charcoal)]">Price: Low to High</option>
            <option value="price-high" className="bg-[var(--color-charcoal)]">Price: High to Low</option>
            <option value="newest" className="bg-[var(--color-charcoal)]">Newest</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm">Filters</span>
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filter Panel */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-gray-400 mb-2">No products found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters</p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProduct}
                  onLike={onLike}
                  onAddToCart={onAddToCart}
                  isLiked={likedProducts.has(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-sm h-full bg-[var(--color-charcoal)]"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                onClose={() => setShowMobileFilters(false)}
                isMobile
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
