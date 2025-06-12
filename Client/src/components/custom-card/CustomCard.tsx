import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import CustomImage from "../custom-image/CustomImage";
import "./CustomCard.css";

interface CustomCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  imageUrl,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <div className="custom-card" onClick={onClick}>
      <div className="card-image">
        <CustomImage src={imageUrl} alt={title} className="card-img" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{title}</h3>
          <ArrowRightOutlined className="card-arrow" />
        </div>
        <p className="card-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default CustomCard;
