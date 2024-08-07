const mongoose = require("mongoose");
const User = mongoose.model("User");

const viewGroceries = function (req, res) {
    const goodNames = [];
    const expiredNames = [];
    const goodDates = [];
    const expiredDates = [];
    if (req.query.user && req.query.location) {
        User.find({username: req.query.user}).lean()
        .then((foundUser) => {
            foundUser[0].groceries.forEach((grocery) => {
            if (grocery.location === req.query.location) {
                if (grocery.expirationDate.getTime() < Date.now()) {
                    expiredNames.push(grocery.foodName);
                    expiredDates.push(grocery.expirationDate);
                }
                else {
                    goodNames.push(grocery.foodName);
                    goodDates.push(grocery.expirationDate);
                }
            }
        })})
        .then(() => {res.json({goodNames, goodDates, expiredNames, expiredDates})});
    }
    else {
        res.json("User not logged in.");
    }
}

const createGrocery = function (req, res) {
    if (req.body.user) {
        User.findOneAndUpdate(
            {username: req.body.user},
            {$push: {groceries : {
                foodName: req.body.foodName,
                expirationDate: req.body.expirationDate,
                location: req.body.location
            }}}).exec();
    }
    else {
        console.log("User not logged in.");
    }
}

module.exports = {viewGroceries, createGrocery}