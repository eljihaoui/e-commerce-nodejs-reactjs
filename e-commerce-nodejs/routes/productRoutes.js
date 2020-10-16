const express = require("express");
const router = express.Router();

const { userById } = require("../middleware/user-mw");
const { productById } = require("../middleware/product-mw");
const { requireSignIn, isAdmin, isAuth } = require("../middleware/auth-mw");

const {
  allProducts,
  createProduct,
  showProduct,
  removeProduct,
  updateProduct,
  relatedProduct,
  searchProduuct,
  photoProduuct
} = require("../controllers/productController");

router.get("/", allProducts);

router.get("/related/:productId", relatedProduct);

router.post("/search", searchProduuct);

router.get("/photo/:productId", photoProduuct);

router.post("/create/:userId", [requireSignIn, isAdmin, isAuth], createProduct);

router.param("userId", userById);

router.delete(
  "/:productId/:userId",
  [requireSignIn, isAdmin, isAuth],
  removeProduct
);

router.put(
  "/:productId/:userId",
  [requireSignIn, isAdmin, isAuth],
  updateProduct
);
router.get("/:productId", showProduct);


router.param("productId", productById);

module.exports = router;
