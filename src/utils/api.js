const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=20`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    // Map to our format (add inStock: true, reviewCount from rating.count)
    return data.map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
      inStock: true, 
      rating: product.rating.rate,
      reviewCount: product.rating.count
    }));
  } catch (error) {
    console.error('API Error:', error);
    return []; 
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return ['electronics', "men's clothing", "women's clothing", 'jewelery']; 
  }
};

// For related: fetch all and filter (API doesn't support category query directly---)
export const getRelatedProducts = async (productId, category, limit = 4) => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    const mapped = data.map(p => ({
      id: p.id,
      name: p.title,
      price: p.price,
      category: p.category,
      image: p.image,
      description: p.description,
      inStock: true,
      rating: p.rating.rate,
      reviewCount: p.rating.count
    }));
    return mapped.filter(p => p.category === category && p.id !== productId).slice(0, limit);
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};