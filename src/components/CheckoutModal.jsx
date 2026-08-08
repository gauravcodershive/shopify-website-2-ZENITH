import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Truck, ArrowLeft, Lock } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cartItems, currency, onOrderSuccess }) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [formData, setFormData] = useState({
    name: 'Gaurav Kumar',
    email: 'gaurav@example.com',
    phone: '+91 98765 43210',
    address: '42 Artisanal Plaza, MG Road',
    city: 'Bengaluru',
    pincode: '560001'
  });

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPrice = (amount) => {
    if (currency === 'USD') return `$${(amount / 83).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amount / 90).toFixed(2)}`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onOrderSuccess();
    }, 5000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="quick-view-modal" 
        style={{ maxWidth: '840px', gridTemplateColumns: step === 'success' ? '1fr' : '1.2fr 1fr' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {step === 'success' ? (
          <div style={{ padding: '3.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircle size={64} style={{ color: '#10b981', marginBottom: '1.25rem' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Order Confirmed! 🎉
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '480px', marginBottom: '1.5rem' }}>
              Thank you for shopping at ZENITH. Your order <strong>#ZEN-{Math.floor(100000 + Math.random() * 900000)}</strong> has been placed and is being prepared for express delivery.
            </p>
            <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', marginBottom: '2rem', width: '100%', maxWidth: '400px' }}>
              <div style={{ fontSize: '0.875rem', color: '#0f172a', fontWeight: 600 }}>Estimated Delivery:</div>
              <div style={{ fontSize: '1.125rem', color: '#d97706', fontWeight: 800 }}>Within 2-3 Business Days</div>
            </div>
            <button className="btn-primary" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Form Section */}
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#10b981', fontWeight: 700, marginBottom: '0.75rem' }}>
                <Lock size={14} /> 256-Bit Encrypted Checkout
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                Express Checkout
              </h2>

              <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                    Shipping Address
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                      City
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                      PIN / Zip Code
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div style={{ marginTop: '0.5rem' }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>
                    Payment Method
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', cursor: 'pointer', background: paymentMethod === 'upi' ? '#fef3c7' : '#fff' }}>
                      <input type="radio" name="pay" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>⚡ Instant UPI (Google Pay, PhonePe, Paytm)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', cursor: 'pointer', background: paymentMethod === 'card' ? '#fef3c7' : '#fff' }}>
                      <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>💳 Credit / Debit Card (Visa, Mastercard)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', cursor: 'pointer', background: paymentMethod === 'cod' ? '#fef3c7' : '#fff' }}>
                      <input type="radio" name="pay" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>💵 Cash On Delivery (COD)</span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.9rem' }}
                >
                  Pay {formatPrice(rawSubtotal)} & Complete Order
                </button>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Order Summary ({cartItems.length} items)
              </h3>

              <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '280px', marginBottom: '1rem' }}>
                {cartItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '3rem', height: '3rem', borderRadius: '0.5rem', objectFit: 'cover' }} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Qty: {item.quantity}</div>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '1rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 800, color: '#0f172a' }}>
                  <span>Total Due</span>
                  <span>{formatPrice(rawSubtotal)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
