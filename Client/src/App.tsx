import React from "react";
import { Navbar } from "./components/nav-bar/Navbar";
import CustomTitle from "./components/custom-title/CustomTitle";
import CustomButton from "./components/custom-button/CustomButton";
import { ShoppingCartOutlined, CreditCardOutlined } from "@ant-design/icons";
import StarRating from "./components/star-rating/StarRating";
import ProductCard from "./components/product-card/ProductCard";
import CustomCard from "./components/custom-card/CustomCard";
import ReviewCard from "./components/review-card/FeedbackCard";
import ReviewInputForm from "./containers/feedback-input-form/FeedbackInputForm";
import ShoppingCartTable from "./containers/shopping-cart-table/ShoppingCartTable";
import ReusableForm from "./components/reusable-form/ReusableForm";
import ReusableSearchBar from "./components/reusable-search-bar/ReusableSearchBar";

const App: React.FC = () => {
  const [rating, setRating] = React.useState(4.5);

  function handleRatingChange(value: number): void {
    setRating(value);
    console.log(`New rating is ${value}`);
  }

  const handleAddToCart = () => {
    console.log("Added to cart!");
  };

  const handleAddToWishlist = () => {
    console.log("Added to wishlist!");
  };
  const handleSubmit = (values: any) => {
    console.log("Form Submitted:", values);
  };
  const handleCardClick = () => {
    console.log("Card clicked!");
  };
  return (
    <>
      {/* <ProductCard
        imageUrl="./assets/Blue_Cute_Dog.png"
        title="Hoodies & Sweatshirt"
        price="$123.00"
        rating={4.5}
        onAddToCart={handleAddToCart}
        onWishlist={handleAddToWishlist}
      /> */}
      <CustomCard
        imageUrl="Blue_Cute_Dog.png" // Replace with your image name
        title="Summer"
        subtitle="Explore Now!"
        onClick={handleCardClick}
      />
      <ReviewCard
        // key={index}
        imageUrl={"https://via.placeholder.com/50"}
        name={"Floyd Miles"}
        feedback={"testimonial.review"}
        rating={3.5}
      />
      <ReviewInputForm />
      <ShoppingCartTable />
      <ReusableForm
        isAgeVisible={true}
        onSubmit={handleSubmit}
        buttonName={"Save"}
      />
      <ReusableSearchBar
        placeholder="Search for items"
        onSearch={(value) => console.log("Custom Search Value:", value)}
      />
      <ReusableSearchBar placeholder="Search without suffix" suffix={null} />
      <Navbar />
    </>
  );
};

export default App;
