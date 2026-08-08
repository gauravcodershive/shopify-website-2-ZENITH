import React, { useState, useEffect, useMemo } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import WishlistModal from './components/WishlistModal';
import CheckoutModal from './components/CheckoutModal';
import ShopifyConnectModal from './components/ShopifyConnectModal';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import { fetchShopifyProducts, createShopifyCheckout, getShopifyConfig } from './services/shopify';
import { trackShopifyEvent } from './utils/shopifyEvents';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Parse route from URL path
  const getRouteInfo = () => {
    const path = window.location.pathname;
    if (path.startsWith('/products/')) {
      const id = path.replace('/products/', '');
      return { page: 'detail', productId: id };
    }
    if (path.includes('products')) {
      return { page: 'products', productId: null };
    }
    return { page: 'home', productId: null };
  };

  const [route, setRoute] = useState(getRouteInfo);
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('INR');

  // Product List (Live Shopify Products or Built-in Fallback)
  const [productList, setProductList] = useState(PRODUCTS);
  const [isShopifyModalOpen, setIsShopifyModalOpen] = useState(false);

  // Load Shopify products if configured
  useEffect(() => {
    const loadLiveShopifyData = async () => {
      const config = getShopifyConfig();
      if (config.isConnected) {
        const liveProducts = await fetchShopifyProducts();
        if (liveProducts && liveProducts.length > 0) {
          setProductList(liveProducts);
        }
      }
    };
    loadLiveShopifyData();
  }, []);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteInfo());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation function updating browser URL path
  const navigateTo = (page, productId = null) => {
    let targetPath = '/';
    if (page === 'products') targetPath = '/products';
    if (page === 'detail' && productId) targetPath = `/products/${productId}`;

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setRoute({ page, productId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // E-Commerce Data State
  const [cartItems, setCartItems] = useState([
    {
      ...PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Brushed Stainless Steel',
      selectedSize: '8.5 Liter Capacity'
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState(['prod-2']);

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Toast Notification Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds(wishlistIds.filter(id => id !== product.id));
      showToast(`Removed "${product.name}" from Wishlist`);
    } else {
      setWishlistIds([...wishlistIds, product.id]);
      showToast(`❤️ Added "${product.name}" to Wishlist!`);
    }
  };

  // Add to Cart
  const handleAddToCart = (productToAdd) => {
    setCartItems(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === productToAdd.id && 
                item.selectedColor === (productToAdd.selectedColor || (item.colors ? item.colors[0]?.name : null))
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += (productToAdd.quantity || 1);
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...productToAdd,
            quantity: productToAdd.quantity || 1,
            selectedColor: productToAdd.selectedColor || (productToAdd.colors ? productToAdd.colors[0]?.name : null),
            selectedSize: productToAdd.selectedSize || (productToAdd.sizes ? productToAdd.sizes[0] : null)
          }
        ];
      }
    });

    trackShopifyEvent('AddToCart', productToAdd);
    showToast(`🛍️ Added "${productToAdd.name}" to Cart!`);
  };

  // Buy Now -> Direct Checkout Trigger
  const handleBuyNow = async (productToBuy) => {
    handleAddToCart(productToBuy);
    
    // Check if connected to live Shopify API
    const config = getShopifyConfig();
    if (config.isConnected) {
      const checkoutUrl = await createShopifyCheckout([productToBuy]);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }
    }
    
    setIsCheckoutOpen(true);
  };

  // Cart Operations
  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      setCartItems(prev => {
        const copy = [...prev];
        copy[index].quantity = newQty;
        return copy;
      });
    }
  };

  const handleRemoveCartItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart');
  };

  // Selected Product object for Detail Page
  const selectedProduct = useMemo(() => {
    if (route.page === 'detail' && route.productId) {
      return productList.find(p => p.id === route.productId) || productList[0];
    }
    return null;
  }, [route, productList]);

  // Wishlisted Products list
  const wishlistedProducts = useMemo(() => {
    return productList.filter(p => wishlistIds.includes(p.id));
  }, [wishlistIds, productList]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: '#0f172a',
          color: '#ffffff',
          padding: '0.85rem 1.35rem',
          borderRadius: '9999px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          zIndex: 200,
          fontSize: '0.875rem',
          fontWeight: 600,
          animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <CheckCircle2 size={18} style={{ color: '#10b981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <AnnouncementBar 
        currency={currency} 
        onCurrencyChange={setCurrency} 
      />

      {/* Header Navbar */}
      <Navbar 
        activeTab={route.page === 'home' ? 'home' : 'products'}
        onNavigate={(page) => navigateTo(page)}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (route.page === 'home' && q.trim()) {
            navigateTo('products');
          }
        }}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Content Area - Render route */}
      <main style={{ flexGrow: 1 }}>
        {route.page === 'home' && (
          <HomePage 
            products={productList}
            currency={currency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToCart={handleAddToCart}
            onNavigateToProducts={() => navigateTo('products')}
            onSelectProduct={(prod) => navigateTo('detail', prod.id)}
          />
        )}

        {route.page === 'products' && (
          <ProductsPage 
            products={productList}
            currency={currency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateTo('home')}
            onSelectProduct={(prod) => navigateTo('detail', prod.id)}
          />
        )}

        {route.page === 'detail' && selectedProduct && (
          <ProductDetailPage 
            product={selectedProduct}
            allProducts={productList}
            currency={currency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onNavigate={navigateTo}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onCategoryClick={(cat) => {
          navigateTo('products');
        }}
        onShowToast={showToast}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        currency={currency}
        onProceedCheckout={async () => {
          setIsCartOpen(false);
          
          // Check live Shopify API connection
          const config = getShopifyConfig();
          if (config.isConnected) {
            const checkoutUrl = await createShopifyCheckout(cartItems);
            if (checkoutUrl) {
              window.location.href = checkoutUrl;
              return;
            }
          }

          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Modal */}
      <WishlistModal 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={(id) => setWishlistIds(wishlistIds.filter(wId => wId !== id))}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView 
          product={quickViewProduct}
          currency={currency}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onOrderSuccess={() => {
          setCartItems([]);
          setIsCheckoutOpen(false);
          showToast('🎉 Thank you! Order placed successfully!');
        }}
      />
    </div>
  );
}
