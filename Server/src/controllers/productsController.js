const {
  getProductsByArticleIdsService,
  getRecommendationsWithDetails,
  getProductByArticleIdService,
  getImagesByProductCodeService,
  getSignedAzureUrlService,
} = require("../services/productService");
const Wishlist = require("../models/Wishlist");
const wishlistService = require("../services/wishlistService");

exports.getProductsByArticleIds = async (req, res) => {
  try {
    const articleIds = req.body.articleIds;

    if (!Array.isArray(articleIds)) {
      return res.status(400).json({ message: "articleIds must be an array" });
    }

    const products = await getProductsByArticleIdsService(articleIds);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecommendedProducts = async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (!userId) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const recommendedProducts = await getRecommendationsWithDetails(userId);
    res.status(200).json(recommendedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductByArticleId = async (req, res) => {
  try {
    const { articleId } = req.params;
    const product = await getProductByArticleIdService(articleId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getImagesByProductCode = async (req, res) => {
  const { product_code } = req.params;
  try {
    const images = await getImagesByProductCodeService(product_code);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSignedAzureUrl = async (req, res) => {
  try {
    const { imageUrl } = req.query;
    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const signedUrl = await getSignedAzureUrlService(imageUrl);
    res.status(200).json({ signedUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { userId, item } = req.body;
    if (!userId || !item) {
      return res.status(400).json({ message: "userId and item are required" });
    }

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [item] });
      await wishlist.save();
      return res
        .status(201)
        .json({ message: "Wishlist created and item added", wishlist });
    } else {
      const exists = wishlist.items.some((i) => i.articleId === item.articleId);
      if (exists) {
        return res
          .status(200)
          .json({ message: "Item already in wishlist", wishlist });
      }
      wishlist.items.push(item);
      await wishlist.save();
      return res
        .status(200)
        .json({ message: "Item added to wishlist", wishlist });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleWishlist = async (req, res) => {
  try {
    const { userId, item } = req.body;
    if (!userId || !item) {
      return res.status(400).json({ message: "userId and item are required" });
    }
    const { action, wishlist } = await wishlistService.toggleWishlistItem(
      userId,
      item
    );
    const message =
      action === "added" ? "Added to wishlist" : "Removed from wishlist";
    res.status(200).json({ message, action, wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const wishlist = await wishlistService.getWishlistByUserId(userId);
    res.status(200).json(wishlist || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
