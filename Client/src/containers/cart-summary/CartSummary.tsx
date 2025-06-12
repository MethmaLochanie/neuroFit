import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/custom-button/CustomButton";
import "./CartSummary.css";

type Props = { subTotal: number; shippingCost: number };

const CartSummary: React.FC<Props> = ({ subTotal, shippingCost }) => {
  const navigate = useNavigate();
  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-summary-container">
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-item">
          <span>Sub Total:</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Shipping Cost:</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="summary-item grand-total">
          <span>Grand Total:</span>
          <span>${(subTotal + shippingCost).toFixed(2)}</span>
        </div>
        <CustomButton className="checkout-btn" onClick={handleCheckOut}>
          Proceed to Checkout
        </CustomButton>
      </div>
    </div>
  );
};

export default CartSummary;
