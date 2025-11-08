import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi'; // Fixed: Added FiSearch
import { useDebounce } from '../hooks/useDebounce';
import '../styles/SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const debounced = useDebounce(term, 300);

  React.useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  const clear = () => {
    setTerm('');
    onSearch('');
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search products..."
        value={term}
        onChange={e => setTerm(e.target.value)}
        className="search__input"
      />
      <FiSearch className="search__icon" /> {/* Now defined */}
      {term && (
        <button className="search__clear" onClick={clear} aria-label="Clear search">
          <FiX />
        </button>
      )}
    </div>
  );
}