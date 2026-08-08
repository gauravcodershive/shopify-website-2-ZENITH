import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, Sparkles, Globe } from 'lucide-react';

const MESSAGES = [
  { text: "100% Authentic Guaranteed Products", icon: <ShieldCheck size={14} style={{ color: '#d97706' }} /> },
  { text: "Express Nationwide Delivery", icon: <Truck size={14} style={{ color: '#38bdf8' }} /> },
  { text: "Handcrafted Premium Quality & Tech Essentials", icon: <Sparkles size={14} style={{ color: '#f59e0b' }} /> }
];

export default function AnnouncementBar({ currency, onCurrencyChange }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % MESSAGES.length);
        setFade(true);
      }, 300);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'relative' }}>
        
        {/* Animated Sliding Text Ticker */}
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#f8fafc',
              opacity: fade ? 1 : 0,
              transform: fade ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 300ms ease, transform 300ms ease'
            }}
          >
            {MESSAGES[index].icon}
            <span>{MESSAGES[index].text}</span>
          </div>
        </div>

        {/* Currency Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', position: 'absolute', right: '1.5rem' }}>
          <Globe size={13} style={{ color: '#94a3b8' }} />
          <select 
            value={currency} 
            onChange={(e) => onCurrencyChange(e.target.value)}
            style={{ 
              background: 'transparent', 
              color: '#ffffff', 
              border: 'none', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="INR" style={{ color: '#0f172a', fontWeight: 600 }}>₹ INR</option>
            <option value="USD" style={{ color: '#0f172a', fontWeight: 600 }}>$ USD</option>
            <option value="EUR" style={{ color: '#0f172a', fontWeight: 600 }}>€ EUR</option>
          </select>
        </div>
      </div>
    </div>
  );
}
