import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import Toast from './components/Toast';

let toastIdCounter = 0;

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // Show a toast notification and auto-remove it after 2.5s
  const showToast = useCallback((product) => {
    const id = ++toastIdCounter;
    const message = `"${product.name.split(' ').slice(0, 3).join(' ')}..." added to cart!`;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  return (
    <div className="app-layout">
      {/* Fixed Navbar */}
      <Navbar onCartOpen={openCart} />

      {/* Main product content */}
      <main className="main-content" id="main-content">
        <ProductList onAddToCart={showToast} />
      </main>

      {/* Cart Sidebar + Backdrop */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />

      {/* Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
