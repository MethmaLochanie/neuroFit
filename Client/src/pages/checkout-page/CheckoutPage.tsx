import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomTitle from "../../components/custom-title/CustomTitle";
import ReusableForm from "../../components/reusable-form/ReusableForm";
import useAuth from "../../hooks/useAuth";
import { useUserByCustomerMappedId } from "../../hooks/useUserByCustomerMappedId";
import showNotification from "../../components/custom-notification/CustomNotification";
import useCart from "../../hooks/useCart";
import OrderSummaryModal from "../../components/order-summary-modal/OrderSummaryModal";
import "./CheckoutPage.css";

const CheckoutPage: React.FC = () => {
  const { user: authUser } = useAuth();
  const customer_mapped_id = authUser?.customer_mapped_id;
  const { user: fetchedUser, loading: userLoading } =
    useUserByCustomerMappedId(customer_mapped_id);
  const { getCartItemsByUserId } = useCart();
  const location = useLocation();
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadCheckoutItems = async () => {
      setIsLoading(true);
      try {
        if (location.state?.checkoutItems) {
          setCheckoutItems(location.state.checkoutItems);
        } else if (customer_mapped_id) {
          const cartItems = await getCartItemsByUserId(customer_mapped_id);
          setCheckoutItems(cartItems || []);
        }
      } catch (error) {
        showNotification({
          message: "Error",
          description: "Failed to load checkout items",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCheckoutItems();
  }, [customer_mapped_id, location.state]);

  const initialFormValues = {
    fName: fetchedUser?.fName || "",
    lName: fetchedUser?.lName || "",
    email: fetchedUser?.email || "",
    country: fetchedUser?.country || "",
    city: fetchedUser?.city || "",
    postalCode: fetchedUser?.postalCode || "",
    phoneNumber: fetchedUser?.phoneNumber || "",
  };

  const calculateTotal = () => {
    const subtotal = checkoutItems.reduce(
      (total, item) => total + (item.subtotal || 0),
      0
    );
    const shippingCost = 20;
    return subtotal + shippingCost;
  };

  const handleFormSubmit = async (values: any) => {
    setIsModalVisible(true);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-title">
        <CustomTitle text="Check Out" />
      </div>
      <div className="checkout-row">
        <div className="form-container">
          <ReusableForm
            isAgeVisible={false}
            onSubmit={handleFormSubmit}
            buttonName="Place Order"
            isSignupPage={false}
            initialValues={initialFormValues}
            isLoading={userLoading || isLoading}
            disableButtonOnUnchanged={false}
          />
        </div>
      </div>

      <OrderSummaryModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        items={checkoutItems}
        total={calculateTotal()}
        paymentMethod="Credit Card"
        formData={initialFormValues}
      />
    </div>
  );
};

export default CheckoutPage;
