import React from "react";
import "./CartSummary.css";
import CustomButton from "../../components/custom-button/CustomButton";

type Props = { subTotal: number; shippingCost: number };

const CartSummary: React.FC<Props> = ({ subTotal, shippingCost }) => {
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
        <CustomButton className="checkout-btn">Proceed to Checkout</CustomButton>
      </div>
    </div>
  );
};

export default CartSummary;
