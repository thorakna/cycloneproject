const User = require('../models/user');
const bcrypt = require('bcryptjs');
const validateEmail = require('../utils/validateMail');
const sendMail = require('../utils/mail');
const tokenOperations = require('../utils/tokenOperations');
const fs = require('fs');

exports.postChangeCredentials = async (req, res) => {
    let { username, newFullName, newMail, newUsername, newDescription, currentPassword, newPassword } = req.body;
    newFullName = newFullName.trim();
    newMail = newMail.trim();
    newUsername = newUsername.trim();
    newDescription = newDescription.trim();
    newPassword = newPassword.trim();
    if (!validateEmail.validateEmail(newMail) && newMail.length !== 0) {
        return res.status(400).json({ status: 'fail', message: 'Please enter a valid mail.' })
    }
    if (newUsername.length < 4 && newUsername.length !== 0) {
        return res.json({ status: 'fail', message: 'username cannot be less than 4.' })
    }
    if (!currentPassword) {
        return res.json({ status: 'fail', message: 'Write your current password.' })
    }
    try {
        await User.findOne({ username }).then(async (user) => {
            let newAccessToken;
            let newRefreshToken;
            if (!user) {
                return res.json({ status: 'fail', message: 'We could not find you.' })
            }
            if (await bcrypt.compare(currentPassword, user.hashedPassword)) {
                if (newPassword && newPassword.length > 5) {
                    await bcrypt.hash(newPassword, 10).then((data) => {
                        user.password = data;
                    });
                }
                if (newMail && newMail !== user.mail) {
                    user.isEnabled = false;
                    user.mail = newMail;
                    sendMail.sendMail(newMail, user.uniqueString, 'verify');
                }
                if (newUsername !== '' && newUsername !== user.username) {
                    newAccessToken = tokenOperations.generateAccessToken(user._id, newUsername);
                    newRefreshToken = tokenOperations.generateRefreshToken(user._id, newUsername);
                    user.refreshToken = newRefreshToken;
                    user.username = newUsername;
                }
                user.fullName = newFullName;
                user.description = newDescription;
                user.save();
                res.json({ status: 'success', message: 'User credentials has been updated.', accessToken: newAccessToken, refreshToken: newRefreshToken })
            } else {
                res.json({ status: 'fail', message: 'You entered wrong password.' })
            }
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
}
exports.postUpdateImage = async (req, res) => {
    const { username } = req.body;
    let imageUrl = req.file.filename;
    try {
        await User.findOne({ username }).then((user) => {
            if (user.imageUrl !== 'init.png') {
                deleteFile(user.imageUrl);
            }
            user.imageUrl = imageUrl;
            user.save();
            res.status(200).json({ status: 'success', message: 'Image updated successfuly.', imageUrl: imageUrl })
        })
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message })
    }
}
exports.postDeleteImage = async (req, res) => {
    const { username } = req.body;
    try {
        await User.findOne({ username }).then((user) => {
            if (user.imageUrl !== 'init.png') {
                deleteFile(user.imageUrl);
            }
            user.imageUrl = 'init.png';
            user.save();
            res.status(200).json({ status: 'success', message: 'Image deleted successfuly.' })
        })
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message })
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
            username: username,
            fullName: user.fullName,
            description: user.description,
            mail: user.mail,
            imageUrl: user.imageUrl
        }
        res.status(200).json({ status: 'success', credentials: credentials })
    } catch (error) {
        res.json({ status: 'fail', message: error.message })
    }
}

const deleteFile = (imageUrl) => {
    fs.unlink('uploads/' + imageUrl, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('file removed');
    })
}