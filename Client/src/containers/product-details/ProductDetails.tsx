import React, { useState } from "react";
import "./ProductDetails.css"; // Import styles
import CustomButton from "../../components/custom-button/CustomButton";
import ColorSelector from "../../components/color-selector/ColorSelector";
import CustomImage from "../../components/custom-image/CustomImage";
import StarRating from "../../components/star-rating/StarRating";
import {
  CommentOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import SizeSelector from "../../components/size-selector/SizeSelector";

interface ProductDetailsProps {
  title: string;
  description: string;
  price: string;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  comments: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  description,
  price,
  images,
  colors,
  sizes,
  rating,
  comments,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <div className="product-container">
      {/* Left Section - Images */}
      <div className="image-gallery">
        <div className="thumbnails">
          {images.map((img, index) => (
            <CustomImage
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={selectedImage === img ? "active-thumbnail" : ""}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <div className="main-image">
          <CustomImage src={selectedImage} alt="Main Product" width="400px" />
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div className="product-info">
        {/* <nav className="breadcrumb">Shop &gt; Women &gt; Top</nav> */}
        <h2 className="product-title">{title}</h2>

        {/* Rating Section */}
        <div className="rating">
          <StarRating rating={rating} readonly />
          <span className="rating-value">{rating}</span>
          <span className="comment-count">
            <CommentOutlined />
            {comments} comments
          </span>
        </div>

        <p className="description">{description}</p>

        {/* Size Selection */}
        <div className="size-selector">
          <p>Select Size:</p>
          <SizeSelector
            sizes={sizes}
            onSelect={(size: React.SetStateAction<string>) =>
              setSelectedSize(size)
            }
          />
        </div>

        {/* Color Selection */}
        <div className="size-selector">
          <p>Colours Available:</p>
          <ColorSelector
            colors={colors}
            onSelect={(color: React.SetStateAction<string>) =>
              setSelectedColor(color)
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <CustomButton
            className="add-to-cart"
            icon={<ShoppingCartOutlined />}
            circular={false}
          >
            Add to cart
          </CustomButton>
          <CustomButton
            className="buy-now"
            icon={<CreditCardOutlined />}
            circular={false}
          >
            Buy Now
          </CustomButton>
          <div className="price-tag">${price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
