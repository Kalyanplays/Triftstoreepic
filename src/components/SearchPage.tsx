import { useState, useMemo, useEffect } from 'react';
import { Search, Clock, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface SearchPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onLike: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  likedProducts: Set<string>;
}

export function SearchPage({ products, onViewProduct, onLike, onAddToCart, likedProducts }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search to recent searches
  const addRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5);
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Search logic
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.brand?.toLowerCase().includes(lowerQuery)
    );
  }, [query, products]);

  // Suggestions
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    const categoryMatches = new Set<string>();
    const productMatches: Product[] = [];

    products.forEach(product => {
      if (product.category.toLowerCase().includes(lowerQuery)) {
        categoryMatches.add(product.category);
      }
      if (product.name.toLowerCase().includes(lowerQuery)) {
        productMatches.push(product);
      }
    });

    return {
      categories: Array.from(categoryMatches).slice(0, 3),
      products: productMatches.slice(0, 5)
    };
  }, [query, products]);

  const popularSearches = ['Vintage Jackets', 'Sneakers', 'Designer Bags', 'Sustainable'];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    addRecentSearch(searchQuery);
    setIsFocused(false);
  };

  // Fuzzy match for "Did you mean?"
  const didYouMean = useMemo(() => {
    if (!query.trim() || searchResults.length > 0) return null;

    const lowerQuery = query.toLowerCase();
    const allTerms = [
      ...products.map(p => p.name),
      ...products.map(p => p.category),
      ...products.map(p => p.brand).filter(Boolean) as string[]
    ];

    // Simple fuzzy match - find closest match
    for (const term of allTerms) {
      const lowerTerm = term.toLowerCase();
      if (lowerTerm.includes(lowerQuery.slice(0, -1)) || 
          lowerQuery.includes(lowerTerm.slice(0, -1))) {
        return term;
      }
    }

    return null;
  }, [query, searchResults, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-white mb-6">Search</h1>
        
        {/* Search Input */}
        <div className="relative max-w-2xl">
          <div className="glass-card-neon p-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search for products, categories, brands..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {isFocused && query && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 glass-card-neon p-4 z-10"
              >
                {suggestions.categories.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">CATEGORIES</p>
                    {suggestions.categories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleSearch(category)}
                        className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded transition-colors"
                      >
                        <mark className="bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent">
                          {category}
                        </mark>
                      </button>
                    ))}
                  </div>
                )}

                {suggestions.products.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">PRODUCTS</p>
                    {suggestions.products.map(product => (
                      <button
                        key={product.id}
                        onClick={() => onViewProduct(product)}
                        className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded transition-colors"
                      >
                        {product.name}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Content */}
      {!query ? (
        <div className="space-y-8">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <h3 className="text-white">Recent Searches</h3>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="px-4 py-2 glass-card hover:bg-white/10 rounded-full text-sm transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <h3 className="text-white">Popular Searches</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="px-4 py-2 glass-card hover:bg-white/10 rounded-full text-sm transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Empty State Illustration */}
          <div className="glass-card p-12 text-center liquid-surface">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)]/20 to-[var(--color-neon-purple)]/20 flex items-center justify-center">
              <Search className="w-12 h-12 text-[var(--color-neon-blue)]" />
            </div>
            <h3 className="text-white mb-2">Start Your Search</h3>
            <p className="text-gray-400">
              Discover sustainable fashion pieces that match your style
            </p>
          </div>
        </div>
      ) : (
        <div>
          {/* Did You Mean? */}
          {didYouMean && searchResults.length === 0 && (
            <div className="mb-6">
              <p className="text-gray-400">
                Did you mean{' '}
                <button
                  onClick={() => setQuery(didYouMean)}
                  className="text-[var(--color-neon-blue)] hover:underline"
                >
                  {didYouMean}
                </button>
                ?
              </p>
            </div>
          )}

          {/* Results */}
          {searchResults.length > 0 ? (
            <div>
              <p className="text-gray-400 mb-6">
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{query}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product) => (
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
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <h3 className="text-white mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find any products matching "{query}"
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-6 py-3 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg hover:opacity-90 transition-opacity"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
