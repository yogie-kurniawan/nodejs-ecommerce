const Cart = require("../models/Cart");

const index = async (req, res, next) => {
  let cart = null;
  let total = 0;

  try {
    if (req.session.user) {
      cart = await Cart.aggregate([
        {
          $match: {
            userId: req.session.user.id,
          },
        },
        {
          $lookup: {
            from: "Product",
            localField: "products.productId",
            foreignField: "_id",
            as: "cartProduct",
          },
        },
      ]);
      console.log(cart);
    }
    return res.render("pages/cart/index", { cart, total });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
};
