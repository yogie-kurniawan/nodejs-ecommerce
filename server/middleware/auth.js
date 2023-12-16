const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  badRequestError,
  unauthenticatedError,
  forbiddenError,
} = require("../errors");

const verifyToken = (req, res, next) => {
  const authHeader = req.cookies.token;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.session.error = "You are not authenticated!";
    return false;
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SEC);
  return decoded;
};

const verifyUser = (req, res, next) => {
  const user = verifyToken(req, res, next);
  if (!user) {
    return res.redirect("/");
  }
  req.session.user = user;
  return next();
};

const verifyAdmin = (req, res, next) => {
  const user = verifyToken(req, res, next);
  if (!user) {
    return res.redirect("/");
  }
  if (user && user.isAdmin) {
    return next();
  }
  return res.redirect("/");
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
