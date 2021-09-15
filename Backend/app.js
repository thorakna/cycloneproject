const express = require('express');
const app = express();
const userRoutes=require('./routes/userRoutes');
const cors = require('cors');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.set('view engine', 'pug')
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Cyclone Api');
});

app.use('/api/users',userRoutes)

app.use((req, res) => {
    res.send('<h1>404 NOT FOUND</h1>');
})


module.exports = app;