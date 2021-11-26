const express=require('express');
const router=express.Router();
const chatController=require('../controllers/chatController');
router.post('/send-message',chatController.postSendMessage);
router.post('/show-conversation',chatController.postShowConversation);
router.post('/show-last-messages',chatController.postShowLastMessages);
module.exports=router;