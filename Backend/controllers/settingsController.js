const User = require('../models/user');
const bcrypt = require('bcryptjs');
const validateEmail = require('../utils/validateMail');
const sendMail = require('../utils/mail');

exports.postChangeCredentials = async (req, res) => {
    const { username, newFullName, newMail, newUsername, newDescription, currentPassword, newPassword } = req.body;
    if (!validateEmail.validateEmail(newMail)) {
        return res.status(400).json({ status: 'fail', message: 'Please enter a valid mail' })
    }
    if (newUsername.length < 4) {
        return res.json({ status: 'fail', message: 'Username cannot be less than 4' })
    }
    try {
        await User.findOne({ username }).then(async (user) => {
            user === null ? res.json({ status: 'fail', message: 'Db error we could not find you' }) : '';
            console.log(user.hashedPassword);
            if (await bcrypt.compare(currentPassword, user.hashedPassword)) {
                if (newPassword && newPassword.length < 6) {
                    const hashedPassword = await bcrypt.hash(password, 10).then(() => {
                        user.password = hashedPassword;
                    });
                }
                if (newMail && newMail !== user.mail) {
                    user.isEnabled = false;
                    user.mail = newMail;
                    sendMail.sendMail(newMail, user.uniqueString, 'verify');
                }
                if (newUsername !== '' && newUsername !== user.username) {
                    user.username = newUsername;
                }
                user.fullName = newFullName;
                user.description = newDescription;
                user.save();
                res.json({ status: 'success', message: 'User credentials has been updated.' })
            } else {
                res.json({ status: 'fail', message: 'wrong password' })
            }
        });
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

exports.postGetCredentials = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ status: 'fail', message: 'User could not find in db' })
        }
        const credentials = { 
            username:username,
            fullName: user.fullName, 
            description: user.description,
            mail: user.mail 
        };
        res.status(200).json({ status: 'success', credentials: credentials });
    } catch (error) {
        res.json({ status: 'fail', message: error.message })
    }

}