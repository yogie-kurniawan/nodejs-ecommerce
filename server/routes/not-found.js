const express = require("express");
const router = express.Router();

router.get("*", (req, res, next) => {
  return res.render("pages/not-found");
});

module.exports = router;
