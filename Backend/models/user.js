const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    fullName:{type:String,default:""},
    username:{type:String,required:true,unique:true},
    mail:{type:String,required:true,unique:true},
    hashedPassword:{type:String,required:true},
    imageUrl:{type:String,default:"init.png"},
    isEnabled:{type:Boolean},
    uniqueString:{type:String,unique:true},
    description:{type:String,default: "👋 Hey there, I am using Cyclone."},
    friends:[String],
    incomingFriendReqs:[String] ,
    sentFriendReqs:[String],
    refreshToken:{type:String}
},{collection:'users',timestamps:true})

const model=mongoose.model('UserSchema',userSchema);
module.exports=model    