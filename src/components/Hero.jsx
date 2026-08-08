import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';

export default function Hero({ onShopClick, onBestsellerClick }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} className="text-indigo-600" /> Premium Culinary & Home Appliance Collection
          </div>
          
          <h1 className="hero-title">
            Experience Culinary <span>Perfection</span> & Smart Living.
          </h1>
          
          <p className="hero-description">
            Elevate your kitchen ritual with our flagship range of precision air fryers, Italian barista espresso machines, commercial blenders, smart air purifiers, and cold press juicers.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={onShopClick}>
              Explore Appliances <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={onBestsellerClick}>
              View All Products
            </button>
          </div>

          <div className="hero-features">
            <div className="hero-feature-item">
              <Truck size={18} />
              <span>Free Express Delivery</span>
            </div>
            <div className="hero-feature-item">
              <ShieldCheck size={18} />
              <span>2-Year Full Warranty</span>
            </div>
            <div className="hero-feature-item">
              <RefreshCw size={18} />
              <span>30-Day Easy Returns</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="hero-media-wrapper">
          <img 
            src="/images/hero.png" 
            alt="ZENITH Luxury Kitchen Showcase" 
          />
          <div className="hero-floating-card">
            <div className="floating-icon">
              <Sparkles size={20} className="fill-white" />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>Featured Collection</div>
              <div style={{ fontSize: '0.9375rem', color: '#0f172a', fontWeight: 800 }}>Smart Kitchen 2026 Edition</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
