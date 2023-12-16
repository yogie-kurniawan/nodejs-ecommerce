const Product = require("../models/Product");

// GET ALL PRODUCTS
const index = async (req, res) => {
  const qCategory = req.query.category;
  let products = {};
  if (qCategory) {
    products = await Product.find({
      categories: { $in: [qCategory] },
    });
  } else {
    products = await Product.find();
  }
  products.count = products.length;

  const locals = {
    title: "E-Commerce | Products",
    description: "Products",
    page: "products",
  };

  const categories = await Product.distinct("categories");

  return res.render("pages/product/index", {
    locals,
    products,
    categories,
    cat: qCategory,
  });
};

module.exports = {
  index,
};
