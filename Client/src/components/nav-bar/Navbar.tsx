import React from "react";
import { Button } from "antd";
import {
  HeartOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./Navbar.css";
import ReusableSearchBar from "../ReusableSearchBar/ReusableSearchBar";

export const Navbar: React.FC = () => {

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
        <div className="navbar-search">
          <ReusableSearchBar
            placeholder="Search for items"
            onSearch={(value) => console.log("Custom Search Value:", value)}
          />
        </div>
        <div className="navbar-icons">
          <Button icon={<HeartOutlined />} type="text" />
          <Button icon={<UserOutlined />} type="text" />
          <Button icon={<ShoppingCartOutlined />} type="text" />
        </div>
      </div>
    </nav>
  );
};
