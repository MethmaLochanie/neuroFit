import { useState } from "react";
import {
  updateUserProfile,
  UpdateUserProfileData,
} from "../services/userService";
import { notification } from "antd";
import showNotification from "../components/custom-notification/CustomNotification";

export const useUpdateUserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (
    customer_mapped_id: number,
    data: UpdateUserProfileData
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await updateUserProfile(customer_mapped_id, data);
      showNotification({
        message: "Profile Updated",
        description: "Your profile has been successfully updated.",
        type: "success",
      });
      return response;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile";
      setError(errorMessage);
      notification.error({
        message: "Update Failed",
        description: errorMessage,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
  };
};
