import React from "react";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import "./CustomButton.css";

interface CustomButtonProps extends ButtonProps {
  customStyle?: React.CSSProperties;
  icon?: React.ReactNode;
  circular?: boolean;
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
          : {}),
      }}
      className={`custom-button ${circular ? "circular-button" : ""}`}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {!circular && children}
    </Button>
  );
};

export default CustomButton;
