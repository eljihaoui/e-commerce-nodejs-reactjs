const express = require("express");
const { generateToken, processPayment } = require("../controllers/braintreeController");
const { requireSignIn, isAdmin, isAuth } = require("../middleware/auth-mw");
const { userById } = require("../middleware/user-mw");
const router = express.Router();
router.get("/getToken/:userId", [requireSignIn, isAuth], generateToken);
router.post("/purchase/:userId", [requireSignIn, isAuth], processPayment);


router.param("userId", userById);

module.exports=router

