const mongoose = require("mongoose")


const DB = mongoose.connect(process.env.MONGODB)
.then(()=>console.log("databse connected"))
.catch((e)=>console.log(e.message))

module.exports = DB