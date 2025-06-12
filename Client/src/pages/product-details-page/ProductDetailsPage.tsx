import React, { useEffect, useRef, useState } from "react";
import ProductDetails from "../../containers/product-details/ProductDetails";
import CustomTitle from "../../components/custom-title/CustomTitle";
import ProductCard from "../../components/product-card/ProductCard";
import FeedbackInputForm from "../../containers/feedback-input-form/FeedbackInputForm";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import { loadRecommendations } from "../../redux/slices/recommendationSlice";
import { useParams } from "react-router-dom";
import { fetchProductByArticleId } from "../../services/recommendationClient";
import useGetProductDetailsByProductCode from "../../services/useGetProductDetailsByProductCode";
import "./ProductDetailsPage.css";

const ProductDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products: recProducts } = useSelector(
    (state: RootState) => state.recommendations
  );

  const { user } = useAuth();

  useEffect(() => {
    if (user?.customer_mapped_id && !user?.isNewUser && recProducts.length === 0) {
      dispatch(loadRecommendations({ userId: user.customer_mapped_id, k: 10 }));
    } else if (
      user?.age &&
      recProducts.length === 0
    ) {
      dispatch(loadRecommendations({ age: user.age, k: 10 }));
    }
  }, [user, recProducts.length, dispatch]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const [product, setProduct] = useState<any>(null);

  const { articleId } = useParams<{ articleId: string }>();
  useEffect(() => {
    if (articleId) {
      fetchProductByArticleId(articleId).then(setProduct).catch(console.error);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [articleId]);

  const { productDetails } = useGetProductDetailsByProductCode(
    product?.product_code
  );
  return (
    <div className="product-details-page">
      <section className="product-section">
        <ProductDetails
          title={product?.prod_name || "Loading..."}
          description={product?.detail_desc || ""}
          price={product?.price?.toFixed(2) || "0.00"}
          productDetails={productDetails}
          colors={product?.prodColors || []}
          sizes={product?.sizes || []}
          userId={user?.customer_mapped_id || ""}
        />
      </section>
      <section className="subtitle-section">
        <CustomTitle text="Add Feedback" />
        <FeedbackInputForm />
      </section>
      <section className="recommendations-section">
        <CustomTitle text="Your Recommendations" />
        <div className="products-grid-wrapper">
          <button
            className="scroll-button scroll-left"
            onClick={() => scroll("left")}
          >
            <LeftOutlined />
          </button>
          <div className="products-grid" ref={scrollRef}>
            {recProducts.map((product) => (
              <ProductCard
                key={product.article_id}
                articleId={product.article_id}
                imageUrl={product.imageUrl}
                title={product.prod_name}
                price={product.price}
              />
            ))}
          </div>
          <button
            className="scroll-button scroll-right"
            onClick={() => scroll("right")}
          >
            <RightOutlined />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
