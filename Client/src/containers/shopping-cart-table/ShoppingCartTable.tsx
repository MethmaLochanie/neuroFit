import React, { useEffect, useState, useMemo } from "react";
import { Table, InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomImage from "../../components/custom-image/CustomImage";
import { fetchProductByArticleId } from "../../services/recommendationClient";
import {
  removeFromCartService,
  updateCartItemService,
} from "../../services/cartService";
import showNotification from "../../components/custom-notification/CustomNotification";
import "./ShoppingCartTable.css";
interface Props {
  cartItems: any[];
  refreshCart: () => Promise<void>;
}

const ShoppingCartTable: React.FC<Props> = ({ cartItems, refreshCart }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [localCartItems, setLocalCartItems] = useState<any[]>(cartItems);
  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productPromises = localCartItems.map((item) =>
          fetchProductByArticleId(item.article_id)
            .then((product) => ({ ...product, cartItemId: item._id }))
            .catch(() => null)
        );

        const productsData = await Promise.all(productPromises);
        setProducts(productsData.filter(Boolean));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (localCartItems.length > 0) {
      fetchProducts();
    }
  }, [localCartItems]);

  const tableData = useMemo(() => {
    return localCartItems.map((item) => {
      const product = products.find((p) => p?.article_id === item.article_id);
      const price =
        product?.price ??
        (item.subtotal ? item.subtotal / (item.quantity || 1) : 0);
      const quantity = item.quantity ?? 1;
      const subtotal = price * quantity;

      return {
        ...item,
        id: item._id,
        image: product?.imageUrl ?? "",
        name: product?.prod_name ?? "Product not found",
        price: price,
        color: product?.colour_group_name ?? "N/A",
        size: item.size ?? "N/A",
        quantity: quantity,
        subtotal: subtotal,
      };
    });
  }, [localCartItems, products]);

  const handleQuantityChange = async (value: number, item: any) => {
    try {
      setIsLoading(true);
      const newSubtotal = (item.price ?? 0) * value;
      setLocalCartItems((prevItems) =>
        prevItems.map((i) =>
          i._id === item._id
            ? { ...i, quantity: value, subtotal: newSubtotal }
            : i
        )
      );
      const response = await updateCartItemService(item._id, {
        quantity: value,
        subtotal: newSubtotal,
      });

      if (!response) {
        throw new Error("Failed to update cart item");
      }
      await refreshCart();
      showNotification({
        message: "Success",
        description: "Quantity updated successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      setLocalCartItems(cartItems);
      showNotification({
        message: "Error",
        description: "Failed to update quantity",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      setIsLoading(true);
      await removeFromCartService(_id);
      await refreshCart();
      showNotification({
        message: "Success",
        description: "Item removed from cart",
        type: "success",
      });
    } catch (error) {
      showNotification({
        message: "Error",
        description: "Failed to remove item",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      key: "image",
      render: (_: any, item: any) => (
        <div className="product-details">
          <CustomImage
            src={item.image || ""}
            alt={item.name}
            className="order-item-image"
          />
          <div>
            <div>{item.name || "No product name"}</div>
            <div>Color: {item.color || "N/A"}</div>
            <div>Size: {item.size || "N/A"}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number | undefined) => `$${(price ?? 0).toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number | undefined, item: any) => (
        <InputNumber
          min={1}
          value={quantity ?? 1}
          onChange={(value) => handleQuantityChange(value as number, item)}
        />
      ),
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (_: any, item: any) => `$${(item.subtotal ?? 0).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, item: any) => (
        <Button
          danger
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(item._id)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      rowKey="_id"
      loading={isLoading}
    />
  );
};

export default ShoppingCartTable;
