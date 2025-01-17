const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
    },
    Image:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('User',userSchema);