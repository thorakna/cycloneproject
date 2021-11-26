const mongoose = require('mongoose');
const conversationSchema = mongoose.Schema({
   senderId:{type:String}, 
   receiverId:{type:String},
   lastMessage:{type:String} 
}, { collection: 'conversations',timestamps:true })

const model = mongoose.model('ConversationSchema', conversationSchema);
module.exports = model