const router = require("express").Router();
const {
  index,
  //   getCart,
  //   createCart,
  //   updateCart,
  //   deleteCart,
} = require("../controllers/cart");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

router.get("/", index);
// router.get("/find/:id", verifyUser, getCart);
// router.post("/", verifyUser, createCart);
// router.put("/:id", verifyUser, updateCart);
// router.delete("/:id", verifyUser, deleteCart);

module.exports = router;
