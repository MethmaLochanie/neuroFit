import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  HeartOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./Navbar.css";
import ReusableSearchBar from "../reusable-search-bar/ReusableSearchBar";
import CustomButton from "../custom-button/CustomButton";
import { AuthContext } from "../../context/AuthContext";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  // const { login } = useAuth();
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = auth?.user !== null;

  // Define paths where the search bar should be hidden
  const hiddenSearchPaths = ["/signup", "/login", "/recommendations"];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">NeuroFit</span>
        <ul className="navbar-links">
          <li>Home</li>
          <li>Categories</li>
        </ul>
      </div>

      <div className="navbar-right">
        {/* Hide search bar only for specified routes or if user is logged in */}
        {!hiddenSearchPaths.includes(location.pathname) && isLoggedIn && (
          <div className="navbar-search">
            <ReusableSearchBar
              placeholder="Search for items"
              onSearch={(value) => console.log("Custom Search Value:", value)}
            />
          </div>
        )}

        {isLoggedIn && (
          <>
            <div className="navbar-icons">
              <Button icon={<HeartOutlined />} type="text" />
              <Button icon={<UserOutlined />} type="text" />
              <Button icon={<ShoppingCartOutlined />} type="text" />
            </div>
            <div className="navbar-btn">
              <CustomButton
                onClick={() => {
                  auth?.logout();
                  navigate("/");
                }}
              >
                Log Out
              </CustomButton>
            </div>
          </>
        )}

        {/* Hide Sign Up & Login buttons when user is logged in */}
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
