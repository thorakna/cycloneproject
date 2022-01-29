const User = require('../models/user');

function checkConformity(array, id) {
    let a = false;
    console.log(array);
    array.forEach(element => {
        if (id.equals(element)) {
            a = true;
            return;
        }
    });
    return a
}

exports.postSendFriendReq = async (req, res, next) => {
    const { username, receiverUsername } = req.body;
    let senderUser;
    let receiverUser;
    try {
        senderUser = await User.findOne({ username });
        receiverUser = await User.findOne({ username: receiverUsername });

        if (senderUser._id.equals(receiverUser._id)) {
            return res.status(400).json({ status: 'fail', message: 'Oh no, you are trying to send request to ownself.' });
        }
        if (checkConformity(senderUser.sentFriendReqs, receiverUser._id)) {
            return res.status(400).json({ status: 'fail', message: 'You have already sent him request. Just wait him reply.' });
        }
        if (checkConformity(senderUser.friends, receiverUser._id)) {
            return res.status(400).json({ status: 'fail', message: 'You cannot send request to your friend.' });
        }
        senderUser.sentFriendReqs.push(receiverUser._id);
        receiverUser.incomingFriendReqs.push(senderUser._id);
        senderUser.save();
        receiverUser.save();
        return res.status(200).json({ status: 'success', message: 'Friend request has been sent.' })
    } catch (error) {
        console.log(error);
        return res.json({ status: 'fail', message: 'database error.Try again later. Maybe you are trying to send request to non-exist someone.' })
    }

};
exports.postConfirmReq = async (req, res) => {
    //this route for approving requests
    const { username, pendingUsername } = req.body;
    try {
        let confirmingUser = await User.findOne({ username });
        let pendingUser = await User.findOne({ username: pendingUsername });
        if (!checkConformity(confirmingUser.incomingFriendReqs, pendingUser._id)) {
            return res.status(400).json({ status: 'fail', message: 'Something went wrong' })
        }
        let updateForConfirmer = { $push: { friends: pendingUser._id }, $pull: { incomingFriendReqs: pendingUser._id } };
        let updateForPending = { $pull: { sentFriendReqs: confirmingUser._id }, $push: { friends: confirmingUser._id } };
        await User.findByIdAndUpdate({ _id: confirmingUser._id }, updateForConfirmer);
        await User.findByIdAndUpdate({ _id: pendingUser._id }, updateForPending);
        return res.status(200).json({ status: 'success', message: 'Request approved.' });
    } catch (error) {
        return res.json({ status: 'fail', message: 'database error.' })
    }
};
exports.postIgnoreFriendReq = async (req, res) => {
    const { username, pendingUsername } = req.body;
    try {
        const ignoringUser = await User.findOne({ username });
        const pendingUser = await User.findOne({ username: pendingUsername });
        if (!checkConformity(ignoringUser.incomingFriendReqs, pendingUser._id)) {
            return res.status(400).json({ status: 'fail', message: 'something went wrong' });
        }
        const updateForIgnoring = { $pull: { incomingFriendReqs: pendingUser._id } }
        const updateForPending = { $pull: { sentFriendReqs: ignoringUser._id } }
        await User.findOneAndUpdate({ _id: ignoringUser._id }, updateForIgnoring);
        await User.findOneAndUpdate({ _id: pendingUser._id }, updateForPending);
        return res.status(200).json({ status: 'success', message: 'Request ignored.' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'fail', message: error.message });
    }
};
exports.postRemoveFriend = async (req, res) => {
    const { username, removedUsername } = req.body;
    try {
        const removingUser = await User.findOne({ username });
        const removedUser = await User.findOne({ username: removedUsername });
        if (!checkConformity(removingUser.friends, removedUser._id) | !checkConformity(removedUser.friends, removingUser._id)) {
            return res.status(400).json({ status: 'fail', message: 'Something went wrong' })
        }
        await User.findOneAndUpdate({ _id: removingUser._id }, { $pull: { friends: removedUser._id } });
        await User.findOneAndUpdate({ _id: removedUser._id }, { $pull: { friends: removingUser._id } });
        res.status(200).json({ status: 'success', message: 'friend removed' });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: 'database error' })
    }
}
exports.postSearchFriend = async (req, res) => {
    const { page, username, entry } = req.body;
    var regex = new RegExp(entry, 'i');
    if (entry.length < 3) {
        return res.status(400).json({ status: 'fail', message: 'Entry should be greater than 2' });
    }
    const conditions = {
        $or: [
            { username: regex },
            { fullName: regex }
        ],
        _id: { $ne: req.user.id }
    }
    try {
        const data = await User
            .find(conditions)
            .select('username friends sentFriendReqs incomingFriendReqs imageUrl fullName')
            .collation({ locale: 'en', strength: 2 })
            .sort({ username: 1 })
            .skip((page * 20) - 20)
            .limit(20)
        const result = await generateResult(data, username);
        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        res.json({ status: 'fail', message: error.message })
    }
};

exports.postCancelReq = async (req, res) => {
    const { username, pendingUsername } = req.body;
    try {
        let cancellerUser = await User.findOne({ username });
        let pendingUser = await User.findOne({ username: pendingUsername });
        if (!checkConformity(cancellerUser.sentFriendReqs, pendingUser._id) | !checkConformity(pendingUser.incomingFriendReqs, cancellerUser._id)) {
            return res.status(400).json({ status: 'fail', message: 'Something went wrong' });
        }
        const cancellerId = cancellerUser._id.toString();
        const pendingId = pendingUser._id.toString();
        cancellerUser.sentFriendReqs = cancellerUser.sentFriendReqs.filter(e => e != pendingId);
        pendingUser.incomingFriendReqs = pendingUser.incomingFriendReqs.filter(e => e != cancellerId);
        cancellerUser.save();
        pendingUser.save();
        res.status(200).json({ status: 'success', message: 'Request cancelled.' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 'fail', message: 'database error' })
    }
}

exports.postGetFriends = async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username }).select('friends')
    let friends = [];
    try {
        await Promise.all(
            user.friends
                .map((id) => pusher(id))
        ).then(() => {
            return res.json({ status: 'success', data: friends })
        })
        async function pusher(id) {
            const friend = await User.findOne({ _id: id }).select('fullName imageUrl username')
            friends.push(friend);
        }
    } catch (error) {
        console.log("hataaa");
        return res.json({ status: 'fail', message: error.message })
    }
}

const generateResult = async (userArray, username) => {
    const searchingUser = await User.findOne({ username }).select('_id');
    const searchinUserId = searchingUser._id;
    result = []
    userArray.forEach(user => {
        const value = {
            username: user.username,
            fullName: user.fullName,
            imageUrl: user.imageUrl,
            isFriend: false,
            isSentReq: false,
            isPendingReq: false
        }
        user.incomingFriendReqs.forEach(e => {
            if (searchinUserId.equals(e)) {
                value.isSentReq = true;
            }
            return;
        });
        user.friends.forEach(e => {
            if (searchinUserId.equals(e)) {
                value.isFriend = true;
            }
            return;
        })
        user.sentFriendReqs.forEach(e => {
            if (searchinUserId.equals(e)) {
                value.isPendingReq = true;
            }
            return;
        })
        result.push(value);
    });
    return result;

}

exports.postBlock = (req, res) => {



};