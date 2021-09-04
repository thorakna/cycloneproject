const express=require('express');
const bp = require('body-parser')
const app=express();
app.get('/',(req,res)=>{
    res.send("test")
})
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post('/giris',(req,res,next)=>{
    const data=req.body
    console.log(data.mail);
    console.log(data.password);
    if (data.mail==="umtrk1" && data.password==="1234") {
        res.status(200).json({
            status: 'success',
            isCorrect: true
          })
    } else {
        res.status(400).json({status:'fail',isCorrect:false})
    }
  
})
app.listen(3000,'0.0.0.0',()=>{
    console.log("server is listening on port 3000");
})