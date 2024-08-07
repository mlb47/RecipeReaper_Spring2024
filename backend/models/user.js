const mongoose = require("mongoose");
const passportMongoose = require("passport-local-mongoose");
const Grocery = require("./grocery.js")

const userSchema = new mongoose.Schema({
    username: String,
    groceries: [Grocery.schema]
});

userSchema.plugin(passportMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;