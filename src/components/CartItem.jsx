import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { increaseQty, decreaseQty, removeFromCart } from '../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      className="cart-item"
      id={`cart-item-${item.id}`}
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40, height: 0, padding: 0, margin: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
        loading="lazy"
      />

      {/* Details */}
      <div className="cart-item-details">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">${item.price.toFixed(2)} each</p>

        {/* Qty Controls + Item Total */}
        <div className="cart-item-controls">
          <div className="qty-controls">
            <motion.button
              id={`decrease-${item.id}`}
              className="qty-btn"
              onClick={() => dispatch(decreaseQty(item.id))}
              whileTap={{ scale: 0.85 }}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <Minus size={12} />
            </motion.button>

            <span className="qty-value" aria-live="polite">
              {item.quantity}
            </span>

            <motion.button
              id={`increase-${item.id}`}
              className="qty-btn"
              onClick={() => dispatch(increaseQty(item.id))}
              whileTap={{ scale: 0.85 }}
              aria-label={`Increase quantity of ${item.name}`}
            >
              <Plus size={12} />
            </motion.button>
          </div>

          <span className="cart-item-total">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <motion.button
        id={`remove-${item.id}`}
        className="remove-btn"
        onClick={() => dispatch(removeFromCart(item.id))}
        whileTap={{ scale: 0.85 }}
        aria-label={`Remove ${item.name} from cart`}
      >
        <Trash2 size={12} />
      </motion.button>
    </motion.div>
  );
};

export default CartItem;
