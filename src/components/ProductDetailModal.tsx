import { X, ChevronLeft, ChevronRight, Heart, ShoppingBag, Truck, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailModalProps {
  product: Product;
  relatedProducts: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onLike: (productId: string) => void;
  isLiked: boolean;
  onViewProduct: (product: Product) => void;
}

export function ProductDetailModal({
  product,
  relatedProducts,
  onClose,
  onAddToCart,
  onLike,
  isLiked,
  onViewProduct
}: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.size[0] || '');
  
  const images = product.images || [product.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, selectedSize);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card-neon w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 glass-card border-b border-white/10">
          <h2 className="text-white">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Carousel */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-card">
                <ImageWithFallback
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 glass-card backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 glass-card backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Condition Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-sm glass-card backdrop-blur-md">
                    {product.condition}
                  </span>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-[var(--color-neon-blue)]' : 'opacity-50 hover:opacity-100'
                      } transition-all`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 mb-2">{product.category}</p>
                <h1 className="text-white mb-4">{product.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.sustainabilityTag && (
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                    <span className="text-sm text-green-400">{product.sustainabilityTag}</span>
                  </div>
                )}
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-white mb-3">Select Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white'
                          : 'glass-card text-gray-300 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => onLike(product.id)}
                  className={`p-3 glass-card rounded-lg hover:bg-white/10 transition-colors ${
                    isLiked ? 'text-red-500' : 'text-white'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Product Details */}
              <div className="glass-card p-4 space-y-3">
                <h3 className="text-white">Product Details</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>
                {product.brand && (
                  <div className="pt-3 border-t border-white/10">
                    <span className="text-gray-400 text-sm">Brand: </span>
                    <span className="text-white text-sm">{product.brand}</span>
                  </div>
                )}
                {product.material && (
                  <div>
                    <span className="text-gray-400 text-sm">Material: </span>
                    <span className="text-white text-sm">{product.material}</span>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="glass-card p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[var(--color-neon-blue)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm">Free Shipping</p>
                    <p className="text-gray-400 text-xs">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-[var(--color-neon-purple)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm">Easy Returns</p>
                    <p className="text-gray-400 text-xs">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Items */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="text-white mb-6">You May Also Like</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    whileHover={{ y: -4 }}
                    onClick={() => onViewProduct(relatedProduct)}
                    className="glass-card cursor-pointer"
                  >
                    <div className="aspect-square rounded-t-lg overflow-hidden">
                      <ImageWithFallback
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-white line-clamp-1">{relatedProduct.name}</p>
                      <p className="text-sm bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent">
                        ${relatedProduct.price}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
