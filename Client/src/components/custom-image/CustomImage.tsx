import React from "react";
import { useSignedImageUrl } from "../../hooks/useSignedImageUrl";
import "./CustomImage.css";

const AZURE_BLOB_STORAGE_URL = process.env.REACT_APP_AZURE_BLOB_STORAGE_URL;
if (!AZURE_BLOB_STORAGE_URL) {
  throw new Error('AZURE_BLOB_STORAGE_URL environment variable is not defined');
}

interface CustomImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  customStyle?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  customStyle,
  className,
  onClick,
}) => {
  const { signedUrl, error, loading } = useSignedImageUrl(src);

  if (!src || typeof src !== "string") {
    return <div style={{ width, height, backgroundColor: "#eee" }} />;
  }

  const finalSrc = src.startsWith(AZURE_BLOB_STORAGE_URL)
    ? signedUrl
    : require(`../../assets/${src}`);

  if (loading) {
    return <div style={{ width, height, backgroundColor: "#eee" }} />;
  }

  if (error) {
    console.error("Error loading image:", error);
  }

  return (
    <img
      src={finalSrc}
      alt={alt}
      style={{ width, height, ...customStyle }}
      className={`custom-image ${className || ""}`}
      onClick={onClick}
    />
  );
};

export default CustomImage;
