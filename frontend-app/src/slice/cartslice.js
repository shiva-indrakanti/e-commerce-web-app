import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += product.price * quantity;
      } else {
        state.cartItems.push({ ...product, quantity, totalPrice: product.price * quantity });
      }
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },

    increaseQuantity(state, action) {
      const { id } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
        item.totalPrice += item.price;
      }
    },

    decreaseQuantity(state, action) {
      const { id } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice -= item.price;
        } else {
          state.cartItems = state.cartItems.filter(item => item.id !== id);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
