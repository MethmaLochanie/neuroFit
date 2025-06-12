import React, { useState } from "react";
import CustomButton from "../custom-button/CustomButton";
import "./SizeSelector.css";

interface SizeSelectorProps {
  sizes: string[];
  onSelect: (color: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, onSelect }) => {
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="size-selector">
      <div className="size-options">
        {sizes.map((size) => (
          <CustomButton
            key={size}
            className={`size-btn ${selectedSize === size ? "selected" : ""}`}
            onClick={() => {
              onSelect(size);
              setSelectedSize(size);
            }}
          >
            {size}
          </CustomButton>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
