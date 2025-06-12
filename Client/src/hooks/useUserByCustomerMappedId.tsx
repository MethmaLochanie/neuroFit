import { useEffect, useState } from "react";
import { getUserByCustomerMappedId } from "../services/userService";

export const useUserByCustomerMappedId = (customer_mapped_id?: number) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customer_mapped_id) return;
    setLoading(true);
    getUserByCustomerMappedId(customer_mapped_id)
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        setError("User not found");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [customer_mapped_id]);

  return { user, loading, error };
}; 