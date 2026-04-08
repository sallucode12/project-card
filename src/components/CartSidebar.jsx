import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ShoppingCart, Trash2, ArrowRight, PackageOpen } from 'lucide-react';
import CartItem from './CartItem';
import { clearCart } from '../redux/cartSlice';

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handleClearCart = () => {
    if (window.confirm('Clear all items from your cart?')) {
      dispatch(clearCart());
    }
  };

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 320, damping: 35 },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="cart-overlay"
            id="cart-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.aside
            className="cart-sidebar"
            id="cart-sidebar"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="cart-header">
              <div className="cart-header-left">
                <div className="cart-header-icon">
                  <ShoppingCart size={18} color="var(--accent-secondary)" />
                </div>
                <div>
                  <h2 className="cart-title">Your Cart</h2>
                  <p className="cart-count-tag">
                    {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              <button
                id="cart-close-btn"
                className="cart-close-btn"
                onClick={onClose}
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Empty State */}
            {cartItems.length === 0 ? (
              <motion.div
                className="cart-empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="cart-empty-icon">
                  <PackageOpen size={36} />
                </div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven&apos;t added anything yet. Start exploring our curated collection!</p>
                <button
                  id="continue-shopping-btn"
                  className="continue-shopping-btn"
                  onClick={onClose}
                >
                  <ShoppingBag size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="cart-items-list" role="list" aria-label="Cart items">
                  <AnimatePresence mode="popLayout">
                    {cartItems.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer: Summary + Actions */}
                <div className="cart-footer">
                  <div className="cart-summary">
                    <div className="summary-row">
                      <span className="summary-label">Subtotal</span>
                      <span className="summary-value">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">
                        Shipping {totalPrice > 100 && '(Free over $100)'}
                      </span>
                      <span
                        className="summary-value"
                        style={{ color: shipping === 0 ? 'var(--success)' : undefined }}
                      >
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Tax (8%)</span>
                      <span className="summary-value">${tax.toFixed(2)}</span>
                    </div>
                    <div className="summary-divider" />
                    <div className="summary-total-row">
                      <span className="summary-total-label">Total</span>
                      <motion.span
                        key={grandTotal}
                        className="summary-total-value"
                        initial={{ scale: 1.15, color: 'var(--accent-secondary)' }}
                        animate={{ scale: 1, color: 'var(--text-primary)' }}
                        transition={{ duration: 0.3 }}
                      >
                        ${grandTotal.toFixed(2)}
                      </motion.span>
                    </div>
                  </div>

                  <button
                    id="checkout-btn"
                    className="checkout-btn"
                    onClick={() => alert('Proceeding to checkout! 🎉')}
                  >
                    Checkout
                    <ArrowRight size={17} />
                  </button>

                  <button
                    id="clear-cart-btn"
                    className="clear-cart-btn"
                    onClick={handleClearCart}
                  >
                    <Trash2 size={14} />
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
