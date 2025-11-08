import React from 'react';
import { useMediaQuery } from 'react-responsive';
import RangeSlider from './RangeSlider';
import '../styles/Sidebar.css';

export default function Sidebar({ categories, filters, onFilterChange, loading }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile || loading) return null;

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, 500],
      inStockOnly: false,
    });
  };

  const toggleCategory = (cat) => {
    const newCats = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    onFilterChange({ ...filters, categories: newCats });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__head">
        <h3>Filters</h3>
        <button className="clear-btn" onClick={clearFilters}>
          Clear All
        </button>
      </div>

      <section className="filter">
        <h4>Category</h4>
        {categories.map(c => (
          <label key={c} className="filter__opt">
            <input
              type="checkbox"
              checked={filters.categories.includes(c)}
              onChange={() => toggleCategory(c)}
            />
            {c.charAt(0).toUpperCase() + c.slice(1).replace(/'/g, "'")}
          </label>
        ))}
      </section>

      <section className="filter">
        <h4>Price Range</h4>
        <RangeSlider
          min={0}
          max={500}
          values={filters.priceRange}
          onChange={v => onFilterChange({ ...filters, priceRange: v })}
        />
        <div className="price-label">
          ${filters.priceRange[0]} – ${filters.priceRange[1]}
        </div>
      </section>

      <section className="filter">
        <label className="filter__opt">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={e => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
          />
          In Stock Only
        </label>
      </section>
    </aside>
  );
}