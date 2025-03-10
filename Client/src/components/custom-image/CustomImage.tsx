import React from "react";
import "./CustomImage.css";

interface CustomImageProps {
  src: string; // Path to the image
  alt: string; // Alt text for the image
  width?: string | number; // Optional width
  height?: string | number; // Optional height
  customStyle?: React.CSSProperties; // Additional inline styles
  className?: string; // Additional CSS class for custom styling
  onClick?: () => void; // ✅ Add this line to support onClick
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  customStyle,
  className,
  onClick, // Accept onClick prop
}) => {
  return (
    <img
      src={require(`../../assets/${src}`)} // Dynamically require image from assets folder
      alt={alt}
      style={{ width, height, ...customStyle }}
      className={`custom-image ${className}`}
      onClick={onClick} // ✅ Attach the onClick function
    />
  );
};

export default CustomImage;
