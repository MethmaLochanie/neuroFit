import React, { useState } from "react";
import { Input, Avatar, Dropdown, Button, Upload, Spin } from "antd";
import { DownOutlined, PictureOutlined } from "@ant-design/icons";
import CustomButton from "../../components/custom-button/CustomButton";
import StarRating from "../../components/star-rating/StarRating";
import showNotification from "../../components/custom-notification/CustomNotification";
import { postFeedback } from "../../services/feedbackServiceClient";
import useAuth from "../../hooks/useAuth";
import { useUserByCustomerMappedId } from "../../hooks/useUserByCustomerMappedId";
import { useParams } from "react-router-dom";
import { UploadFile } from "antd/es/upload/interface";
import "./FeedbackInputForm.css";

const { TextArea } = Input;

const FeedbackInputForm: React.FC = () => {
  const items = [
    { label: "Feedback", key: "1" },
    { label: "Bug report", key: "2" },
    { label: "Feature request", key: "3" },
  ];
  const { articleId } = useParams<{ articleId: string }>();
  const { user: authUser } = useAuth();
  const customer_mapped_id = authUser?.customer_mapped_id;
  const {
    user: fetchedUser,
    loading: userLoading,
    error: userError,
  } = useUserByCustomerMappedId(customer_mapped_id);
  const userName = `${fetchedUser?.fName} ${fetchedUser?.lName}` || "User";
  const initial = userName.charAt(0).toUpperCase();

  const [feedbackText, setFeedbackText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [rating, setRating] = useState(0);

  const isFormValid =
    feedbackText.trim().length > 0 &&
    selectedCategory !== "Select Category" &&
    rating > 0;

  const handleMenuClick = (e: any) => {
    const selectedLabel = items.find((item) => item.key === e.key);
    if (selectedLabel) {
      let value = selectedLabel.label.toUpperCase().replace(" ", "_");
      setSelectedCategory(value);
    }
  };

  const handleUploadChange = (info: any) => {
    setUploadedFiles(info.fileList);
  };

  const handleRemoveFile = (file: UploadFile) => {
    setUploadedFiles((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handlePost = async () => {
    const trimmedFeedbackText = feedbackText.trim();
    if (!trimmedFeedbackText) {
      showNotification({
        message: "Submission Error",
        description: "Feedback message cannot be empty",
        type: "error",
      });
      return;
    }
    if (selectedCategory === "Select Category") {
      showNotification({
        message: "Submission Error",
        description: "Please select a category",
        type: "error",
      });
      return;
    }
    if (rating <= 0) {
      showNotification({
        message: "Submission Error",
        description: "Please rate the product",
        type: "error",
      });
      return;
    }
    if (!customer_mapped_id) {
      showNotification({
        message: "User Error",
        description: "You must be logged in to submit feedback.",
        type: "error",
      });
      return;
    }
    try {
      let payload: any;
      let headers: any = {};
      if (uploadedFiles.length > 0) {
        payload = new FormData();
        payload.append("article_id", articleId ?? "");
        payload.append("customer_mapped_id", customer_mapped_id);
        payload.append("feedback_description", trimmedFeedbackText);
        payload.append("feedbackCategory", selectedCategory.toUpperCase());
        payload.append("rating", rating.toString());
        uploadedFiles.forEach((file, idx) => {
          if (file.originFileObj) {
            const fileName = `feedback_${customer_mapped_id}_${articleId}_${Date.now()}_${idx}`;
            payload.append("media", file.originFileObj, fileName);
          }
        });
        headers["Content-Type"] = "multipart/form-data";
      } else {
        payload = {
          article_id: articleId ?? "",
          customer_mapped_id,
          feedback_description: trimmedFeedbackText,
          feedbackCategory: selectedCategory.toUpperCase(),
          rating,
          media: [],
        };
        headers["Content-Type"] = "application/json";
      }
      await postFeedback(payload);
      showNotification({
        message: "Submission Success",
        description: "Feedback saved successfully",
        type: "success",
      });
      setFeedbackText("");
      setSelectedCategory("Select Category");
      setUploadedFiles([]);
      setRating(0);
    } catch (error) {
      showNotification({
        message: "Submission Error",
        description: "Failed to save feedback",
        type: "error",
      });
    }
  };

  return (
    <div className="review-input-form">
      <div className="form-header">
        <Avatar size={50} className="user-avatar">
          {userLoading ? <Spin /> : initial}
        </Avatar>
        <span className="user-name">{userName}</span>
        {userError && <span className="user-error">{userError}</span>}
      </div>
      <TextArea
        placeholder="Add your review here"
        autoSize={{ minRows: 4 }}
        className="review-textarea"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      />
      <div className="form-footer">
        <Upload
          multiple
          beforeUpload={() => false}
          fileList={uploadedFiles}
          onChange={handleUploadChange}
          onRemove={handleRemoveFile}
          listType="picture"
          className="upload-btn"
        >
          <Button type="default" icon={<PictureOutlined />}>
            Add Media
          </Button>
        </Upload>
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          trigger={["click"]}
        >
          <Button>
            {selectedCategory} <DownOutlined />
          </Button>
        </Dropdown>
        <div className="rating-label">Rate</div>
        <StarRating rating={rating} onChange={setRating} />
        <CustomButton
          type="primary"
          customStyle={{
            backgroundColor: "#ff00ff",
            color: "#fff",
            float: "right",
          }}
          onClick={handlePost}
          disabled={!isFormValid}
        >
          Post
        </CustomButton>
      </div>
    </div>
  );
};

export default FeedbackInputForm;
