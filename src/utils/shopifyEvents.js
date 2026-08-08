/**
 * Shopify Event Tracker & Analytics Compatibility Module
 */

export const trackShopifyEvent = (eventName, payload = {}) => {
  try {
    // 1. Console log event for developer debugging
    console.log(`[Shopify Analytics Event] ${eventName}:`, payload);

    // 2. Custom DOM Event for Shopify Headless Listening
    const customEvent = new CustomEvent(`shopify:${eventName}`, { detail: payload });
    window.dispatchEvent(customEvent);

    // 3. Meta / Facebook Pixel Compatibility if present on page
    if (window.fbq) {
      if (eventName === 'AddToCart') {
        window.fbq('track', 'AddToCart', {
          content_name: payload.name,
          value: payload.price,
          currency: payload.currency || 'INR'
        });
      } else if (eventName === 'InitiateCheckout') {
        window.fbq('track', 'InitiateCheckout', {
          value: payload.total,
          currency: payload.currency || 'INR'
        });
      }
    }
  } catch (err) {
    console.warn('Error emitting Shopify event:', err);
  }
};
