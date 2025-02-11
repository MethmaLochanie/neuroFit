import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/nav-bar/Navbar";
import LoginPage from "./pages/login-page/LoginPage";
import Home from "./pages/home-page/HomePage";
import ProductDetailsPage from "./pages/product-details-page/ProductDetailsPage";
import CartPage from "./pages/cart-page/CartPage";
import CheckoutPage from "./pages/checkout-page/CheckoutPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import RecommendationPage from "./pages/recommendation-page/RecommendationPage";
import SignupPage from "./pages/sign-up-page/SignupPage";

const App: React.FC = () => {
  // const [rating, setRating] = React.useState(4.5);

  // function handleRatingChange(value: number): void {
  //   setRating(value);
  //   console.log(`New rating is ${value}`);
  // }

  // const handleAddToCart = () => {
  //   console.log("Added to cart!");
  // };

  // const handleAddToWishlist = () => {
  //   console.log("Added to wishlist!");
  // };
  // const handleSubmit = (values: any) => {
  //   console.log("Form Submitted:", values);
  // };
  // const handleCardClick = () => {
  //   console.log("Card clicked!");
  // };
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/product-details" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/recommendations" element={<RecommendationPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
