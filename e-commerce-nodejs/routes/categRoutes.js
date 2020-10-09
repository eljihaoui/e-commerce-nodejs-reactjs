const express = require("express");
const {
  createCategory,
  showCetegory,
  allCategories,
  updateCategory,
  removeCategory,
} = require("../controllers/categoryController");
const { requireSignIn, isAdmin, isAuth } = require("../middleware/auth-mw");

const { userById } = require("../middleware/user-mw");
const { categoryById } = require("../middleware/category-mw");
const router = express.Router();
router.get("/", allCategories);
router.post(
  "/create/:userId",
  [requireSignIn, isAdmin, isAuth],
  createCategory
);
router.put(
  "/:categoryId/:userId",
  [requireSignIn, isAdmin, isAuth],
  updateCategory
);
router.delete(
  "/:categoryId/:userId",
  [requireSignIn, isAdmin, isAuth],
  removeCategory
);
router.param("userId", userById);
router.get("/:categoryId", showCetegory);
router.param("categoryId", categoryById);
module.exports = router;
