const mongoose = require('mongoose');
const chatSchema = mongoose.Schema({
    inboxId:{
      type:String
    },
    userId:{
        type:String
    },
    lastMsg:{
        type:String
    }
}, { collection: 'chats',timestamps:true })

const model = mongoose.model('ChatSchema', chatSchema);
module.exports = model