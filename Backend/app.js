const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.get('/', (req, res) => {
    res.send("test")
})
app.use(bodyParser.json())
//app.use(bp.urlencoded({ extended: true }))

app.post('/giris', (req, res, next) => {
    const data = req.body
    console.log(data.mail);
    console.log(data.password);
    if (data.mail === "umtrk1" && data.password === "1234") {
        res.status(200).json({
            status: 'success',
            isCorrect: true
        })
    } else {
        res.status(400).json({ status: 'fail', isCorrect: false })
    }

})

module.exports=app;