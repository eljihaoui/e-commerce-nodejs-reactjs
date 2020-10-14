
const Product = require("../models/productModel");
exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category", "name createdAt") // charge libe categ
    .exec((err, product) => {
      if (err || !product) {
        return res.status(404).json({
          error: "product not found !",
        });
      }
      req.product = product;
      next();
    });
};
