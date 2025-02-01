import React, { useState } from "react";
import { Table, InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./ShoppingCartTable.css";

interface CartItem {
  key: string;
  image: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  shipping: string | number;
}

const initialData: CartItem[] = [
  {
    key: "1",
    image: "https://via.placeholder.com/50",
    name: "Blue Flower Print Crop Top",
    color: "Yellow",
    size: "M",
    price: 29.0,
    quantity: 1,
    shipping: "FREE",
  },
  {
    key: "2",
    image: "https://via.placeholder.com/50",
    name: "Lavender Hoodie",
    color: "Lavender",
    size: "XXL",
    price: 119.0,
    quantity: 2,
    shipping: "FREE",
  },
  {
    key: "3",
    image: "https://via.placeholder.com/50",
    name: "Black Sweatshirt",
    color: "Black",
    size: "XXL",
    price: 123.0,
    quantity: 2,
    shipping: 5.0,
  },
];

const ShoppingCartTable: React.FC = () => {
  const [cartData, setCartData] = useState(initialData);

  const handleQuantityChange = (value: number, record: CartItem) => {
    const updatedData = cartData.map((item) =>
      item.key === record.key ? { ...item, quantity: value } : item
    );
    setCartData(updatedData);
  };

  const handleDelete = (key: string) => {
    const updatedData = cartData.filter((item) => item.key !== key);
    setCartData(updatedData);
  };

  const columns = [
    {
      title: "PRODUCT DETAILS",
      dataIndex: "image",
      key: "image",
      render: (text: string, record: CartItem) => (
        <div className="product-details">
          <img src={record.image} alt={record.name} className="product-image" />
          <div>
            <p className="product-name">{record.name}</p>
            <p className="product-attributes">Color: {record.color}</p>
            <p className="product-attributes">Size: {record.size}</p>
          </div>
        </div>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span className="price">${price.toFixed(2)}</span>
      ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: CartItem) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(value as number, record)}
          className="quantity-input"
        />
      ),
    },
    {
      title: "SHIPPING",
      dataIndex: "shipping",
      key: "shipping",
      render: (shipping: string | number) =>
        shipping === "FREE" ? (
          <span className="free-shipping">FREE</span>
        ) : (
          `$${(shipping as number).toFixed(2)}`
        ),
    },
    {
      title: "SUBTOTAL",
      key: "subtotal",
      render: (_: any, record: CartItem) => (
        <span className="price">
          ${(record.price * record.quantity).toFixed(2)}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: CartItem) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
          className="delete-button"
        />
      ),
    },
  ];

  return <Table columns={columns} dataSource={cartData} pagination={false} />;
};

export default ShoppingCartTable;
