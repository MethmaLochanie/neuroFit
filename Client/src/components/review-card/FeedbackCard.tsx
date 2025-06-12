import React, { useState } from "react";
import { Avatar, Spin, Modal } from "antd";
import StarRating from "../star-rating/StarRating";
import { useUserByCustomerMappedId } from "../../hooks/useUserByCustomerMappedId";
import CustomImage from "../custom-image/CustomImage";
import "./FeedbackCard.css";

interface FeedbackCardProps {
  customerMappedId: number;
  title: string;
  feedback: string;
  rating: number;
  media?: string[];
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  customerMappedId,
  title,
  feedback,
  rating,
  media,
}) => {
  const {
    user: fetchedUser,
    loading: userLoading,
    error: userError,
  } = useUserByCustomerMappedId(customerMappedId);
  const userName = `${fetchedUser?.fName} ${fetchedUser?.lName}` || "User";
  const initial = userName.charAt(0).toUpperCase();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <div className="testimonial-card">
      <div className="card-header">
        <div className="form-header">
          <Avatar size={50} className="user-avatar">
            {userLoading ? <Spin /> : initial}
          </Avatar>
          {userError && <span className="user-error">{userError}</span>}
          <span className="user-name">{userName}</span>
        </div>
        <div className="card-details">
          <StarRating rating={rating} readonly />
        </div>
      </div>
      <h3 className="card-name">{title}</h3>
      <p className="card-review">{feedback}</p>
      {media && media.length > 0 && (
        <div className="feedback-media">
          {media.map((url, idx) => (
            <CustomImage
              key={idx}
              src={url}
              alt="Picture of the feedback"
              onClick={() => {
                setPreviewImage(url);
                setPreviewVisible(true);
              }}
              customStyle={{ cursor: "pointer" }}
            />
          ))}
          <Modal
            open={previewVisible}
            footer={null}
            onCancel={() => setPreviewVisible(false)}
            centered
            width={400}
          >
            {previewImage && (
              <CustomImage
                src={previewImage}
                alt="Picture of the feedback"
                customStyle={{ width: "100%", borderRadius: 12 }}
              />
            )}
          </Modal>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
