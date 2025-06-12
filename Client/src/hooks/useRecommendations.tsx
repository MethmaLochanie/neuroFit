import { useState } from "react";
import { getRecommendations } from "../services/recommendationService";
import { Product } from "../types/types";

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async (params: {
    userId?: number;
    k: number;
    age?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const products = await getRecommendations(params);
      setRecommendations(products);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    recommendations,
    loading,
    error,
    fetchRecommendations,
    clearRecommendations: () => setRecommendations([]),
  };
};
