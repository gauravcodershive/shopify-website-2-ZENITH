import React from 'react';
import { Truck, ShieldCheck, Headphones, RefreshCw } from 'lucide-react';

export default function FeaturesBanner() {
  return (
    <section className="features-banner">
      <div className="container features-grid">
        <div className="feature-card">
          <div className="feature-icon-box">
            <Truck size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Free Express Delivery</h4>
            <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>On all domestic orders above ₹2,999</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>100% Authentic Guarantee</h4>
            <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Sourced directly from verified master artisans</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">
            <RefreshCw size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>30-Day Hassle-Free Returns</h4>
            <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>No questions asked money back guarantee</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">
            <Headphones size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>24/7 Customer Care</h4>
            <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>Dedicated support via WhatsApp & Email</p>
          </div>
        </div>
      </div>
    </section>
  );
}
