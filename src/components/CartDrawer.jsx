import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { PROMO_CODES } from '../data/products';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  currency,
  onProceedCheckout
}) {
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 2999;
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = rawSubtotal * discountPercent;
  const finalSubtotal = Math.max(0, rawSubtotal - discountAmount);

  const progressPercent = Math.min(100, (rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - rawSubtotal;

  const formatPrice = (amount) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscountPercent(PROMO_CODES[code]);
      setPromoSuccess(`Promo code ${code} applied! (${PROMO_CODES[code] * 100}% OFF)`);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try WELCOME10 or ZENITH20.');
      setPromoSuccess('');
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: '#d97706' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              Your Shopping Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="shipping-progress">
          {remainingForFreeShipping > 0 ? (
            <span>Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more to unlock FREE Express Shipping!</span>
          ) : (
            <span style={{ color: '#059669', fontWeight: 700 }}>🎉 Congratulations! You unlocked FREE Express Shipping!</span>
          )}
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="cart-items-list">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>{item.name}</h4>
                    <button 
                      onClick={() => onRemoveItem(index)}
                      style={{ color: '#94a3b8' }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {(item.selectedColor || item.selectedSize) && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0' }}>
                      {item.selectedColor && `Color: ${item.selectedColor}`}
                      {item.selectedColor && item.selectedSize && ' | '}
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                    <div className="quantity-control" style={{ transform: 'scale(0.85)', transformOrigin: 'left' }}>
                      <button className="quantity-btn" onClick={() => onUpdateQuantity(index, item.quantity - 1)}>-</button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => onUpdateQuantity(index, item.quantity + 1)}>+</button>
                    </div>

                    <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#0f172a' }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748b' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.3 }} />
              <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.875rem' }}>Looks like you haven't added any products yet.</p>
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Entry */}
            <div className="promo-box">
              <input 
                type="text" 
                placeholder="Promo Code (e.g. WELCOME10)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
              />
              <button 
                className="btn-secondary" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', background: '#0f172a', color: '#fff' }}
                onClick={handleApplyPromo}
              >
                Apply
              </button>
            </div>

            {promoSuccess && <div style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: '0.5rem', fontWeight: 600 }}>{promoSuccess}</div>}
            {promoError && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginBottom: '0.5rem' }}>{promoError}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Subtotal</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
                  <span>Discount ({discountPercent * 100}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Shipping</span>
                <span>{remainingForFreeShipping <= 0 ? 'FREE' : formatPrice(199)}</span>
              </div>
            </div>

            <div className="cart-subtotal">
              <span>Total Amount</span>
              <span>{formatPrice(finalSubtotal + (remainingForFreeShipping <= 0 ? 0 : 199))}</span>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
              onClick={onProceedCheckout}
            >
              Checkout Now <ArrowRight size={18} />
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} /> Guaranteed Safe & Secure Shopify Checkout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
