const Product = require("../../models/Product");
const path = require("path");

// GET ALL PRODUCTS
const getAllProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const limit = 5;
  try {
    let products = {};

    if (qNew) {
      products = await Product.find().sort({ _id: -1 }).limit(limit);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
      products.count = products.length;
    }
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET PRODUCT
const getProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new notFoundError("Product not found!");
    }
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// CREATE PRODUCT
const createProduct = (req, res) => {
  return res.render("pages/admin/product/create");
};

// INSERT PRODUCT
const insertProduct = async (req, res, next) => {
  let name = req.body.name;
  let price = req.body.price;
  let desc = req.body.desc;
  let categories = req.body.categories;
  let img = req.files.img;
  if (!name || !desc || !img || !categories || !price) {
    req.session.error =
      "Name, description, price, categories and img cannot be empty!";
    return redirect("/products/create");
  }

  let imgOriName = req.files.img.name;
  let imgExt = path.extname(imgOriName);
  let imgName = Date.now() + imgExt;
  let newProduct = new Product({
    name: req.body.name,
    desc: req.body.desc,
    categories: req.body.categories,
    price: req.body.price,
    img: imgName,
  });

  try {
    const product = await Product.create(newProduct);
    let dest = path.join(
      __dirname,
      "../../public/assets/img/product/",
      imgName
    );
    await img.mv(dest);
    return res
      .status(201)
      .json({ message: "Product saved successfully", product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// EDIT PRODUCT
const editProduct = (req, res, next) => {
  const id = req.params.id;
  const product = Product.findOne({ _id: id });
  return res.render("pages/product/edit", { product });
};

// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!product) {
      throw new notFoundError("Product not found!");
    }
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new notFoundError("Product not found!");
    }
    return res.status(200).json({ message: "Product has been deleted!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  insertProduct,
  editProduct,
  updateProduct,
  deleteProduct,
};
