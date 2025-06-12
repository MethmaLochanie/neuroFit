import api from "./api";

export const getSignedAzureUrl = async (imageUrl: string): Promise<string> => {
  try {
    const response = await api.get(`api/products/signed-url`, {
      params: { imageUrl }
    });
    return response.data.signedUrl;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
};

export const toggleWishlist = async (userId: string, item: any) => {
  try {
    const response = await api.post(`api/products/wishlist`, { userId, item });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWishlist = async (userId: string) => {
  try {
    const response = await api.get(`api/products/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 