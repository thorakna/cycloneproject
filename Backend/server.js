const dbConnection=require('./utils/dbConnection');
const app = require('./app');
require('dotenv').config({ path: './config.env' });
dbConnection.dbConnect();
const port = process.env.PORT;
app.listen(port, '0.0.0.0', () => {
     console.log("server is listening on port 3000");
 })
 
