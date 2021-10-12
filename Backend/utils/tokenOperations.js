const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const JWT_SECRET = process.env.JWT_SECRET
const jwt=require('jsonwebtoken');

exports.verify = (req, res, next) => {
  
    const token = req.headers.token;
    if (token) {

      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user._id ,username: user.username}, JWT_SECRET, {
      expiresIn: "300s",
    });
  };
  

exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id ,username: user.username}, JWT_SECRET);
  };
    