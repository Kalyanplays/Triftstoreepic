import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ShopPage } from './components/ShopPage';
import { CollectionsListPage } from './components/CollectionsListPage';
import { CollectionPage } from './components/CollectionPage';
import { SearchPage } from './components/SearchPage';
import { WishlistPage } from './components/WishlistPage';
import { CartPage } from './components/CartPage';
import { MiniCart } from './components/MiniCart';
import { ProductDetailModal } from './components/ProductDetailModal';
import { products, collections } from './data/products';
import { Product, CartItem, Collection } from './types';
import { toast, Toaster } from 'sonner@2.0.3';

type Page = 'home' | 'about' | 'shop' | 'collections' | 'collection-detail' | 'search' | 'wishlist' | 'cart';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [wishlistNotes, setWishlistNotes] = useState<Record<string, string>>({});
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedNotes = localStorage.getItem('wishlistNotes');

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setLikedProducts(new Set(JSON.parse(savedWishlist)));
    }
    if (savedNotes) {
      setWishlistNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(Array.from(likedProducts)));
  }, [likedProducts]);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('wishlistNotes', JSON.stringify(wishlistNotes));
  }, [wishlistNotes]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page !== 'collection-detail') {
      setSelectedCollection(null);
    }
  };

  const handleSelectCollection = (collection: Collection) => {
    setSelectedCollection(collection);
    setCurrentPage('collection-detail');
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
  };

  const handleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        toast.success('Removed from wishlist');
      } else {
        newSet.add(productId);
        toast.success('Added to wishlist');
      }
      return newSet;
    });
  };

  const handleAddToCart = (product: Product, size?: string) => {
    const selectedSize = size || product.size[0];
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.selectedSize === selectedSize);
      
      if (existingItem) {
        toast.success('Updated cart quantity');
        return prev.map(item =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success('Added to cart');
        setIsMiniCartOpen(true);
        return [...prev, { ...product, quantity: 1, selectedSize }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success('Removed from cart');
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
    toast.success('Removed from wishlist');
  };

  const handleUpdateWishlistNote = (productId: string, note: string) => {
    setWishlistNotes(prev => ({
      ...prev,
      [productId]: note
    }));
  };

  const handleCheckout = () => {
    setIsMiniCartOpen(false);
    setCurrentPage('cart');
  };

  const wishlistItems = products.filter(p => likedProducts.has(p.id));
  const relatedProducts = selectedProduct
    ? products.filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category).slice(0, 4)
    : [];

  return (
    <div className="min-h-screen bg-[var(--color-charcoal)]">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
          },
        }}
      />
      
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage === 'collection-detail' ? 'collections' : currentPage}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={likedProducts.size}
        onSearchClick={() => handleNavigate('search')}
      />

      <main>
        {currentPage === 'home' && (
          <HomePage
            featuredProducts={products}
            collections={collections}
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
            onSelectCollection={handleSelectCollection}
            onLike={handleLike}
            onAddToCart={handleAddToCart}
            likedProducts={likedProducts}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            onViewProduct={handleViewProduct}
            onLike={handleLike}
            onAddToCart={handleAddToCart}
            likedProducts={likedProducts}
          />
        )}

        {currentPage === 'collections' && (
          <CollectionsListPage
            collections={collections}
            onSelectCollection={handleSelectCollection}
          />
        )}

        {currentPage === 'collection-detail' && selectedCollection && (
          <CollectionPage
            collection={selectedCollection}
            onViewProduct={handleViewProduct}
            onLike={handleLike}
            onAddToCart={handleAddToCart}
            likedProducts={likedProducts}
            onNavigateToShop={() => handleNavigate('shop')}
          />
        )}

        {currentPage === 'search' && (
          <SearchPage
            products={products}
            onViewProduct={handleViewProduct}
            onLike={handleLike}
            onAddToCart={handleAddToCart}
            likedProducts={likedProducts}
          />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            wishlistItems={wishlistItems}
            onViewProduct={handleViewProduct}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
            onUpdateNote={handleUpdateWishlistNote}
            notes={wishlistNotes}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onNavigateToShop={() => handleNavigate('shop')}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            relatedProducts={relatedProducts}
            onClose={handleCloseProductModal}
            onAddToCart={(product, size) => handleAddToCart(product, size)}
            onLike={handleLike}
            isLiked={likedProducts.has(selectedProduct.id)}
            onViewProduct={handleViewProduct}
          />
        )}
      </AnimatePresence>

      {/* Mini Cart */}
      <MiniCart
        isOpen={isMiniCartOpen}
        onClose={() => setIsMiniCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
