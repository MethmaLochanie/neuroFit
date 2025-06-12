import api from "./api";
import { useEffect, useState } from "react";
import { Feedback } from "../types/types";

const useFeedback = (articleId: string) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get<Feedback[]>(
          `/api/feedbacks/feedback/${articleId}`
        );
        setFeedbacks(res.data);
      } catch (error) {
        console.error("Failed to fetch feedbacks", error);
      } finally {
        setLoading(false);
      }
    };

    if (articleId) fetchFeedbacks();
  }, [articleId]);

  return { feedbacks, loading };
};

export default useFeedback;

export const postFeedback = async (data: {
  article_id: string;
  customer_mapped_id: string;
  feedback_description: string;
  feedbackCategory: string;
  rating: number;
  media: string[];
}) => {
  const res = await api.post("api/feedbacks/feedback", data);
  return res.data;
};
