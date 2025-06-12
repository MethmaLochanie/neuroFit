import { notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  message: string;
  description: string;
  type?: NotificationType;
}

const showNotification = ({
  message,
  description,
  type = "info",
}: NotificationProps) => {
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
    duration: 3,
    placement: "topRight",
  });
};

export default showNotification;
