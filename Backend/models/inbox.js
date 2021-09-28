const mongoose = require('mongoose');
const inboxSchema = mongoose.Schema({
    msg: { 
        type: String 
    },
    senderId: { 
        type: String 
    }, 
    receiverId:{
        type:String
    }
    

}, { collection: 'inbox',timestamps:true  })

const model = mongoose.model('InboxSchema', inboxSchema);
module.exports = model;