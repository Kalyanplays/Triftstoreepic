import { Heart, ShoppingCart, Share2, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WishlistPageProps {
  wishlistItems: Product[];
  onViewProduct: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onUpdateNote: (productId: string, note: string) => void;
  notes: Record<string, string>;
}

export function WishlistPage({
  wishlistItems,
  onViewProduct,
  onRemoveFromWishlist,
  onAddToCart,
  onUpdateNote,
  notes
}: WishlistPageProps) {
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My Trift Wishlist',
        text: `Check out my sustainable fashion wishlist with ${wishlistItems.length} items!`,
        url: window.location.href
      });
    } catch (err) {
      // Fallback: copy to clipboard
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Wishlist</h1>
          <p className="text-gray-400">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        
        {wishlistItems.length > 0 && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-white/10 rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share List</span>
          </button>
        )}
      </div>

      {/* Content */}
      {wishlistItems.length === 0 ? (
        <div className="glass-card p-12 text-center liquid-surface">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center">
            <Heart className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-6">
            Save your favorite sustainable fashion pieces to revisit later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card overflow-hidden group"
            >
              {/* Image */}
              <div
                onClick={() => onViewProduct(item)}
                className="relative aspect-square cursor-pointer overflow-hidden"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    className="p-3 glass-card backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromWishlist(item.id);
                    }}
                    className="p-3 glass-card backdrop-blur-md rounded-full hover:bg-red-500/20 text-red-400 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs glass-card backdrop-blur-md">
                    {item.condition}
                  </span>
                </div>
                
                {item.sustainabilityTag && (
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-md">
                      {item.sustainabilityTag}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-sm text-gray-400 mb-1">{item.category}</p>
                <h3 className="text-white mb-2 line-clamp-1">{item.name}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent">
                    ${item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${item.originalPrice}
                    </span>
                  )}
                </div>

                {/* Note */}
                {editingNote === item.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={notes[item.id] || ''}
                      onChange={(e) => onUpdateNote(item.id, e.target.value)}
                      placeholder="Add a note about this item..."
                      className="w-full px-3 py-2 glass-card rounded-lg text-sm text-white placeholder-gray-500 bg-white/5 border border-white/10 focus:border-[var(--color-neon-blue)] outline-none resize-none"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingNote(null)}
                        className="flex-1 px-3 py-1.5 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded text-sm hover:opacity-90 transition-opacity"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          onUpdateNote(item.id, '');
                          setEditingNote(null);
                        }}
                        className="px-3 py-1.5 glass-card hover:bg-white/10 rounded text-sm transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingNote(item.id)}
                    className="w-full text-left px-3 py-2 glass-card hover:bg-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {notes[item.id] || 'Add a note...'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer Message */}
      {wishlistItems.length > 0 && (
        <div className="mt-12 glass-card p-6 text-center liquid-surface">
          <p className="text-gray-300">
            💚 Every item you choose supports sustainable fashion and reduces waste
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Give pre-loved items a second chance
          </p>
        </div>
      )}
    </div>
  );
}
