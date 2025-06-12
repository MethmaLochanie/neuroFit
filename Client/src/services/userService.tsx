import api from "./api";

export const getUserByCustomerMappedId = async (customer_mapped_id: number) => {
  try {
    const response = await api.get(`/api/users/user/by-customer-mapped-id/${customer_mapped_id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export interface UpdateUserProfileData {
  fName: string;
  lName: string;
  email: string;
  country: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  age?: number;
}

export const updateUserProfile = async (customer_mapped_id: number, data: UpdateUserProfileData) => {
  try {
    const response = await api.put(`/api/users/user/update/${customer_mapped_id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 