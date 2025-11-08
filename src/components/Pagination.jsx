import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../styles/Pagination.css';

export default function Pagination({ page, total, onChange }) {
  const getPages = () => {
    const pages = [];
    const delta = 2;
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= page - delta && i <= page + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...' && (i === page - delta - 1 || i === page + delta + 1)) {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <nav className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="pg-btn"
      >
        <FiChevronLeft /> Previous
      </button>

      <div className="page-numbers">
        {getPages().map((p, i) => (
          p === '...' ? (
            <span key={i} className="dots">...</span>
          ) : (
            <button
              key={i}
              className={`pg-num ${p === page ? 'active' : ''}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          )
        ))}
      </div>

      <button
        disabled={page === total}
        onClick={() => onChange(page + 1)}
        className="pg-btn"
      >
        Next <FiChevronRight />
      </button>
    </nav>
  );
}