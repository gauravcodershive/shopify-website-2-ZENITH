import React from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';
import { SlidersHorizontal, PackageX } from 'lucide-react';

export default function ProductGrid({ 
  products, 
  currency, 
  selectedCategory, 
  setSelectedCategory,
  sortBy,
  setSortBy,
  searchQuery,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) {
  return (
    <section className="catalog-section" id="products-catalog">
      <div className="container">
        {/* Section Title Header */}
        <div className="section-header">
          <div className="section-subtitle">Curated Store Catalog</div>
          <h2 className="section-title">Explore Premium Products</h2>
          <p className="section-desc">
            Discover our hand-selected collection of world-class design, craftsmanship, and technology.
          </p>
        </div>

        {/* Filter Tabs & Sorting Toolbar */}
        <div className="filter-bar">
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="sort-wrapper">
            <SlidersHorizontal size={16} />
            <span>Sort by:</span>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Search status notice if actively searching */}
        {searchQuery && (
          <div style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9375rem' }}>
            Showing results for: <strong style={{ color: '#0f172a' }}>"{searchQuery}"</strong> ({products.length} found)
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
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
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
            <PackageX size={48} style={{ color: '#94a3b8', margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>No products match your search</h3>
            <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Try searching for a different item or switch category filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
