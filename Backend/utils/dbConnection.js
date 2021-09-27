const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const db = process.env.DATABASE;

module.exports.dbConnect=()=>{
    mongoose
        .connect(db)
        .then(() => { console.log("db connection is succesful"); })
}