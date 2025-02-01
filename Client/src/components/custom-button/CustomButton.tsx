import React from "react";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import "./CustomButton.css";

interface CustomButtonProps extends ButtonProps {
  customStyle?: React.CSSProperties; // Additional custom styles
  icon?: React.ReactNode; // Optional icon for the button
  circular?: boolean; // Whether the button is circular
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  customStyle,
  icon,
  circular,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      style={{
        ...customStyle,
        ...(circular
          ? { borderRadius: "50%", width: "50px", height: "50px" }
          : {}), // Circular styles
      }}
      className={`custom-button ${circular ? "circular-button" : ""}`}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {!circular && children}
    </Button>
  );
};

export default CustomButton;
