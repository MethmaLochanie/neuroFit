import React, { useContext } from "react";
import {
  ArrowRightOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./ProductCard.css";
import CustomButton from "../custom-button/CustomButton";
import StarRating from "../star-rating/StarRating";
import CustomImage from "../custom-image/CustomImage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface ProductCardProps {
  imageUrl: string; // URL for the product image
  title: string; // Product title
  price: string; // Product price
  rating: number; // Product rating (read-only)
  onAddToCart?: () => void; // Add to cart action
  onWishlist?: () => void; // Add to wishlist action
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  price,
  rating,
  onAddToCart,
  onWishlist,
}) => {
  const auth = useContext(AuthContext);

  // Check if user is logged in
  const isLoggedIn = auth?.user !== null;
  const navigate = useNavigate();
  const handleArrowClick = () => {
    navigate("/product-details");
  };
  return (
    <div className="product-card">
      <div className="product-image">
        <CustomImage
          src={imageUrl}
          alt="Cute Dog"
          //   width="200px"
          //   height="200px"
        />
        {isLoggedIn && (
          <div className="product-actions">
            <CustomButton
              icon={<HeartOutlined />}
              circular
              customStyle={{ backgroundColor: "#fff", color: "#333" }}
            />
            <CustomButton
              icon={<ShoppingCartOutlined />}
              circular
              customStyle={{ backgroundColor: "#fff", color: "#b22222" }}
            />
          </div>
        )}
      </div>
      <div className="product-info">
        <div className="product-title">
          <h3>{title}</h3>
          <div className="product-arrow">
            <ArrowRightOutlined onClick={handleArrowClick} />
          </div>
        </div>
        <div className="product-details">
          <div className="product-price">{price}</div>
          <StarRating rating={rating} readonly />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
