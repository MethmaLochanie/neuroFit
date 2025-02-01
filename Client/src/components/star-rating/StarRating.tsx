import React from "react";
import { Rate } from "antd";
import "./StarRating.css";

interface StarRatingProps {
  rating: number; // The current rating value
  allowHalf?: boolean; // Option to allow half-star ratings
  onChange?: (value: number) => void; // Callback when the rating changes
  readonly?: boolean; // When true, the stars are view-only
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  allowHalf = true,
  onChange,
  readonly = false,
}) => {
  return (
    <div className="star-rating">
      <Rate
        allowHalf={allowHalf}
        value={rating}
        onChange={readonly ? undefined : onChange} // Disable interaction if readonly
        disabled={readonly} // Disables interaction visually
        className="custom-stars"
      />
    </div>
  );
};

export default StarRating;
