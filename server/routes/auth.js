const router = require("express").Router();
const {
  getSignup,
  postSignup,
  getSignin,
  postSignin,
  logout,
} = require("../controllers/auth");
require("../middleware/auth");

// REGISTER
router.get("/signup", getSignup);
router.post("/signup", postSignup);

// LOGIN
router.get("/signin", getSignin);
router.post("/signin", postSignin);

// LOGOUT
router.get("/logout", logout);
module.exports = router;
