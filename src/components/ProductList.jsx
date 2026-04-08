import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';

// Skeleton loading card
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image" />
    <div className="skeleton-body">
      <div className="skeleton-line short" />
      <div className="skeleton-line full" />
      <div className="skeleton-line medium" />
      <div className="skeleton-line short" />
    </div>
  </div>
);

const ProductList = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Simulate a loading state
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section aria-label="Product listing">
      {/* Hero */}
      <div className="hero">
        <div className="hero-tag">⚡ New Arrivals &amp; Best Sellers</div>
        <h1>
          Discover <span>Premium</span> Products
        </h1>
        <p className="hero-desc">
          Curated collection of the finest tech, accessories, and lifestyle
          products — all in one place.
        </p>
      </div>

      {/* Category Filters */}
      <div className="filters-bar" role="group" aria-label="Product categories">
        <span className="filter-label">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase()}`}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="product-grid" id="product-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
      </div>
    </section>
  );
};

export default ProductList;
