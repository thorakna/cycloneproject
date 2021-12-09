const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const JWT_SECRET = process.env.JWT_SECRET;
const jwt=require('jsonwebtoken');

const decodingJWT = (token) => {
  //token !== null ||
  if(token===null||token === undefined){
   return null;
  }else{
    const base64String = token.split('.')[1];
   const decodedValue = JSON.parse(Buffer.from(base64String,'base64'));
   return decodedValue;
  }
}

exports.verify = (req, res, next) => {
    const username = req.body.username;
    const token = req.headers.token;
    const decodedValue=decodingJWT(token);
    
    if (token && decodedValue["username"] === username) {
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
          if (err.message==='jwt expired') {
            return res.status(403).json({status:"expired",message:"Your access token has been expired.Please login again."});
          }
          return res.status(403).json({message:"Token is not valid!"});
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({message:"You are not authenticated!"});
    }
  };

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user._id ,username: user.username}, JWT_SECRET, {
      expiresIn: "12h",
    });
  };
  

exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id ,username: user.username}, JWT_SECRET);
  };
    