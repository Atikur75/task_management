const mongoose = require('mongoose');

async function dbConnection(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("db connected!");
    });
}

module.exports = dbConnection;