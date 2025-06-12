import React from "react";
import { message } from "antd";
import { signupUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import ReusableForm from "../../components/reusable-form/ReusableForm";
import "./SignupPage.css";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      signupUser(values);
      navigate("/login");
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "User registration failed"
      );
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <ReusableForm
        buttonName="Sign Up"
        isAgeVisible={true}
        onSubmit={onFinish}
        isSignupPage={true}
      />
    </div>
  );
};

export default SignupPage;
