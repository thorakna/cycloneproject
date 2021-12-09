const express = require('express');
const app = express();
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
const cors = require('cors');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.set('view engine', 'pug')
app.use(express.json());
app.use(cors());
app.use(express.static('uploads'))
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="/socket.io/socket.io.js"></script>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <div id="box"></div>
    </head>
    <body>
        <p>hello world</p>
        <script> var socket = io.connect();
        socket.on('message',(data)=>{
            console.log("mesaj var");
           var box= document.getElementById('box');
           box.value=data
        })
        </script>
    </body>
    </html>`);
    //res.send('Cyclone api')
});
app.use('/api/users',userRoutes)
app.use('/api/chat',chatRoutes)
app.use((req, res) => {
    res.send('<h1>404 NOT FOUND</h1>');
})

module.exports = app;