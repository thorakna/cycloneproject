const User = require('../models/user');

exports.postSendFriendReq=async (req,res)=>{
    const {senderUserId,receiverUserId}=req.body;
   let senderUser;
   let receiverUser;
    try {
        senderUser=await User.findOne({_id:senderUserId});
        receiverUser=await User.findOne({_id:receiverUserId});
        if (senderUser._id.equals(receiverUser._id)) {
            return res.status(400).json({status:'success',msg:'Oh no,you are trying to send request to oneself.'})
        }
        const sentReqs=senderUser.sentFriendReqs
       
        sentReqs.forEach(element => {
            if (element===receiverUserId) {
                return res.json({status:'fail',msg:'You have already sent him request. Just wait him reply.'})
            }
        });

        var updateForSender={$push:{sentFriendReqs:receiverUserId}};
        var updateForReceiver={$push:{incomingFriendReqs:senderUserId}};
        await User.findByIdAndUpdate({_id:senderUserId},updateForSender).then(async ()=>{
            await User.findByIdAndUpdate({_id:receiverUserId},updateForReceiver).then(()=>{
                return res.status(200).json({status:'success',msg:'Friend request has been sent.'})
            }); 
        });     
    }catch (error) {
        return res.json({status:'fail',msg:'database error.Try again later. Maybe you are trying to send request to non-exist someone.'})
    }

};
exports.postAddFriend=(req,res)=>{

};
exports.postIgnoreFriendReq=(req,res)=>{

};