const express=require('express');
const router=express.Router();
const chatController=require('../controllers/chatController');
const tokenOperations=require('../utils/tokenOperations');
const verify=tokenOperations.verify;
router.post('/send-message',verify,chatController.postSendMessage);
router.post('/show-conversation',verify,chatController.postShowConversation);
router.post('/show-last-messages',verify,chatController.postShowLastMessages);
module.exports=router;