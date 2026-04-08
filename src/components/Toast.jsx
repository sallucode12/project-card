import { AnimatePresence, motion } from 'framer-motion';

/**
 * Toast notification component.
 * Renders a list of toast messages at the bottom of the screen.
 * @param {Array} toasts - Array of toast objects with { id, message }
 */
const Toast = ({ toasts }) => {
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="toast"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <span className="toast-dot" />
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
