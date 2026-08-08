import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Link2, Key, Globe, Shield, RefreshCw } from 'lucide-react';
import { getShopifyConfig, saveShopifyConfig, clearShopifyConfig, shopifyFetch } from '../services/shopify';

export default function ShopifyConnectModal({ isOpen, onClose, onConfigSaved }) {
  const currentConfig = getShopifyConfig();
  const [domain, setDomain] = useState(currentConfig.domain || '');
  const [token, setToken] = useState(currentConfig.token || '');
  const [status, setStatus] = useState(currentConfig.isConnected ? 'connected' : 'idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleTestAndSave = async (e) => {
    e.preventDefault();
    if (!domain.trim() || !token.trim()) {
      setErrorMessage('Please enter both Shopify Domain and Storefront Access Token');
      return;
    }

    setStatus('testing');
    setErrorMessage('');

    try {
      saveShopifyConfig(domain, token);
      
      // Test query
      const query = `{ shop { name description } }`;
      const data = await shopifyFetch(query);

      if (data?.shop?.name) {
        setStatus('connected');
        onConfigSaved(`🟢 Successfully connected to ${data.shop.name}!`);
        onClose();
      } else {
        throw new Error('Invalid response from Shopify API');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to connect. Please check domain & Storefront Token.');
      clearShopifyConfig();
    }
  };

  const handleDisconnect = () => {
    clearShopifyConfig();
    setDomain('');
    setToken('');
    setStatus('idle');
    onConfigSaved('Disconnected from external Shopify store. Running in Standalone Demo Mode.');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="quick-view-modal" 
        style={{ maxWidth: '640px', gridTemplateColumns: '1fr' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', background: '#95bf47', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              🛍️
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
              Shopify Storefront Integration
            </h2>
          </div>

          <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Connect this frontend web store directly to your official <strong>Shopify Admin</strong> using your Storefront API credentials.
          </p>

          {/* Connection Status Pill */}
          <div style={{ 
            padding: '0.85rem 1.25rem', 
            borderRadius: '0.85rem', 
            background: currentConfig.isConnected ? '#ecfdf5' : '#fef3c7',
            border: `1px solid ${currentConfig.isConnected ? '#a7f3d0' : '#fde68a'}`,
            color: currentConfig.isConnected ? '#065f46' : '#92400e',
            fontSize: '0.875rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.75rem'
          }}>
            {currentConfig.isConnected ? (
              <>
                <CheckCircle size={18} style={{ color: '#10b981' }} />
                <span>Status: Connected to <strong>{currentConfig.domain}</strong> (Live Mode)</span>
              </>
            ) : (
              <>
                <AlertTriangle size={18} style={{ color: '#d97706' }} />
                <span>Status: Standalone Demo Mode (Built-in Mock Storefront)</span>
              </>
            )}
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleTestAndSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <Globe size={14} /> Shopify Store Domain
              </label>
              <input 
                type="text"
                placeholder="e.g. your-store.myshopify.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #cbd5e1', borderRadius: '0.65rem', fontSize: '0.875rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <Key size={14} /> Storefront Access Token
              </label>
              <input 
                type="password"
                placeholder="Paste Storefront API Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #cbd5e1', borderRadius: '0.65rem', fontSize: '0.875rem' }}
              />
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                Get this from: <em>Shopify Admin ➔ Settings ➔ Apps ➔ Headless / Custom Apps</em>
              </div>
            </div>

            {errorMessage && (
              <div style={{ color: '#ef4444', fontSize: '0.8125rem', fontWeight: 600 }}>
                {errorMessage}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ flexGrow: 1, justifyContent: 'center' }}
                disabled={status === 'testing'}
              >
                {status === 'testing' ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" /> Verifying Connection...
                  </>
                ) : (
                  <>
                    <Link2 size={16} /> Save & Connect Shopify Store
                  </>
                )}
              </button>

              {currentConfig.isConnected && (
                <button 
                  type="button" 
                  onClick={handleDisconnect}
                  style={{ padding: '0.75rem 1.25rem', background: '#f1f5f9', color: '#64748b', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 700 }}
                >
                  Disconnect
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
