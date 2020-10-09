const expressJWT = require('express-jwt');
require('dotenv').config();
exports.requireSignIn = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth" //auth ={_id,role} // variable "auth" will recevice payload of methed jwt.sign in auth controller 
})
exports.isAuth = (req, res, next) => {
    console.log("auth:" ,req.auth)
    // if(req.auth.role==1){
    //     return next(); // sans verifier if isAuth or no 
    // }
    let user = req.profile && req.auth && (req.profile._id == req.auth._id)
    //req.profile._id : id of connected user  req.auth._id : id user in th token 
    if (!user) {
        return res.status(403).json({
            error: "access denied"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.auth.role == 0) {
        return res.status(403).json({
            error: "Ressource Admin , Access Denied !"
        })
    }
    next();
}