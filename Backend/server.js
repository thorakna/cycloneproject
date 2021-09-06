
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
const db = process.env.DATABASE;

const mongoose = require('mongoose');

mongoose
    .connect(db)
    .then(() => { console.log("db connection is succesful"); })

app.listen(port, '0.0.0.0', () => {
    console.log("server is listening on port 3000");
})
