const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const JWT_SECRET = process.env.JWT_SECRET
const jwt=require('jsonwebtoken');

const decodingJWT = (token) => {
  if(token !== null || token !== undefined){
   const base64String = token.split('.')[1];
   const decodedValue = JSON.parse(Buffer.from(base64String,'base64'));
   return decodedValue;
  }
  return null;
}

exports.verify = (req, res, next) => {
    const username=req.body.username;
    const token = req.headers.token;
    const decodedValue=decodingJWT(token);

    if (token && decodedValue["username"]===username) {
                                     
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
      expiresIn: "8h",
    });
  };
  

exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id ,username: user.username}, JWT_SECRET);
  };
    