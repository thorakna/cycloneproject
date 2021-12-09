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
app.use('/api/users/avatars/',express.static('uploads'))
app.get('/', (req, res) => {
    res.send('Cyclone api')
});
app.use('/api/users',userRoutes)
app.use('/api/chat',chatRoutes)
app.use((req, res) => {
    res.send('<h1>404 NOT FOUND</h1>');
})

module.exports = app;