import React from 'react';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import StorySpotlight from '../components/StorySpotlight';
import FeaturesBanner from '../components/FeaturesBanner';

export default function HomePage({ 
  products, 
  currency, 
  wishlistIds, 
  onToggleWishlist, 
  onQuickView, 
  onAddToCart, 
  onNavigateToProducts,
  onSelectProduct 
}) {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero 
        onShopClick={onNavigateToProducts}
        onBestsellerClick={onNavigateToProducts}
      />

      {/* 2. Featured Best Sellers Preview */}
      <FeaturedSection 
        products={products}
        currency={currency}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onNavigateToProducts={onNavigateToProducts}
        onSelectProduct={onSelectProduct}
      />

      {/* 3. Brand Story & Craftsmanship Spotlight */}
      <StorySpotlight 
        onExploreArtisanal={onNavigateToProducts}
      />

      {/* 4. Trust Pillars & Features Banner */}
      <FeaturesBanner />
    </div>
  );
}
