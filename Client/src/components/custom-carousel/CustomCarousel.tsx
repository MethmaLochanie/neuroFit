import React, { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import FeedbackCard from "../review-card/FeedbackCard";
import "./CustomCarousel.css";
interface CarouselProps {
  items: Array<{
    customerMappedId: number;
    title: string;
    feedback: string;
    rating: number;
    media?: string[];
  }>;
  feedback?: boolean;
}

const CustomCarousel: React.FC<CarouselProps> = ({
  items,
  feedback = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = feedback ? 3 : 5;

  const handleNext = () => {
    if (currentIndex + itemsToShow < items.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <div className="carousel-container">
      <button className="arrow-button left" onClick={handlePrev}>
        <LeftOutlined />
      </button>
      <div className="carousel-content">
        {visibleItems.map((item, index) => (
          <div key={index} className="custom-card-container">
            {feedback ? (
              <FeedbackCard
                customerMappedId={item.customerMappedId}
                title={item.title}
                feedback={item.feedback}
                rating={item.rating}
                media={item.media}
              />
            ) : (
              <div>{/* Replace with your product card if not feedback */} </div>
            )}
          </div>
        ))}
      </div>
      <button className="arrow-button right" onClick={handleNext}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default CustomCarousel;
