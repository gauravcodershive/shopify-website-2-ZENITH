/**
 * Shopify Storefront API Service Layer (Version 2024-04)
 * Allows seamless connection to any live Shopify store via Storefront GraphQL API
 */

const DEFAULT_CONFIG = {
  domain: localStorage.getItem('shopify_domain') || '',
  token: localStorage.getItem('shopify_token') || '',
  apiVersion: '2024-04'
};

export const getShopifyConfig = () => {
  return {
    domain: localStorage.getItem('shopify_domain') || '',
    token: localStorage.getItem('shopify_token') || '',
    isConnected: Boolean(localStorage.getItem('shopify_domain') && localStorage.getItem('shopify_token'))
  };
};

export const saveShopifyConfig = (domain, token) => {
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  localStorage.setItem('shopify_domain', cleanDomain);
  localStorage.setItem('shopify_token', token.trim());
};

export const clearShopifyConfig = () => {
  localStorage.removeItem('shopify_domain');
  localStorage.removeItem('shopify_token');
};

/**
 * Execute GraphQL Query against Shopify Storefront API
 */
export const shopifyFetch = async (query, variables = {}) => {
  const config = getShopifyConfig();
  if (!config.isConnected) {
    throw new Error('Shopify Storefront API not configured');
  }

  const endpoint = `https://${config.domain}/api/2024-04/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': config.token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map(e => e.message).join(', '));
  }

  return json.data;
};

/**
 * Fetch Live Products from Shopify
 */
export const fetchShopifyProducts = async () => {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              maxVariantPrice {
                amount
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { first: 20 });
    return data.products.edges.map(({ node }) => ({
      id: node.id,
      shopifyHandle: node.handle,
      name: node.title,
      subtitle: node.description ? node.description.slice(0, 60) + '...' : '',
      price: Math.round(parseFloat(node.priceRange.minVariantPrice.amount)),
      compareAtPrice: node.compareAtPriceRange?.maxVariantPrice?.amount 
        ? Math.round(parseFloat(node.compareAtPriceRange.maxVariantPrice.amount))
        : null,
      rating: 4.9,
      reviewsCount: 150,
      image: node.featuredImage?.url || '/images/headphones.png',
      gallery: node.images.edges.map(e => e.node.url),
      badge: "Shopify Live",
      badgeType: "hot",
      inStock: true,
      featured: true,
      description: node.description,
      variants: node.variants.edges.map(e => e.node)
    }));
  } catch (error) {
    console.warn('Failed to fetch from Shopify Storefront API:', error.message);
    return null;
  }
};

/**
 * Create Live Shopify Checkout Session & Return Checkout Web URL
 */
export const createShopifyCheckout = async (cartItems) => {
  const config = getShopifyConfig();
  if (!config.isConnected) return null;

  const mutation = `
    mutation createCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          message
          field
        }
      }
    }
  `;

  const lineItems = cartItems.map(item => ({
    variantId: item.shopifyVariantId || item.id,
    quantity: item.quantity || 1
  }));

  try {
    const data = await shopifyFetch(mutation, { input: { lineItems } });
    if (data?.checkoutCreate?.checkout?.webUrl) {
      return data.checkoutCreate.checkout.webUrl;
    }
  } catch (err) {
    console.error('Error creating Shopify Checkout:', err);
  }
  return null;
};
