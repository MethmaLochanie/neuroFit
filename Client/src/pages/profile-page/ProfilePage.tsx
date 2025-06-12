import React from "react";
import OrderHistory from "../../containers/order-history/OrderHistory";
import ReusableForm from "../../components/reusable-form/ReusableForm";
import ProfileCard from "../../containers/profile-card-page/ProfileCard";
import { useUserByCustomerMappedId } from "../../hooks/useUserByCustomerMappedId";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";
import showNotification from "../../components/custom-notification/CustomNotification";
import useAuth from "../../hooks/useAuth";
import useUserOrders from "../../hooks/userOrders";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const { user: authUser } = useAuth();
  const customer_mapped_id = authUser?.customer_mapped_id;
  const { user: fetchedUser } = useUserByCustomerMappedId(customer_mapped_id);
  const { updateProfile, isLoading } = useUpdateUserProfile();
  const { orders: userOrders } = useUserOrders(customer_mapped_id ?? 0);

  const handleFormSubmit = async (values: any) => {
    if (!customer_mapped_id) {
      showNotification({
        message: "Update Failed",
        description: "User ID not found. Please try again later.",
        type: "error",
      });
      return;
    }

    try {
      await updateProfile(customer_mapped_id, values);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const initialFormValues = {
    fName: fetchedUser?.fName || "",
    lName: fetchedUser?.lName || "",
    email: fetchedUser?.email || "",
    country: fetchedUser?.country || "",
    city: fetchedUser?.city || "",
    postalCode: fetchedUser?.postalCode || "",
    phoneNumber: fetchedUser?.phoneNumber || "",
    age: fetchedUser?.age || "",
  };

  const userName = `${fetchedUser?.fName} ${fetchedUser?.lName}` || "User";

  return (
    <div className="profile-page">
      <ProfileCard name={userName} email={fetchedUser?.email || ""} />
      <ReusableForm
        buttonName="Save"
        isAgeVisible={true}
        onSubmit={handleFormSubmit}
        isSignupPage={false}
        initialValues={initialFormValues}
        isLoading={isLoading}
      />
      <OrderHistory orders={userOrders} />
    </div>
  );
};

export default ProfilePage;
