import React, { useState } from "react";
import { Radio, Card } from "antd";
import "./PaymentMethod.css";

const PaymentMethod: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  return (
    <div className="payment-method-container">
      <h3 className="payment-method-title">Payment Method</h3>
      <p className="payment-method-subtitle">All transactions are secure and encrypted.</p>

      <Radio.Group 
        onChange={(e) => setPaymentMethod(e.target.value)} 
        value={paymentMethod} 
        className="payment-options"
      >
        {/* Credit Card Option */}
        <Radio className="radio-option" value="credit_card">
          <div className="radio-content">
            <strong>Credit Card</strong>
            <p className="radio-description">We accept all major credit cards.</p>
          </div>
        </Radio>

        {/* Cash on Delivery Option */}
        <Radio className="radio-option" value="cash_on_delivery">
          <div className="radio-content">
            <strong>Cash on delivery</strong>
            <p className="radio-description">Pay with cash upon delivery.</p>
          </div>
        </Radio>

        {/* PayPal Option */}
        <Radio className="radio-option" value="paypal">
          <strong>PayPal</strong>
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default PaymentMethod;
