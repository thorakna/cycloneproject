const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET="apğsdoğasdc#[${>#$Q^)=+343sdş**hjcdsd65f4dfklpaerts!!'£££23"
app.get('/', (req, res) => {
    res.send("test")
})
app.use(bodyParser.json())
//app.use(bp.urlencoded({ extended: true }))

app.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean();
    if (!user) {
        return res.status(400).json({ status: 'fail', message: 'Invalid username or password' })
    }
    if (await bcrypt.compare(password, user.hashedPassword)) {
        const token = jwt.sign({
            id: user._id,
            username: user.username

        },JWT_SECRET)
        return res.status(200).json({ status: 'success' ,data:token})
    }
    return res.status(400).json({ status: 'fail', message: 'Invalid username or password' })
})
app.post('/register', async (req, res, next) => {

    const { username, password, mail, imageUrl } = req.body


    if (!username || typeof username !== 'string') {
        return res.status(400).json({ status: 'error', message: 'Invalid username' })
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ status: 'error', message: 'Invalid password' })
    } if (password.length < 4) {
        return res.status(400).json({ status: 'error', message: 'Too small password.Should be greater than 6 character' })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create 
    try {
        await User.create({
            username,
            mail,
            hashedPassword,
            imageUrl
        }).then(() => {
            console.log("User has been registered succesfully");
            //res.setHeader('Content-Type', 'text/plain');
            return res.status(200).json({ status: 'success' })
        })

    } catch (error) {

        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'mail') {
            return res.status(404).json({ status: 'error', duplicate: 'mail' })
        }
        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'username') {
            return res.status(404).json({ status: 'error', duplicate: 'username' })
        }
        return res.status(404).json({ status: 'error' })
    }
    //hashing the passwords

})
module.exports = app;