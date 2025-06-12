import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getWishlist, toggleWishlist } from "../../services/imageService";

interface WishlistItem {
  articleId: string;
  title: string;
  price: number;
  imageUrl: string;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId: string) => {
    const data = await getWishlist(userId);
    return data?.items || [];
  }
);

export const toggleWishlistItem = createAsyncThunk(
  "wishlist/toggleWishlistItem",
  async (
    { userId, item }: { userId: string; item: WishlistItem; },
    { getState, dispatch }
  ) => {
    const res = await toggleWishlist(userId, item);
    return { item, action: res.action };
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload;
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        const { item, action: act } = action.payload;
        if (act === "added") {
          if (!state.items.some((i) => i.articleId === item.articleId)) {
            state.items.push(item);
          }
        } else if (act === "removed") {
          state.items = state.items.filter((i) => i.articleId !== item.articleId);
        }
      });
  },
});

export const { setWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 