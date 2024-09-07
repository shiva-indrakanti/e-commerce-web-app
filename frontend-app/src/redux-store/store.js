import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartslice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
