import api from "./api";

export const getOrdersByUserId = async (user_mapped_id: number | string) => {
  const response = await api.get(`api/orders/getOrders/${user_mapped_id}`);
  return response.data;
};
