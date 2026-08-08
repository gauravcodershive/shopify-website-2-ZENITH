import React, { useState } from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';

export default function ProductQuickView({ product, currency, onClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const formatPrice = (amount) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedColor: selectedColor ? selectedColor.name : null,
      selectedSize,
      quantity
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Product Image Column */}
        <div className="quick-view-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Product Info & Options Column */}
        <div className="quick-view-details">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
            {product.name}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#64748b', marginBottom: '1rem' }}>
            {product.subtitle}
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>
              {formatPrice(product.price * quantity)}
            </span>
            {product.compareAtPrice && (
              <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatPrice(product.compareAtPrice * quantity)}
              </span>
            )}
          </div>

          {/* Color Variants */}
          {product.colors && product.colors.length > 0 && (
            <div className="variant-selector">
              <div className="variant-title">Select Color: {selectedColor?.name}</div>
              <div className="color-options">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    className={`color-swatch ${selectedColor?.name === c.name ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Variants */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="variant-selector">
              <div className="variant-title">Select Size / Option:</div>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Counter & Add CTA */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '1.5rem 0' }}>
            <div className="quantity-control">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button 
              className="btn-primary" 
              style={{ flexGrow: 1, justifyContent: 'center' }}
              onClick={handleAdd}
            >
              <ShoppingBag size={18} /> Add to Cart • {formatPrice(product.price * quantity)}
            </button>
          </div>

          {/* Specs Highlights */}
          {product.specs && (
            <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Key Specifications:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {product.specs.map((spec, i) => (
                  <li key={i} style={{ fontSize: '0.8125rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={14} style={{ color: '#10b981' }} /> {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
