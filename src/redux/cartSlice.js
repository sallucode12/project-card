import { createSlice } from '@reduxjs/toolkit';

// Helper: recalculate totals from cartItems array
const recalcTotals = (cartItems) => {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

// Load state from localStorage (persistence)
const loadFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem('shopvibe-cart');
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

const savedState = loadFromLocalStorage();

const initialState = savedState || {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a product to cart (or increase qty if already exists)
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }

      const totals = recalcTotals(state.cartItems);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    // Remove an item completely from cart
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      const totals = recalcTotals(state.cartItems);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    // Increase quantity by 1
    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        item.quantity += 1;
      }

      const totals = recalcTotals(state.cartItems);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    // Decrease quantity by 1 (remove item if qty reaches 0)
    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter((i) => i.id !== id);
        }
      }

      const totals = recalcTotals(state.cartItems);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    // Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
