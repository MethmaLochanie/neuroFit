import React from "react";
import "./CheckoutPage.css";
import OrderSummary from "../../containers/order-summary/OrderSummary";
import CustomTitle from "../../components/custom-title/CustomTitle";
import ReusableForm from "../../components/reusable-form/ReusableForm";
import PaymentMethod from "../../containers/payment-method/PaymentMethod";

const CheckoutPage: React.FC = () => {
  const orderItems = [
    {
      image: "Blue_Cute_Dog.png",
      name: "Blue Flower Print Crop Top",
      quantity: 1,
      price: 29.0,
      color: "Yellow",
    },
    {
      image: "Blue_Cute_Dog.png",
      name: "Lavender Hoodie",
      quantity: 2,
      price: 59.5,
      color: "Lavender",
    },
    {
      image: "Blue_Cute_Dog.png",
      name: "Black Sweatshirt",
      quantity: 2,
      price: 61.5,
      color: "Black",
    },
  ];

  return (
    <div className="checkout-container">
      <div className="checkout-title">
        <CustomTitle text="Check Out" />{" "}
      </div>

      {/* Order Summary */}
      <div className="order-summary-container">
        <OrderSummary
          items={orderItems}
          subtotal={513}
          savings={30}
          shipping={-5}
          total={478}
        />
      </div>

      {/* Row Layout for Form and Payment */}
      <div className="checkout-row">
        {/* Form Section */}
        <div className="form-container">
          <ReusableForm
            isAgeVisible={false}
            onSubmit={(values) => console.log("Checkout Details:", values)}
            buttonName={"Check Out"}
            isSignupPage={false}
          />
        </div>

        {/* Payment Method Section */}
        <div className="payment-method-container">
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
