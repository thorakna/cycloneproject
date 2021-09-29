const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{type:String,required:true,unique:true},
    mail:{type:String,required:true,unique:true},
    hashedPassword:{type:String,required:true},
    imageUrl:{type:String},
    isEnabled:{type:Boolean},
    uniqueString:{type:String,unique:true},
    // friends:{type:Array},
    // sentFriendReqs:{type:Array},
    // incomingFriendReqs:{type:Array},
     friends:[String],
    incomingFriendReqs:[String] ,
    sentFriendReqs:[String]
},{collection:'users',timestamps:true})

const model=mongoose.model('UserSchema',userSchema);
module.exports=model