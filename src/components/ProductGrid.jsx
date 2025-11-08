import React from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { useMediaQuery } from 'react-responsive';
import '../styles/ProductGrid.css';

export default function ProductGrid({
  filtered,
  page,
  onPage,
  onAdd,
  onDetail,
  loading
}) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const perPage = isMobile ? 6 : 9;
  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  if (loading) {
    return (
      <div className="loading-grid">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="empty">
        <h3>No products found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <section className="grid-section">
      <header className="grid-header">
        <h2>All Products <span className="count">({filtered.length})</span></h2>
      </header>

      <div className="grid">
        {items.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={onAdd}
            onClick={onDetail}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} total={totalPages} onChange={onPage} />
      )}
    </section>
  );
}