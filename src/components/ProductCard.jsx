import React from 'react';
import { FiPlus, FiStar } from 'react-icons/fi';
import '../styles/ProductCard.css';

function Stars({ rating }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <FiStar
          key={i}
          className={
            i < full ? 'filled' :
            i === full && hasHalf ? 'half' : ''
          }
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product, onAdd, onClick }) {
  return (
    <article className="card" onClick={() => onClick(product)}>
      <div className="card__img">
        <img src={product.image} alt={product.name} />
        <span className="badge in">In Stock</span>
      </div>

      <div className="card__body">
        <h3 className="card__title">{product.name}</h3>

        <div className="card__rating">
          <Stars rating={product.rating} />
          <span className="reviews">({product.reviewCount})</span>
        </div>

        <p className="card__price">${product.price.toFixed(0)}</p>

        <button
          className="card__btn"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
        >
          <FiPlus /> Add to Cart
        </button>
      </div>
    </article>
  );
}