import React, { useState } from "react";
import { Collapse, Slider } from "antd";
import ColorSelector from "../../components/color-selector/ColorSelector";
import CategoryList from "../../components/custom-category-list/CategoryList";
import SizeSelector from "../../components/size-selector/SizeSelector";
import "./RecommendationFilter.css";

const RecommendationFilter: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);

  const categories = [
    "Tops",
    "Printed T-shirts",
    "Plain T-shirts",
    "Kurti",
    "Boxers",
    "Full sleeve T-shirts",
    "Joggers",
    "Payjamas",
    "Jeans",
  ];

  const colors = [
    "#800080",
    "#000000",
    "#FF0000",
    "#FFA500",
    "#0000FF",
    "#FFFFFF",
    "#8B4513",
    "#008000",
    "#FFFF00",
    "#808080",
    "#FFC0CB",
    "#00BFFF",
    "#800080",
    "#000000",
    "#FF0000",
    "#FFA500",
    "#0000FF",
    "#FFFFFF",
    "#8B4513",
    "#008000",
    "#FFFF00",
    "#808080",
    "#FFC0CB",
    "#00BFFF",
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

  const items = [
    {
      key: "0",
      label: "Filter",
      children: <CategoryList categories={categories} />,
    },
    {
      key: "1",
      label: "Price",
      children: (
        <>
          <Slider
            range
            min={10}
            max={1000}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
          />
          <div className="price-values">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Colors",
      children: (
        <ColorSelector
          colors={colors}
          onSelect={(color: string) => setSelectedColor(color)}
        />
      ),
    },
    {
      key: "3",
      label: "Size",
      children: (
        <div className="size-options">
          <SizeSelector
            sizes={sizes}
            onSelect={(size: string) => setSelectedSize(size)}
          />
        </div>
      ),
    },
    {
      key: "4",
      label: "Dress Style",
      children: <CategoryList categories={["Classic", "Casual", "Business"]} />,
    },
  ];

  return (
    <div className="recommendation-filter">
      <Collapse defaultActiveKey={["1", "2", "3", "4"]} bordered={false} items={items} />
    </div>
  );
};

export default RecommendationFilter;
