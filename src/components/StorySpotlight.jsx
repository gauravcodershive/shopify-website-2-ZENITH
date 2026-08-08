import React from 'react';
import { ArrowRight, Award, Flame, ShieldCheck } from 'lucide-react';

export default function StorySpotlight({ onExploreArtisanal }) {
  return (
    <section style={{ padding: '4.5rem 0', background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)', color: '#0f172a', position: 'relative', overflow: 'hidden', borderTop: '1px solid #e2e8f0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: '#e0e7ff', border: '1px solid #c7d2fe', color: '#4338ca', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            <Award size={14} /> Culinary Engineering Excellence
          </div>

          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '1.25rem' }}>
            Engineered for Precision. <br />Built for Everyday Life.
          </h2>

          <p style={{ fontSize: '1.0625rem', color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
            Every appliance in the ZENITH catalog is built with food-grade BPA-free Tritan glass, 304 surgical stainless steel, pure copper high-torque motors, and precision PID temperature controllers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.25rem' }}>
            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15,23,42,0.03)' }}>
              <Flame size={20} style={{ color: '#4f46e5', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a', marginBottom: '0.2rem' }}>100% Food-Grade Materials</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>304 Stainless Steel & Tritan BPA-Free</div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15,23,42,0.03)' }}>
              <ShieldCheck size={20} style={{ color: '#4f46e5', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a', marginBottom: '0.2rem' }}>2-Year Appliance Warranty</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Coverage on motor & thermal sensors</div>
            </div>
          </div>

          <button className="btn-primary" onClick={onExploreArtisanal}>
            Explore Appliance Collection <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 16px 36px rgba(15,23,42,0.08)', border: '1px solid #e2e8f0' }}>
          <img src="/images/espresso_machine.png" alt="Barista Espresso Machine Showcase" style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  );
}
