import React, { useState } from "react";
import { Tabs, Button, Card } from "antd";
import "./OrderHistory.css";

export enum ORDER_STATUS {
  PENDING = "Pending",
  CANCELLED = "Cancelled",
  COMPLETED = "Completed",
}

export enum PAYMENT_METHODS {
  CASH = "Cash on Delivery",
  CARD = "Credit Card",
  ONLINE = "Online Payment",
}

export interface OrderItem {
  image: string;
  name: string;
  color: string;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  date: string;
  estimatedDelivery: string;
  status: ORDER_STATUS;
  paymentMethod: PAYMENT_METHODS;
  items: OrderItem[];
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const [activeTab, setActiveTab] = useState<ORDER_STATUS>(ORDER_STATUS.PENDING);

  return (
    <div className="order-history-container">
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key as ORDER_STATUS)} centered>
        <Tabs.TabPane tab="Pending" key={ORDER_STATUS.PENDING}>
          {orders
            .filter((order) => order.status === ORDER_STATUS.PENDING)
            .map((order) => (
              <Card key={order.id} className="order-card">
                <div className="order-header">
                  <strong>Order no: {order.id}</strong>
                  <div className="order-status">
                    <span><strong>Order Status:</strong> {order.status}</span>
                    <span><strong>Payment Method:</strong> {order.paymentMethod}</span>
                  </div>
                </div>

                <p className="order-date">Order Date: {order.date}</p>
                <p className="order-delivery">Estimated Delivery Date: {order.estimatedDelivery}</p>

                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-details">
                      <strong>{item.name}</strong>
                      <p>Colour: {item.color}</p>
                      <p>Qty: {item.quantity}</p>
                      <p><strong>Total: ${item.total.toFixed(2)}</strong></p>
                    </div>
                    <Button type="primary" className="view-detail-button">View Detail</Button>
                  </div>
                ))}
              </Card>
            ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Cancelled" key={ORDER_STATUS.CANCELLED}>
          {orders
            .filter((order) => order.status === ORDER_STATUS.CANCELLED)
            .map((order) => (
              <Card key={order.id} className="order-card">
                <div className="order-header">
                  <strong>Order no: {order.id}</strong>
                  <div className="order-status">
                    <span><strong>Order Status:</strong> {order.status}</span>
                    <span><strong>Payment Method:</strong> {order.paymentMethod}</span>
                  </div>
                </div>
                <p className="order-date">Order Date: {order.date}</p>
                <p className="order-delivery">Estimated Delivery Date: {order.estimatedDelivery}</p>
              </Card>
            ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Completed" key={ORDER_STATUS.COMPLETED}>
          {orders
            .filter((order) => order.status === ORDER_STATUS.COMPLETED)
            .map((order) => (
              <Card key={order.id} className="order-card">
                <div className="order-header">
                  <strong>Order no: {order.id}</strong>
                  <div className="order-status">
                    <span><strong>Order Status:</strong> {order.status}</span>
                    <span><strong>Payment Method:</strong> {order.paymentMethod}</span>
                  </div>
                </div>
                <p className="order-date">Order Date: {order.date}</p>
                <p className="order-delivery">Estimated Delivery Date: {order.estimatedDelivery}</p>
              </Card>
            ))}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default OrderHistory;
