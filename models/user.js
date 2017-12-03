var mongoose = require("mongoose");
var passportLocalMongooseEmail = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    test: String
})
userSchema.plugin(passportLocalMongooseEmail);
module.exports = mongoose.model('User', userSchema);