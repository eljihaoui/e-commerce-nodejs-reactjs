const express = require("express");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const cors = require('cors');
// import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categRoutes = require("./routes/categRoutes");
const productRoutes = require("./routes/productRoutes");

// Config App
const app = express(); // methode
require("dotenv").config();

// Database mongodb
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true, // pour ne pas afficher les messages dans le log
    useCreateIndex: true, //  ...
    useUnifiedTopology: true, //  ...
  })
  .then(() => console.log("Connected to Database ecommerce"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json()); // convert bson en json
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());
// Route Middleware
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categRoutes);
app.use("/api/product", productRoutes);

// Running Server
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`App E-Commerce is running at port ${port}`)
);
