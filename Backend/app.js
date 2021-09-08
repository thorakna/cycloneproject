const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const User = require('./models/user');
const bcrypt = require('bcryptjs');
app.get('/', (req, res) => {
    res.send("test")
})
app.use(bodyParser.json())
//app.use(bp.urlencoded({ extended: true }))

app.post('/giris', async (req, res, next) => {
    const data = req.body
    console.log(data.mail);
    console.log(data.password);
    //query

    // if (data.mail === "umtrk1" && data.password === "1234") {
    // res.status(200).json({
    // status: 'success',
    // isCorrect: true
    // })
    // } else {
    // res.status(400).json({ status: 'fail', isCorrect: false })
    // }

})
app.post('/register', async (req, res, next) => {

    const { username, password, mail, imageUrl } = req.body

    
    if (!username || typeof username !== 'string') {
        return res.status(404).json({ status: 'error', message: 'Invalid username' })
    }
    if (!password || typeof password !== 'string') {
        return res.status(404).json({ status: 'error', message: 'Invalid password' })
    } if (password.length < 6) {
        return res.status(404).json({ status: 'error', message: 'Too small password.Should be greater than 6 character' })
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
            return res.status(200).json({ status: 'success' })
        })

    } catch (error) {

        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'mail') {
            return res.status(404).json({ status: 'error', duplicate: 'mail' })
        }
        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'username') {
            return res.status(404).json({ status: 'error', duplicate: 'username' })
        }
    }
    //hashing the passwords
    return res.status(404).json({ status: 'error' })
})
module.exports = app;