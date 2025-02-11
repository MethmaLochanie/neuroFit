import React from "react";
import ShoppingCartTable from "../../containers/shopping-cart-table/ShoppingCartTable";
import CartSummary from "../../containers/cart-summary/CartSummary";
import "./CartPage.css";
import ProductCard from "../../components/product-card/ProductCard";
import CustomTitle from "../../components/custom-title/CustomTitle";

const CartPage: React.FC = () => {
  return (
    <div className="cart-page">
      <div>
        <ShoppingCartTable />
        <CartSummary subTotal={30} shippingCost={40} />
      </div>
      <CustomTitle text="Your Recommendations" />
      <div className="cart-page-product-list">
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
    </div>
  );
};

export default CartPage;
