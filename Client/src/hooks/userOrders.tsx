import { useEffect, useState } from "react";
import { fetchProductByArticleId } from "../services/recommendationClient";
import { Order, ORDER_STATUS, PAYMENT_METHODS } from "../types/types";
import { getOrdersByUserId } from "../services/orderService";

const useUserOrders = (userId: number | string | null) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchOrdersWithDetails = async () => {
      setLoading(true);
      try {
        const rawOrders = await getOrdersByUserId(userId);

        const mappedOrders: Order[] = await Promise.all(
          rawOrders.map(async (raw: any) => {
            const items = await Promise.all(
              raw.orders.map(async (item: any) => {
                try {
                  const product = await fetchProductByArticleId(
                    item.article_mapped_id
                  );
                  return {
                    image: product.imageUrl,
                    name: product.prod_name,
                    color: product.colour_group_name || "N/A",
                    quantity: item.quantity,
                    total: item.price * item.quantity,
                    article_id: item.article_mapped_id,
                  };
                } catch (err) {
                  console.error(
                    `Failed to fetch product ${item.article_mapped_id}:`,
                    err
                  );
                  return {
                    image: "/images/fallback.jpg",
                    name: "Unknown Product",
                    color: "N/A",
                    quantity: item.quantity,
                    total: item.price * item.quantity,
                  };
                }
              })
            );

            return {
              id: raw._id,
              date: new Date(raw.date).toLocaleDateString(),
              estimatedDelivery: new Date(
                new Date(raw.date).getTime() + 5 * 86400000
              ).toLocaleDateString(),
              status:
                ORDER_STATUS[raw.orderStatus as keyof typeof ORDER_STATUS],
              paymentMethod:
                PAYMENT_METHODS[
                  raw.paymentMethod as keyof typeof PAYMENT_METHODS
                ],
              items,
            };
          })
        );

        setOrders(mappedOrders);
      } catch (err) {
        console.error("Order fetch failed:", err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersWithDetails();
  }, [userId]);

  return { orders, loading, error };
};

export default useUserOrders;
