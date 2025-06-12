import React, { useState } from "react";
import "./ColorSelector.css";

interface ColorSelectorProps {
  colors: string[];
  onSelect: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, onSelect }) => {
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <div
      className="color-selector"
      style={{
        gridTemplateColumns: `repeat(${Math.min(colors.length, 6)}, 1fr)`,
      }}
    >
      {colors.map((color, index) => (
        <button
          key={index}
          className={`color-btn ${selectedColor === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => {
            setSelectedColor(color);
            onSelect(color);
          }}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
