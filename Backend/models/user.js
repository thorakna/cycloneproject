const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{type:String,required:true,unique:true},
    mail:{type:String,required:true,unique:true},
    hashedPassword:{type:String,required:true},
    imageUrl:{type:String}
},{collection:'users'})

const model=mongoose.model('UserSchema',userSchema);
module.exports=model