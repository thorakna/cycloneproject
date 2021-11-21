const sendMail = require('../utils/mail');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const JWT_SECRET = process.env.JWT_SECRET
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const tokenOperations = require('../utils/tokenOperations');
const validateEmail=require('../utils/validateMail');
exports.postRefreshToken = async (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");

    const user=await User.findOne({refreshToken});
    if (!user) {
        return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(refreshToken,JWT_SECRET,async (err, user) => {
        err?console.log(err):'';
        const newAccessToken = tokenOperations.generateAccessToken(user);
        const newRefreshToken =tokenOperations.generateRefreshToken(user);

        await User.findOneAndUpdate(user,{refreshToken:newRefreshToken})
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
    //if everything is ok, create new access token, refresh token and send to user
}

exports.postLogin = async (req, res) => {
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
        const accessToken = tokenOperations.generateAccessToken(user);
        const refreshToken=tokenOperations.generateRefreshToken(user);
        
        await User.findOneAndUpdate({_id:user._id},{refreshToken}).then(()=>{
            return res.status(200).json({ status: 'success', username, accessToken, refreshToken });

        })
      
    }else{
        return res.status(403).json({ status: 'fail', message: 'Wrong username or password' });
    }
    
}
exports.postLogout=async (req,res)=>{
    const {refreshToken}=req.body;
    try {
        await User.findOneAndUpdate({refreshToken},{refreshToken:''})
    } catch (error) {
        res.json('err')
    }
    
    res.status(200).json({status:'success',msg:'user logged out'})
}
exports.postRegister = async (req, res) => {

    let { username, password, mail, imageUrl } = req.body;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ status: 'fail', message: 'Invalid username' })
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ status: 'fail', message: 'Invalid password' })
    } if (password.length < 4) {
        return res.status(400).json({ status: 'fail', message: 'Too small password.Should be greater than 6 character' })
    }
    if (!validateEmail.validateEmail(mail)) {
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
        }).then(async (user) => {
            console.log(user.username);
            console.log("User has been registered succesfully");
            sendMail.sendMail(user.mail, user.uniqueString, 'verify');
            const refreshToken=tokenOperations.generateRefreshToken(user);
            console.log(refreshToken);
            const accessToken=tokenOperations.generateAccessToken(user);
             await User.findOneAndUpdate({username:user.username},{refreshToken})
            return res.status(200).json({ status: 'success', accessToken,refreshToken })
        })

    } catch (error) {

        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'mail') {
            return res.status(403).json({ status: 'fail', message: 'This mail already exist. Please enter different one.' })
        }
        if (error.code === 11000 && Object.keys(error.keyPattern)[0] === 'username') {
            return res.status(403).json({ status: 'fail', message: 'This username already exist. Please enter different one.' })
        }
        console.log(error);
        return res.status(403).json({ status: 'fail', message: error.message })
    }

}

exports.postForgottenPassword = async (req, res) => {
    const { mail } = req.body;
    const user = await User.findOne({ mail });
    if (!user) {
        res.status(400).json({ status: 'fail', message: 'Please enter a valid mail address' })
    } else {
        sendMail.sendMail(user.mail, user.uniqueString, 'reset')
        res.status(200).json({ status: 'success', message: 'Reset mail has been sent.Please check your mailbox' })
    }
}

exports.getForgottenPassword = async (req, res) => {
    const { uniqueString } = req.params;
    const user = await User.findOne({ uniqueString });
    if (user) {
        res.render('reset-password',
            {
                uniqueString: uniqueString
            });
    } else {
        res.send('<h1>404 not found</h1><br><h2>Remember that you can use this url just one time.</h2>');
    }
}

exports.postResetPassword = async (req, res) => {
    const uniqueString = req.body.uniqueString;
    const newPass = req.body.password;

    try {
        await bcrypt.hash(newPass, 10).then(async (hashedPassword) => {
            await User.findOneAndUpdate({ uniqueString }, { hashedPassword }, { new: true }).then(async () => {
                const newUniqStr = sendMail.randString();
                await User.findOneAndUpdate({ uniqueString }, { uniqueString: newUniqStr }, { new: true }).then(() => {
                    res.send('your password changed properly');
                })

            });
        });
    } catch (error) {
        console.log(error);
    }
}

exports.getVerify = async (req, res) => {
    const { uniqueString } = req.params;
    const user = await User.findOne({ uniqueString })
    if (user) {
        user.isEnabled = true;
        await user.save();
        res.send('mail verified succesfuly')
    } else {
        res.send('user not found')
    }
}

// function validateEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }