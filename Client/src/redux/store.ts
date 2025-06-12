import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import recommendationReducer from './slices/recommendationSlice';
import wishlistReducer from './slices/wishlistSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    recommendations: recommendationReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
