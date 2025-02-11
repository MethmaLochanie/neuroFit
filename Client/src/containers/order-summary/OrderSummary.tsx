import React from "react";
import "./OrderSummary.css";
import CustomImage from "../../components/custom-image/CustomImage";

interface OrderItem {
  image: string;
  name: string;
  quantity: number;
  price: number;
  color: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  savings,
  shipping,
  total,
}) => {
  return (
    <div className="order-summary-container">
      <h3 className="order-summary-title">Order Summary</h3>

      {/* Order Items */}
      <div className="order-items">
        {items.map((item, index) => (
          <div className="order-item" key={index}>
            {/* <img src={item.image} alt={item.name} className="order-item-image" /> */}
            <CustomImage
              key={index}
              src={item.image}
              alt={`Thumbnail ${index}`}
              className="order-item-image"
            />
            <div className="order-item-details">
              <p className="item-name">
                {item.name}{" "}
                <span className="item-quantity">× {item.quantity}</span>
              </p>
              <p className="item-color">
                Colour: <span>{item.color}</span>
              </p>
            </div>
            <p className="item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="order-totals">
        <div className="total-item">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="total-item savings">
          <span>Savings</span>
          <span>-${savings.toFixed(2)}</span>
        </div>
        <div className="total-item shipping">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="total-item total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
