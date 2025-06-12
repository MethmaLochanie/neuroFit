import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartTable from "../../containers/shopping-cart-table/ShoppingCartTable";
import CartSummary from "../../containers/cart-summary/CartSummary";
import CustomTitle from "../../components/custom-title/CustomTitle";
import ProductCard from "../../components/product-card/ProductCard";
import { AppDispatch, RootState } from "../../redux/store";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { loadRecommendations } from "../../redux/slices/recommendationSlice";
import "./CartPage.css";

const CartPage: React.FC = () => {
  const { user } = useAuth();
  const { getCartItemsByUserId } = useCart();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);

  useEffect(() => {
    if (user?.customer_mapped_id) {
      const fetchCartItems = async () => {
        const items = await getCartItemsByUserId(user?.customer_mapped_id || 0);
        if (items) {
          setCartItems(items);
          // Calculate subtotal based on fetched items
          const total = items.reduce(
            (sum, item) => sum + (item.subtotal || 0),
            0
          );
          setSubTotal(total);
        }
      };
      fetchCartItems();
    }
  }, [user?.customer_mapped_id]);

  const shippingCost = 20;
  const dispatch = useDispatch<AppDispatch>();
  const { products: recProducts } = useSelector(
    (state: RootState) => state.recommendations
  );

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

  const refreshCart = async () => {
    try {
      if (user?.customer_mapped_id) {
        const items = await getCartItemsByUserId(user.customer_mapped_id);
        if (items) {
          setCartItems(items);
          const total = items.reduce(
            (sum, item) => sum + (item.subtotal || 0),
            0
          );
          setSubTotal(total);
        }
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };
  return (
    <div className="cart-page">
      <CustomTitle text="Your Cart" />
      <ShoppingCartTable cartItems={cartItems} refreshCart={refreshCart} />
      <CartSummary subTotal={subTotal} shippingCost={shippingCost} />
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
    </div>
  );
};

export default CartPage;
