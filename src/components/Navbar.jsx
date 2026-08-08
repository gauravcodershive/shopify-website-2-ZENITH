import React from 'react';
import { ShoppingBag, Heart, Search, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  onNavigate, 
  searchQuery, 
  setSearchQuery, 
  cartCount, 
  wishlistCount,
  onOpenCart,
  onOpenWishlist
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <a 
          href="/" 
          className="brand-logo" 
          onClick={(e) => { 
            e.preventDefault(); 
            onNavigate('home'); 
          }}
        >
          <div className="logo-icon">
            <Sparkles size={20} />
          </div>
          <span>ZENITH</span>
        </a>

        {/* Desktop Navigation Links - Home (/) & Products (/products) */}
        <ul className="nav-links">
          <li>
            <a 
              href="/"
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/products"
              className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('products');
              }}
            >
              Products
            </a>
          </li>
        </ul>

        {/* Search & Actions */}
        <div className="nav-actions">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={16} />
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab === 'home' && e.target.value.trim()) {
                  onNavigate('products');
                }
              }}
            />
          </div>

          <button 
            className="action-btn" 
            title="Wishlist"
            onClick={onOpenWishlist}
          >
            <Heart size={20} />
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </button>

          <button 
            className="action-btn" 
            title="Shopping Cart"
            onClick={onOpenCart}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="action-btn mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{ background: '#ffffff', padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a 
            href="/"
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
          >
            Home
          </a>
          <a 
            href="/products"
            className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('products');
              setMobileMenuOpen(false);
            }}
          >
            Products
          </a>
        </div>
      )}
    </nav>
  );
}
