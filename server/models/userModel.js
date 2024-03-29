const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({

    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    otp:{
        type: String,
    },
    updatedAt:{
        type: Date,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }

});


module.exports = mongoose.model("User", userSchema);