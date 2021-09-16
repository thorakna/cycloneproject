const express = require('express');
const router = express.Router();
const authController=require('../controllers/authController');

router.post('/login',authController.postLogin);
router.post('/register',authController.postRegister);
router.post('/forgotten-password',authController.postForgottenPassword);
router.get('/forgotten-password/:uniqueString',authController.getForgottenPassword);
router.post('/reset-password',authController.postResetPassword);
router.get('/verify/:uniqueString',authController.getVerify);

module.exports=router;