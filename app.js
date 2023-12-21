require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const cookie = require("cookie-parser");
const connectDB = require("./server/config/connectDB");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const flash = require("connect-flash");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 1 * 24,
      sameSite: true,
    },
  })
);

// Cookie
app.use(cookie());

app.use(flash());

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

// Template Engine and Layout
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

// Routers
const homeRoute = require("./server/routes/home");
const authRoute = require("./server/routes/auth");
const userRoute = require("./server/routes/user");
const productRoute = require("./server/routes/product");
const cartRoute = require("./server/routes/cart");
const orderRoute = require("./server/routes/order");
const notFoundRoute = require("./server/routes/not-found");

// Admin Router
const adminRoute = require("./server/routes/admin");

// Route
app.use("/", homeRoute);
app.use("/", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/carts", cartRoute);

// Admin Routes
app.use("/admin", adminRoute);

// Not Found Middleware
app.use(notFoundRoute);

// PORT
const port = process.env.PORT || 3000;

// CONNECTION
const start = async () => {
  try {
    // connect DB
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
