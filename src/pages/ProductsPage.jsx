import React from 'react';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Sparkles, ShieldCheck, Package } from 'lucide-react';

export default function ProductsPage({ 
  products, 
  currency, 
  wishlistIds, 
  onToggleWishlist, 
  onQuickView, 
  onAddToCart,
  onNavigateHome,
  onSelectProduct
}) {
  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '5rem' }}>
      {/* Light Designed Header Banner */}
      <div 
        style={{ 
          position: 'relative',
          background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 50%, #e2e8f0 100%)', 
          color: '#0f172a', 
          padding: '4rem 0 3.5rem 0', 
          borderBottom: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}
      >
        {/* Ambient Radial Glow */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(248, 250, 252, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', marginBottom: '1.25rem' }}>
            <button onClick={onNavigateHome} style={{ color: '#475569', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Home</button>
            <ChevronRight size={14} style={{ color: '#4f46e5' }} />
            <span style={{ color: '#4f46e5', fontWeight: 700 }}>Products Catalog</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                padding: '0.4rem 0.9rem', 
                background: '#e0e7ff', 
                border: '1px solid #c7d2fe', 
                color: '#4338ca', 
                borderRadius: '9999px', 
                fontSize: '0.8125rem', 
                fontWeight: 700, 
                marginBottom: '1rem',
                letterSpacing: '0.04em'
              }}>
                <Sparkles size={14} style={{ color: '#4f46e5' }} /> CURATED E-COMMERCE CATALOG
              </div>

              <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: '0.85rem', lineHeight: 1.1 }}>
                Explore All <span style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #d97706 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Products</span>
              </h1>
              
              <p style={{ fontSize: '1.0625rem', color: '#475569', maxWidth: '580px', lineHeight: '1.6' }}>
                Browse our complete collection of spatial ANC headphones, titanium chronographs, modular travel gear, ergonomic lighting, and artisanal home decor.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.85rem 1.25rem', borderRadius: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 4px 12px rgba(15,23,42,0.03)' }}>
                <Package size={20} style={{ color: '#4f46e5' }} />
                <div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>8 Items</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>In Stock Today</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.85rem 1.25rem', borderRadius: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 4px 12px rgba(15,23,42,0.03)' }}>
                <ShieldCheck size={20} style={{ color: '#10b981' }} />
                <div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>100% Guaranteed</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Verified Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Catalog Grid Container */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
