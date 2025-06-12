import { useState } from "react";
import {
  addToCartService,
  getCartItemsByUserIdService,
} from "../services/cartService";
import { AddToCartData, CartItem } from "../types/types";

const useCart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const addToCartDb = async ({
    customer_mapped_id,
    article_id,
    quantity,
    subtotal,
    shipping,
    size,
  }: AddToCartData): Promise<CartItem | null> => {
    setLoading(true);
    try {
      const result = await addToCartService({
        customer_mapped_id,
        article_id,
        quantity,
        subtotal,
        shipping,
        size,
      });
      setLoading(false);
      return result;
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      return null;
    }
  };

  const getCartItemsByUserId = async (
    customer_mapped_id: number
  ): Promise<CartItem[] | null> => {
    setLoading(true);
    try {
      const result = await getCartItemsByUserIdService(customer_mapped_id);
      setLoading(false);
      return result;
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      return null;
    }
  };

  return {
    addToCartDb,
    getCartItemsByUserId,
    loading,
    error,
  };
};

export default useCart;
