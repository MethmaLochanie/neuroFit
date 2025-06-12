import React from "react";
import { Rate } from "antd";
import "./StarRating.css";

interface StarRatingProps {
  rating: number;
  allowHalf?: boolean;
  onChange?: (value: number) => void;
  readonly?: boolean;
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
        onChange={readonly ? undefined : onChange}
        disabled={readonly}
        className="custom-stars"
      />
    </div>
  );
};

export default StarRating;
