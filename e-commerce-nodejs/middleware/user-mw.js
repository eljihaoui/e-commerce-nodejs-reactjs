
const User = require('../models/userModel');

exports.userById = (req, res, next, id) => {

    User.findById(id).exec((err, user) => {
        if (err || !user) {
            res.status(404).json({
                error: `user ${id} not  found !`
            })
        }
        req.profile = user  // créer une variable profile (dans l'objet req) qui recoit user comme valeur 
        //res.send(req.profile);
        next();
    });
    
}