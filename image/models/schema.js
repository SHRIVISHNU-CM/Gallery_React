const mongoose = require("mongoose")

const {Schema }= mongoose

const user =new Schema({
    name:{
        type:"String"
    },
    avatar:{
        type:"String"
    },
    cloudinary_uri:{
        type:"String"
    }
})

module.exports = mongoose.model("image" ,user)