import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./CustomCard.css";
import CustomImage from "../custom-image/CustomImage";

interface CustomCardProps {
  imageUrl: string; // Image URL for the card
  title: string; // Title text
  subtitle: string; // Subtitle text
  onClick?: () => void; // Optional click handler for the card
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
