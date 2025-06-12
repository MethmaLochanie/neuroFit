import axios from "axios";
import { fetchProductsByArticleIds } from "./recommendationClient";
import { Product } from "../types/types";

export const getRecommendations = async (params: {
  userId?: number;
  k: number;
  age?: number;
}): Promise<Product[]> => {
  try {
    const res = await axios.post("http://localhost:5000/recommend", {
      ...(params.userId ? { user_id: params.userId } : { age: params.age }),
      k: params.k || 10,
    });
    const productIds = res.data.recommended_products;
    return await fetchProductsByArticleIds(productIds);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
