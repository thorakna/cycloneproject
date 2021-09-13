const nodemailer=require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.sendMail=(email,uniqueString)=>{
    var Transport=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.MAIL,
            pass:process.env.PASS
        }
    });
    var mailOptions;
    let sender="cyclone";
    mailOptions={
        from:sender,
        to:email,
        subject:"Email confirmation",
        html:`Press <a href=http://localhost:3000/verify/${uniqueString} >here</a>  to verify your email.` 
    };
    Transport.sendMail(mailOptions,function(err,res){
        if (err) {
            console.log(err);
        }else{
            console.log("verification mail sent.");
        }
    })
}
exports.randString=()=>{
    const len=9;
    let randStr='';
    for (let i = 0; i < len; i++) {
       var ch=Math.floor((Math.random()*10)+1);
       randStr+=ch;
    }
    return randStr;
}