import { useState, useCallback } from "react";
import { toggleWishlist } from "../services/imageService";

export const useWishlist = (
  userId: string,
  articleId: string,
  initial: boolean = false
) => {
  const [inWishlist, setInWishlist] = useState<boolean>(initial);
  const [loading, setLoading] = useState<boolean>(false);

  const toggle = useCallback(
    async (item: any) => {
      setLoading(true);
      try {
        const res = await toggleWishlist(userId, item);
        setInWishlist(res.action === "added");
        return res;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  return { inWishlist, toggle, loading, setInWishlist };
};
