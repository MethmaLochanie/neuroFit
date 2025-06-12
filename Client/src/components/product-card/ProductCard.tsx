import React, { useContext } from "react";
import {
  ArrowRightOutlined,
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import CustomButton from "../custom-button/CustomButton";
import StarRating from "../star-rating/StarRating";
import CustomImage from "../custom-image/CustomImage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFeedback from "../../services/feedbackServiceClient";
import showNotification from "../custom-notification/CustomNotification";
import { useWishlist } from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";
import "./ProductCard.css";

interface ProductCardProps {
  articleId: string;
  imageUrl: string;
  title: string;
  price: number;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  inWishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  articleId,
  imageUrl,
  title,
  price,
  onAddToCart,
  onWishlist,
  inWishlist = false,
}) => {
  const auth = useContext(AuthContext);
  const { feedbacks, loading } = useFeedback(articleId);
  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
      : 0;

  const isLoggedIn = auth?.user !== null;
  const navigate = useNavigate();
  const handleArrowClick = () => {
    navigate(`/product-details/${articleId}`);
  };

  const {
    inWishlist: isInWishlist,
    toggle,
    loading: wishlistLoading,
    setInWishlist,
  } = useWishlist(auth?.user?.id || "", articleId, inWishlist);

  const handleToggleWishlist = async () => {
    if (!auth?.user) {
      showNotification({
        message: "Not logged in",
        description: "Please log in to add to wishlist.",
        type: "error",
      });
      return;
    }
    try {
      const res = await toggle({ articleId, title, price, imageUrl });
      showNotification({
        message:
          res.action === "added"
            ? "Added to wishlist!"
            : "Removed from wishlist!",
        description: res.message,
        type: "success",
      });
      if (res.action === "removed" && onWishlist) {
        onWishlist();
      }
      setInWishlist(res.action === "added");
    } catch (error: any) {
      showNotification({
        message: "Error",
        description:
          error?.response?.data?.message || "Failed to update wishlist.",
        type: "error",
      });
    }
  };
  const { addToCartDb } = useCart();
  const handleAddToCart = () => {
    addToCartDb({
      customer_mapped_id: auth?.user?.customer_mapped_id || 0,
      article_id: articleId,
      quantity: 1,
      subtotal: price,
      size: "S",
      shipping: "FREE",
    }).then((res) => {
      if (res) {
        showNotification({
          message: "Product Added",
          description: "Product added to cart successfully.",
          type: "success",
        });
      } else {
        showNotification({
          message: "Error",
          description: "Failed to add product to cart.",
          type: "error",
        });
      }
    });

    // dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <div className="product-card">
      <div className="product-image">
        <CustomImage src={imageUrl} alt="Picture of the product" />
        {isLoggedIn && (
          <div className="product-actions">
            <CustomButton
              icon={
                isInWishlist ? (
                  <HeartFilled style={{ color: "#b22222" }} />
                ) : (
                  <HeartOutlined style={{ color: "#333" }} />
                )
              }
              circular
              customStyle={{ backgroundColor: "#fff" }}
              onClick={handleToggleWishlist}
              loading={wishlistLoading}
            />
            <CustomButton
              icon={<ShoppingCartOutlined />}
              circular
              onClick={handleAddToCart}
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
          <div className="product-price">
            {"$"}
            {price}
          </div>
          <StarRating rating={averageRating} readonly />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
