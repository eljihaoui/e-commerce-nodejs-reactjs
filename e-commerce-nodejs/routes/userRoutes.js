
const express = require('express')
const { getOneUser, updateOneUser } = require("../controllers/userController");
const {userById}  = require ('../middleware/user-mw')
const {requireSignIn,isAuth,isAdmin} = require('../middleware/auth-mw')
const router = express.Router();

router.get('/profile/:userId',requireSignIn,isAuth, getOneUser);
router.put("/profile/:userId", requireSignIn, isAuth, updateOneUser); 

router.param('userId', userById); 
// requireSignIn middleware declancé avant d'exécuter getOneUser
// une fois je rencontre une route '/profile/:userId' avec un segment dynamique userId donc je dois déclencher 
// le middleware userById pour récuper user et le stocker dans la variable profile par userById
// the middleware isAuth will verify if the coorect user connected 
module.exports = router;