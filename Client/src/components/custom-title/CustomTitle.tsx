import React from "react";
import "./CustomTitle.css";

interface CustomTitleProps {
  text: string;
  color?: string;
}

const CustomTitle: React.FC<CustomTitleProps> = ({
  text,
  color = "#ff00ff",
}) => {
  return (
    <div className="custom-title">
      <span
        className="custom-title-line"
        style={{ backgroundColor: color }}
      ></span>
      <span className="custom-title-text">{text}</span>
    </div>
  );
};

export default CustomTitle;
