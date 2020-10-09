
const Product = require("../models/productModel");
exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(404).json({
        error: "product not found !",
      });
    }
    req.product = product;
    next();
  });
};
