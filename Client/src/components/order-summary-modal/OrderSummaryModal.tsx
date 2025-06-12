import React from "react";
import { Modal, Button, List, Divider } from "antd";
import {
  ShoppingOutlined,
  CheckCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./OrderSummaryModal.css";

interface OrderSummaryModalProps {
  visible: boolean;
  onClose: () => void;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    size?: string;
    color?: string;
    subtotal: number;
  }>;
  total: number;
  paymentMethod: string;
  formData: any;
}

const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  visible,
  onClose,
  items = [],
  total,
  paymentMethod,
  formData,
}) => {
  const navigate = useNavigate();

  const handleNavigateToRecommendations = () => {
    onClose();
    navigate("/recommendations");
  };

  return (
    <Modal
      title={
        <div className="modal-title">
          <CheckCircleOutlined style={{ color: "#52c41a" }} /> Order Placed
          Successfully!
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button
          key="recommendations"
          type="primary"
          onClick={handleNavigateToRecommendations}
          style={{ backgroundColor: "#ff00ff" }}
        >
          View Recommended Products <SmileOutlined />
        </Button>,
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <div className="modal-content">
        <h3>Order Details:</h3>
        {items.length === 0 ? (
          <p>No items in order</p>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<ShoppingOutlined />}
                  title={item.name}
                  description={`Qty: ${item.quantity} | Size: ${
                    item.size || "N/A"
                  }`}
                />
                <div>${item.subtotal.toFixed(2)}</div>
              </List.Item>
            )}
          />
        )}
        <Divider />
        <div>
          <strong>Shipping Cost:</strong> ${"20.00"}
        </div>
        <Divider />
        <Divider />
        <div>
          <strong>Total Amount:</strong> ${total.toFixed(2)}
        </div>
        <Divider />
        <div>
          <strong>Selected Payment Method:</strong> {paymentMethod}
        </div>
        <Divider />
        <div>
          <strong>Customer Information:</strong>
          <p>
            Name: {formData.fName} {formData.lName}
          </p>
          <p>Email: {formData.email}</p>
          <p>Phone: {formData.phoneNumber}</p>
          <p>
            Address: {formData.city}, {formData.country}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default OrderSummaryModal;
