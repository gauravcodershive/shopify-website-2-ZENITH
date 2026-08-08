import React from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

export default function ProductCard({ 
  product, 
  currency, 
  isWishlisted, 
  onToggleWishlist, 
  onQuickView, 
  onAddToCart,
  onSelectProduct 
}) {
  const formatPrice = (amount) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {/* Image Container with Badges */}
      <div className="card-image-container">
        {product.badge && (
          <span className={`badge-tag ${product.badgeType || 'hot'}`}>
            {product.badge}
          </span>
        )}

        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
        </button>

        <img src={product.image} alt={product.name} loading="lazy" />

        <button 
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
        >
          <Eye size={14} style={{ display: 'inline', marginRight: '4px' }} /> Quick View
        </button>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.85rem' }}>{product.subtitle}</p>

        <div className="card-footer">
          <div className="price-box">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="compare-price">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <button 
            className="add-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
