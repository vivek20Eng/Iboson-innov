import React from 'react';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import SearchBar from './SearchBar';
import '../styles/Header.css';

export default function Header({ cartCount, toggleCart, onSearch }) {
  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="logo">🛒 TechStore</h1>

        <SearchBar onSearch={onSearch} />

        <button className="cart-btn" onClick={toggleCart} aria-label="Cart">
          <FiShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}