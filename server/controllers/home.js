const Product = require("../models/Product");

const getHome = async (req, res) => {
  let limit = 6;
  let popularProducts = await Product.find().limit(limit);
  let newProducts = await Product.find().sort({ createdAt: -1 }).limit(limit);
  popularProducts.count = popularProducts.length;
  newProducts.count = newProducts.length;
  const locals = {
    title: "E-Commerce",
    description: "E-Commerce",
    page: "home",
  };
  return res.render("pages/index", { popularProducts, newProducts, locals });
};

module.exports = getHome;
