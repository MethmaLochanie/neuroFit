const { getProductByArticleIdService } = require("../services/productService");

// get user by Email
exports.getProductByArticleId = async (req, res) => {
  try {
    const user = await getProductByArticleIdService(req.params.articleId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Products Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
