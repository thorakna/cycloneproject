const express = require('express');
const app = require('../app');
const router = express.Router();
const authController=require('../controllers/authController');
const friendController=require('../controllers/friendController');

router.post('/login',authController.postLogin);
router.post('/register',authController.postRegister);
router.post('/forgotten-password',authController.postForgottenPassword);
router.get('/forgotten-password/:uniqueString',authController.getForgottenPassword);
router.post('/reset-password',authController.postResetPassword);
router.get('/verify/:uniqueString',authController.getVerify);
router.post('/send-friend-req',friendController.postSendFriendReq);
router.post('/add-friend',friendController.postAddFriend);
router.post('/ignore-friend-req',friendController.postIgnoreFriendReq);
router.post('/remove-friend'.friendController.postRemoveFriend);
router.post('/search',friendController.postSearchFriend);

//router.post('/block',friendController.postBlock);
module.exports=router;