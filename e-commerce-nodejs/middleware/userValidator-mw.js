exports.userSignUpValidator = (req, res, next) => {
    req.check('name', 'name is required').notEmpty();
    req.check('email', 'email is required').isEmail();
    req.check('password', 'password is required')
        .notEmpty()
        .isLength({ min: 6, max: 10 })
        .withMessage('password must be between 6 and 10 caractères ');
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json(errors); // json or send
    }
    next();
}