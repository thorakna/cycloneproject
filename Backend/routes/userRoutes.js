const express = require('express');
const tokenOperations=require('../utils/tokenOperations');
const verify=tokenOperations.verify;
const router = express.Router();
const authController=require('../controllers/authController');
const friendController=require('../controllers/friendController');
const settingsController=require('../controllers/settingsController');

router.post('/login',authController.postLogin);
router.post('/register',authController.postRegister);
router.post('/forgotten-password',authController.postForgottenPassword);
router.get('/forgotten-password/:uniqueString',authController.getForgottenPassword);
router.post('/reset-password',authController.postResetPassword);
router.get('/verify/:uniqueString',authController.getVerify);
router.post('/send-friend-req',verify,friendController.postSendFriendReq);
router.post('/add-friend',verify,friendController.postAddFriend);
router.post('/ignore-friend-req',verify,friendController.postIgnoreFriendReq);
router.post('/remove-friend',verify,friendController.postRemoveFriend);
router.post('/search',verify,friendController.postSearchFriend);

router.post('/change-credentials',verify,settingsController.postChangeCredentials);
router.post('/get-credentials',settingsController.postGetCredentials);

router.post('/log-out',authController.postLogout);
router.post('/refresh-token',authController.postRefreshToken);

//router.post('/block',friendController.postBlock);
module.exports=router;