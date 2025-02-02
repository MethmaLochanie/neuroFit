import React from "react";
import { Rate } from "antd";
import "./FeedbackCard.css";
import StarRating from "../star-rating/StarRating";

interface FeedbackCardProps {
  imageUrl: string; // URL for the user's profile picture
  name: string; // Name of the user
  feedback: string; // Review text
  rating: number; // Rating value
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  imageUrl,
  name,
  feedback,
  rating,
}) => {
  return (
    <div className="testimonial-card">
      <div className="card-header">
        <img src={imageUrl} alt={name} className="profile-image" />
        <div className="card-details">
          <StarRating rating={rating} readonly />
        </div>
      </div>
      <h3 className="card-name">{name}</h3>
      <p className="card-review">{feedback}</p>
    </div>
  );
};

export default FeedbackCard;
