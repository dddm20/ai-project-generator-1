const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

username:String,
password:String,
subscription:Boolean

})

module.exports = mongoose.model("User",UserSchema)