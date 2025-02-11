import React, { useContext } from "react";
import "./HomePage.css"; // Import the updated CSS file
import CustomButton from "../../components/custom-button/CustomButton";
import CustomTitle from "../../components/custom-title/CustomTitle";
import CustomImage from "../../components/custom-image/CustomImage";
import ProductCard from "../../components/product-card/ProductCard";
import CustomCard from "../../components/custom-card/CustomCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import showNotification from "../../components/custom-notification/CustomNotification";

const HomePage: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = auth?.user !== null;

  const handleAccessPage = () => {
    if (!auth?.user) {
      showNotification({
        message: "Access Denied",
        description: "You need to log in to view this page.",
        type: "error",
      });
      return;
    }
    navigate("/recommendations");
  };

  return (
    <div className="homepage">
      {/* Banner Section */}
      <div className="banner">
        {/* Text Content */}
        <div className="banner-text">
          <h1 className="title">Neuro Fit Store</h1>
          <CustomButton className="shop-now-btn" onClick={handleAccessPage}>
            Shop Now
          </CustomButton>
        </div>

        {/* Image Section */}
        <div className="banner-image">
          <CustomImage src="Blue_Cute_Dog.png" alt="Cute Dog" />
        </div>
      </div>

      {/* Recommendations Section */}
      {isLoggedIn && (
        <div className="section">
          <div className="section-title">
            <CustomTitle text="Your Recommendations" />
          </div>

          <ProductCard
            imageUrl="Blue_Cute_Dog.png"
            title="Hoodie"
            price="$5"
            rating={1.5}
          />
        </div>
      )}

      {/* Top List Section */}
      <div className="section">
        <div className="section-title">
          <CustomTitle text="Top List" />
        </div>

        <ProductCard
          imageUrl="Blue_Cute_Dog.png"
          title="Hoodie"
          price="$5"
          rating={1.5}
        />
      </div>

      {/* Categories Section */}
      <div className="section">
        <div className="section-title">
          <CustomTitle text="Categories" />
        </div>

        <div className="custom-card-container">
          <CustomCard
            imageUrl="Blue_Cute_Dog.png"
            title="Hoodies"
            subtitle="Top"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
