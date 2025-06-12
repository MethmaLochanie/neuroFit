import { AddToCartData, CartItem } from "../types/types";
import api from "./api";

export const addToCartService = async ({
  customer_mapped_id,
  article_id,
  quantity,
  subtotal,
  shipping,
  size,
}: AddToCartData): Promise<CartItem | null> => {
  try {
    const response = await api.post("api/carts/addToCart", {
      customer_mapped_id,
      article_id,
      quantity,
      subtotal,
      shipping,
      size,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export const getCartItemsByUserIdService = async (
  customer_mapped_id: number
): Promise<CartItem[] | null> => {
  try {
    const response = await api.get(`api/carts/items/${customer_mapped_id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export const updateCartItemService = async (
  id: string,
  { quantity, subtotal }: { quantity: number; subtotal: number }
): Promise<CartItem> => {
  try {
    const response = await api.put<CartItem>(`api/carts/update/${id}`, {
      quantity,
      subtotal,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export const removeFromCartService = async (_id: string): Promise<void> => {
  try {
    await api.delete(`/api/carts/remove/${_id}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to delete item");
  }
};
