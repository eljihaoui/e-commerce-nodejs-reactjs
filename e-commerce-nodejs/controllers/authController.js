const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
exports.getUsers = (req, res) => {
    res.send({ message: 'users module .... getUsers' });
};

exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).send(err)
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.send(user); // user : user after persisting 
    })
}
exports.singin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => { // si bon return user sinon return err
        if (err || !user) {
           return  res.status(400).json({
                error: "user not found please singup"
            });
        }
        if (!user.authenticate(password)) {
            return  res.status(401).json({ error: "user not authorized, email and passeword dont't match !" });// 401 not authorized
        }
        // si connected then generate token with jwt json web token
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        // if sign then return payload that contains _id  will be used as userProperty:"auth" in auth-mw.js
        // variable "auth" will recevice payload of methed jwt.sign  

        res.cookie('token', token, { expire: new Date() + 900000 }) //900000 Milliseconds = 15 minutes
        const { _id, name, email, role } = user;
        return res.json({
            token,
            user: { _id, name, email, role }
        })
    });
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "user sign out "
    });
}