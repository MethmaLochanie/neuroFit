const Wishlist = require("../models/Wishlist");

exports.toggleWishlistItem = async (userId, item) => {
  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = new Wishlist({ userId, items: [item] });
    await wishlist.save();
    return { action: "added", wishlist };
  } else {
    const index = wishlist.items.findIndex(
      (i) => i.articleId === item.articleId
    );
    if (index > -1) {
      wishlist.items.splice(index, 1);
      await wishlist.save();
      return { action: "removed", wishlist };
    } else {
      wishlist.items.push(item);
      await wishlist.save();
      return { action: "added", wishlist };
    }
  }
};

exports.getWishlistByUserId = async (userId) => {
  return Wishlist.findOne({ userId });
};
