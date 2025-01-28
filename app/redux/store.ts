// store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Configure the store
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Infer types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
