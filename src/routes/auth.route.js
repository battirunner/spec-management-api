const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator, signinSession: signinSessionValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/signinsession')
    .post(signinSessionValidator, asyncHandler(authController.signinSessionValidate));

module.exports = router;