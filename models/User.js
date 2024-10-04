const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});

const user = new mongoose.model("userschema",userschema)
module.exports = user;