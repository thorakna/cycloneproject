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
          console.log(err.message);
          if (err.message==='jwt expired') {
            return res.status(403).json({msg:"jwt expired"});
          }
          return res.status(403).json({msg:"Token is not valid!"});
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({msg:"You are not authenticated!"});
    }
  };

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user._id ,username: user.username}, JWT_SECRET, {
      expiresIn: "10s",
    });
  };
  

exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id ,username: user.username}, JWT_SECRET);
  };
    