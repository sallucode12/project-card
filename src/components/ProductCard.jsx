import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { addToCart } from '../redux/cartSlice';

// Helper: render star rating
const StarRating = ({ rating }) => {
  return (
    <div className="stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(rating) ? '' : 'empty'}`}
        >
          {star <= Math.round(rating) ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAdd = () => {
    dispatch(addToCart(product));
    // Notify parent for toast (optional)
    if (onAddToCart) onAddToCart(product);
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <motion.article
      className="product-card"
      id={`product-${product.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      layout
    >
      {/* Image */}
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {discount > 0 && (
          <span className="product-badge">−{discount}%</span>
        )}
      </div>

      {/* Body */}
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h2 className="product-title">{product.name}</h2>

        <div className="product-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Footer */}
        <div className="product-footer">
          <div className="product-price">
            {product.originalPrice > product.price && (
              <span className="price-original">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="price-main">${product.price.toFixed(2)}</span>
          </div>

          <motion.button
            id={`add-to-cart-${product.id}`}
            className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={handleAdd}
            whileTap={{ scale: 0.92 }}
            aria-label={`${isInCart ? 'Already in cart' : 'Add to cart'}: ${product.name}`}
          >
            {isInCart ? (
              <>
                <Check size={15} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={15} />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
