var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    user: String,
    account: {type:mongoose.Schema.Types.Mixed},
    scope:[],
    name:String
})
module.exports=mongoose.model('user',userSchema)
