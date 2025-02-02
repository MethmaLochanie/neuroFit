import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import UploadPng from "../upload-png/UploadPng";

const { Search } = Input;

interface ReusableSearchBarProps {
  placeholder?: string; // Placeholder text for the search bar
  onSearch?: (value: string) => void; // Callback for search
  suffix?: React.ReactNode; // Optional suffix (e.g., an upload icon or any element)
  size?: "large" | "middle" | "small"; // Size of the search bar
  enterButton?: boolean | React.ReactNode; // Custom search button
}

const ReusableSearchBar: React.FC<ReusableSearchBarProps> = ({
  placeholder = "Search",
  onSearch = (value) => console.log("Search value:", value),
  suffix = <UploadPng />,
  size = "middle",
  enterButton = <SearchOutlined />,
}) => {
  return (
    <Search
      placeholder={placeholder}
      enterButton={enterButton}
      size={size}
      suffix={suffix}
      onSearch={onSearch}
    />
  );
};

export default ReusableSearchBar;
