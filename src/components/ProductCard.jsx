import React from 'react';
import { FiPlus, FiStar } from 'react-icons/fi';
import '../styles/ProductCard.css';

function Stars({ rating }) {
  const full = Math.floor(rating);
  const hasDecimal = rating % 1 !== 0;
  const decimal = Math.round((rating % 1) * 2) / 2; // Half stars
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <FiStar
          key={i}
          className={
            i < full 
              ? 'star filled' 
              : i === full && hasDecimal && decimal > 0.25 
                ? (decimal >= 0.75 ? 'star filled' : 'star half') 
                : 'star'
          }
          size={14}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product, onAdd, onClick }) {
  return (
    <article className="card" onClick={() => onClick(product)}>
      <div className="card__img">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className={`badge in`}>In Stock</span> {/* Always in stock */}
      </div>

      <div className="card__body">
        <h3 className="card__title" title={product.name}>{product.name}</h3>

        <div className="card__rating">
          <Stars rating={product.rating} />
          <span className="reviews">({product.reviewCount})</span>
        </div>

        <p className="card__price">${product.price.toFixed(0)}</p>

        <button
          className="card__btn"
          onClick={e => {
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