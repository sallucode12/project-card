import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Save cart state to localStorage on every state change
const saveToLocalStorage = (state) => {
  try {
    const serialized = JSON.stringify(state.cart);
    localStorage.setItem('shopvibe-cart', serialized);
  } catch {
    // Ignore write errors
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Subscribe to store changes to persist cart
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
