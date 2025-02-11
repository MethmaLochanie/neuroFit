import api from "./api";

// Define the expected response type (replace with actual API response structure)
interface LoginResponse {
  token?: string;
  user?: any; // Replace `any` with a proper User type if available
  error?: boolean;
  message?: string;
}

// Define function parameters and return type
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("api/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: true, message: "An unknown error occurred" };
  }
};

export const signupUser = async (values: any) => {
  try {
    const response = await api.post("api/auth/register", values);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: true, message: "An unknown error occurred" };
  }
};
