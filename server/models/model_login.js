var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
    access_token: String,
    username: String,
})
module.exports=mongoose.model('steemituserlogin',userSchema)
