require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./confiq/db');
const router = require('./routes');
const app = express();

dbConnection();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);


app.listen(8000,()=>{
    console.log('server running');
})