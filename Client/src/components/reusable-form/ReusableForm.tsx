import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  notification,
  InputNumber,
} from "antd";

interface ReusableFormProps {
  isAgeVisible: boolean;
  onSubmit: (values: any) => void;
  buttonName: string;
  isSignupPage: boolean;
  initialValues?: any;
  isLoading?: boolean;
  disableButtonOnUnchanged?: boolean;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  isAgeVisible,
  onSubmit,
  buttonName = "Submit",
  isSignupPage,
  initialValues,
  isLoading = false,
  disableButtonOnUnchanged = true,
}) => {
  const [form] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleValuesChange = () => {
    const currentValues = form.getFieldsValue();
    const hasChanges = Object.keys(currentValues).some(
      (key) => currentValues[key] !== initialValues?.[key]
    );

    if (hasChanges && !isFormChanged) {
      setIsFormChanged(true);
      notification.info({
        message: "Changes Detected",
        description:
          "You have unsaved changes. Click Save to update your profile.",
      });
    } else if (!hasChanges && isFormChanged) {
      setIsFormChanged(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      onValuesChange={handleValuesChange}
      style={{ maxWidth: "800px", margin: "auto" }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="fName"
            rules={[{ required: true, message: "First Name is required" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="lName"
            rules={[{ required: true, message: "Last Name is required" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Country / Region"
            name="country"
            rules={[
              { required: true, message: "Country / Region is required" },
            ]}
          >
            <Input placeholder="Country / Region" />
          </Form.Item>
        </Col>
      </Row>

      {/* <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Street Address"
            name="streetAddress"
            rules={[{ required: true, message: "Street Address is required" }]}
          >
            <Input placeholder="House number and street name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Apt, suite, unit" name="apt">
            <Input placeholder="Apartment, suite, unit (optional)" />
          </Form.Item>
        </Col>
      </Row> */}

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "City is required" }]}
          >
            <Input placeholder="Town / City" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Postal Code"
            name="postalCode"
            rules={[{ required: true, message: "Postal Code is required" }]}
          >
            <Input placeholder="Postal Code" />
          </Form.Item>
        </Col>
        {/* <Col span={12}>
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "State is required" }]}
          >
            <Input placeholder="State" />
          </Form.Item>
        </Col> */}
      </Row>

      <Row gutter={16}>
        {/* <Col span={12}>
          <Form.Item
            label="Postal Code"
            name="postalCode"
            rules={[{ required: true, message: "Postal Code is required" }]}
          >
            <Input placeholder="Postal Code" />
          </Form.Item>
        </Col> */}
        <Col span={12}>
          <Form.Item
            label="Phone"
            name="phoneNumber"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
        </Col>
        {isAgeVisible && (
          <Col span={12}>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                { required: true, message: "Age is required" },
                () => ({
                  validator(_, value) {
                    if (value >= 18 && value <= 60) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Age must be between 18 and 60")
                    );
                  },
                }),
              ]}
            >
              <InputNumber
                min={18}
                max={60}
                style={{ width: "100%" }}
                placeholder="Age"
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      {isSignupPage && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter a secure password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select your role">
                <Select.Option value="CUSTOMER">Customer</Select.Option>
                <Select.Option value="ADMIN">Admin</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      )}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={
            disableButtonOnUnchanged ? !isFormChanged || isLoading : isLoading
          }
          loading={isLoading}
          style={{ backgroundColor: "#FD33CE", borderColor: "#FD33CE" }}
        >
          {buttonName}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReusableForm;
