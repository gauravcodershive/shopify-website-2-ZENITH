import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistModal({ 
  isOpen, 
  onClose, 
  wishlistedProducts, 
  onRemoveFromWishlist, 
  onAddToCart,
  currency 
}) {
  if (!isOpen) return null;

  const formatPrice = (amount) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="quick-view-modal" 
        style={{ maxWidth: '680px', gridTemplateColumns: '1fr' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <Heart size={24} className="fill-red-500 text-red-500" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              Your Saved Wishlist ({wishlistedProducts.length})
            </h2>
          </div>

          {wishlistedProducts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
              {wishlistedProducts.map((product) => (
                <div 
                  key={product.id} 
                  style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.85rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem', background: '#f8fafc' }}
                >
                  <img src={product.image} alt={product.name} style={{ width: '4.5rem', height: '4.5rem', borderRadius: '0.5rem', objectFit: 'cover' }} />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700 }}>{product.category}</div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>{product.name}</div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit' }}>
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button 
                      className="btn-primary" 
                      style={{ padding: '0.5rem 0.85rem', fontSize: '0.8125rem' }}
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveFromWishlist(product.id);
                      }}
                    >
                      <ShoppingBag size={14} /> Move to Cart
                    </button>
                    <button 
                      onClick={() => onRemoveFromWishlist(product.id)}
                      style={{ padding: '0.5rem', color: '#94a3b8' }}
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
              <Heart size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.3 }} />
              <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Your Wishlist is Empty</h4>
              <p style={{ fontSize: '0.875rem' }}>Click the heart icon on any product card to save items for later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
