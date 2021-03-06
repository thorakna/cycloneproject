const nodemailer=require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.sendMail=(email,uniqueString,condition)=>{
    var Transport=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.MAIL,
            pass:process.env.PASS
        }
    });
    var mailOptions;
    let sender="cyclone";
    if (condition=='verify') {
        mailOptions={
            from:sender,
            to:email,
            subject:"Email confirmation",
            html:`<h1>Hello there</h1> <br> <h2>Press <a style='color:red' href='http://localhost:3000/api/users/verify/${uniqueString}' >here</a> to verify your email.</h2><br><br>` 
        };
    
    }else if(condition=='reset'){
        mailOptions={
                from:sender,
                to:email,
                subject:"Password reset",
                html:`<h1>Hello there</h1> <br> <h2>Press <a style='color:red' href='http://localhost:3000/api/users/forgotten-password/${uniqueString}' >here</a> to reset your password.</h2><br><br>` 
            };
    }
   
    Transport.sendMail(mailOptions,function(err,res){
        if (err) {
            console.log(err);
            console.log("Mail couldn't send cause error");
            
        }else{
            console.log("verification mail sent.");
        }
    })
}
exports.randString=()=>{
    // const len=9;
    // let randStr='';
    // for (let i = 0; i < len; i++) {
    //    var ch=Math.floor((Math.random()*10)+1);
    //    randStr+=ch;
    // }
    // return randStr;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
}