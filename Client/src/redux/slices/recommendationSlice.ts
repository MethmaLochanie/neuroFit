import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getRecommendations } from "../../services/recommendationService";
import { Product } from "../../types/types";

interface RecommendationState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: RecommendationState = {
  products: [],
  loading: false,
  error: null,
};

export const loadRecommendations = createAsyncThunk<Product[], { userId?: number; k: number; age?: number; }>(
  "recommendations/loadRecommendations",
  async (params, thunkAPI) => {
    try {
      return await getRecommendations(params);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const recommendationSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    clearRecommendations(state) {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRecommendations.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(loadRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRecommendations } = recommendationSlice.actions;
export default recommendationSlice.reducer;