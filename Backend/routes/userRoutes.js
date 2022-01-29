const express = require('express');
const tokenOperations = require('../utils/tokenOperations');
const verify = tokenOperations.verify;
const router = express.Router();
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');
const settingsController = require('../controllers/settingsController');
const upload = require('../utils/uploadImage').upload;

router.post('/login', authController.postLogin);
router.post('/register', authController.postRegister);
router.post('/forgotten-password', authController.postForgottenPassword);
router.get('/forgotten-password/:uniqueString', authController.getForgottenPassword);
router.post('/reset-password', authController.postResetPassword);
router.get('/verify/:uniqueString', authController.getVerify);
router.post('/send-friend-req', verify, friendController.postSendFriendReq);
router.post('/confirm-req', verify, friendController.postConfirmReq);
router.post('/ignore-friend-req', verify, friendController.postIgnoreFriendReq);
router.post('/remove-friend', verify, friendController.postRemoveFriend);
router.post('/cancel-req', verify, friendController.postCancelReq);
router.post('/search', verify, friendController.postSearchFriend);
router.post('/get-friends', verify, friendController.postGetFriends);
router.post('/change-credentials', verify, settingsController.postChangeCredentials);

router.post('/get-credentials', verify, settingsController.postGetCredentials);
router.post('/change-image', upload.single('userImage'),verify, settingsController.postUpdateImage);
router.post('/delete-image', verify, settingsController.postDeleteImage);


router.post('/log-out', authController.postLogout);
router.post('/refresh-token', authController.postRefreshToken);

//router.post('/block',friendController.postBlock);
module.exports = router;