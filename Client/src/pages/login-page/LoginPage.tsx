import React, { useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../services/authService";
import showNotification from "../../components/custom-notification/CustomNotification";
const { Title } = Typography;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await loginUser(email, password);
      if (response.error) {
        showNotification({
          message: "Access Denied",
          description: response.message || "Invalid credentials",
          type: "error",
        });
        
        if (response.message && response.message.includes("email")) {
          form.setFields([
            {
              name: "email",
              errors: [response.message],
            },
          ]);
        } else if (response.message && response.message.includes("password")) {
          form.setFields([
            {
              name: "password",
              errors: [response.message],
            },
          ]);
        } else {
          // Set error on both fields for general errors
          form.setFields([
            {
              name: "email",
              errors: ["Invalid credentials"],
            },
            {
              name: "password",
              errors: ["Invalid credentials"],
            },
          ]);
        }
      } else {
        login(response);
        showNotification({
          message: "Success",
          description: "Successfully login to NeuroFit page",
          type: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error: ", error);
      showNotification({
        message: "Access Denied",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      form.setFields([
        {
          name: "email",
          errors: ["Something went wrong. Please try again."],
        },
      ]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: 20,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
          NeuroFit Login
        </Title>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ backgroundColor: "#FD33CE", borderColor: "#FD33CE" }}
              htmlType="submit"
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
