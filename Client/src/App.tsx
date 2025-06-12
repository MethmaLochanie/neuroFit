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
import FavouritesPage from "./pages/favourites-page/FavouritesPage";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/product-details/:articleId"
            element={<ProductDetailsPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/recommendations" element={<RecommendationPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
