const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const verifyAdmin = require('../middlewares/authMiddleware');
const { signup: signupValidator, signin: signinValidator, signinSession: signinSessionValidator, invite: inviteValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/invite')
    .post(inviteValidator, asyncHandler(verifyAdmin), asyncHandler(authController.inviteUser));

router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/signinsession')
    .post(signinSessionValidator, asyncHandler(authController.signinSessionValidate));

// router.post('/register', userController.registerUser);

module.exports = router;