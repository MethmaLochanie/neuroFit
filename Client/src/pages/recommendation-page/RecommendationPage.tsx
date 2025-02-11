import React from "react";
import "./RecommendationPage.css";
import RecommendationFilter from "../../containers/recommendation-filter/RecommendationFilter";
import CustomTitle from "../../components/custom-title/CustomTitle";
import ReusableSearchBar from "../../components/reusable-search-bar/ReusableSearchBar";
import ProductCard from "../../components/product-card/ProductCard";

const RecommendationPage: React.FC = () => {
  return (
    <div className="recommendation-page">
      <div className="recommendation-header">
        <CustomTitle text="Recommendations" />
        <div className="search-bar">
          <ReusableSearchBar />
        </div>
      </div>

      <div className="recommendation-container">
        <div className="filter-section">
          <RecommendationFilter />
        </div>

        <div className="products-section">
          <ProductCard
            imageUrl={"Blue_Cute_Dog.png"}
            title={"Cloth"}
            price={"50"}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
