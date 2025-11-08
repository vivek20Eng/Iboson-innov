import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartModal from './components/CartModal';
import { fetchProducts, fetchCategories } from './utils/api';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMediaQuery } from 'react-responsive';
import './App.css';

export default function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // API Data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [prods, cats] = await Promise.all([fetchProducts(), fetchCategories()]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        setError('Failed to load products. Please refresh.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 500],
    inStockOnly: false,
  });

  // Pagination
  const [page, setPage] = useState(1);

  // Cart
  const [cart, setCart] = useLocalStorage('cart', {});

  // Modals
  const [detailProd, setDetailProd] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Filtered Products
  const filtered = useMemo(() => {
    if (loading) return [];
    let list = products;

    if (search) {
      const lower = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(lower));
    }

    if (filters.categories.length) {
      list = list.filter(p => filters.categories.includes(p.category));
    }

    list = list.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    if (filters.inStockOnly) {
      list = list.filter(p => p.inStock);
    }

    return list;
  }, [products, search, filters, loading]);

  useEffect(() => {
    setPage(1);
  }, [filtered.length]);

  const addToCart = prod => {
    setCart(prev => ({ ...prev, [prod.id]: (prev[prod.id] || 0) + 1 }));
  };

  const cartCount = useMemo(() => 
    Object.values(cart).reduce((s, q) => s + q, 0), [cart]
  );

  const handleDetail = p => {
    setDetailProd(p);
    setShowDetail(true);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        toggleCart={() => setShowCart(!showCart)}
        onSearch={setSearch}
      />

      <main className="main">
        {!isMobile && (
          <Sidebar
            categories={categories}
            filters={filters}
            onFilterChange={setFilters}
            loading={loading}
          />
        )}

        <section className="content">
          <ProductGrid
            filtered={filtered}
            page={page}
            onPage={setPage}
            onAdd={addToCart}
            onDetail={handleDetail}
            loading={loading}
          />
        </section>
      </main>

      <ProductModal
        product={detailProd}
        open={showDetail}
        onClose={() => setShowDetail(false)}
        onAdd={addToCart}
        onDetail={handleDetail}
      />

      <CartModal
        items={products}
        cart={cart}
        setCart={setCart}
        open={showCart}
        onClose={() => setShowCart(false)}
      />
    </div>
  );
}