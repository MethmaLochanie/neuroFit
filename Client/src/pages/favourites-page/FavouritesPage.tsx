import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getWishlist } from "../../services/imageService";
import ProductCard from "../../components/product-card/ProductCard";
import { Spin } from "antd";
import CustomTitle from "../../components/custom-title/CustomTitle";
import "./FavouritesPage.css";

const FavouritesPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!auth?.user?.id) return;
      setLoading(true);
      try {
        const wishlist = await getWishlist(auth.user.id);
        setItems(wishlist?.items || []);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [auth?.user?.id]);

  const handleToggleWishlist = (articleId: string) => {
    setItems((prev) => prev.filter((item) => item.articleId !== articleId));
  };

  if (!auth?.user) return <div>Please log in to view your favourites.</div>;
  if (loading)
    return (
      <div className="favourites-loading">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="favourites-page">
      <CustomTitle text="Your Recommendations" />
      {items.length === 0 ? (
        <div>No items in your wishlist.</div>
      ) : (
        <div className="favourites-grid">
          {items.map((item) => (
            <ProductCard
              key={item.articleId}
              articleId={item.articleId}
              imageUrl={item.imageUrl}
              title={item.title}
              price={item.price}
              inWishlist={true}
              onWishlist={() => handleToggleWishlist(item.articleId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
