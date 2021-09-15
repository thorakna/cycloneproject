const express = require('express');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const sendMail = require('./mail');
const jwt = require('jsonwebtoken');
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const cors = require('cors');
app.set('view engine', 'pug')
const JWT_SECRET = process.env.JWT_SECRET
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Cyclone Api');
});
app.post('/login', async (req, res) => {
    let { username, password } = req.body;
    let user;
    try {
        username = username.trim();
        password = password.trim();
        user = await User.findOne({ username }).lean();
    } catch (error) {
        return res.status(403).json({ status: 'fail', message: error.message });
    }

    if (!user) {
        return res.status(403).json({ status: 'fail', message: 'Wrong username or password' })
    }
    if (await bcrypt.compare(password, user.hashedPassword)) {
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET);
        return res.status(200).json({ status: 'success', token });
    }
    return res.status(403).json({ status: 'fail', message: 'Wrong username or password' })
});

app.post('/register', async (req, res) => {

    let { username, password, mail, imageUrl } = req.body;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ status: 'fail', message: 'Invalid username' })
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ status: 'fail', message: 'Invalid password' })
    } if (password.length < 4) {
        return res.status(400).json({ status: 'fail', message: 'Too small password.Should be greater than 6 character' })
    }
    if (!validateEmail(mail)) {
        return res.status(400).json({ status: 'fail', message: 'Please enter a valid mail' })
    }
    const uniqueString = sendMail.randString();
    const isEnabled = false;

    //Create 
    try {
        username = username.trim();
        mail = mail.trim();
        password = password.trim();
        if (imageUrl) {
            imageUrl = imageUrl.trim();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            mail,
            hashedPassword,
            imageUrl,
            uniqueString,
            isEnabled
        }).then((data) => {
            console.log("User has been registered succesfully");
            sendMail.sendMail(data.mail, data.uniqueString, 'verify');
            const token = jwt.sign({
                id: data._id,
                username: data.username

            }, JWT_SECRET)
            return res.status(200).json({ status: 'success', token })
        })

    } catch (error) {

        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'mail') {
            return res.status(403).json({ status: 'fail', message: 'This mail already exist. Please enter different one.' })
        }
        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'username') {
            return res.status(403).json({ status: 'fail', message: 'This username already exist. Please enter different one.' })
        }
        return res.status(403).json({ status: 'fail', message: error.message })
    }

});
app.post('/forgotten-password', async (req, res) => {
    const { mail } = req.body;
    const user = await User.findOne({ mail });
    if (!user) {
        res.status(400).json({ status: 'fail', message: 'Please enter a valid mail address' })
    } else {
        sendMail.sendMail(user.mail, user.uniqueString, 'reset')
        res.status(200).json({ status: 'success', message: 'Reset mail has been sent.Please check your mailbox' })
    }
});
app.get('/forgotten-password/:uniqueString', async (req, res) => {
    const { uniqueString } = req.params;
    const user = await User.findOne({ uniqueString });
    if (user) {
        res.render('reset-password',
            {
                uniqueString: uniqueString
            });
        }else {
         res.send('404');
        }
    })

app.post('/reset-password', async (req, res) => {
    const uniqueString = req.body.uniqueString;
    const newPass = req.body.password;
   
    try {
        await bcrypt.hash(newPass, 10).then( async (hashedPassword) => {
            await User.findOneAndUpdate({uniqueString},{hashedPassword},{new:true}).then(()=>{
                res.send('your password changed properly');
            });
        });
    } catch (error) {
        console.log(error);
    }
});
   
app.get('/verify/:uniqueString', async (req, res) => {
    const { uniqueString } = req.params;
    const user = await User.findOne({ uniqueString })
    if (user) {
        user.isEnabled = true;
        await user.save();
        res.send('mail verified succesfuly')
    } else {
        res.send('user not found')
    }
})

app.use((req, res) => {
    res.send('<h1>404 NOT FOUND</h1>');
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
module.exports = app;