import { notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  message: string;
  description: string;
  type?: NotificationType;
}

/**
 * Function to show a custom notification
 * @param message - Notification Title
 * @param description - Notification Description
 * @param type - Type of Notification (success, error, warning, info)
 */
const showNotification = ({ message, description, type = "info" }: NotificationProps) => {
  const icons = {
    success: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
    error: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
    warning: <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
    info: <InfoCircleOutlined style={{ color: "#1890ff" }} />,
  };

  notification.open({
    message,
    description,
    icon: icons[type],
    duration: 3, // Auto-close in 3 seconds
    placement: "topRight",
  });
};

export default showNotification;
