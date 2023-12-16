const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const { ceckEmail } = require("./util");

// SIGNUP
const getSignup = (req, res, next) => {
  return res.render("pages/signup", { layout: "./layouts/auth" });
};

const postSignup = async (req, res, next) => {
  let { name, username, password, email } = req.body;
  const errors = {};

  // Validation
  if (!name) {
    errors.name = { msg: "Name is required!" };
  }
  if (!username) {
    errors.username = { msg: "Username is required!" };
  }
  if (!email) {
    errors.email = { msg: "Email is required!" };
  }
  if (email) {
    email = email.trim();

    if (!ceckEmail(email)) {
      errors.email = { msg: "Email is not valid" };
    }
  }

  if (!password) {
    errors.password = { msg: "Password is required!" };
  }

  if (Object.keys(errors).length > 0) {
    return res.render("pages/signup", {
      errors,
      name,
      username,
      email,
      password,
    });
  }

  try {
    password = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, username, email, password });
    const save = await newUser.save();
    res.redirect("/signin");
  } catch (err) {
    req.session.error = err.message;
  }
};

// Signin
const getSignin = (req, res, next) => {
  return res.render("pages/signin", { layout: "./layouts/auth" });
};

const postSignin = async (req, res, next) => {
  let { username, password } = req.body;
  const errors = {};

  if (!username) {
    errors.username = "Username is required!";
  }

  if (!password) {
    errors.password = "Password is required!";
  }

  if (Object.keys(errors).length > 0) {
    return res.render("pages/signin", {
      errors,
      username,
      password,
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      req.session.error = "User not found!";
      return res.redirect("/signin");
    }

    // Check Password
    const cekPassword = await bcrypt.compare(password, user.password);
    if (!cekPassword) {
      req.session.error = "Password is incorrect!";
      return res.redirect("/signin");
    }

    const userData = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const token =
      "Bearer " + jwt.sign(userData, process.env.JWT_SEC, { expiresIn: "3d" });

    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      expires: 24 * 60 * 60 * 1000,
      maxAge: 24 * 60 * 60 * 1000,
    });

    req.session.user = userData;
    return res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie("token");
  redirect("/login");
};

module.exports = {
  getSignup,
  postSignup,
  getSignin,
  postSignin,
  logout,
};
