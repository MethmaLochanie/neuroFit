import React from "react";
import { Radio } from "antd";
import "./PaymentMethod.css";

interface PaymentMethodProps {
  onChange: (value: string) => void;
  selectedMethod: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  onChange,
  selectedMethod,
}) => {
  return (
    <div className="payment-method-container">
      <h3 className="payment-method-title">Payment Method</h3>
      <p className="payment-method-subtitle">
        All transactions are secure and encrypted.
      </p>

      <Radio.Group
        onChange={(e) => onChange(e.target.value)}
        value={selectedMethod}
        className="payment-options"
      >
        <Radio className="radio-option" value="Credit Card">
          Credit Card
        </Radio>
        <Radio className="radio-option" value="Cash on Delivery">
          Cash on Delivery
        </Radio>
        <Radio className="radio-option" value="PayPal">
          PayPal
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default PaymentMethod;
