import React, { useContext, useEffect, useRef } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomTitle from "../../components/custom-title/CustomTitle";
import CustomImage from "../../components/custom-image/CustomImage";
import ProductCard from "../../components/product-card/ProductCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import showNotification from "../../components/custom-notification/CustomNotification";
import { useDispatch, useSelector } from "react-redux";
import { loadRecommendations } from "../../redux/slices/recommendationSlice";
import { AppDispatch, RootState } from "../../redux/store";
import useAuth from "../../hooks/useAuth";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { fetchWishlist } from "../../redux/slices/wishlistSlice";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = auth?.user !== null;
  const dispatch = useDispatch<AppDispatch>();
  const { products: recProducts } = useSelector(
    (state: RootState) => state.recommendations
  );

  const wishlistItems = useSelector((state: any) => state.wishlist.items);

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

  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(fetchWishlist(auth.user.id));
    }
  }, [auth?.user?.id, dispatch]);

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

  const handleAccessCatagoryPage = () => {
    if (!auth?.user) {
      showNotification({
        message: "Access Denied",
        description: "You need to log in to view this page.",
        type: "error",
      });
      return;
    }
    navigate("/product-details");
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="homepage">
      <div className="banner">
        <div className="banner-text">
          <h1 className="title">Neuro Fit Store</h1>
          <CustomButton className="shop-now-btn" onClick={handleAccessPage}>
            Shop Now
          </CustomButton>
        </div>
        <div className="banner-image">
          <CustomImage src="cover.jpg" alt="Colorful cloths" />
        </div>
      </div>
      {isLoggedIn && recProducts.length > 0 && (
        <div className="section">
          <div>
            <CustomTitle text="Your Recommendations" />
          </div>
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
                  inWishlist={wishlistItems.some(
                    (item: any) => item.articleId === product.article_id
                  )}
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
      )}

      {!isLoggedIn && (
        <div className="section">
          <CustomTitle text="Your Recommendations" />
          <p>Please log in to view personalized recommendations.</p>
        </div>
      )}

      {/* Departments Section */}

      {/* Top List Section */}
      {/* <div className="section">
        <div className="section-title">
          <CustomTitle text="Top List" />
        </div>
        <ProductCard
          imageUrl="Blue_Cute_Dog.png"
          title="Hoodie"
          price="$5"
          rating={1.5}
        />
      </div> */}

      {/* Categories Section */}
      {/* <div className="section">
        <div className="section-title">
          <CustomTitle text="Categories" />
        </div>
        <div className="carousel">
          <CustomCarousel
            items={departments.map((dept) => ({
              imageUrl: dept.previewImage,
              title: dept.department_name,
              subtitle: `Dept #${dept.department_no}`,
              onClick: () => handleAccessCatagoryPage(), // or pass dept.department_no to fetch products
            }))}
          />
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
