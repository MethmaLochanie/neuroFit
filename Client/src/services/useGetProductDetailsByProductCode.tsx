import { useEffect, useState } from "react";
import api from "./api";
import { Product } from "../types/types";

const useGetProductDetailsByProductCode = (productCode?: number) => {
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productCode) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await api.get(`api/products/images/${productCode}`);
        setProductDetails(res.data);
      } catch (err: any) {
        setError("Failed to fetch product images.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [productCode]);

  return { productDetails, loading, error };
};

export default useGetProductDetailsByProductCode;
