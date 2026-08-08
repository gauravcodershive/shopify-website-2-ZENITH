import React, { useState } from 'react';
import { Sparkles, Send, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export default function Footer({ onCategoryClick, onShowToast }) {
  const [emailInput, setEmailInput] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      onShowToast('🎉 Thank you for subscribing to ZENITH VIP Appliance Newsletter!');
      setEmailInput('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info & Newsletter */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div className="logo-icon" style={{ width: '2rem', height: '2rem', background: '#4f46e5', color: '#fff', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} />
              </div>
              <h3 style={{ margin: 0, fontFamily: 'Outfit', fontWeight: 800 }}>ZENITH</h3>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#475569', marginBottom: '1.5rem' }}>
              ZENITH is a premier home & kitchen marketplace bringing together digital air fryers, Italian barista espresso machines, precision blenders, and smart air purifiers under one curated collection.
            </p>

            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email for 15% OFF" 
                required 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button className="btn-primary" style={{ padding: '0.65rem 1.25rem' }} type="submit">
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Quick Shop Links */}
          <div className="footer-col">
            <h4>Appliance Categories</h4>
            <ul className="footer-links">
              <li><a href="/products" onClick={(e) => { e.preventDefault(); onCategoryClick('All'); }}>Smart Air Fryers & Ovens</a></li>
              <li><a href="/products" onClick={(e) => { e.preventDefault(); onCategoryClick('All'); }}>Espresso & Coffee Barista</a></li>
              <li><a href="/products" onClick={(e) => { e.preventDefault(); onCategoryClick('All'); }}>Precision Blenders & Juicers</a></li>
              <li><a href="/products" onClick={(e) => { e.preventDefault(); onCategoryClick('All'); }}>Air Purifiers & Climate</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h4>Customer Support</h4>
            <ul className="footer-links">
              <li><a href="#">Track Order Delivery</a></li>
              <li><a href="#">Shipping & Delivery Policy</a></li>
              <li><a href="#">30-Day Easy Returns</a></li>
              <li><a href="#">Appliance Warranty Claim</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a href="#" style={{ padding: '0.6rem', background: '#e0e7ff', borderRadius: '50%', color: '#4338ca' }}><Instagram size={18} /></a>
              <a href="#" style={{ padding: '0.6rem', background: '#e0e7ff', borderRadius: '50%', color: '#4338ca' }}><Twitter size={18} /></a>
              <a href="#" style={{ padding: '0.6rem', background: '#e0e7ff', borderRadius: '50%', color: '#4338ca' }}><Facebook size={18} /></a>
              <a href="#" style={{ padding: '0.6rem', background: '#e0e7ff', borderRadius: '50%', color: '#4338ca' }}><Youtube size={18} /></a>
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5 }}>
              Stay connected for culinary tips, healthy recipes, and exclusive appliance releases.
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} ZENITH Home & Kitchen Appliances. All rights reserved. Built with pride for excellence.
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>
            <span>⭐ Premium Quality Guaranteed</span>
            <span>•</span>
            <span>100% Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
