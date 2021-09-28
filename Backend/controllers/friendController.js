const User = require('../models/user');

exports.postSendFriendReq = async (req, res) => {
    const { senderUserId, receiverUserId } = req.body;
    let senderUser;
    let receiverUser;
    function checkSendable(array) {
        var a = false;
        array.forEach(element => {
            if (element === receiverUserId) {
                a = true;
                return a;
            }
        });
        return a
    }
    try {
        senderUser = await User.findOne({ _id: senderUserId });
        receiverUser = await User.findOne({ _id: receiverUserId });
        if (senderUser._id.equals(receiverUser._id)) {
            return res.status(400).json({ status: 'success', msg: 'Oh no,you are trying to send request to ownself.' });
        }
        if (checkSendable(senderUser.sentFriendReqs)) {
            return res.status(400).json({ status: 'fail', msg: 'You have already sent him request. Just wait him reply.' });
        }
        if (checkSendable(senderUser.friends)) {
            return res.status(400).json({ status: 'fail', msg: 'You cannot send request to your friend.' });
        }
        var updateForSender = { $push: { sentFriendReqs: receiverUserId } };
        var updateForReceiver = { $push: { incomingFriendReqs: senderUserId } };
        await User.findByIdAndUpdate({ _id: senderUserId }, updateForSender).then(async () => {
            await User.findByIdAndUpdate({ _id: receiverUserId }, updateForReceiver).then(() => {
                return res.status(200).json({ status: 'success', msg: 'Friend request has been sent.' })
            });
        });
    } catch (error) {
        return res.json({ status: 'fail', msg: 'database error.Try again later. Maybe you are trying to send request to non-exist someone.' })
    }

};
exports.postAddFriend = async (req, res) => {
    //this route for approving requests
    const { confirmingUserId, pendingUserId } = req.body;
    try {
        let confirmingUser = await User.findOne({ _id: confirmingUserId });
        let isValid = false;
        for (let i = 0; i < confirmingUser.incomingFriendReqs.length; i++) {
            if (confirmingUser.incomingFriendReqs[i] === pendingUserId) {
                isValid = true;
            }
        }
        if (isValid) {
            let updateForConfirmer = { $push: { friends: pendingUserId }, $pull: { incomingFriendReqs: pendingUserId } };
            let updateForPending = { $pull: { sentFriendReqs: confirmingUserId }, $push: { friends: confirmingUserId } };
            await User.findByIdAndUpdate({ _id: confirmingUserId }, updateForConfirmer).then(async () => {
                await User.findByIdAndUpdate({ _id: pendingUserId }, updateForPending).then(() => {
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
    const {ignoringUserId,pendingUserId}=req.body;
    try {
        const ignoringUser=await User.findOne({_id:ignoringUserId});
        let isValid=false;
        ignoringUser.incomingFriendReqs.forEach(element => {
            if (element===pendingUserId) {
               return isValid=true;
            }
        });

        if (isValid) {
            const updateForIgnoring={$pull:{incomingFriendReqs:pendingUserId}}
            const updateForPending={$pull:{sentFriendReqs:ignoringUserId}}
            await User.findOneAndUpdate({_id:ignoringUserId},updateForIgnoring).then(async ()=>{
                await User.findOneAndUpdate({_id:pendingUserId},updateForPending).then(()=>{
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

exports.postSearchFriend =async (req, res) => {
    const {entry}=req.body;
    var regex=new RegExp(entry,'i');
    await User.find({username:regex}).then((result)=>{
        res.status(200).json({status:'success',data:result});
    })
};

exports.postBlock = (req, res) => {



};