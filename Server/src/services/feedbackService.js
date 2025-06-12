const { BlobServiceClient } = require("@azure/storage-blob");
const Feedback = require("../models/Feedback");

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.CONTAINER_NAME;

async function uploadToAzure(file, fileName) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });
    console.log("File uploaded successfully:", fileName);
    return blockBlobClient.url;
  } catch (error) {
    console.error("Azure upload error:", error);
    throw new Error("Failed to upload file to Azure");
  }
}

const generateFileName = (
  customer_mapped_id,
  article_id,
  idx,
  fileExtension
) => {
  const timestamp = Date.now();
  const dateStr = new Date(timestamp).toISOString().split("T")[0]; // Format: YYYY-MM-DD
  return `feedback_${customer_mapped_id}_${article_id}_${dateStr}_${timestamp}_${idx}`;
};

exports.feedbackService = async (req) => {
  const isMultipart = req.files && req.files.length > 0;
  const {
    article_id,
    customer_mapped_id,
    feedback_description,
    feedbackCategory,
    rating,
  } = isMultipart ? req.body : req.body;

  if (!feedback_description || !feedback_description.trim()) {
    return { success: false, message: "Feedback message cannot be empty" };
  }
  if (!feedbackCategory) {
    return { success: false, message: "Category is required" };
  }
  if (!rating || isNaN(Number(rating)) || Number(rating) <= 0) {
    return { success: false, message: "Rating is required" };
  }

  let media = [];
  if (isMultipart) {
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const ext = file.originalname.split(".").pop();
      const fileName = generateFileName(customer_mapped_id, article_id, i, ext);
      const url = await uploadToAzure(file, fileName);
      media.push(url);
    }
  }

  const feedback = new Feedback({
    article_id,
    customer_mapped_id,
    feedback_description: feedback_description.trim(),
    feedbackCategory,
    rating: Number(rating),
    media,
  });

  try {
    await feedback.save();
    console.log("Feedback saved successfully:", feedback);
    return { success: true, data: feedback };
  } catch (error) {
    console.error("Error saving feedback:", error);
    throw new Error("Failed to save feedback");
  }
};

exports.getFeedbacksByArticleIdService = async (article_id) => {
  try {
    const feedback = await Feedback.find({ article_id });
    if (!feedback || feedback.length === 0) {
      throw new Error("Feedback not found for this article");
    }
    return feedback;
  } catch (error) {
    console.error("Error fetching feedbacks:", error.message);
    throw new Error("Failed to fetch feedbacks");
  }
};
