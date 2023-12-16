const router = require("express").Router();
const { index } = require("../controllers/product");
const { verifyUser } = require("../middleware/auth");
// index.js

// User
router.get("/", index);

module.exports = router;
