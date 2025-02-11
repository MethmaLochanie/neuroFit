import React, { useState } from "react";
import { Collapse, Slider } from "antd";
import "./RecommendationFilter.css";
import ColorSelector from "../../components/color-selector/ColorSelector";
import CategoryList from "../../components/custom-category-list/CategoryList";
import SizeSelector from "../../components/size-selector/SizeSelector";


const { Panel } = Collapse;

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
    "#800080", "#000000", "#FF0000", "#FFA500", "#0000FF", "#FFFFFF",
    "#8B4513", "#008000", "#FFFF00", "#808080", "#FFC0CB", "#00BFFF",
    "#800080", "#000000", "#FF0000", "#FFA500", "#0000FF", "#FFFFFF",
    "#8B4513", "#008000", "#FFFF00", "#808080", "#FFC0CB", "#00BFFF",
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

  return (
    <div className="recommendation-filter">
      <Collapse defaultActiveKey={["1", "2", "3", "4"]} bordered={false}>
        
        {/* Filter Section */}
        <Panel header="Filter" key="0">
          <CategoryList categories={categories} />
        </Panel>

        {/* Price Slider */}
        <Panel header="Price" key="1">
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
        </Panel>

        {/* Color Selector */}
        <Panel header="Colors" key="2">
          <ColorSelector colors={colors} onSelect={(color : string) => setSelectedColor(color)} />
        </Panel>

        {/* Size Selector */}
        <Panel header="Size" key="3">
          <div className="size-options">
            <SizeSelector sizes={sizes} onSelect={(size : string) => setSelectedSize(size)} />
          </div>
        </Panel>

        {/* Dress Style */}
        <Panel header="Dress Style" key="4">
          <CategoryList categories={["Classic", "Casual", "Business"]} />
        </Panel>

      </Collapse>
    </div>
  );
};

export default RecommendationFilter;
