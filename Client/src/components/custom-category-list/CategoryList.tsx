import React from "react";
import { RightOutlined } from "@ant-design/icons";
import "./CategoryList.css";

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <div key={index} className="category-item">
          <span>{category}</span>
          <RightOutlined className="arrow-icon" />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
