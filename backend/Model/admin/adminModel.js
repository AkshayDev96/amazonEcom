const mongoose = require('mongoose')

//Super admin model
const schema = mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        max:20,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        max:20,
        required:true
    },
    email:{
        type:String,
        trim:true,
        max:50,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:Object,
        required:true
    }
})

module.exports = mongoose.model('admin',schema)