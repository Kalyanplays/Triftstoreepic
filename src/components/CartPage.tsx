import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Lock, Truck, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigateToShop: () => void;
}

export function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigateToShop
}: CartPageProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here with payment processing.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-white mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="glass-card p-12 text-center liquid-surface">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)]/20 to-[var(--color-neon-purple)]/20 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-[var(--color-neon-blue)]" />
          </div>
          <h2 className="text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">
            Start shopping for sustainable fashion pieces
          </p>
          <button
            onClick={onNavigateToShop}
            className="px-6 py-3 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg hover:opacity-90 transition-opacity"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="glass-card p-6"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-white mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-400">{item.category}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <span className="text-xs text-gray-400">Size: </span>
                        <span className="text-sm text-white">{item.selectedSize}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Condition: </span>
                        <span className="text-sm text-white">{item.condition}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">Qty:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-2 glass-card hover:bg-white/10 rounded transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 glass-card hover:bg-white/10 rounded transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">${item.price} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card-neon p-6 sticky top-24 space-y-6">
              <h2 className="text-white">Order Summary</h2>

              {/* Promo Code */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 glass-card rounded-lg text-white placeholder-gray-500 bg-white/5 border border-white/10 focus:border-[var(--color-neon-blue)] outline-none"
                  />
                  <button className="px-4 py-2 glass-card hover:bg-white/10 rounded-lg transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-y border-white/10">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal > 0 && subtotal < 50 && (
                  <p className="text-xs text-gray-500">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="text-white">Total</span>
                <span className="text-2xl bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg hover:opacity-90 transition-opacity"
              >
                <Lock className="w-5 h-5" />
                Secure Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Indicators */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Truck className="w-5 h-5 text-[var(--color-neon-blue)] flex-shrink-0" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Shield className="w-5 h-5 text-[var(--color-neon-purple)] flex-shrink-0" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Lock className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sustainability Message */}
      {cartItems.length > 0 && (
        <div className="mt-8 glass-card p-6 text-center liquid-surface">
          <h3 className="text-white mb-2">Shopping Sustainably</h3>
          <p className="text-gray-300">
            By choosing pre-loved items, you're reducing waste and supporting a circular fashion economy. 
            Thank you for making a difference! 🌱
          </p>
        </div>
      )}
    </div>
  );
}
