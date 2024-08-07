const mongoose = require("mongoose");
const User = mongoose.model("User");

const viewUsers = async function(req, res) {
    const allUsers = await User.find()
      .lean()
      .catch((err) => {
          console.error(err);
          return [];
      });

    res.send(allUsers);
}


const create = async function (req, res) {
    //Upload user info to the database.
    User.register(new User({username: req.body.username}), req.body.password)
    .catch((err) => {
      console.error(err);
    })
}

const checkLogin = function(req, res) {
    res.send(req.body.username)
}


module.exports = {viewUsers, create, checkLogin};
