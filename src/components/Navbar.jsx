import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Zap, Store } from 'lucide-react';

const Navbar = ({ onCartOpen }) => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const [scrolled, setScrolled] = useState(false);
  const [prevCount, setPrevCount] = useState(totalQuantity);
  const [badgePop, setBadgePop] = useState(false);

  // Detect scroll for navbar style change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger badge pop animation when count changes
  useEffect(() => {
    if (totalQuantity !== prevCount) {
      setBadgePop(true);
      const t = setTimeout(() => setBadgePop(false), 400);
      setPrevCount(totalQuantity);
      return () => clearTimeout(t);
    }
  }, [totalQuantity, prevCount]);

  return (
    <nav
      className="navbar"
      style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none' }}
    >
      {/* Brand */}
      <a className="navbar-brand" href="#" aria-label="ShopVibe Home">
        <div className="navbar-logo">
          <Store size={18} color="white" />
        </div>
        <div>
          <div className="navbar-title">ShopVibe</div>
          <div className="navbar-subtitle">Premium Store</div>
        </div>
      </a>

      {/* Right side */}
      <div className="navbar-right">
        <span className="navbar-products-count" aria-label="Products available">
          ✦ Curated Picks
        </span>

        {/* Cart Button */}
        <motion.button
          id="cart-toggle-btn"
          className="cart-button"
          onClick={onCartOpen}
          whileTap={{ scale: 0.95 }}
          aria-label={`Open cart, ${totalQuantity} items`}
        >
          <ShoppingCart size={18} />
          <span>Cart</span>

          {/* Animated Badge */}
          <AnimatePresence>
            {totalQuantity > 0 && (
              <motion.span
                key="badge"
                className={`cart-badge ${badgePop ? 'badge-pop' : ''}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                {totalQuantity}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
