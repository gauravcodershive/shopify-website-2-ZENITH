import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  ChevronRight, 
  ShoppingBag, 
  Lock, 
  Check, 
  Package,
  Award,
  Box,
  ArrowUpRight
} from 'lucide-react';

export default function ProductDetailPage({ 
  product, 
  allProducts,
  currency, 
  wishlistIds,
  onToggleWishlist, 
  onAddToCart, 
  onBuyNow,
  onNavigate,
  onQuickView
}) {
  if (!product) return null;

  // Selected gallery image
  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  // Selected variant pack
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);

  // Active accordion tab
  const [activeTab, setActiveTab] = useState('overview');

  // Sticky bar visibility on scroll
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const packs = [
    { name: `Single Unit`, label: `1 Pack`, multiplier: 1, discountText: '' },
    { name: `Pack of 2 (Most Sold 🔥)`, label: `2 Pack`, multiplier: 1.8, discountText: 'Save 10%' },
    { name: `Pack of 3 (Best Value ⚡)`, label: `3 Pack`, multiplier: 2.5, discountText: 'Save 17%' }
  ];

  const currentPack = packs[selectedPackIndex];
  const unitPrice = product.price;
  const currentPrice = Math.round(unitPrice * currentPack.multiplier);
  const originalPrice = Math.round((product.compareAtPrice || unitPrice * 1.3) * currentPack.multiplier);
  const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  const formatPrice = (amount) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Delivery Dates computation
  const today = new Date();
  const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  const orderDate = formatDate(today);
  const readyDate = formatDate(new Date(today.setDate(today.getDate() + 1)));
  const deliveryDate = formatDate(new Date(today.setDate(today.getDate() + 3)));

  // Related products
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleBuy = () => {
    onBuyNow({
      ...product,
      price: currentPrice / currentPack.multiplier,
      quantity: Math.round(currentPack.multiplier),
      selectedColor: selectedColor ? selectedColor.name : null
    });
  };

  const handleAdd = () => {
    onAddToCart({
      ...product,
      price: currentPrice / currentPack.multiplier,
      quantity: Math.round(currentPack.multiplier),
      selectedColor: selectedColor ? selectedColor.name : null
    });
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '7rem' }}>
      {/* Top Breadcrumb Navigation Header */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          <button onClick={() => onNavigate('home')} style={{ color: '#475569', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Home</button>
          <ChevronRight size={14} style={{ color: '#4f46e5' }} />
          <button onClick={() => onNavigate('products')} style={{ color: '#475569', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Products</button>
          <ChevronRight size={14} style={{ color: '#4f46e5' }} />
          <span style={{ color: '#4f46e5', fontWeight: 700 }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Interactive Multi-Image Gallery */}
          <div>
            <div style={{ background: '#ffffff', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,23,42,0.06)', padding: '1.25rem', position: 'sticky', top: '5.5rem' }}>
              {/* Main Showcase Photo */}
              <img 
                src={activeImage} 
                alt={product.name} 
                style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '1.25rem', transition: 'all 0.3s ease' }} 
              />
              
              {/* Thumbnail Selector Strip */}
              {galleryImages.length > 1 && (
                <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.1rem' }}>
                  {galleryImages.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(imgUrl)}
                      style={{ 
                        width: '4.75rem', 
                        height: '4.75rem', 
                        borderRadius: '0.85rem', 
                        overflow: 'hidden', 
                        border: activeImage === imgUrl ? '2.5px solid #d97706' : '1px solid #e2e8f0', 
                        opacity: activeImage === imgUrl ? 1 : 0.65,
                        cursor: 'pointer',
                        padding: 0,
                        background: 'none'
                      }}
                    >
                      <img src={imgUrl} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Details & Buying Flow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Title */}
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {product.name}
            </h1>

            {/* Subtitle Tagline */}
            <div style={{ fontSize: '0.9375rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              🌿 {product.subtitle} 🌿
            </div>

            {/* Pricing Row with Discount Badge */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>
                {formatPrice(currentPrice)}
              </span>
              <span style={{ fontSize: '1.25rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatPrice(originalPrice)}
              </span>
              <span style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 800 }}>
                {discountPercent}% OFF
              </span>
            </div>

            {/* Feature Highlights Grid */}
            {product.highlights && (
              <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {product.highlights.map((item, idx) => (
                  <div key={idx} style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
                    {item}
                  </div>
                ))}
              </div>
            )}

            {/* Color Swatch Selection */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginTop: '0.25rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Select Color: <span style={{ color: '#d97706' }}>{selectedColor?.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      style={{
                        width: '2.25rem',
                        height: '2.25rem',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: selectedColor?.name === c.name ? '3px solid #d97706' : '1px solid #cbd5e1',
                        boxShadow: selectedColor?.name === c.name ? '0 0 0 2px #fef3c7' : 'none',
                        cursor: 'pointer'
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pack Selector Options */}
            <div style={{ marginTop: '0.25rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem' }}>
                Choose Your Pack:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {packs.map((pack, idx) => {
                  const isSelected = selectedPackIndex === idx;
                  const priceVal = Math.round(unitPrice * pack.multiplier);
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '0.85rem 1.25rem',
                        borderRadius: '9999px',
                        border: isSelected ? '2px solid #0f172a' : '1px solid #e2e8f0',
                        background: isSelected ? '#0f172a' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#0f172a',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 4px 14px rgba(15,23,42,0.2)' : '0 1px 3px rgba(0,0,0,0.05)'
                      }}
                    >
                      <span>{pack.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>— {formatPrice(priceVal)}</span>
                        {pack.discountText && (
                          <span style={{ background: isSelected ? '#d97706' : '#fef3c7', color: isSelected ? '#fff' : '#b45309', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800 }}>
                            {pack.discountText}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust Badges Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', margin: '0.25rem 0', background: '#ffffff', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.3rem' }}>
                <Truck size={20} style={{ color: '#d97706' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>Free Delivery</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.3rem' }}>
                <ShieldCheck size={20} style={{ color: '#d97706' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>Genuine Product</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.3rem' }}>
                <RefreshCw size={20} style={{ color: '#d97706' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>Easy Returns</span>
              </div>
            </div>

            {/* High Impact CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '0.25rem 0' }}>
              <button 
                onClick={handleBuy}
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  color: '#ffffff',
                  fontSize: '1.125rem',
                  fontWeight: 800,
                  borderRadius: '9999px',
                  boxShadow: '0 8px 24px rgba(217,119,6,0.4)',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                Buy It Now — {formatPrice(currentPrice)}
              </button>

              <button 
                onClick={handleAdd}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', color: '#0f172a', border: '1px solid #0f172a' }}
              >
                <ShoppingBag size={18} /> Add To Cart
              </button>
            </div>

            {/* Delivery Timeline Tracker Box */}
            <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '1rem', padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                
                {/* Step 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', zIndex: 2 }}>
                  <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={14} />
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a' }}>{orderDate}</div>
                  <div style={{ fontSize: '0.75rem', color: '#78350f' }}>Ordered</div>
                </div>

                <div style={{ flexGrow: 1, height: '2px', background: '#d97706', margin: '0 0.5rem', transform: 'translateY(-12px)' }} />

                {/* Step 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', zIndex: 2 }}>
                  <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={14} />
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a' }}>{readyDate}</div>
                  <div style={{ fontSize: '0.75rem', color: '#78350f' }}>Order Ready</div>
                </div>

                <div style={{ flexGrow: 1, height: '2px', background: '#d97706', margin: '0 0.5rem', transform: 'translateY(-12px)' }} />

                {/* Step 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', zIndex: 2 }}>
                  <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: '#d97706', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Truck size={14} />
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#0f172a' }}>{deliveryDate}</div>
                  <div style={{ fontSize: '0.75rem', color: '#78350f' }}>Delivered</div>
                </div>

              </div>
            </div>

            {/* Verified Business Box */}
            <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8125rem', color: '#0f172a', fontWeight: 700 }}>
                <Award size={16} style={{ color: '#10b981' }} />
                <span>Verified Business & 100% Guaranteed Authentic</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8125rem', color: '#0f172a', fontWeight: 700 }}>
                <Lock size={16} style={{ color: '#10b981' }} />
                <span>256-Bit Encrypted Secure Payments</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8125rem', color: '#0f172a', fontWeight: 700 }}>
                <Truck size={16} style={{ color: '#10b981' }} />
                <span>COD Available Pan India</span>
              </div>
            </div>

          </div>

        </div>

        {/* What's In The Box Section */}
        {product.whatsInBox && (
          <div style={{ marginTop: '4rem', background: '#ffffff', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Box size={22} style={{ color: '#d97706' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                What's Included In The Box
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {product.whatsInBox.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#f8fafc', padding: '0.9rem 1.1rem', borderRadius: '0.85rem', border: '1px solid #e2e8f0', fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
                  <Check size={16} style={{ color: '#10b981' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Product Specs & Features Section */}
        <div style={{ marginTop: '3rem', background: '#ffffff', padding: '3rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
          {/* Tab Controls */}
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: activeTab === 'overview' ? '#d97706' : '#64748b',
                borderBottom: activeTab === 'overview' ? '3px solid #d97706' : 'none',
                paddingBottom: '0.5rem',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              Product Story & Overview
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: activeTab === 'specs' ? '#d97706' : '#64748b',
                borderBottom: activeTab === 'specs' ? '3px solid #d97706' : 'none',
                paddingBottom: '0.5rem',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              Technical Specifications
            </button>
          </div>

          {activeTab === 'overview' ? (
            <div>
              <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {product.description}
              </p>
            </div>
          ) : (
            <div>
              {product.specs && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {product.specs.map((spec, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#f8fafc', padding: '0.9rem 1.15rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '0.9375rem', fontWeight: 600, color: '#0f172a' }}>
                      <Check size={16} style={{ color: '#10b981' }} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products Recommendation Carousel/Grid */}
        <div style={{ marginTop: '5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '2rem', textAlign: 'center' }}>
            You Might Also Like
          </h2>
          <div className="product-grid">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                currency={currency}
                isWishlisted={wishlistIds.includes(relProduct.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Floating Glassmorphic Sticky Buy Bar (Full Width Container Aligned) */}
      {showStickyBar && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid #e2e8f0',
          padding: '0.85rem 0',
          boxShadow: '0 -8px 24px rgba(15, 23, 42, 0.08)',
          zIndex: 90,
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            
            {/* Left Side: Product Thumbnail, Title & Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 auto', minWidth: 0 }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '3rem', height: '3rem', borderRadius: '0.65rem', objectFit: 'cover', border: '1.5px solid #4f46e5', flexShrink: 0 }} 
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: '#4f46e5', fontSize: '1.125rem', fontWeight: 800, fontFamily: 'Outfit' }}>
                    {formatPrice(currentPrice)}
                  </span>
                  {originalPrice > currentPrice && (
                    <span style={{ color: '#94a3b8', fontSize: '0.8125rem', textDecoration: 'line-through' }}>
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Add to Cart & Buy It Now Buttons Anchored Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0, marginLeft: '1.5rem' }}>
              <button 
                onClick={handleAdd}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>

              <button 
                onClick={handleBuy}
                style={{
                  padding: '0.8rem 2rem',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                  color: '#ffffff',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  borderRadius: '9999px',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(79, 70, 229, 0.4)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>Buy It Now</span>
                <ArrowUpRight size={18} />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
