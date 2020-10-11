exports.userSignUpValidator = (req, res, next) => {
    req.check('name', 'name is required').notEmpty();

    req.check('email', 'email is required')
    .notEmpty()
    .isEmail()
    .withMessage('email should to respect eamil format');

    req.check('password', 'password is required')
        .notEmpty()
        .isLength({ min: 4, max: 10 })
        .withMessage('password must be between 6 and 10 caractères ');

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            error: errors[0].msg
        }) // json or send
    }
    next();
}