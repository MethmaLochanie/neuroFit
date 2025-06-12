import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import UploadPng from "../upload-png/UploadPng";

const { Search } = Input;

interface ReusableSearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  suffix?: React.ReactNode;
  size?: "large" | "middle" | "small";
  enterButton?: boolean | React.ReactNode;
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
