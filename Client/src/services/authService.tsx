import api from "./api";

interface LoginResponse {
  token?: string;
  user?: any;
  error?: boolean;
  message?: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: true,
        message: "An unknown error occurred",
      }
    );
  }
};

export const signupUser = async (values: any) => {
  try {
    const response = await api.post("api/auth/register", values);
    return response.data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: true,
        message: "An unknown error occurred",
      }
    );
  }
};
