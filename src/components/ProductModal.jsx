import React, { useState, useEffect } from 'react';
import { FiX, FiStar, FiPlus } from 'react-icons/fi';
import { getRelatedProducts } from '../utils/api';
import '../styles/Modal.css';

function Stars({ rating }) {
  const full = Math.floor(rating);
  const hasDecimal = rating % 1 !== 0;
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <FiStar
          key={i}
          className={
            i < full
              ? 'star filled'
              : i === full && hasDecimal
                ? 'star half'
                : 'star'
          }
          size={16}
        />
      ))}
    </div>
  );
}

export default function ProductModal({ product, open, onClose, onAdd, onDetail }) {
  const [related, setRelated] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    if (open && product) {
      setLoadingRelated(true);
      getRelatedProducts(product.id, product.category)
        .then(setRelated)
        .finally(() => setLoadingRelated(false));
    }
  }, [open, product]);

  if (!open || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header className="modal__head">
          <h2>{product.name}</h2>
          <button className="close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </header>

        <div className="modal__body">
          <div className="detail-img-container">
            <img src={product.image} alt={product.name} className="detail-img" />
          </div>

          <div className="detail-info">
            <div className="rating">
              <Stars rating={product.rating} />
              <span className="reviews">({product.reviewCount} reviews)</span>
            </div>

            <h3 className="price">${product.price.toFixed(0)}</h3>

            <div className="desc">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>

            <span className="stock in-stock">In Stock</span>

            <button className="add-btn" onClick={() => onAdd(product)}>
              <FiPlus /> Add to Cart - ${product.price.toFixed(0)}
            </button>

            <div className="reviews-snippet">
              <h4>Reviews Snippet</h4>
              <div className="review">
                <div className="review-header">
                  <span className="reviewer">John D.</span>
                  <Stars rating={4.5} />
                </div>
                <p>"Amazing quality and value!"</p>
              </div>
              <div className="review">
                <div className="review-header">
                  <span className="reviewer">Sarah K.</span>
                  <Stars rating={5} />
                </div>
                <p>"Perfect for daily use, highly recommend."</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="modal__foot">
          <h3>Related Products</h3>
          {loadingRelated ? (
            <p>Loading related...</p>
          ) : (
            <div className="related-grid">
              {related.length > 0 ? (
                related.map(p => (
                  <div
                    key={p.id}
                    className="related-card"
                    onClick={() => {
                      onClose();
                      setTimeout(() => onDetail(p), 300);
                    }}
                  >
                    <img src={p.image} alt={p.name} />
                    <h4>{p.name}</h4>
                    <p>${p.price.toFixed(0)}</p>
                  </div>
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}