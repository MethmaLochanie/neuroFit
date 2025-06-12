import React, { useState } from "react";
import { Tabs, Button, Card } from "antd";
import { Order, ORDER_STATUS } from "../../types/types";
import CustomImage from "../../components/custom-image/CustomImage";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const [activeTab, setActiveTab] = useState<ORDER_STATUS>(
    ORDER_STATUS.PENDING
  );
  const navigate = useNavigate();
  const handleViewDetailsButton = (articleId: string) => {
    navigate(`/product-details/${articleId}`);
  };

  const renderOrderCard = (order: Order) => (
    <Card key={order.id} className="order-card">
      <div className="order-header">
        <strong>Order no: {order.id}</strong>
        <div className="order-status">
          <span>
            <strong>Order Status:</strong> {order.status}
          </span>
          <span>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </span>
        </div>
      </div>

      <p className="order-date">Order Date: {order.date}</p>
      <p className="order-delivery">
        Estimated Delivery Date: {order.estimatedDelivery}
      </p>

      {order.items.map((item, index) => (
        <div key={index} className="order-item">
          <CustomImage
            src={item.image}
            alt={item.name}
            className="order-item-image"
          />
          <div className="order-item-details">
            <strong>{item.name}</strong>
            <p>Colour: {item.color}</p>
            <p>Qty: {item.quantity}</p>
            <p>
              <strong>Total: ${item.total.toFixed(2)}</strong>
            </p>
          </div>
          <Button
            type="primary"
            className="view-detail-button"
            onClick={() => handleViewDetailsButton(item.article_id)}
          >
            View Details
          </Button>
        </div>
      ))}
    </Card>
  );

  const renderTabContent = (status: ORDER_STATUS) => {
    const filteredOrders = orders.filter((order) => order.status === status);
    if (filteredOrders.length === 0) {
      return (
        <div style={{ textAlign: "center", color: "#888", margin: "32px 0" }}>
          No orders found.
        </div>
      );
    }
    return filteredOrders.map(renderOrderCard);
  };

  const items = [
    {
      key: ORDER_STATUS.PENDING,
      label: "Pending",
      children: renderTabContent(ORDER_STATUS.PENDING),
    },
    {
      key: ORDER_STATUS.CANCELLED,
      label: "Cancelled",
      children: renderTabContent(ORDER_STATUS.CANCELLED),
    },
    {
      key: ORDER_STATUS.COMPLETED,
      label: "Completed",
      children: renderTabContent(ORDER_STATUS.COMPLETED),
    },
  ];

  return (
    <div className="order-history-container">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as ORDER_STATUS)}
        centered
        items={items}
      />
    </div>
  );
};

export default OrderHistory;
