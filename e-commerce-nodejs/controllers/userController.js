const User = require("../models/userModel");
exports.getOneUser = (req, res) => {
  req.profile.hashed_password = undefined; // ignorer de récuperer le champs hashed_password
  req.profile.salt = undefined; // ignorer de récuperer le champs salt
  return res.json({
    user: req.profile,
  });
};

exports.updateOneUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id }, // critère de recherche
    { $set: req.body }, // for update champs of  users
    { new: true }, // after update return then new user
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      user.hashed_password = undefined; // ignorer de récuperer le champs hashed_password
      user.salt = undefined; // ignorer de récuperer le champs salt
      res.json({
        user: user,
      });
    }
  );
};
