const express = require('express')
const router = express.Router();
const { getUsers, signup, singin, signout } = require('../controllers/authController');
const { userSignUpValidator } = require('../middleware/userValidator-mw');
const { requireSignIn } = require('../middleware/auth-mw');
router.get('/', getUsers);

router.post('/signup', userSignUpValidator, signup);
router.post('/signin', singin);
router.get('/signout', signout);
router.get('/hello',requireSignIn, (req, res) => {
    res.send("hello there ");
});

module.exports = router;