const router = require("express").Router();
const { verifyAdmin } = require("../middleware/auth");

// User
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats,
} = require("../controllers/admin/user");

router.get("/", verifyAdmin, getAllUsers);
router.get("/find/:id", verifyAdmin, getUser);
router.put("/:id", verifyAdmin, updateUser);
router.delete("/:id", verifyAdmin, deleteUser);
router.get("/stats", verifyAdmin, getUserStats);

module.exports = router;

// Product
const {
  getAllProducts,
  createProduct,
  insertProduct,
  editProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/admin/product");

router.get("/products", verifyAdmin, getAllProducts);
router.post("/products/create", verifyAdmin, insertProduct);
router.get("/products/create", verifyAdmin, createProduct);
router.get("/products/:id/edit", verifyAdmin, editProduct);
router.put("/products/:id/update", verifyAdmin, updateProduct);
router.get("/products/:id/delete", verifyAdmin, deleteProduct);

// Order
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getIncome,
} = require("../controllers/admin/order");

router.get("/orders/orders/", verifyAdmin, getAllOrders);
router.get("/orders/find/:id", verifyAdmin, getOrder);
router.post("/orders/", verifyAdmin, createOrder);
router.put("/orders/:id", verifyAdmin, updateOrder);
router.delete("/orders/:id", verifyAdmin, deleteOrder);
router.get("/orders/income", verifyAdmin, getIncome);

module.exports = router;
