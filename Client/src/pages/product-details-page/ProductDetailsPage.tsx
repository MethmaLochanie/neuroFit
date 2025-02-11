import React from "react";
import "./ProductDetailsPage.css"; // Import CSS for styling
import ProductDetails from "../../containers/product-details/ProductDetails";
import CustomTitle from "../../components/custom-title/CustomTitle";
import FeedbackInputForm from "../../containers/feedback-input-form/FeedbackInputForm";
import ProductCard from "../../components/product-card/ProductCard";
import FeedbackCard from "../../components/review-card/FeedbackCard";

const ProductDetailsPage: React.FC = () => {
  return (
    <div className="product-details-page">
      {/* Product Details Section */}
      <section className="product-section">
        <ProductDetails
          title="Raven Hoodie With Black Colored Design"
          description="A stylish black hoodie with a comfortable fit."
          price="65.00"
          images={[
            "Blue_Cute_Dog.png",
            "Neutral_Minimalism.png",
            "Grey_Black.png",
          ]}
          colors={["black", "red", "gold", "pink"]}
          sizes={["XS", "S", "M", "L", "XL"]}
          rating={3.5}
          comments={120}
        />
      </section>

      {/* Feedback Input Section */}
      <section className="feedback-section">
        <CustomTitle text="Add Feedback" />
        <FeedbackInputForm />
      </section>

      {/* Feedback List Section */}
      <section className="feedback-list-section">
        <CustomTitle text="Feedbacks" />
        <div className="product-list">
          <FeedbackCard
            imageUrl={""}
            name={"Methma"}
            feedback={"blah"}
            rating={5}
          />
          <FeedbackCard
            imageUrl={""}
            name={"Methma"}
            feedback={"blah"}
            rating={5}
          />
          <FeedbackCard
            imageUrl={""}
            name={"Methma"}
            feedback={"blah"}
            rating={5}
          />
          <FeedbackCard
            imageUrl={""}
            name={"Methma"}
            feedback={"blah"}
            rating={5}
          />
          <FeedbackCard
            imageUrl={""}
            name={"Methma"}
            feedback={"blah"}
            rating={5}
          />
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="recommendations-section">
        <CustomTitle text="Your Recommendations" />
        <div className="product-list">
          <ProductCard
            imageUrl="Blue_Cute_Dog.png"
            title="Hoodie"
            price="$5"
            rating={1.5}
          />
          <ProductCard
            imageUrl="Neutral_Minimalism.png"
            title="Sweater"
            price="$8"
            rating={4.0}
          />
          <ProductCard
            imageUrl="Grey_Black.png"
            title="Jacket"
            price="$12"
            rating={4.5}
          />
          <ProductCard
            imageUrl="Neutral_Minimalism.png"
            title="Sweater"
            price="$8"
            rating={4.0}
          />
          <ProductCard
            imageUrl="Neutral_Minimalism.png"
            title="Sweater"
            price="$8"
            rating={4.0}
          />
          <ProductCard
            imageUrl="Neutral_Minimalism.png"
            title="Sweater"
            price="$8"
            rating={4.0}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
