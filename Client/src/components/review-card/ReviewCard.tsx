import React from "react";
import { Rate } from "antd";
import "./ReviewCard.css";
import StarRating from "../star-rating/StarRating";

interface ReviewCardProps {
  imageUrl: string; // URL for the user's profile picture
  name: string; // Name of the user
  review: string; // Review text
  rating: number; // Rating value
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  imageUrl,
  name,
  review,
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
      <p className="card-review">{review}</p>
    </div>
  );
};

export default ReviewCard;
