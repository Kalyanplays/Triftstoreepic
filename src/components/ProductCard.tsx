import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onLike: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isLiked: boolean;
}

export function ProductCard({ product, onLike, onAddToCart, onViewDetails, isLiked }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass-card-neon cursor-pointer group"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-[20px]">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs glass-card backdrop-blur-md">
            {product.condition}
          </span>
        </div>

        {/* Sustainability Tag */}
        {product.sustainabilityTag && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-md">
              {product.sustainabilityTag}
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onLike(product.id);
            }}
            className={`p-2 rounded-full glass-card backdrop-blur-md ${
              isLiked ? 'text-red-500' : 'text-white'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-2 rounded-full glass-card backdrop-blur-md"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm text-gray-400 mb-1">{product.category}</p>
        <h3 className="mb-2 text-white line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
