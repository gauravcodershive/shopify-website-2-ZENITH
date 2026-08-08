import React from 'react';
import ProductCard from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedSection({ 
  products, 
  currency, 
  wishlistIds, 
  onToggleWishlist, 
  onQuickView, 
  onAddToCart,
  onNavigateToProducts,
  onSelectProduct
}) {
  // Select top 4 featured products for Home Page
  const featuredProducts = products.filter(p => p.featured || p.badge === 'Best Seller').slice(0, 4);

  return (
    <section style={{ padding: '4.5rem 0', background: '#ffffff' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ color: '#d97706', fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} /> Handpicked For You
            </div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Trending Best Sellers
            </h2>
          </div>

          <button 
            className="btn-primary" 
            onClick={onNavigateToProducts}
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
          >
            View All Products ({products.length}) <ArrowRight size={16} />
          </button>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
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
    </section>
  );
}
