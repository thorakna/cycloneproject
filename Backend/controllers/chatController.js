const Chat = require('../models/chat');
const Conversation = require('../models/conversation');
exports.postSendMessage = async (req, res) => {
    const { senderId, receiverId, msg } = req.body;
    try {
        const message = new Chat({ senderId,receiverId,msg });
        message.save();
        await Conversation.findOne({senderId,receiverId}).then(
            data=>{
                if (!data) {
                    const conversation=new Conversation({senderId,receiverId});
                    conversation.save();
                }else{
                    console.log("sdss");
                    console.log(data);
                    data.lastMessage=msg;
                    data.save();
                }
            }
        )
        res.json({ status: 'success', message: 'message sent.' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'fail', message: 'message could not send.' })
    }
}
exports.postShowConversation = async (req, res) => {
    const { timestamp, senderId, receiverId } = req.body;
    try {
        if (!timestamp) {
            const message = await Chat
                .find({ senderId, receiverId })
                .sort({ _id: -1 })
                .limit(10);
            res.json({ status: 'success', message: message.map(e => [e.msg, e.createdAt]) })
        }
        const message = await Chat
            .find({ senderId, receiverId, createdAt: { $lt: timestamp } })
            .sort({ _id: -1 })
            .limit(10);
        res.json({ status: 'success', message: message.map(e => [e.msg, e.createdAt]) })
    } catch (error) {
        res.json('hataa!! you are trying to chatting with non-exist someone or invalid timestamp')
    }
}
exports.postShowLastMessages = async (req, res) => {
    const {senderId}=req.body;
    const conversations=await Conversation.find({senderId});
    res.json({status:'success',conversations:conversations})
}
