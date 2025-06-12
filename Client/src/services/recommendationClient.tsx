import axios from "axios";
import api from "./api";
import { Product } from "../types/types";

export const fetchProductsByArticleIds = async (articleIds: number[]) => {
  const res = await api.post<Product[]>("/api/products/getProductsByIds", {
    articleIds,
  });
  return res.data;
};

export const fetchProductByArticleId = async (
  articleId: string
): Promise<Product> => {
  const res = await api.get<Product>(`/api/products/getProduct/${articleId}`);
  return res.data;
};
