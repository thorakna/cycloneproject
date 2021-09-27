const express = require('express');
const app = express();
const userRoutes=require('./routes/userRoutes');
const cors = require('cors');
const Chat=require('./models/chat');
const Inbox=require('./models/inbox');
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.set('view engine', 'pug')
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="/socket.io/socket.io.js"></script>
        <script>var socket = io();</script>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>hello world</p>
        
    </body>
    </html>`);
});
app.use('/api/users',userRoutes)

//will be structured----------------------------------------------
app.post('/api/chat', async (req,res)=>{
    try {
       await Chat.create({
            members:[req.body.senderId,req.body.receiverId]
        }).then((data)=>{
            res.status(200).json(data);
        })
    } catch (error) {
        res.status(500).json({message:"conversation apisinde hataaa"});
    }
})
//will be structured----------------------------------------------
app.post('/api/chatting/send-message',async (req,res)=>{
    const {msg,senderId,receiverId}=req.body;

    try {
        await Inbox.create({msg,senderId,receiverId}).then((data)=>{
            res.json(data)
        })
    } catch (error) {
        console.log(error);
    }
})
//will be structured----------------------------------------------

app.use((req, res) => {
    res.send('<h1>404 NOT FOUND</h1>');
})

module.exports = app;