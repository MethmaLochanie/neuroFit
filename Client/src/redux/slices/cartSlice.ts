import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  _id: string;
  article_id: string;
  shipping: string;
  subtotal: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  checkoutItems: CartItem[];
}

const initialState: CartState = {
  items: [],
  checkoutItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        item =>
          item._id === action.payload._id
        // item.color === action.payload.color &&
        // item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    clearCart(state) {
      state.items = [];
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity, price, subtotal } = action.payload;
      const item = state.items.find(item => item._id === id);
      if (item) {
        item.quantity = quantity;
        item.subtotal = subtotal;
      }
    },
    setCheckoutItems(state, action: PayloadAction<CartItem[]>) {
      state.checkoutItems = action.payload;
    }
  },
});

export const { addToCart, clearCart, removeItem, updateQuantity, setCheckoutItems } = cartSlice.actions;
export default cartSlice.reducer;
