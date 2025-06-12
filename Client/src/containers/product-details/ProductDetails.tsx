import React, { useEffect, useState } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomImage from "../../components/custom-image/CustomImage";
import StarRating from "../../components/star-rating/StarRating";
import {
  CommentOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import SizeSelector from "../../components/size-selector/SizeSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import showNotification from "../../components/custom-notification/CustomNotification";
import { Spin } from "antd";
import { Product } from "../../types/types";
import useFeedback from "../../services/feedbackServiceClient";
import CustomCarousel from "../../components/custom-carousel/CustomCarousel";
import CustomTitle from "../../components/custom-title/CustomTitle";
import useCart from "../../hooks/useCart";
import "./ProductDetails.css";
interface ProductDetailsProps {
  title: string;
  description: string;
  price: string;
  productDetails: Product[];
  colors: string[];
  sizes: string[];
  userId: number | string;
}
const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  description,
  price,
  productDetails = [],
  colors,
  sizes,
  userId,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { addToCartDb } = useCart();

  useEffect(() => {
    if (productDetails.length > 0) {
      setCurrentProduct(productDetails[0]);
      setSelectedImage(productDetails[0].imageUrl);
      setSelectedColor(productDetails[0].colour_group_name);
    }
  }, [productDetails]);

  const handleThumbnailClick = (productDetail: Product) => {
    setCurrentProduct(productDetail);
    setSelectedImage(productDetail.imageUrl);
    setSelectedColor(productDetail.colour_group_name);
    setSelectedSize("");
  };

  const displayTitle = currentProduct?.prod_name || title;
  const displayDescription = currentProduct?.detail_desc || description;
  const displayPrice = currentProduct?.price?.toFixed(2) || price;
  const displaySizes = currentProduct?.sizes || sizes;
  const mainImageUrl = selectedImage || productDetails[0]?.imageUrl;

  const { feedbacks } = useFeedback(currentProduct?.article_id || "");
  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
      : 0;

  const displayRating = averageRating || 0;
  const displayComments = feedbacks.length || 0;
  const navigate = useNavigate();

  const validateSizeColor = () => {
    if (!selectedSize) {
      showNotification({
        message: "Select Size",
        description: "Please select a size before proceeding.",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!currentProduct || !validateSizeColor()) return;

    addToCartDb({
      customer_mapped_id: parseInt(userId.toString()),
      article_id: currentProduct.article_id,
      quantity: 1,
      subtotal: currentProduct.price,
      size: selectedSize,
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
    navigate("/cart");
  };

  const handleCheckOut = () => {
    if (!currentProduct || !validateSizeColor()) return;
    const checkoutItem = {
      id: currentProduct.article_id,
      image: selectedImage || currentProduct.imageUrl,
      name: displayTitle,
      color: selectedColor,
      size: selectedSize,
      price: parseFloat(displayPrice),
      quantity: 1,
      article_id: currentProduct.article_id,
      customer_mapped_id: parseInt(userId.toString()),
    };
    navigate("/checkout", {
      state: {
        checkoutItems: [checkoutItem],
        isDirectCheckout: true,
        productDetails: {
          description: displayDescription,
          colorName: selectedColor,
          sizeOptions: displaySizes,
        },
      },
    });
  };
  if (!productDetails || productDetails.length === 0) {
    return <Spin />;
  }

  return (
    <>
      <div className="product-container">
        <div className="image-gallery">
          <div className="thumbnails">
            {productDetails.map((productDetail, index) => (
              <CustomImage
                key={index}
                src={productDetail.imageUrl}
                alt={`Thumbnail ${index}`}
                className={
                  selectedImage === productDetail.imageUrl
                    ? "active-thumbnail"
                    : ""
                }
                onClick={() => handleThumbnailClick(productDetail)}
              />
            ))}
          </div>
          <div className="main-image">
            {mainImageUrl && (
              <CustomImage
                src={mainImageUrl}
                alt="Main Product"
                width="400px"
              />
            )}
          </div>
        </div>

        <div className="product-info">
          <h2 className="product-title">{displayTitle}</h2>
          <div className="rating">
            <StarRating rating={displayRating} readonly />
            <span className="rating-value">{displayRating}</span>
            <span className="comment-count">
              <CommentOutlined /> {displayComments} comments
            </span>
          </div>
          <p className="description">{displayDescription}</p>

          {selectedColor && (
            <div className="color-info">
              <p>Color: {selectedColor}</p>
            </div>
          )}

          <div className="size-selector">
            <p>Select Size:</p>
            <SizeSelector sizes={displaySizes} onSelect={setSelectedSize} />
          </div>

          <div className="action-buttons">
            <CustomButton
              className="add-to-cart"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </CustomButton>
            <CustomButton
              className="buy-now"
              icon={<CreditCardOutlined />}
              onClick={handleCheckOut}
            >
              Buy Now
            </CustomButton>
            <div className="price-tag">${displayPrice}</div>
          </div>
        </div>
      </div>
      <section className="subtitle-list-section">
        <CustomTitle text="Feedbacks" />
        <div className="product-list">
          <div className="carousel">
            <CustomCarousel
              items={feedbacks.map((f) => ({
                customerMappedId: f.customer_mapped_id,
                title: f.feedbackCategory,
                feedback: f.feedback_description,
                rating: f.rating,
                media: f.media,
              }))}
              feedback={true}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
