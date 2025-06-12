import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  HeartOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import CustomButton from "../custom-button/CustomButton";
import { AuthContext } from "../../context/AuthContext";
import showNotification from "../custom-notification/CustomNotification";
import CustomImage from "../custom-image/CustomImage";
import { useDispatch } from "react-redux";
import { clearRecommendations } from "../../redux/slices/recommendationSlice";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleArrowClick = () => {
    navigate("/");
  };
  const handleHeartButton = () => {
    navigate("/favourites");
  };
  const handleUserButton = () => {
    navigate("/profile");
  };
  const handleCartButton = () => {
    navigate("/cart");
  };
  const isLoggedIn = auth?.user !== null;

  const handleRecommendationsButton = () => {
    navigate("/recommendations");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <CustomImage
          src="image.png"
          alt="NeuroFit Logo"
          width={40}
          height={40}
        />
        <span className="navbar-logo">NeuroFit</span>
        <ul className="navbar-links">
          <li onClick={handleArrowClick}>Home</li>
        </ul>
      </div>

      <div className="navbar-right">
        {isLoggedIn && (
          <>
            <div className="navbar-icons">
              <Button
                icon={<HeartOutlined />}
                type="text"
                onClick={handleHeartButton}
              />
              <Button
                icon={<UserOutlined />}
                type="text"
                onClick={handleUserButton}
              />
              <Button
                icon={<ShoppingCartOutlined />}
                type="text"
                onClick={handleCartButton}
              />
              <Button
                icon={<BulbOutlined />}
                type="text"
                onClick={handleRecommendationsButton}
              />
            </div>
            <div className="navbar-btn">
              <CustomButton
                onClick={() => {
                  auth?.logout();
                  dispatch(clearRecommendations());
                  showNotification({
                    message: "Success",
                    description: "Log out. See you around!",
                    type: "success",
                  });
                  navigate("/");
                }}
              >
                Log Out
              </CustomButton>
            </div>
          </>
        )}

        {!isLoggedIn && (
          <>
            <div className="navbar-btn">
              <CustomButton
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </CustomButton>
            </div>
            <div className="navbar-btn">
              <CustomButton
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
