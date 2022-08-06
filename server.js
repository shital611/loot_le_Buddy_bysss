const express = require('express')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const connectDatabase = require('./config/MongoDb.js')

dotenv.config();
connectDatabase();
const app = express();
app.use(bodyparser.json());

const PORT = process.env.PORT || 3000;

app.use('/admin/login',require('./Routes/loginRoute'))

app.get('/', (req,res) => {

    console.log("hello from homepage")
    res.send("hello from homepage")
})

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`)
})