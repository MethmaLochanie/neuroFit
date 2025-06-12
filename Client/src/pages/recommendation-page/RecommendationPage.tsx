import React, { useEffect, useState } from "react";
import RecommendationFilter from "../../containers/recommendation-filter/RecommendationFilter";
import CustomTitle from "../../components/custom-title/CustomTitle";
import ProductCard from "../../components/product-card/ProductCard";
import useAuth from "../../hooks/useAuth";
import { useRecommendations } from "../../hooks/useRecommendations";
import { ArrowUpOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./RecommendationPage.css";

const RecommendationPage: React.FC = () => {
  const { user } = useAuth();
  const { recommendations, loading, error, fetchRecommendations } =
    useRecommendations();

  useEffect(() => {
    if (user?.customer_mapped_id && !user?.isNewUser) {
      fetchRecommendations({ userId: user.customer_mapped_id, k: 30 });
    } else if (user?.age) {
      fetchRecommendations({ age: user.age, k: 30 });
    }
  }, [user]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(recommendations.length / itemsPerPage);

  const currentProducts = recommendations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="recs-container">
      <div className="recs-header">
        <CustomTitle text="Your Personalized Recommendations" />
      </div>

      <div className="recs-main-content">
        {/* <div className="recs-filters">
          <RecommendationFilter />
        </div> */}

        <div className="recs-products-area">
          <div className="recs-products-grid">
            {loading && currentPage === 1 ? (
              <div className="recs-loading-state">
                <Spin />
              </div>
            ) : error ? (
              <div className="recs-error-state">{error}</div>
            ) : recommendations.length === 0 ? (
              <div className="recs-empty-state">
                No recommendations available
              </div>
            ) : (
              currentProducts.map((product) => (
                <ProductCard
                  key={product.article_id}
                  articleId={product.article_id}
                  imageUrl={product.imageUrl}
                  title={product.prod_name}
                  price={product.price}
                />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="recs-pagination">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="recs-nav-btn"
              >
                Previous
              </button>

              <div className="recs-page-numbers">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`recs-page-btn ${
                      currentPage === i + 1 ? "recs-active-page" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="recs-nav-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {showScrollButton && (
        <button className="recs-scroll-top-btn" onClick={scrollToTop}>
          <ArrowUpOutlined />
        </button>
      )}
    </div>
  );
};

export default RecommendationPage;
