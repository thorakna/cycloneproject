const mongoose = require('mongoose');
const chatSchema = mongoose.Schema({
    senderId:{type:String},
    msg:{type:String},
    receiverId:{type:String},
    conversationId:{type:String}
}, { collection: 'chats',timestamps:true })

const model = mongoose.model('ChatSchema', chatSchema);
module.exports = model