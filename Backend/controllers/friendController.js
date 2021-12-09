const User = require('../models/user');
const tokenOperations=require('../utils/tokenOperations');
exports.postSendFriendReq = async (req, res) => {
    console.log(req.user);
    const { senderUserMail, receiverUserMail } = req.body;
    let senderUser;
    let receiverUser;
    function checkSendable(array) {
        var a = false;
        array.forEach(element => {
            if (element === receiverUser._id) {
                a = true;
                return a;
            }
        });
        return a
    }
    try {
        senderUser = await User.findOne({ mail: senderUserMail });
        receiverUser = await User.findOne({ mail: receiverUserMail });
        console.log(senderUser);
        console.log(receiverUser);
        if (senderUser._id.equals(receiverUser._id)) {
            return res.status(400).json({ status: 'success', msg: 'Oh no,you are trying to send request to ownself.' });
        }
        if (checkSendable(senderUser.sentFriendReqs)) {
            return res.status(400).json({ status: 'fail', msg: 'You have already sent him request. Just wait him reply.' });
        }
        if (checkSendable(senderUser.friends)) {
            return res.status(400).json({ status: 'fail', msg: 'You cannot send request to your friend.' });
        }
        var updateForSender = { $push: { sentFriendReqs: receiverUser._id } };
        var updateForReceiver = { $push: { incomingFriendReqs: senderUser._id } };
        await User.findOneAndUpdate({ mail: senderUserMail }, updateForSender).then(async () => {
            await User.findOneAndUpdate({ mail: receiverUserMail }, updateForReceiver).then(() => {
                return res.status(200).json({ status: 'success', msg: 'Friend request has been sent.' })
            });
        });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'fail', msg: 'database error.Try again later. Maybe you are trying to send request to non-exist someone.' })
    }

};
exports.postAddFriend = async (req, res) => {
  
    //this route for approving requests
    const { confirmingUserMail, pendingUserMail } = req.body;
    try {
        let confirmingUser = await User.findOne({ mail: confirmingUserMail });
        let pendingUser = await User.findOne({ mail: pendingUserMail });

        let isValid = false;
        for (let i = 0; i < confirmingUser.incomingFriendReqs.length; i++) {
            if (confirmingUser.incomingFriendReqs[i] === pendingUser._id) {
                isValid = true;
            }
        }
        if (isValid) {
            let updateForConfirmer = { $push: { friends: pendingUser._id }, $pull: { incomingFriendReqs: pendingUser._id } };
            let updateForPending = { $pull: { sentFriendReqs: confirmingUser._id }, $push: { friends: confirmingUser._id } };
            await User.findByIdAndUpdate({ _id: confirmingUser._id }, updateForConfirmer).then(async () => {
                await User.findByIdAndUpdate({ _id: pendingUser._id }, updateForPending).then(() => {
                    return res.status(200).json({ status: 'success', msg: 'Request approved.' })
                })
            })
        } else {
            return res.status(400).json({ status: 'fail', msg: 'Something is wrong' })
        }
    } catch (error) {
        return res.json({ status: 'fail', msg: 'database error.' })
    }
};
exports.postIgnoreFriendReq = async (req, res) => {
    const {ignoringUserMail,pendingUserMail}=req.body;
    try {
        const ignoringUser=await User.findOne({mail:ignoringUserMail});
        const pendingUser=await User.findOne({mail:pendingUserMail});
        let isValid=false;
        ignoringUser.incomingFriendReqs.forEach(element => {
            if (element===pendingUser._id) {
               return isValid=true;
            }
        });

        if (isValid) {
            const updateForIgnoring={$pull:{incomingFriendReqs:pendingUser._id}}
            const updateForPending={$pull:{sentFriendReqs:ignoringUser._id}}
            await User.findOneAndUpdate({_id:ignoringUser._id},updateForIgnoring).then(async ()=>{
                await User.findOneAndUpdate({_id:pendingUser._id},updateForPending).then(()=>{
                    return res.status(200).json({status:'success',msg:'Request ignored.'})
                })
            })
        }else{
            return res.json({status:'fail',msg:'Sth is wrong'})
        }
    } catch (error) {
        console.log(error);
        return res.json({status:'fail',msg:"database error"})
    }
};
exports.postRemoveFriend=async (req,res)=>{
    const {removingUserMail,removedUserMail}=req.body;
    try {
        const removingUser=await User.findOne({mail:removingUserMail});
        const removedUser=await User.findOne({mail:removedUserMail});
        var isValid=false;
        removingUser.forEach(element => {
            if (element===removedUser._id) {
                return isValid=true;
            }
        });
        if (isValid) {
            await User.findOneAndUpdate({_id:removingUser._id},{$pull:{friends:removedUser._id}}).then(async()=>{
                await User.findOneAndUpdate({_id:removedUser._id},{$pull:{friends:removingUser._id}}).then(()=>{
                    res.status(200).json({status:'success',msg:'friend removed'})
                })
            })
        } else {
            return res.status(400).json({status:'fail',msg:'sth is wrong'})
        }

    } catch (error) {
        res.status(404).json({status:'fail',msg:'database error'})
    }
}
exports.postSearchFriend =async (req, res) => {
    const {searchingUserMail,entry}=req.body;
    var regex=new RegExp(entry,'i');
    try {
    await User.find({username:regex,mail:{$ne:searchingUserMail}}).select('username').then((result)=>{

        res.status(200).json({status:'success',data:result});
    });   
    } catch (error) {
        res.json({status:'fail',msg:error})
    }
};

exports.postBlock = (req, res) => {



};