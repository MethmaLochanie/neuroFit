import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const proceedToCheckout = (items: any[]) => {
    navigate("/checkout", { state: { checkoutItems: items } });
  };

  const directCheckout = (item: any) => {
    proceedToCheckout([item]);
  };

  return {
    isProcessing,
    proceedToCheckout,
    directCheckout,
  };
};
