const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const sendMail=require('./sendmail');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const cors=require('cors');
const JWT_SECRET = process.env.JWT_SECRET

app.use(bodyParser.json());
//app.use(bp.urlencoded({ extended: true }))
app.use(cors());
app.get('/', (req,res)=>{
    res.send('Cyclone Api');
});

app.post('/login', async (req, res, next) => {
    let { username, password } = req.body;
    let user;
    try {
        username=username.trim();
        password=password.trim();
        user = await User.findOne({ username }).lean();
    } catch (error) {
        return res.status(403).json({ status: 'fail', message: error.message });
    }
    
    if (!user) {
        return res.status(403).json({ status: 'fail', message: 'Kullanıcı adınızı ya da şifrenizi yanlış girdiniz.' })
    }
    if (await bcrypt.compare(password, user.hashedPassword)) {
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET);
        return res.status(200).json({ status: 'success', token });
    }
    return res.status(403).json({ status: 'fail', message: 'Kullanıcı adınızı ya da şifrenizi yanlış girdiniz.' })
})
app.post('/register', async (req, res, next) => {

    const { username, password, mail, imageUrl } = req.body;
   
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ status: 'fail', message: 'Invalid username' })
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ status: 'fail', message: 'Invalid password' })
    } if (password.length < 4) {
        return res.status(400).json({ status: 'fail', message: 'Too small password.Should be greater than 6 character' })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const uniqueString=sendMail.randString();
    console.log("umuttt");
    console.log(uniqueString);
    const isEnabled=false;

    //Create 
    try {
        await User.create({
            username,
            mail,
            hashedPassword,
            imageUrl,
            uniqueString,
            isEnabled
        }).then((data) => {
            console.log("User has been registered succesfully");
            sendMail.sendMail(data.mail,data.uniqueString);    
            const token = jwt.sign({
                id: data._id,
                username: data.username
    
            }, JWT_SECRET)
            return res.status(200).json({ status: 'success', token })
        })

    } catch (error) {

        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'mail') {
            return res.status(403).json({ status: 'fail', message: 'Lütfen farklı bir mail adresi giriniz.' })
        }
        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'username') {
            return res.status(403).json({ status: 'fail', message: 'Lütfen farklı bir kullanıcı adı giriniz.' })
        }
        return res.status(403).json({ status: 'fail', message: error.message })
    }

})

app.get('/verify/:uniqueString',async (req,res,next)=>{
    const {uniqueString}=req.params;
    const user=await User.findOne({uniqueString})
    if (user) {
        user.isEnabled=true;
        await user.save();
        res.send('mail verified succesfuly')
    }else{
        res.send('user not found')
    }
})
module.exports = app;